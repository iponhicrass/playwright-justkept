const path = require('path');
const { generateExcel } = require('../../test/utils/excelGenerator');

// =============================================================================
// 📌 วิธีใช้งานไฟล์นี้:
//   1. รันคำสั่ง: node data/JustKept/generate_ui_phase2_excel.js
//   2. ไฟล์ Excel จะถูกสร้างที่: data/JustKept/ui/justkept_ui_phase2_test_cases.xlsx
//   3. รัน Test: node data/JustKept/run_ui_test.js
// =============================================================================

const outPath = path.join(__dirname, 'ui', 'justkept_ui_phase2_test_cases.xlsx');
const BASE_URL = 'https://justkept-dev.freewillsolutions.com';

const uiTestFlow = {
  // ═══════════════════════════════════════════════════════════════════════════
  // 1. TC_UI_01: Cross Month Setup (Broker)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_01_CrossMonth": [
    { Action: "LOGIN_BROKER" },
    { Action: "CLICK_LOCATOR", Target: "#btn_document_request_automation", Data: "force" },
    { Action: "CLICK_LOCATOR", Target: "#btn_create_job", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "#jobNameInput" },
    { Action: "FILL_LOCATOR", Target: "#jobNameInput", Data: "ส่งรายงานภาษีซื้อรายเดือนข้ามรอบ" },
    { Action: "FILL_LOCATOR", Target: "#jobDescInput", Data: "ขอรายงานภาษีซื้อรายเดือนคร่อมรอบ" },
    { Action: "FILL_LOCATOR", Target: "#docTypeSearch", Data: "TAX_REPORT_BUY" },
    { Action: "CLICK_LOCATOR", Target: ".doc-checkbox >> nth=0" },
    { Action: "FILL_LOCATOR", Target: "#input_date_end", Data: "31-Dec-2027 23:59" },
    { Action: "CLICK_LOCATOR", Target: "#btn_upload_frequency_monthly", Data: "force" },
    { Action: "CLICK_LOCATOR", Target: "#btn_monthly_preset_Custom", Data: "force" },
    { Action: "CLICK_LOCATOR", Target: "#isCrossMonthCheckbox", Data: "force" },
    { Action: "FILL_LOCATOR", Target: "#uploadStartDayInput", Data: "16" },
    { Action: "FILL_LOCATOR", Target: "#uploadEndDayInput", Data: "15" },
    // { Action: "FILL_LOCATOR", Target: "#input_sub_company_search", Data: "COMP001" },
    // { Action: "CLICK_LOCATOR", Target: ".sub-company-checkbox >> nth=0" },
    { Action: "CLICK_LOCATOR", Target: "#allSubCompaniesCheckbox", Data: "force" },
    { Action: "CLICK_LOCATOR", Target: "#btnSubmitJob", Data: "force" },
    { Action: "WAIT_TIME", Target: "1000" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_01_success.png" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. TC_UI_02: Daily Window (Active Upload) (Customer)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_02_DailyWindow": [
    { Action: "LOGIN_CUSTOMER" },
    { Action: "CLICK_LOCATOR", Target: "#btn_doc_upload", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "#uploadTable" },
    { Action: "CHECK_RESULT", Target: "locator|li.doc-upload-item:not(.disabled)", Data: "pass" },
    { Action: "UPLOAD_LOCATOR", Target: ".file-upload-input >> nth=0", Data: "c:/works/Justkept/playwright_standard-master/playwright_standard-master/test-temp/pdf_dummy_test.pdf" },
    { Action: "WAIT_TIME", Target: "2000" },
    { Action: "CLICK_LOCATOR", Target: ".btn-submit-docs", Data: "force" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_02_success.png" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. TC_UI_03: Overlapping due dates (Customer)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_03_OverlappingDueDates": [
    { Action: "LOGIN_CUSTOMER" },
    { Action: "CLICK_LOCATOR", Target: "#btn_doc_upload", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "#uploadTable" },
    { Action: "CHECK_RESULT", Target: "locator|li.doc-upload-item", Data: "pass" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_03_sorted_tasks.png" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. TC_UI_04: Broker Reject Flow (Broker)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_04_BrokerReject": [
    { Action: "LOGIN_BROKER" },
    { Action: "CLICK_LOCATOR", Target: "#btn_document_monitoring", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "#jobListSidebar" },
    { Action: "CLICK_LOCATOR", Target: "li.job-item:has-text('Uploaded') >> nth=0", Data: "force" },
    { Action: "WAIT_TIME", Target: "1500" },
    { Action: "CLICK_LOCATOR", Target: "#monitorTable td #btnReject >> nth=0", Data: "force" },
    { Action: "WAIT_TIME", Target: "1000" },
    { Action: "SELECT_OPTION", Target: "select >> nth=0", Data: "Missing Signature" },
    { Action: "FILL_LOCATOR", Target: "textarea >> nth=0", Data: "Please sign the document before uploading." },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_04_reject_modal.png" },
    { Action: "CLICK_LOCATOR", Target: "button:has-text('Confirm Reject')", Data: "force" },
    { Action: "WAIT_TIME", Target: "1000" },
    { Action: "CHECK_RESULT", Target: "locator|#modalReject", Data: "fail" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_04_success.png" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. TC_UI_05A: Extend Deadline by Hours (Broker)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_05A_ExtendHour": [
    { Action: "LOGIN_BROKER" },
    { Action: "CLICK_LOCATOR", Target: "#btn_document_monitoring", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "#jobListSidebar" },
    { Action: "CLICK_LOCATOR", Target: "li.job-item:has-text(' Pending'):has-text('Daily') >> nth=0", Data: "force" },
    { Action: "WAIT_TIME", Target: "1500" },
    { Action: "CLICK_LOCATOR", Target: "#monitorTable td .btn-extend-period >> nth=0", Data: "force" },
    { Action: "WAIT_TIME", Target: "1000" },
    { Action: "CLICK_LOCATOR", Target: "button:has-text('6'):has-text('hrs') >> nth=0", Data: "force" },
    { Action: "FILL_LOCATOR", Target: "textarea >> nth=0", Data: "ลูกค้าแจ้งติดปัญหาเครือข่ายอินเทอร์เน็ตช่วงเย็น" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_05A_extend_6hrs_modal.png" },
    { Action: "CLICK_LOCATOR", Target: "button:has-text('Confirm Extend')", Data: "force" },
    { Action: "WAIT_TIME", Target: "1000" },
    { Action: "CHECK_RESULT", Target: "locator|#modalExtend", Data: "fail" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_05A_success.png" }
    // { Action: "WAIT_TIME", Target: "100000" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. TC_UI_05B: Extend Deadline by Days (Broker)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_05B_ExtendDay": [
    { Action: "LOGIN_BROKER" },
    { Action: "CLICK_LOCATOR", Target: "#btn_document_monitoring", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "#jobListSidebar" },
    { Action: "CLICK_LOCATOR", Target: "li.job-item:has-text(' Pending'):has-text('Monthly') >> nth=0", Data: "force" },
    { Action: "WAIT_TIME", Target: "1500" },
    { Action: "CLICK_LOCATOR", Target: "#monitorTable td .btn-extend-period >> nth=0", Data: "force" },
    { Action: "WAIT_TIME", Target: "1000" },
    { Action: "CLICK_LOCATOR", Target: "button:has-text('3'):has-text('day') >> nth=0", Data: "force" },
    { Action: "FILL_LOCATOR", Target: "textarea >> nth=0", Data: "ลูกค้าแจ้งติดปัญหาเครือข่ายอินเทอร์เน็ตช่วงเย็น" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_05B_extend_3day_modal.png" },
    { Action: "CLICK_LOCATOR", Target: "button:has-text('Confirm Extend')", Data: "force" },
    { Action: "WAIT_TIME", Target: "1000" },
    { Action: "CHECK_RESULT", Target: "locator|#modalExtend", Data: "fail" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_05B_success.png" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 7. TC_UI_06: Task-Based Layout (Customer)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_06_TaskBasedLayout": [
    { Action: "LOGIN_CUSTOMER" },
    { Action: "CLICK_LOCATOR", Target: "#btn_doc_upload", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "#uploadTable" },
    { Action: "CHECK_RESULT", Target: "locator|li.doc-upload-item", Data: "pass" },
    { Action: "CHECK_RESULT", Target: "locator|div.file-upload-dropzone", Data: "pass" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_06_layout.png" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 8. TC_UI_08: Race Condition (Submit Conflict) (Customer)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_08_RaceCondition": [
    { Action: "LOGIN_CUSTOMER" },
    { Action: "CLICK_LOCATOR", Target: "#btn_doc_upload", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "#uploadTable" },
    { Action: "UPLOAD_LOCATOR", Target: ".file-upload-input >> nth=0", Data: "c:/works/Justkept/playwright_standard-master/playwright_standard-master/test-temp/pdf_dummy_test.pdf" },
    { Action: "WAIT_TIME", Target: "1500" },
    { Action: "DOUBLE_CLICK", Target: ".btn-submit-docs", Data: "force" },
    { Action: "WAIT_TIME", Target: "3000" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_08_conflict_handled.png" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 9. TC_UI_10: Create Job Normal (Broker)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_10_CreateJobNormal": [
    { Action: "LOGIN_BROKER" },
    { Action: "CLICK_LOCATOR", Target: "#btn_document_request_automation", Data: "force" },
    { Action: "CLICK_LOCATOR", Target: "#btn_create_job", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "#jobNameInput" },
    { Action: "FILL_LOCATOR", Target: "#jobNameInput", Data: "Annual Tax Compliance 2026" },
    { Action: "FILL_LOCATOR", Target: "#jobDescInput", Data: "งานร้องขอเอกสารประจำปี" },
    { Action: "FILL_LOCATOR", Target: "#docTypeSearch", Data: "W-9 FORM" },
    { Action: "CLICK_LOCATOR", Target: ".doc-checkbox >> nth=0" },
    { Action: "FILL_LOCATOR", Target: "#input_date_end", Data: "31-Dec-2030 23:59" },

    { Action: "FILL_LOCATOR", Target: "#notiTimeInput", Data: "10:00" },
    { Action: "SELECT_OPTION", Target: "#input_email_template", Data: "emtp004" },

    { Action: "CLICK_LOCATOR", Target: "#allSubCompaniesCheckbox", Data: "force" },
    { Action: "CLICK_LOCATOR", Target: "#btnSubmitJob", Data: "force" },
    { Action: "WAIT_TIME", Target: "1500" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_10_success.png" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 10. TC_UI_12: Edit Job Detail (Broker)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_12_JobEditDetail": [
    { Action: "LOGIN_BROKER" },
    { Action: "CLICK_LOCATOR", Target: "#btn_document_request_automation", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "button[title='Edit Job']" },
    { Action: "CLICK_LOCATOR", Target: "button[title='Edit Job'] >> nth=0", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "#jobNameInput" },
    { Action: "FILL_LOCATOR", Target: "#jobDescInput", Data: "แก้ไขเอกสาร W-9 FORM" },
    { Action: "FILL_LOCATOR", Target: "#docTypeSearch", Data: "W-9 FORM" },
    { Action: "CLICK_LOCATOR", Target: ".doc-checkbox >> nth=0" },
    { Action: "FILL_LOCATOR", Target: "#input_date_end", Data: "31-Dec-2030 23:59" },
    // { Action: "WAIT_TIME", Target: "1500000" },
    { Action: "CLICK_LOCATOR", Target: "#btnSubmitJob", Data: "force" },
    { Action: "CHECK_RESULT", Target: "value|#jobNameInput", Data: "pass" },
    { Action: "WAIT_TIME", Target: "1500" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_12_edit_modal.png" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 11. TC_UI_13: Job Status Edit (NEXT CYCLE Effect) (Broker)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_13_JobEditImmediate": [
    { Action: "LOGIN_BROKER" },
    { Action: "CLICK_LOCATOR", Target: "#btn_document_request_automation", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "button[title='Edit Job']" },
    { Action: "CLICK_LOCATOR", Target: "button[title='Edit Job'] >> nth=0", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "#jobNameInput" },
    { Action: "FILL_LOCATOR", Target: "#jobDescInput", Data: "แก้ไขเอกสาร NEXT CYCLE" },
    { Action: "FILL_LOCATOR", Target: "#docTypeSearch", Data: "W-9 FORM" },
    { Action: "CLICK_LOCATOR", Target: ".doc-checkbox >> nth=0" },

    { Action: "CLICK_LOCATOR", Target: "input[type='radio'][value='NEXT_CYCLE']", Data: "force" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_13_edit_next_cycle.png" },
    { Action: "CLICK_LOCATOR", Target: "#btnSubmitJob", Data: "force" },
    { Action: "WAIT_TIME", Target: "2000" },

    { Action: "CLICK_LOCATOR", Target: "#btn_document_request_automation", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "button[title='Edit Job']" },
    { Action: "CLICK_LOCATOR", Target: "button[title='Edit Job'] >> nth=0", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "#jobNameInput" },
    { Action: "WAIT_TIME", Target: "2000" },
    { Action: "CHECK_RESULT", Target: "radio_value|updateEffect=NEXT_CYCLE", Data: "pass" },
    { Action: "WAIT_TIME", Target: "1000" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_13_success.png" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 12. TC_UI_14: Cancel Job Request (Broker)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_14_JobCancellation": [
    { Action: "LOGIN_BROKER" },

    { Action: "CLICK_LOCATOR", Target: "#btn_document_request_automation", Data: "force" },

    { Action: "WAIT_SELECTOR", Target: "button[title='Delete Job']" },
    { Action: "CLICK_LOCATOR", Target: "button[title='Delete Job'] >> nth=0", Data: "force" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_14_cancel_modal.png" },
    { Action: "WAIT_SELECTOR", Target: "button.bg-red-600" },
    { Action: "CLICK_LOCATOR", Target: "button.bg-red-600", Data: "force" },

    { Action: "WAIT_TIME", Target: "1000" },
    { Action: "CHECK_RESULT", Target: "locator|#modalCancelJobConfirm", Data: "fail" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_14_success.png" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 13. TC_UI_15: View Job Process Status (Broker)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_15_JobProgress": [
    { Action: "LOGIN_BROKER" },
    { Action: "CLICK_LOCATOR", Target: "#btn_document_monitoring", Data: "force" },
    { Action: "CLICK_LOCATOR", Target: "button:has-text('Jun 2026')", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "#jobListSidebar" },
    { Action: "CLICK_LOCATOR", Target: "li.job-item:has-text('Active') >> nth=0", Data: "force" },
    { Action: "WAIT_TIME", Target: "1000" },
    { Action: "CHECK_RESULT", Target: "locator|#jobListSidebar", Data: "pass" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_15_progress.png" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 14. TC_UI_16: Customer Upload History (Customer)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_16_UploadHistory": [
    { Action: "LOGIN_CUSTOMER" },
    { Action: "CLICK_LOCATOR", Target: "#btn_doc_upload", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "#uploadTable" },
    { Action: "CHECK_RESULT", Target: "locator|li.doc-upload-item", Data: "pass" },

    { Action: "CLICK_LOCATOR", Target: "#btnOpenHistoryModal", Data: "force" },
    { Action: "WAIT_TIME", Target: "1000" },

    { Action: "FILL_LOCATOR", Target: "#historyStartDate", Data: "2026-06-01" },
    { Action: "FILL_LOCATOR", Target: "#historyEndDate", Data: "2026-06-30" },
    { Action: "CLICK_LOCATOR", Target: "#btnSearchHistory", Data: "force" },

    { Action: "WAIT_TIME", Target: "1000" },
    { Action: "CHECK_RESULT", Target: "locator|table#historyTable", Data: "pass" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_16_history_filtered.png" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 15. TC_UI_17: Near Due Highlight (Broker)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_17_NearDueHighlight": [
    { Action: "LOGIN_BROKER" },
    { Action: "CLICK_LOCATOR", Target: "#btn_document_monitoring", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "#jobListSidebar" },
    { Action: "CLICK_LOCATOR", Target: "li.job-item:has-text('Overdue') >> nth=0", Data: "force" },
    { Action: "WAIT_TIME", Target: "1500" },
    { Action: "CHECK_RESULT", Target: "locator|tr.sub-company-row.bg-red-50", Data: "pass" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_17_highlight.png" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 16. TC_UI_18: Upload File Types and Limit Size Validation (Customer)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_18_UploadLimits": [
    { Action: "LOGIN_CUSTOMER" },
    { Action: "CLICK_LOCATOR", Target: "#btn_doc_upload", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "#uploadTable" },
    { Action: "CHECK_RESULT", Target: "locator|li.doc-upload-item", Data: "pass" },

    { Action: "UPLOAD_LOCATOR", Target: ".file-upload-input >> nth=0", Data: "c:/works/Justkept/playwright_standard-master/playwright_standard-master/test-temp/dummy_test.txt" },
    { Action: "WAIT_TIME", Target: "1500" },
    { Action: "UPLOAD_LOCATOR", Target: ".file-upload-input >> nth=0", Data: "c:/works/Justkept/playwright_standard-master/playwright_standard-master/test-temp/large_pdf_file_too_large.pdf" },
    { Action: "WAIT_TIME", Target: "1500" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_18_validation.png" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 17. TC_UI_19: Approve Document (Broker)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_19_ApproveDocument": [
    { Action: "LOGIN_BROKER" },
    { Action: "CLICK_LOCATOR", Target: "#btn_document_monitoring", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "#jobListSidebar" },
    { Action: "CLICK_LOCATOR", Target: "li.job-item:has-text(' Uploaded') >> nth=0", Data: "force" },
    { Action: "WAIT_TIME", Target: "1500" },
    { Action: "CLICK_LOCATOR", Target: "#monitorTable td .btn-approve-doc >> nth=0", Data: "force" },
    { Action: "WAIT_TIME", Target: "1000" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_19_success.png" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 18. TC_UI_21: Overdue Blocker (Customer)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_21_OverdueBlocker": [
    { Action: "LOGIN_CUSTOMER" },
    { Action: "CLICK_LOCATOR", Target: "#btn_doc_upload", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "#uploadTable" },
    { Action: "WAIT_TIME", Target: "1000" },

    { Action: "CHECK_RESULT", Target: "locator|li.doc-upload-item span.overdue-badge", Data: "pass" },
    { Action: "CHECK_RESULT", Target: "locator|div.drag-drop-zone.disabled", Data: "pass" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_21_overdue.png" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 19. TC_UI_07: Toggle Switch Safeguard (Broker)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_07_ToggleSafeguard": [
    // API สำหรับปรับ/แก้ไข
    { Action: "ROUTE_MOCK", Target: "**/api/system/toggle*", Data: JSON.stringify({ document_request_automation_enabled: false }) },
    // API สำหรับตรวจสอบ/เรียกข้อมูล
    { Action: "ROUTE_MOCK", Target: "**/api/system/config*", Data: JSON.stringify({ document_request_automation_enabled: false }) },
    { Action: "LOGIN_BROKER" },
    { Action: "WAIT_TIME", Target: "3000" },
    { Action: "CHECK_RESULT", Target: "locator|#btn_document_monitoring", Data: "fail" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_07_toggle_off_broker.png" },
    { Action: "CLICK_LOCATOR", Target: "#btn_admin_settings", Data: "force" },
    { Action: "CLICK_LOCATOR", Target: "#btn_logout", Data: "force" },

    { Action: "LOGIN_CUSTOMER" },
    { Action: "WAIT_TIME", Target: "3000" },
    { Action: "CHECK_RESULT", Target: "locator|#btn_doc_upload", Data: "fail" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_07_toggle_off_customer.png" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 20. TC_UI_09: Dashboard Search (Broker)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_09_DashboardSearch": [
    { Action: "LOGIN_BROKER" },
    { Action: "CLICK_LOCATOR", Target: "#btn_document_request_automation", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "#input_search_job" },
    { Action: "FILL_LOCATOR", Target: "#input_search_job", Data: "รายงานภาษี" },
    { Action: "WAIT_TIME", Target: "1500" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_09_search_result.png" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 21. TC_UI_11: Conflict Resolution (Draft/Force Create)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_11_ConflictResolution": [
    { Action: "LOGIN_BROKER" },
    { Action: "ROUTE_MOCK", Target: "**/api/req-doc-process/create*", Data: "{\"status\": \"WARNING\", \"is_draft\": true, \"message\": \"Duplicate job found\"}" },
    { Action: "CLICK_LOCATOR", Target: "#btn_document_request_automation", Data: "force" },
    { Action: "CLICK_LOCATOR", Target: "#btn_create_job", Data: "force" },

    { Action: "WAIT_SELECTOR", Target: "#jobNameInput" },
    { Action: "FILL_LOCATOR", Target: "#jobNameInput", Data: "Test Duplicate Job" },
    { Action: "FILL_LOCATOR", Target: "#jobDescInput", Data: "Test Duplicate Job" },
    { Action: "FILL_LOCATOR", Target: "#docTypeSearch", Data: "TAX_REPORT_BUY" },
    { Action: "CLICK_LOCATOR", Target: ".doc-checkbox >> nth=0" },
    { Action: "FILL_LOCATOR", Target: "#input_date_end", Data: "31-Dec-2027 23:59" },
    { Action: "CLICK_LOCATOR", Target: "#btn_upload_frequency_monthly", Data: "force" },
    { Action: "CLICK_LOCATOR", Target: "#btn_monthly_preset_Custom", Data: "force" },
    { Action: "CLICK_LOCATOR", Target: "#isCrossMonthCheckbox", Data: "force" },
    { Action: "FILL_LOCATOR", Target: "#uploadStartDayInput", Data: "16" },
    { Action: "FILL_LOCATOR", Target: "#uploadEndDayInput", Data: "15" },
    { Action: "CLICK_LOCATOR", Target: "#allSubCompaniesCheckbox", Data: "force" },

    { Action: "CLICK_LOCATOR", Target: "#btnSubmitJob", Data: "force" },
    { Action: "WAIT_SELECTOR", Target: "#modalDuplicateWarning" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_11_conflict_warning.png" },
    { Action: "CLICK_LOCATOR", Target: "#btnSaveDraft", Data: "force" },
    { Action: "WAIT_TIME", Target: "1000" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_11_saved_draft.png" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 22. TC_UI_20: BOLA Safeguard (Customer)
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_UI_20_BOLASafeguard": [
    { Action: "GOTO", Target: `${BASE_URL}/doc-upload` },
    { Action: "WAIT_TIME", Target: "2000" },
    { Action: "CHECK_RESULT", Target: `${BASE_URL}/customer-login`, Data: "pass" },
    { Action: "SCREENSHOT", Target: "test-results/screenshots/TC_UI_20_redirected.png" }
  ]
};

// Let's first make sure dummy files exist so that Playwright can upload them.
const fs = require('fs');
const dir = path.join(__dirname, '..', '..', 'test-temp');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// 1. TXT for file type validation test
const dummyTxtPath = path.join(dir, 'dummy_test.txt');
fs.writeFileSync(dummyTxtPath, 'Dummy content for UI testing file type validation.');

// 2. 12MB PDF for file size validation test
const dummyLargePath = path.join(dir, 'large_pdf_file_too_large.pdf');
fs.writeFileSync(dummyLargePath, Buffer.alloc(12 * 1024 * 1024)); // 12MB file

// 3. 1.5MB PDF for successful upload test
const dummyPdfPath = path.join(dir, 'pdf_dummy_test.pdf');
const minimalPdf = `%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >>\nendobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \ntrailer\n<< /Size 4 /Root 1 0 R >>\nstartxref\n188\n%%EOF\n`;
const padding = Buffer.alloc(1.5 * 1024 * 1024, 'A'); // 1.5 MB of padding
fs.writeFileSync(dummyPdfPath, Buffer.concat([Buffer.from(minimalPdf), padding]));

// Ensure the isolated output UI directory exists
const outDir = path.dirname(outPath);
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

generateExcel(uiTestFlow, outPath);
console.log('✅ Generated UI Phase 2 Excel Test Cases successfully!');
