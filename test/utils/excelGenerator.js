const xlsx = require('xlsx');
const path = require('path');

/**
 * Generates an Excel file from a keyword-driven data object.
 * @param {Object} data - The test scenario and data object.
 * @param {string} outputPath - The full path to the output Excel file.
 */
function generateExcel(data, outputPath) {
  const wb = xlsx.utils.book_new();

  Object.entries(data).forEach(([sheetName, sheetData]) => {
    const rows = sheetName.endsWith('_Data')
      ? sheetData
      : sheetData.map((row, idx) => ({ Step: idx + 1, ...row }));

    const ws = xlsx.utils.json_to_sheet(rows);
    xlsx.utils.book_append_sheet(wb, ws, sheetName);
  });

  xlsx.writeFile(wb, outputPath);

  const scenarioSheets = Object.keys(data).filter(s => !s.endsWith('_Data'));
  const totalTests = Object.entries(data)
    .filter(([k]) => !k.endsWith('_Data'))
    .reduce((sum, [k, steps]) => {
      const dataKey = `${k}_Data`;
      const rows = data[dataKey] ? data[dataKey].length : 1;
      return sum + rows;
    }, 0);

  console.log(`\n✅ Excel generated: ${outputPath}`);
  console.log(`   Workflow sheets (${scenarioSheets.length}): ${scenarioSheets.join(', ')}`);
  console.log(`   Expected Playwright tests: ${totalTests}\n`);
}

module.exports = { generateExcel };
