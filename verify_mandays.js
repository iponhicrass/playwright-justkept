const ExcelJS = require('exceljs');

async function main() {
    const outPath = 'c:/my_vault/10_Projects/04-FieldCollectionPlanning/docs/03-estimate/FS_SAWAD_FCP_MD_001_MandaysEstimation_TimeKept_100.xlsx';
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(outPath);

    const sheet = workbook.getWorksheet('Mandays Estimation');
    if (!sheet) {
        console.error('ERROR: Worksheet "Mandays Estimation" not found!');
        process.exit(1);
    }

    console.log('✅ Sheet loaded successfully.');

    // Helper to print cell details
    function checkCell(ref, expectedFormula, expectedNumFmt) {
        const cell = sheet.getCell(ref);
        const val = cell.value;
        const type = cell.type;

        let ok = true;
        let details = '';

        if (expectedFormula !== undefined) {
            if (val && val.formula === expectedFormula) {
                details += `Formula MATCH: ${val.formula}`;
            } else {
                ok = false;
                details += `Formula MISMATCH! Got ${JSON.stringify(val)}, Expected ${expectedFormula}`;
            }
        } else {
            details += `Value: ${JSON.stringify(val)}`;
        }

        if (expectedNumFmt !== undefined) {
            if (cell.numFmt === expectedNumFmt) {
                details += `, NumFmt MATCH: ${cell.numFmt}`;
            } else {
                ok = false;
                details += `, NumFmt MISMATCH! Got ${cell.numFmt}, Expected ${expectedNumFmt}`;
            }
        }

        if (ok) {
            console.log(`  [OK] Cell ${ref}: ${details}`);
        } else {
            console.error(`  [FAIL] Cell ${ref}: ${details}`);
            process.exitCode = 1;
        }
    }

    console.log('\nChecking Metadata & Summary Table (Rows 6-11):');
    checkCell('B2', undefined); // Title
    checkCell('J6', 'E92', '0.00'); // PM base mandays formula (points to E92)
    checkCell('L6', 'J6*(1+K6)', '0.00'); // PM total mandays formula
    checkCell('J11', 'SUM(J6:J10)', '0.00'); // Grand total base
    checkCell('L11', 'SUM(L6:L10)', '0.00'); // Grand total net

    console.log('\nChecking WBS Section Summary Table (Rows 15-28):');
    checkCell('E17', 'SUM(E35:E36)', '0.00'); // 1.1 PM sum (Row 35 to 36)
    checkCell('E16', 'E17+E18+E19', '0.00'); // 1. PM sum
    checkCell('E28', 'E16+E20+E23', '0.00'); // Grand total PM sum (1 + 2 + 3)
    checkCell('K28', 'IF(J28=0,0,(L28-J28)/J28)', '0%'); // Grand total buffer percent

    console.log('\nChecking Detailed WBS Table (Rows 33-92):');
    checkCell('J35', 'SUM(E35:I35)', '0.00'); // 1.1.1 base total
    checkCell('L35', 'J35*(1+K35)', '0.00'); // 1.1.1 net total
    checkCell('J92', 'SUM(J35:J91)', '0.00'); // Grand Total base
    checkCell('L92', 'SUM(L35:L91)', '0.00'); // Grand Total net

    console.log('\nChecking Font Alignment & Views:');
    const view = sheet.views[0];
    if (view && view.showGridLines === false) {
        console.log('  [OK] Gridlines are hidden.');
    } else {
        console.error('  [FAIL] Gridlines are not hidden! views:', sheet.views);
        process.exitCode = 1;
    }

    const testCell = sheet.getCell('B2');
    if (testCell.font && testCell.font.name === 'Segoe UI') {
        console.log('  [OK] Global font is Segoe UI.');
    } else {
        console.error('  [FAIL] Cell font is not Segoe UI! Font:', testCell.font);
        process.exitCode = 1;
    }

    if (process.exitCode === 1) {
        console.error('\n❌ Verification FAILED with some mismatches.');
    } else {
        console.log('\n🎉 ALL VERIFICATIONS PASSED SUCCESSFULLY!');
    }
}

main().catch(err => {
    console.error('Error executing verification:', err);
    process.exit(1);
});
