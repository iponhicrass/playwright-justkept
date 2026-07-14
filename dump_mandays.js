const ExcelJS = require('exceljs');

async function main() {
    const outPath = 'c:/my_vault/10_Projects/04-FieldCollectionPlanning/docs/03-estimate/FS_SAWAD_FCP_MD_001_MandaysEstimation_TimeKept_100.xlsx';
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(outPath);
    const sheet = workbook.getWorksheet('Mandays Estimation');

    console.log("Grand Totals:");
    console.log(`UX/UI Base: ${sheet.getCell('J8').value.result.toFixed(2)}, Net: ${sheet.getCell('L8').value.result.toFixed(2)}`);
    console.log(`FE Base: ${sheet.getCell('J9').value.result.toFixed(2)}, Net: ${sheet.getCell('L9').value.result.toFixed(2)}`);
    console.log(`Total Base: ${sheet.getCell('J11').value.result.toFixed(2)}, Net: ${sheet.getCell('L11').value.result.toFixed(2)}`);

    console.log("\nSection 1:");
    console.log(`1.3 UI: ${sheet.getCell('G19').value.result.toFixed(2)}, FE: ${sheet.getCell('H19').value.result.toFixed(2)}, Base: ${sheet.getCell('J19').value.result.toFixed(2)}, Net: ${sheet.getCell('L19').value.result.toFixed(2)}, Buffer: ${(sheet.getCell('K19').value.result * 100).toFixed(2)}%`);
    console.log(`1 UI: ${sheet.getCell('G16').value.result.toFixed(2)}, FE: ${sheet.getCell('H16').value.result.toFixed(2)}, Base: ${sheet.getCell('J16').value.result.toFixed(2)}, Net: ${sheet.getCell('L16').value.result.toFixed(2)}, Buffer: ${(sheet.getCell('K16').value.result * 100).toFixed(2)}%`);
    
    console.log(`Grand Total Buffer: ${(sheet.getCell('K28').value.result * 100).toFixed(2)}%`);
}
main();
