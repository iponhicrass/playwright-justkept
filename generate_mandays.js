const ExcelJS = require('exceljs');
const path = require('path');

async function main() {
    const outPath = 'c:/my_vault/10_Projects/04-FieldCollectionPlanning/docs/03-estimate/FS_SAWAD_FCP_MD_001_MandaysEstimation_TimeKept_300.xlsx';

    // Color ARGB Constants
    const DARK        = 'FF784E1F';
    const LIGHTBAND   = 'FFF2E1D9';
    const LIGHTACCENT = 'FFF9F9F9';
    const MEDACCENT   = 'FFF7F4F2';
    const TOTALHL     = 'FFDAEFE2';
    const WHITE       = 'FFFFFFFF';
    const BLACK       = 'FF000000';
    const BORDERGRAY  = 'FFD3D3D3';

    const thinBorder = {
        top: { style: 'thin', color: { argb: BORDERGRAY } },
        left: { style: 'thin', color: { argb: BORDERGRAY } },
        bottom: { style: 'thin', color: { argb: BORDERGRAY } },
        right: { style: 'thin', color: { argb: BORDERGRAY } }
    };

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Mandays Estimation');

    // Enable gridlines (ExcelJS sheet view settings)
    sheet.views = [{ showGridLines: false }];

    // Column Widths
    const colWidths = {
        A: 2.29, B: 15.00, C: 45.00, D: 90.00, E: 6.00, F: 6.00, G: 7.00, H: 6.00, I: 6.00, J: 18.00, K: 18.00, L: 22.00
    };
    Object.keys(colWidths).forEach(col => {
        sheet.getColumn(col).width = colWidths[col];
    });

    // Formatting Helper function
    function formatRange(rangeRef, options) {
        const { bold, fill, fontColor, hAlign, vAlign, wrapText, border, numFmt } = options;
        const parts = rangeRef.split(':');
        const startRef = parts[0];
        const endRef = parts[1] || parts[0];

        const startCell = sheet.getCell(startRef);
        const endCell = sheet.getCell(endRef);

        const r1 = startCell.row;
        const c1 = startCell.col;
        const r2 = endCell.row;
        const c2 = endCell.col;

        for (let r = r1; r <= r2; r++) {
            for (let c = c1; c <= c2; c++) {
                const cell = sheet.getCell(r, c);

                // Set Font
                const currentFont = cell.font || {};
                const font = {
                    name: 'Segoe UI',
                    size: 11,
                    bold: bold !== undefined ? bold : currentFont.bold,
                    color: fontColor !== undefined ? { argb: fontColor } : currentFont.color
                };
                cell.font = font;

                // Set Fill
                if (fill !== undefined) {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: fill }
                    };
                }

                // Set Alignment
                const currentAlign = cell.alignment || {};
                const align = {
                    horizontal: hAlign !== undefined ? hAlign : currentAlign.horizontal,
                    vertical: vAlign !== undefined ? vAlign : currentAlign.vertical,
                    wrapText: wrapText !== undefined ? wrapText : currentAlign.wrapText
                };
                cell.alignment = align;

                // Set Border
                if (border !== undefined) {
                    cell.border = border;
                }

                // Set Number Format
                if (numFmt !== undefined) {
                    cell.numFmt = numFmt;
                }
            }
        }
    }

    function Banner(rangeRef, text) {
        sheet.mergeCells(rangeRef);
        const startCellRef = rangeRef.split(':')[0];
        sheet.getCell(startCellRef).value = text;
        formatRange(rangeRef, {
            bold: true,
            fill: LIGHTBAND,
            fontColor: DARK,
            hAlign: 'left',
            vAlign: 'middle',
            wrapText: true
        });
    }

    // Set Default Row Heights
    sheet.getRow(1).height = 15;
    sheet.getRow(2).height = 40;
    sheet.getRow(3).height = 15;

    // Row 2: Main Title
    sheet.mergeCells('B2:L2');
    const titleCell = sheet.getCell('B2');
    titleCell.value = '📊 Field Collection Planning (TimeKept) - Mandays Estimation';
    formatRange('B2:L2', {
        bold: true,
        fill: DARK,
        fontColor: WHITE,
        hAlign: 'center',
        vAlign: 'middle',
        wrapText: true
    });
    titleCell.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: WHITE } };

    // Row 4: Section Headers
    sheet.getRow(4).height = 26;
    Banner('B4:D4', '🏷️ ข้อมูลทั่วไปการประเมินโครงการ (Estimation Metadata)');
    Banner('F4:L4', '📈 สรุปวันทำงานและค่าเผื่อความเสี่ยง (Summary of Mandays & Buffer)');

    // Row 5: Subheaders
    sheet.getRow(5).height = 36;
    sheet.getCell('B5').value = 'Field';
    sheet.mergeCells('C5:D5');
    sheet.getCell('C5').value = 'Data';
    formatRange('B5:D5', { bold: true, fill: LIGHTACCENT, fontColor: BLACK, hAlign: 'center', vAlign: 'middle', wrapText: true });

    sheet.mergeCells('F5:I5');
    sheet.getCell('F5').value = 'บทบาทการทำงาน (Role)';
    sheet.getCell('J5').value = 'วันทำงานตั้งต้น (Base Mandays)';
    sheet.getCell('K5').value = 'ค่าเผื่อความเสี่ยง (% Risk Buffer)';
    sheet.getCell('L5').value = 'รวมวันทำงานสุทธิ (Total Mandays)';
    formatRange('F5:L5', { bold: true, fill: DARK, fontColor: WHITE, hAlign: 'center', vAlign: 'middle', wrapText: true });

    // Rows 6-11: Metadata and Role Summary
    const metadata = [
        ['Project Name', 'DEBT-OPTIMIZER / Field Collection Planning (ภายใต้ระบบ TimeKept)'],
        ['Customer Name', 'บริษัท ศรีสวัสดิ์ คอร์ปอเรชั่น จำกัด (มหาชน)'],
        ['Document Version', '1.0.0'],
        ['Latest Estimate Date', '2026-07-06'],
        ['Estimator', 'ทีม SA (Senior + AI-Augmented Development)'],
        ['Confidence Level', '[ ] 🔴 Low (30-50% - ข้อมูลคลุมเครือมาก)\n[ ] 🟡 Medium (50-80% - มีขอบเขตชัดเจนส่วนใหญ่)\n[x] 🟢 High (80-100% - ทราบ Spec และความต้องการทั้งหมด)']
    ];

    const roles = [
        ['Project Manager (PM)', 'E', 0.10],
        ['System Analyst (SA)', 'F', 0.10],
        ['UX/UI Designer', 'G', 0.10],
        ['Frontend Developer (FE)', 'H', 0.15],
        ['Backend Developer (BE)', 'I', 0.15]
    ];

    for (let i = 0; i < 6; i++) {
        const r = 6 + i;
        sheet.getRow(r).height = r === 11 ? 54 : 22;

        // Metadata
        sheet.getCell(`B${r}`).value = metadata[i][0];
        sheet.mergeCells(`C${r}:D${r}`);
        sheet.getCell(`C${r}`).value = metadata[i][1];
        formatRange(`B${r}`, { bold: true, fill: LIGHTACCENT, fontColor: BLACK, hAlign: 'left', vAlign: 'middle', wrapText: true });
        formatRange(`C${r}:D${r}`, { bold: false, fill: WHITE, fontColor: BLACK, hAlign: 'left', vAlign: 'middle', wrapText: true });

        // Role Summary
        if (i < 5) {
            const role = roles[i];
            sheet.mergeCells(`F${r}:I${r}`);
            sheet.getCell(`F${r}`).value = role[0];
            sheet.getCell(`J${r}`).value = { formula: `${role[1]}92` }; // Refers to the new Grand Total Row (92)
            sheet.getCell(`K${r}`).value = role[2];
            sheet.getCell(`L${r}`).value = { formula: `J${r}*(1+K${r})` };

            formatRange(`F${r}:I${r}`, { bold: true, fill: WHITE, fontColor: BLACK, hAlign: 'left', vAlign: 'middle', wrapText: true });
            formatRange(`J${r}`, { bold: false, fill: WHITE, fontColor: BLACK, hAlign: 'right', vAlign: 'middle', numFmt: '0.00' });
            formatRange(`K${r}`, { bold: false, fill: WHITE, fontColor: BLACK, hAlign: 'right', vAlign: 'middle', numFmt: '0%' });
            formatRange(`L${r}`, { bold: true, fill: WHITE, fontColor: BLACK, hAlign: 'right', vAlign: 'middle', numFmt: '0.00' });
        }
    }

    // Row 11: Summary Grand Total
    sheet.mergeCells('F11:I11');
    sheet.getCell('F11').value = 'รวมทรัพยากรทั้งหมด (Grand Total)';
    sheet.getCell('J11').value = { formula: 'SUM(J6:J10)' };
    sheet.getCell('K11').value = '-';
    sheet.getCell('L11').value = { formula: 'SUM(L6:L10)' };
    formatRange('F11:I11', { bold: true, fill: TOTALHL, fontColor: BLACK, hAlign: 'left', vAlign: 'middle', wrapText: true });
    formatRange('J11', { bold: true, fill: TOTALHL, fontColor: BLACK, hAlign: 'right', vAlign: 'middle', numFmt: '0.00' });
    formatRange('K11', { bold: true, fill: TOTALHL, fontColor: BLACK, hAlign: 'center', vAlign: 'middle' });
    formatRange('L11', { bold: true, fill: TOTALHL, fontColor: BLACK, hAlign: 'right', vAlign: 'middle', numFmt: '0.00' });

    sheet.getRow(12).height = 15;
    sheet.getRow(13).height = 15;

    // Row 14: WBS Summary Section
    sheet.getRow(14).height = 26;
    Banner('B14:L14', '📊 สรุปวันทำงานแยกตามหมวดหมู่ WBS (Work Breakdown Structure Section Summary)');

    // Row 15: Headers
    sheet.getRow(15).height = 36;
    const wbsSumHeaders = {
        B: 'WBS Code', C: 'หมวดหมู่งาน (WBS Section)', D: 'คำอธิบาย (Description)',
        E: 'PM', F: 'SA', G: 'UX/UI', H: 'FE', I: 'BE',
        J: 'วันทำงานตั้งต้น (Base Mandays)', K: 'ค่าเผื่อความเสี่ยง (% Risk Buffer)', L: 'รวมวันทำงานสุทธิ (Total Mandays)'
    };
    Object.keys(wbsSumHeaders).forEach(col => {
        sheet.getCell(`${col}15`).value = wbsSumHeaders[col];
    });
    formatRange('B15:L15', { bold: true, fill: DARK, fontColor: WHITE, hAlign: 'center', vAlign: 'middle', wrapText: true });

    // Section Summary Table Rows 16-28
    function setSumRow(row, refRows, isLeafRangeSum) {
        const cols = ['E', 'F', 'G', 'H', 'I', 'J', 'L'];
        cols.forEach(col => {
            if (isLeafRangeSum) {
                sheet.getCell(`${col}${row}`).value = { formula: `SUM(${col}${refRows[0]}:${col}${refRows[1]})` };
            } else {
                const parts = refRows.map(r => `${col}${r}`);
                sheet.getCell(`${col}${row}`).value = { formula: parts.join('+') };
            }
        });
        sheet.getCell(`K${row}`).value = { formula: `IF(J${row}=0,0,(L${row}-J${row})/J${row})` };
        formatRange(`E${row}:J${row}`, { numFmt: '0.00' });
        formatRange(`K${row}`, { numFmt: '0%' });
        formatRange(`L${row}`, { numFmt: '0.00' });
    }

    const sections = [
        { row: 16, code: '1.', title: 'Core System', desc: 'งานพัฒนาระบบหลักใหม่ทั้งหมด', subRows: [17, 18, 19], isLeaf: false },
        { row: 17, code: '1.1', title: 'Requirement Gathering & Confirmation', desc: 'เก็บรวบรวมข้อมูลและยืนยันความต้องการก่อนเริ่มพัฒนา', subRows: [35, 36], isLeaf: true }, // Row 35 to 36
        { row: 18, code: '1.2', title: 'Module #1: Collector WebView & Client Operations', desc: 'ระบบจัดเส้นทางและ WebView สำหรับเจ้าหน้าที่ภาคสนาม', subRows: [38, 46], isLeaf: true }, // Row 38 to 46
        { row: 19, code: '1.3', title: 'Module #2: Leader Web Control & Optimization Engine', desc: 'ระบบจัดโซนและเครื่องมือคำนวณคิวอัจฉริยะ', subRows: [48, 58], isLeaf: true }, // Row 48 to 58 (was 57)

        { row: 20, code: '2.', title: 'Modify - Additional', desc: 'งานแก้ไข/เพิ่มเติมจากระบบหลัก', subRows: [21, 22], isLeaf: false },
        { row: 21, code: '2.2', title: 'Customer In-House Mobile App Integration', desc: 'การเชื่อมต่อระบบเดิมบนโมบายล์แอปพลิเคชันของลูกค้า', subRows: [61, 62], isLeaf: true }, // Row 61 to 62
        { row: 22, code: '2.3', title: 'SAWAD CRM Integration', desc: 'การเชื่อมโยงระบบบริหารความสัมพันธ์ลูกค้าเดิม', subRows: [64, 68], isLeaf: true }, // Row 64 to 68

        { row: 23, code: '3.', title: 'Implement', desc: 'ขั้นตอนทดสอบและนำระบบขึ้นใช้งานจริง', subRows: [24, 25, 26, 27], isLeaf: false },
        { row: 24, code: '3.1', title: 'Testing & QA', desc: 'ทดสอบระบบและควบคุมคุณภาพก่อนส่งมอบ', subRows: [71, 75], isLeaf: true }, // Row 71 to 75
        { row: 25, code: '3.2', title: 'Deployment and Training', desc: 'ติดตั้งระบบและฝึกอบรมผู้ใช้งาน', subRows: [77, 80], isLeaf: true }, // Row 77 to 80
        { row: 26, code: '3.3', title: 'Data Migration', desc: 'ย้ายข้อมูลจากระบบเดิมเข้าสู่ระบบใหม่', subRows: [82, 85], isLeaf: true }, // Row 82 to 85
        { row: 27, code: '3.4', title: 'Go-Live', desc: 'นำระบบขึ้นใช้งานจริงและส่งมอบโครงการ', subRows: [87, 91], isLeaf: true }  // Row 87 to 91
    ];

    sections.forEach(s => {
        sheet.getRow(s.row).height = 22;
        sheet.getCell(`B${s.row}`).value = s.code;
        sheet.getCell(`C${s.row}`).value = s.title;
        sheet.getCell(`D${s.row}`).value = s.desc;
        setSumRow(s.row, s.subRows, s.isLeaf);

        if (s.code.endsWith('.')) {
            // Level 1 Section Summary Style
            formatRange(`B${s.row}`, { bold: true, fill: MEDACCENT, fontColor: BLACK, hAlign: 'center', vAlign: 'middle' });
            formatRange(`C${s.row}:D${s.row}`, { bold: true, fill: MEDACCENT, fontColor: BLACK, hAlign: 'left', vAlign: 'middle', wrapText: true });
            formatRange(`E${s.row}:L${s.row}`, { bold: true, fill: MEDACCENT, fontColor: BLACK, hAlign: 'right', vAlign: 'middle' });
        } else {
            // Level 2 Section Summary Style
            formatRange(`B${s.row}`, { bold: false, fill: WHITE, fontColor: BLACK, hAlign: 'center', vAlign: 'middle' });
            formatRange(`C${s.row}:D${s.row}`, { bold: false, fill: WHITE, fontColor: BLACK, hAlign: 'left', vAlign: 'middle', wrapText: true });
            formatRange(`E${s.row}:L${s.row}`, { bold: false, fill: WHITE, fontColor: BLACK, hAlign: 'right', vAlign: 'middle' });
        }
    });

    // Row 28: Section Summary Grand Total
    sheet.getRow(28).height = 24;
    sheet.mergeCells('B28:D28');
    sheet.getCell('B28').value = 'รวมทั้งสิ้น (Grand Total)';
    setSumRow(28, [16, 20, 23], false);
    formatRange('B28:D28', { bold: true, fill: TOTALHL, fontColor: BLACK, hAlign: 'left', vAlign: 'middle' });
    formatRange('E28:L28', { bold: true, fill: TOTALHL, fontColor: BLACK, hAlign: 'right', vAlign: 'middle' });

    sheet.getRow(29).height = 15;
    sheet.getRow(30).height = 15;

    // Row 31: WBS Detailed Section
    sheet.getRow(31).height = 26;
    Banner('B31:L31', '📋 ตารางแจกแจงงานแบบ WBS (Work Breakdown Structure & Mandays Breakdown)');

    // Row 32: Headers
    sheet.getRow(32).height = 36;
    const wbsHeaders = {
        B: 'WBS Code', C: 'โมดูล / ฟีเจอร์หลัก (Module / Feature)', D: 'กิจกรรม / รายละเอียดงาน (Task Description)',
        E: 'PM', F: 'SA', G: 'UX/UI', H: 'FE', I: 'BE',
        J: 'วันทำงานตั้งต้น (Base Mandays)', K: 'ค่าเผื่อความเสี่ยง (% Risk Buffer)', L: 'รวมวันทำงานสุทธิ (Total Mandays)'
    };
    Object.keys(wbsHeaders).forEach(col => {
        sheet.getCell(`${col}32`).value = wbsHeaders[col];
    });
    formatRange('B32:L32', { bold: true, fill: DARK, fontColor: WHITE, hAlign: 'center', vAlign: 'middle', wrapText: true });

    // Tasks population
    const tasks = [
        { type: 'top-divider', row: 33, text: '1. Core System: DEBT-OPTIMIZER / Field Collection Planning' },
        { type: 'sub-divider', row: 34, text: '1.1 Requirement Gathering & Confirmation' },
        { type: 'leaf', row: 35, code: '1.1.1', name: 'Get Requirements', desc: 'เก็บรวบรวมความต้องการจากผู้ใช้งานและ Stakeholder ทุกฝ่ายสำหรับ Core System', values: [0.25, 0.50, 0, 0, 0], risk: 0.1 },
        { type: 'leaf', row: 36, code: '1.1.2', name: 'Confirm Requirements & Flow', desc: 'นำเสนอและยืนยัน Business Flow และขอบเขตงานกับลูกค้าก่อนเริ่มพัฒนา', values: [0.25, 0.50, 0, 0, 0], risk: 0.1 },
        
        { type: 'sub-divider', row: 37, text: '1.2 Module #1: Collector WebView & Client Operations' },
        { type: 'leaf', row: 38, code: '1.2.1', name: 'System Analysis & Design', desc: 'เก็บบันทึกความต้องการ ออกแบบ Process Flow, Functional Spec และ Database Design ของโมดูล #1', values: [0.25, 0.75, 0, 0, 0], risk: 0.1 },
        { type: 'leaf', row: 39, code: '1.2.2', name: 'Screen 1: Daily Task Queue Dashboard (FE)', desc: 'พัฒนา UI หน้าจอคิวงานแบบ Compact, ระบบค้นหารายชื่อลูกหนี้, และฟังก์ชันแจ้งเตือนงานแทรก', values: [0, 0, 0.50, 1.00, 0], risk: 0.15 },
        { type: 'leaf', row: 40, code: '1.2.3', name: 'Screen 2: Task Detail & Route Navigation (FE)', desc: 'พัฒนา UI แสดงประวัติเข้าพบ, ข้อมูลสัญญา, รายละเอียดลูกหนี้ (Masking) และปุ่มกดดึงนำทาง', values: [0, 0, 0.25, 0.75, 0.25], risk: 0.15 },
        { type: 'leaf', row: 41, code: '1.2.4', name: 'Screen 3: Address Relocation Form (FE)', desc: 'พัฒนา UI แบบฟอร์มกรอกที่อยู่อาศัยใหม่แบบแยกโครงสร้างฟิลด์ และฟังก์ชัน GPS Capture (ไม่มีอัปโหลดภาพ)', values: [0, 0, 0.25, 0.25, 0], risk: 0.15 },
        { type: 'leaf', row: 42, code: '1.2.5', name: 'Screen 4: End-of-Day Summary Report (FE)', desc: 'พัฒนา UI แสดงรายงานสรุปสถิติความก้าวหน้าหลังเลิกงาน ระยะทางวิ่งจริง และรายการเคสดีดกลับถังกลาง', values: [0, 0, 0.25, 0.50, 0], risk: 0.15 },
        { type: 'leaf', row: 43, code: '1.2.6', name: 'API: User Authentication SSO (BE)', desc: 'พัฒนา API เชื่อมต่อ Single Sign-On (OAuth2 / JWT) และตรวจสอบสิทธิ์ผู้ใช้งาน (RBAC)', values: [0, 0, 0, 0.25, 0.50], risk: 0.15 },
        { type: 'leaf', row: 44, code: '1.2.7', name: 'API: Push Field Activity Webhook (BE)', desc: 'พัฒนา API REST และ Webhook นำส่งข้อมูลผลติดตามและพิกัดลงพื้นที่กลับเข้า SAWAD CRM แบบ Real-time', values: [0, 0, 0, 0.25, 0.50], risk: 0.15 },
        { type: 'leaf', row: 45, code: '1.2.8', name: 'API: Address Relocation Sync (BE)', desc: 'พัฒนา API บันทึกและซิงก์พิกัดโครงสร้างใหม่ของลูกหนี้เข้าคลังประมวลผล', values: [0, 0, 0, 0.25, 0.25], risk: 0.15 },
        { type: 'leaf', row: 46, code: '1.2.9', name: 'SIT Execution & Bug Tracking', desc: 'ดำเนินการทดสอบระบบร่วมกัน (System Integration Test) และตรวจหา Defect / ติดตามแก้ไขสำหรับโมดูล 1', values: [0, 0.25, 0, 0.25, 0.25], risk: 0.1 },
        
        { type: 'sub-divider', row: 47, text: '1.3 Module #2: Leader Web Control & Optimization Engine' },
        { type: 'leaf', row: 48, code: '1.3.1', name: 'System Analysis & Design', desc: 'เก็บบันทึกความต้องการ ออกแบบ Process Flow, Functional Spec และ Database Design ของโมดูล #2', values: [0.25, 1.00, 0, 0, 0], risk: 0.1 },
        { type: 'leaf', row: 49, code: '1.3.2', name: 'Screen 5: Leader Live Operations Map (FE)', desc: 'พัฒนา UI แผนที่แสดงตำแหน่งงานและพิกัดตำแหน่งของ Collector ทุกคนในเขตแบบสดเรียลไทม์', values: [0, 0, 0.50, 1.00, 0], risk: 0.15 },
        // NEW ROW ADDED: Screen 5.1
        { type: 'leaf', row: 50, code: '1.3.3', name: 'Screen 5.1: Collector Live Detail Panel (FE)', desc: 'พัฒนา UI แผงรายละเอียดพนักงาน, คิวงาน, และควบคุมการ Pan/Zoom แผนที่ตามพิกัดปัจจุบัน', values: [0, 0, 0.25, 0.50, 0], risk: 0.15 },
        { type: 'leaf', row: 51, code: '1.3.4', name: 'Screen 6: Dynamic Zoning & Override Screen (FE)', desc: 'พัฒนา UI หมุดพิกัดจัดโซน (เปลี่ยนจากวาด Polygon) และปุ่มกดยืนยันโอนย้ายงานข้ามเขตชั่วคราว (Leader Override)', values: [0, 0, 0.25, 0.50, 0], risk: 0.15 },
        { type: 'leaf', row: 52, code: '1.3.5', name: 'Screen 7: District Leader Dashboard (FE)', desc: 'พัฒนา UI รายงาน Team Success Rate, Collected Amount และตาราง Performance เปรียบเทียบ Collector รายบุคคล', values: [0, 0, 0.50, 0.75, 0], risk: 0.15 },
        { type: 'leaf', row: 53, code: '1.3.6', name: 'API: Sync Monthly Debtors (BE)', desc: 'พัฒนา API และกลไกนำเข้าข้อมูลบัญชีลูกหนี้รายเดือน (Monthly Batch Import) พร้อมทำ Masking PDPA', values: [0, 0.25, 0, 0.25, 0.75], risk: 0.15 },
        { type: 'leaf', row: 54, code: '1.3.7', name: 'API: Sync Collector & Leader Profile (BE)', desc: 'พัฒนา API ดึงโปรไฟล์พนักงาน โครงสร้างสาขา และพิกัดที่ตั้งบ้านจากระบบ HR ลูกค้า', values: [0, 0.25, 0, 0.25, 0.50], risk: 0.15 },
        { type: 'leaf', row: 55, code: '1.3.8', name: 'API: Ad-hoc Assignment Sync (BE)', desc: 'พัฒนา API สำหรับรับเรื่องงานแทรกเร่งด่วนระหว่างวัน และจับคู่อัตโนมัติ', values: [0, 0.25, 0, 0.25, 0.50], risk: 0.15 },
        { type: 'leaf', row: 56, code: '1.3.9', name: 'Routing Engine: Distance Matrix (BE)', desc: 'พัฒนาบริการ Valhalla และ Vroom สร้างตารางคำนวณระยะทางและเวลาเดินทางระหว่างจุดลูกหนี้ทั่วประเทศ', values: [0, 0, 0, 0, 1.20], risk: 0.15 },
        { type: 'leaf', row: 57, code: '1.3.10', name: 'Routing Engine: Optimization & Scheduler (BE)', desc: 'พัฒนา Logic จัดลากสลับคิว, เงื่อนไข Partial Payment และ Weekly Recurring Scheduler อัตโนมัติ', values: [0, 0, 0, 0, 1.50], risk: 0.15 },
        { type: 'leaf', row: 58, code: '1.3.11', name: 'SIT Execution & Bug Tracking', desc: 'ดำเนินการทดสอบระบบร่วมกัน (System Integration Test) และตรวจหา Defect / ติดตามแก้ไขสำหรับโมดูล 2', values: [0, 0.25, 0, 0.25, 0.25], risk: 0.1 },
        
        { type: 'top-divider', row: 59, text: '2. Modify - Additional:' },
        { type: 'sub-divider', row: 60, text: '2.2 Module 2.2: Customer In-House Mobile App Integration' },
        { type: 'leaf', row: 61, code: '2.2.1', name: 'System Analysis & Design', desc: 'วิเคราะห์และกำหนดแนวทางฝัง WebView และการส่งผ่าน Session token/GPS บนแอปพลิเคชันเดิม', values: [0.25, 0.50, 0, 0, 0], risk: 0.1 },
        { type: 'leaf', row: 62, code: '2.2.2', name: 'Dev Execution & Bug Tracking', desc: 'ดำเนินการทดสอบระบบและตรวจหา Defect ร่วมกันหลังแก้ไขโมดูลแอปพลิเคชันเดิม', values: [0, 0.25, 0, 0.25, 0.25], risk: 0.1 },
        
        { type: 'sub-divider', row: 63, text: '2.3 Module 2.3: SAWAD CRM Integration' },
        { type: 'leaf', row: 64, code: '2.3.1', name: 'System Analysis & Design', desc: 'วิเคราะห์ ออกแบบแผนภาพการไหลของข้อมูล (Data Flow) และโครงสร้างตารางข้อมูลเชื่อม CRM', values: [0.25, 0.50, 0, 0, 0], risk: 0.1 },
        { type: 'leaf', row: 65, code: '2.3.2', name: 'Monthly Batch Export Sync (BE)', desc: 'ปรับปรุงและเขียนสคริปต์ส่งออกข้อมูลลูกหนี้รายเดือนตามช่วงเวลาปิดวัน (Nightly Batch)', values: [0, 0, 0, 0.25, 0.75], risk: 0.15 },
        { type: 'leaf', row: 66, code: '2.3.3', name: 'Real-time On-demand API for Payment (BE)', desc: 'พัฒนาบริการ API เชื่อมต่อกับระบบสาขา เพื่ออัปเดตสถานะชำระเงินของลูกหนี้เข้า TimeKept ทันที', values: [0, 0, 0, 0.25, 0.50], risk: 0.15 },
        { type: 'leaf', row: 67, code: '2.3.4', name: 'Address Relocation Sync Endpoint (BE)', desc: 'พัฒนา REST API ปลายทางบนระบบ CRM ลูกค้า เพื่อเปิดรับข้อมูลพิกัดโครงสร้างใหม่กลับเข้าคลังระบบหลัก', values: [0, 0, 0, 0.25, 0.50], risk: 0.15 },
        { type: 'leaf', row: 68, code: '2.3.5', name: 'Dev Execution & Bug Tracking', desc: 'ดำเนินการทดสอบระบบและตรวจหา Defect ร่วมกันหลังแก้ไขโมดูลฝั่ง CRM ลูกค้า', values: [0.25, 0.25, 0, 0.25, 0.25], risk: 0.1 },
        
        { type: 'top-divider', row: 69, text: '3. Implement:' },
        { type: 'sub-divider', row: 70, text: '3.1 Testing & QA' },
        { type: 'leaf', row: 71, code: '3.1.1', name: 'Test Plan & Test Cases', desc: 'จัดทำแผนการทดสอบและเคสทดสอบการทำงานของระบบ (Test Plan & Test Cases)', values: [0, 0.50, 0, 0.25, 0.25], risk: 0.1 },
        { type: 'leaf', row: 72, code: '3.1.2', name: 'UAT Support & Defect Verification (#1)', desc: 'UAT #1: ดำเนินการสนับสนุนการทดสอบระบบร่วมกับผู้ใช้งาน และรับรองผลการทดสอบรอบแรก', values: [0.50, 0.50, 0, 0.50, 0.50], risk: 0.1 },
        { type: 'leaf', row: 73, code: '3.1.3', name: 'UAT Support & Defect Verification (#2)', desc: 'UAT #2: แก้ไข Defect สะสมจากรอบแรก ยืนยันผลการ Retest และทำรายงานสรุปส่งมอบงาน', values: [0.50, 0.50, 0, 0.25, 0.25], risk: 0.1 },
        { type: 'leaf', row: 74, code: '3.1.4', name: 'UAT Sign-off', desc: 'เตรียมเอกสาร UAT Sign-off และเข้าทำรายการลงนามอนุมัติโครงการ', values: [0.25, 0.25, 0, 0, 0], risk: 0.1 },
        { type: 'leaf', row: 75, code: '3.1.5', name: 'Non-Functional Testing', desc: 'ทดสอบประสิทธิภาพ (Performance Testing) และความปลอดภัย (Security Testing - Penetration)', values: [0, 0.25, 0, 0.25, 0.50], risk: 0.1 },
        
        { type: 'sub-divider', row: 76, text: '3.2 Deployment and Training' },
        { type: 'leaf', row: 77, code: '3.2.1', name: 'UAT Env Setup and CI/CD Pipeline', desc: 'ติดตั้งและตั้งค่าฐานข้อมูล เซิร์ฟเวอร์ และท่อส่งข้อมูลการส่งมอบงานขึ้นระดับ UAT', values: [0, 0.25, 0, 0.25, 0.50], risk: 0.1 },
        { type: 'leaf', row: 78, code: '3.2.2', name: 'User Manual Preparation', desc: 'จัดทำคู่มือการใช้งาน (User Manual) และคู่มือแอดมิน (Admin Manual) อธิบายฟังก์ชันระบบ', values: [0, 0.50, 0, 0.25, 0.25], risk: 0.1 },
        { type: 'leaf', row: 79, code: '3.2.3', name: 'Training - User', desc: 'จัดหลักสูตรและจัดฝึกอบรมความเข้าใจการใช้งาน WebView สำหรับหัวหน้าเขตและ Collector', values: [0, 0.25, 0, 0, 0], risk: 0.1 },
        { type: 'leaf', row: 80, code: '3.2.4', name: 'Training - Admin/IT', desc: 'จัดหลักสูตรและจัดฝึกอบรมเชิงเทคนิคสำหรับผู้ดูแลระบบและฝ่ายไอทีของลูกค้า', values: [0, 0.25, 0, 0, 0.25], risk: 0.1 },
        
        { type: 'sub-divider', row: 81, text: '3.3 Data Migration' },
        { type: 'leaf', row: 82, code: '3.3.1', name: 'Data Mapping & Migration Design', desc: 'วิเคราะห์และจัดทำตารางเปรียบเทียบข้อมูล (Data Mapping Schema) และสถาปัตยกรรมการโอนย้าย', values: [0, 0.75, 0, 0, 0], risk: 0.1 },
        { type: 'leaf', row: 83, code: '3.3.2', name: 'Migration Script Development', desc: 'พัฒนาสคริปต์นำเข้าและ ETL สำหรับแปลงโอนข้อมูลลูกหนี้ตั้งต้นเข้ามาใน PostgreSQL/Prisma', values: [0, 0, 0, 0, 1.00], risk: 0.15 },
        { type: 'leaf', row: 84, code: '3.3.3', name: 'Data Extraction / Source Integration', desc: 'เชื่อมต่อไปยังระบบต้นทาง CRM เพื่อดึงพิกัดและข้อมูลหนี้มาประมวลผลดึงเตรียมโอนย้าย', values: [0, 0, 0, 0, 0.50], risk: 0.1 },
        { type: 'leaf', row: 85, code: '3.3.4', name: 'Trial Migration & Validation', desc: 'ดำเนินการจำลองรอบย้ายข้อมูลแห้ง (Dry-run Migration) ตรวจสอบความถูกต้องและปรับแต่งประสิทธิภาพ', values: [0, 0.25, 0, 0, 0.50], risk: 0.1 },
        
        { type: 'sub-divider', row: 86, text: '3.4 Go-Live' },
        { type: 'leaf', row: 87, code: '3.4.1', name: 'PRD Env Setup and CI/CD Pipeline', desc: 'ติดตั้งและตั้งค่าฐานข้อมูล เซิร์ฟเวอร์ และท่อส่งข้อมูลการส่งมอบงานระดับ Production', values: [0, 0.25, 0, 0.25, 0.75], risk: 0.1 },
        { type: 'leaf', row: 88, code: '3.4.2', name: 'Data Migration & Import (PRD)', desc: 'ดำเนินการย้ายข้อมูลลูกหนี้และผู้ใช้งานจริงทั้งหมดเข้าสู่ระดับ Production ณ วันเริ่มทำงานจริง', values: [0, 0.25, 0, 0, 0.50], risk: 0.1 },
        { type: 'leaf', row: 89, code: '3.4.3', name: 'PRD Environment Readiness Check', desc: 'ตรวจสอบความเรียบร้อยของโค้ดโปรเจกต์ โครงข่ายความปลอดภัย และข้อมูลดิบตั้งต้น', values: [0, 0.25, 0, 0.25, 0.50], risk: 0.1 },
        { type: 'leaf', row: 90, code: '3.4.4', name: 'Go-Live Support / Hyper-care', desc: 'เฝ้าระวัง ดูแลความเรียบร้อย แก้ไขข้อขัดข้องหน้างาน และจัดบันทึกปัญหาในช่วงเริ่มระบบ 2 สัปดาห์', values: [0.50, 0.50, 0, 0.50, 0.75], risk: 0.1 },
        { type: 'leaf', row: 91, code: '3.4.5', name: 'Project Handover & Closure Document', desc: 'จัดทำสรุปภาพรวมโครงการ รายงานการนำส่งระบบ และใบปิดโครงการเพื่อปิดงานอย่างเป็นทางการ', values: [0.50, 0.25, 0, 0, 0], risk: 0.1 }
    ];

    tasks.forEach(t => {
        sheet.getRow(t.row).height = 22;
        if (t.type === 'top-divider') {
            sheet.mergeCells(`B${t.row}:D${t.row}`);
            sheet.getCell(`B${t.row}`).value = t.text;
            formatRange(`B${t.row}:L${t.row}`, { bold: true, fill: MEDACCENT, fontColor: BLACK, hAlign: 'left', vAlign: 'middle' });
        } else if (t.type === 'sub-divider') {
            sheet.mergeCells(`B${t.row}:D${t.row}`);
            sheet.getCell(`B${t.row}`).value = t.text;
            formatRange(`B${t.row}:L${t.row}`, { bold: true, fill: MEDACCENT, fontColor: BLACK, hAlign: 'left', vAlign: 'middle' });
        } else if (t.type === 'leaf') {
            sheet.getCell(`B${t.row}`).value = t.code;
            sheet.getCell(`C${t.row}`).value = t.name;
            sheet.getCell(`D${t.row}`).value = t.desc;

            // Values columns E-I
            const cols = ['E', 'F', 'G', 'H', 'I'];
            for (let j = 0; j < 5; j++) {
                sheet.getCell(`${cols[j]}${t.row}`).value = t.values[j];
            }

            // Base Mandays formula
            sheet.getCell(`J${t.row}`).value = { formula: `SUM(E${t.row}:I${t.row})` };
            // Risk buffer value
            sheet.getCell(`K${t.row}`).value = t.risk;
            // Total Mandays formula
            sheet.getCell(`L${t.row}`).value = { formula: `J${t.row}*(1+K${t.row})` };

            formatRange(`B${t.row}`, { bold: false, fill: WHITE, fontColor: BLACK, hAlign: 'center', vAlign: 'middle' });
            formatRange(`C${t.row}:D${t.row}`, { bold: false, fill: WHITE, fontColor: BLACK, hAlign: 'left', vAlign: 'middle', wrapText: true });
            formatRange(`E${t.row}:I${t.row}`, { bold: false, fill: WHITE, fontColor: BLACK, hAlign: 'right', vAlign: 'middle', numFmt: '0.00' });
            formatRange(`J${t.row}`, { bold: true, fill: LIGHTACCENT, fontColor: BLACK, hAlign: 'right', vAlign: 'middle', numFmt: '0.00' });
            formatRange(`K${t.row}`, { bold: false, fill: WHITE, fontColor: BLACK, hAlign: 'right', vAlign: 'middle', numFmt: '0%' });
            formatRange(`L${t.row}`, { bold: true, fill: LIGHTACCENT, fontColor: BLACK, hAlign: 'right', vAlign: 'middle', numFmt: '0.00' });
        }
    });

    // Row 92: WBS Detailed Grand Total
    sheet.getRow(92).height = 24;
    sheet.mergeCells('B92:D92');
    sheet.getCell('B92').value = 'รวมทั้งสิ้น (Grand Total)';
    const grandCols = ['E', 'F', 'G', 'H', 'I', 'J', 'L'];
    grandCols.forEach(col => {
        sheet.getCell(`${col}92`).value = { formula: `SUM(${col}35:${col}91)` }; // Refers to all leaves from Row 35 to 91
    });
    sheet.getCell('K92').value = '-';
    formatRange('B92:D92', { bold: true, fill: TOTALHL, fontColor: BLACK, hAlign: 'left', vAlign: 'middle' });
    formatRange('E92:J92', { bold: true, fill: TOTALHL, fontColor: BLACK, hAlign: 'right', vAlign: 'middle', numFmt: '0.00' });
    formatRange('K92', { bold: true, fill: TOTALHL, fontColor: BLACK, hAlign: 'center', vAlign: 'middle' });
    formatRange('L92', { bold: true, fill: TOTALHL, fontColor: BLACK, hAlign: 'right', vAlign: 'middle', numFmt: '0.00' });

    sheet.getRow(93).height = 15;
    sheet.getRow(94).height = 15;

    // Row 95: Assumptions Section
    const assumptionsRow = 95;
    sheet.getRow(assumptionsRow).height = 26;
    Banner(`B${assumptionsRow}:L${assumptionsRow}`, '💡 สมมติฐานและเงื่อนไขการประเมิน (Estimation Assumptions & Exclusions)');

    const assumptions = [
        'ขอบเขตอ้างอิงความต้องการ ณ วันที่ 6 กรกฎาคม 2569 ตามเอกสาร BRS v1.4, FRS v1.0 และ WebView Screens',
        'ระบบภายนอกของลูกค้า (SAWAD CRM / Mobile App / HR) มีการพัฒนา API Webhook และ Sandbox ไว้รองรับแล้ว',
        'การประเมินอยู่ภายใต้เงื่อนไขทีมงานทุกคนมีระดับความเชี่ยวชาญสูง (Senior Level) และใช้เครื่องมือ AI ตลอดการทำงาน',
        'โครงสร้างสิทธิ์การใช้งาน (Role-Based Access Control) นำไปผูกกับระบบ SSO เดิมของลูกค้า',
        'ฝั่งงานทดสอบระบบ (Testing & QA) มีการพัฒนา Automated Script (Playwright) และใช้ AI ในการสุ่มประเมิน Bug เพื่อความรวดเร็ว'
    ];

    for (let i = 0; i < 5; i++) {
        const r = assumptionsRow + 1 + i;
        sheet.getRow(r).height = 22;
        sheet.getCell(`B${r}`).value = '•';
        sheet.mergeCells(`C${r}:L${r}`);
        sheet.getCell(`C${r}`).value = assumptions[i];
        formatRange(`B${r}`, { bold: true, fill: WHITE, fontColor: BLACK, hAlign: 'center', vAlign: 'middle' });
        formatRange(`C${r}:L${r}`, { bold: false, fill: WHITE, fontColor: BLACK, hAlign: 'left', vAlign: 'middle', wrapText: true });
    }

    sheet.getRow(assumptionsRow + 6).height = 15;

    // Row 102: Risks Section
    const risksRow = assumptionsRow + 7;
    sheet.getRow(risksRow).height = 26;
    Banner(`B${risksRow}:L${risksRow}`, '⚠️ ปัจจัยความเสี่ยงต่อกำหนดการ (Schedule Risks & Strategy)');

    // Risks headers
    sheet.getRow(risksRow + 1).height = 24;
    sheet.getCell(`B${risksRow + 1}`).value = 'รหัส';
    sheet.mergeCells(`C${risksRow + 1}:D${risksRow + 1}`);
    sheet.getCell(`C${risksRow + 1}`).value = 'ความเสี่ยง';
    sheet.mergeCells(`E${risksRow + 1}:I${risksRow + 1}`);
    sheet.getCell(`E${risksRow + 1}`).value = 'ผลกระทบ';
    sheet.mergeCells(`J${risksRow + 1}:L${risksRow + 1}`);
    sheet.getCell(`J${risksRow + 1}`).value = 'แนวทางป้องกัน';
    formatRange(`B${risksRow + 1}:L${risksRow + 1}`, { bold: true, fill: DARK, fontColor: WHITE, hAlign: 'center', vAlign: 'middle', wrapText: true });

    const risksList = [
        ['R1', 'ความพร้อมของระบบ CRM ลูกค้าในการเปิดรับข้อมูล API พิกัดโครงสร้างใหม่', 'หาก API ปลายทางล่าช้า จะส่งผลกระทบต่อขั้นตอนการทดสอบ SIT ของโมดูล 2.3', 'ประสานงานแจ้งความต้องการ Interface Spec ล่วงหน้า เพื่อให้ทีมไอทีลูกค้าพัฒนาเตรียม Sandbox ไว้ล่วงหน้าก่อนเริ่มพัฒนาในเฟส 2'],
        ['R2', 'พิกัดที่ตั้งของลูกค้าในระบบ CRM มีความคลาดเคลื่อนสูง', 'จะส่งผลต่อประสิทธิภาพการประมวลผลและการจัดโซนของ Route Optimization Engine', 'ออกแบบระบบ Data Exception Handling เพื่อคัดแยกและแจ้งเตือนบัญชีที่พิกัดมีปัญหาให้สาขาตรวจสอบแก้ไขทันที']
    ];

    for (let i = 0; i < 2; i++) {
        const r = risksRow + 2 + i;
        sheet.getRow(r).height = 36;
        sheet.getCell(`B${r}`).value = risksList[i][0];
        sheet.mergeCells(`C${r}:D${r}`);
        sheet.getCell(`C${r}`).value = risksList[i][1];
        sheet.mergeCells(`E${r}:I${r}`);
        sheet.getCell(`E${r}`).value = risksList[i][2];
        sheet.mergeCells(`J${r}:L${r}`);
        sheet.getCell(`J${r}`).value = risksList[i][3];

        formatRange(`B${r}`, { bold: true, fill: LIGHTACCENT, fontColor: BLACK, hAlign: 'center', vAlign: 'middle' });
        formatRange(`C${r}:D${r}`, { bold: false, fill: WHITE, fontColor: BLACK, hAlign: 'left', vAlign: 'middle', wrapText: true });
        formatRange(`E${r}:I${r}`, { bold: false, fill: WHITE, fontColor: BLACK, hAlign: 'left', vAlign: 'middle', wrapText: true });
        formatRange(`J${r}:L${r}`, { bold: false, fill: WHITE, fontColor: BLACK, hAlign: 'left', vAlign: 'middle', wrapText: true });
    }

    sheet.getRow(risksRow + 4).height = 15;

    // Row 107: Sign-off Section
    const signoffRow = risksRow + 5;
    sheet.getRow(signoffRow).height = 26;
    Banner(`B${signoffRow}:L${signoffRow}`, '✍️ ผู้ตรวจสอบและลงนามอนุมัติ (Review & Sign-off)');

    sheet.getRow(signoffRow + 1).height = 24;
    sheet.mergeCells(`B${signoffRow + 1}:C${signoffRow + 1}`);
    sheet.getCell(`B${signoffRow + 1}`).value = 'ผู้จัดทำ/ผู้ตรวจสอบ';
    sheet.getCell(`D${signoffRow + 1}`).value = 'บทบาท (Role)';
    sheet.mergeCells(`E${signoffRow + 1}:I${signoffRow + 1}`);
    sheet.getCell(`E${signoffRow + 1}`).value = 'ลายมือชื่อ';
    sheet.mergeCells(`J${signoffRow + 1}:L${signoffRow + 1}`);
    sheet.getCell(`J${signoffRow + 1}`).value = 'วันที่';
    formatRange(`B${signoffRow + 1}:L${signoffRow + 1}`, { bold: true, fill: DARK, fontColor: WHITE, hAlign: 'center', vAlign: 'middle', wrapText: true });

    const signoffList = [
        ['ทีม SA / PM (TimeKept)', 'Lead SA / PM (ผู้ทบทวนหลัก)', '__________________', '6 กรกฎาคม 2569'],
        ['คุณ สุรชัย', 'Project Sponsor / Owner (ผู้อนุมัติ)', '__________________', '[วัน/เดือน/ปี]']
    ];

    for (let i = 0; i < 2; i++) {
        const r = signoffRow + 2 + i;
        sheet.getRow(r).height = 32;
        sheet.mergeCells(`B${r}:C${r}`);
        sheet.getCell(`B${r}`).value = signoffList[i][0];
        sheet.getCell(`D${r}`).value = signoffList[i][1];
        sheet.mergeCells(`E${r}:I${r}`);
        sheet.getCell(`E${r}`).value = signoffList[i][2];
        sheet.mergeCells(`J${r}:L${r}`);
        sheet.getCell(`J${r}`).value = signoffList[i][3];

        formatRange(`B${r}:C${r}`, { bold: true, fill: LIGHTACCENT, fontColor: BLACK, hAlign: 'center', vAlign: 'middle' });
        formatRange(`D${r}`, { bold: false, fill: WHITE, fontColor: BLACK, hAlign: 'center', vAlign: 'middle' });
        formatRange(`E${r}:I${r}`, { bold: false, fill: WHITE, fontColor: BLACK, hAlign: 'center', vAlign: 'middle' });
        formatRange(`J${r}:L${r}`, { bold: false, fill: WHITE, fontColor: BLACK, hAlign: 'center', vAlign: 'middle' });
    }

    const endRow = signoffRow + 3;

    // Apply Borders to all sections
    const borderRanges = [
        'B2:L2',
        'B4:D4', 'F4:L4',
        'B5:D11', 'F5:L11',
        'B14:L14', 'B15:L28',
        'B31:L31', 'B32:L92',
        `B${assumptionsRow}:L${assumptionsRow}`,
        `B${assumptionsRow + 1}:L${assumptionsRow + 5}`,
        `B${risksRow}:L${risksRow}`,
        `B${risksRow + 1}:L${risksRow + 3}`,
        `B${signoffRow}:L${signoffRow}`,
        `B${signoffRow + 1}:L${endRow}`
    ];

    borderRanges.forEach(rangeRef => {
        formatRange(rangeRef, { border: thinBorder });
    });

    // Global alignment and font name cleanup
    sheet.eachRow((row) => {
        row.eachCell({ includeEmpty: false }, (cell) => {
            const currentFont = cell.font || {};
            cell.font = {
                name: 'Segoe UI',
                size: 11,
                bold: currentFont.bold,
                color: currentFont.color
            };
            if (!cell.alignment) {
                cell.alignment = { vertical: 'middle' };
            } else {
                cell.alignment.vertical = 'middle';
            }
        });
    });

    // Save Workbook
    await workbook.xlsx.writeFile(outPath);
    console.log(`DONE: Excel file successfully written to ${outPath}`);
}

main().catch(err => {
    console.error('Error executing main:', err);
    process.exit(1);
});
