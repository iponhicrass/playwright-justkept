import fs from 'fs';
import * as xlsx from 'xlsx';

/**
 * Loads and parses an Excel scenario file synchronously.
 * Automatically maps _Data sheets to their parent scenario sheets.
 * @param {string} filePath 
 * @returns {Record<string, { steps: Array<Object>, datasets: Array<Object> }>} 
 */
export function loadExcelScenarios(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Excel file not found: ${filePath}`);
  }
  
  const workbook = xlsx.readFile(filePath);
  const scenarios = {};
  const dataPools = {};

  // First pass: Categorize sheets into scenarios and data pools
  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const jsonRecords = xlsx.utils.sheet_to_json(worksheet, { defval: "" });
    
    if (jsonRecords.length === 0) continue;

    if (sheetName.endsWith('_Data')) {
      const parentName = sheetName.replace('_Data', '');
      dataPools[parentName] = jsonRecords;
    } else {
      scenarios[sheetName] = {
        steps: jsonRecords,
        datasets: null // Attached later
      };
    }
  }

  // Second pass: Link datasets to parent scenarios
  for (const [parentName, datasets] of Object.entries(dataPools)) {
    if (scenarios[parentName]) {
      scenarios[parentName].datasets = datasets;
    } else {
      console.warn(`Engine Warning: Found data pool "${parentName}_Data" but no scenario sheet "${parentName}" exists.`);
    }
  }
  
  return scenarios;
}
