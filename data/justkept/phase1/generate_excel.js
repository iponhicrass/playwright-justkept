const path = require('path');
const { generateExcel } = require('../../test/utils/excelGenerator');

const outputFile = path.join(__dirname, `test_cases_06_req_report_no_file.xlsx`);

const tc_01_self_login = {
  'Self_login': [

    // Login
    { Action: 'GOTO', Target: '/login', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|username', Data: '${username}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|pwd', Data: '${password}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_TEXT_ROLE', Target: 'button|Sign In', Data: 'force' },

    { Action: 'WAIT_TIME', Target: '5000', Data: '' },

    { Action: 'SCREENSHOT', Target: 'test-results/justkept/tc01_self_login_${username}_${description}.png', Data: 'full' },
    { Action: 'CHECK_RESULT', Target: '${check_result}', Data: '${result}' },
  ],
  'Self_login_Data': [
    { username: 'user1@mail.com', password: '1', check_result: 'url|/admin/dashboard', result: 'pass', description: 'valid_password' },
    { username: 'user1@mail.com', password: '123', check_result: 'url|/login', result: 'pass', description: 'invalid_password' },
    { username: 'user2@mail.com', password: '1', check_result: 'url|/reports', result: 'pass', description: 'valid_password' },
    { username: 'user2@mail.com', password: '123', check_result: 'url|/login', result: 'pass', description: 'invalid_password' },
  ],
};

const tc_02_broker_save_draft = {
  'Broker_Save_Draft': [

    // Login
    { Action: 'GOTO', Target: '/login', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|username', Data: '${username}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|pwd', Data: '${password}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_TEXT_ROLE', Target: 'button|Sign In', Data: 'force' },

    { Action: 'WAIT_TIME', Target: '2000', Data: '' },

    { Action: 'CLICK_ID', Target: 'btn_upload_document', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_filter_status', Data: 'Pending' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'WAIT_SELECTOR', Target: 'tr:has-text("วิภา พึ่งสมัคร") >> #btn_fulfill_0', Data: '' },
    { Action: 'CLICK_LOCATOR', Target: 'tr:has-text("วิภา พึ่งสมัคร") >> #btn_fulfill_0', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_subject_line', Data: 'Summary Statement' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_email_template', Data: 'Monthly Statement Available' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_email_template', Data: 'Custom (Blank Canvas)' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_message_body', Data: '...' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_save_draft', Data: '' },
    { Action: 'WAIT_TIME', Target: '3000', Data: '' },
    { Action: 'CHECK_RESULT', Target: 'text|บันทึก Draft แล้ว', Data: 'pass' },
    { Action: 'SCREENSHOT', Target: 'test-results/justkept/tc02_save_draft_${username}_${description}_fullfill_form.png' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_upload_document', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_filter_status', Data: 'Pending' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'WAIT_SELECTOR', Target: '[title="Draft saved"]', Data: '' },
    { Action: 'CHECK_RESULT', Target: 'tr:has-text("วิภา พึ่งสมัคร") >> span[title="Draft saved"]', Data: 'pass' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'SCREENSHOT', Target: 'test-results/justkept/tc02_save_draft_${username}_${description}_upload_page.png' },
    { Action: 'WAIT_SELECTOR', Target: 'tr:has-text("วิภา พึ่งสมัคร") >> #btn_fulfill_0', Data: '' },
    { Action: 'CLICK_LOCATOR', Target: 'tr:has-text("วิภา พึ่งสมัคร") >> #btn_fulfill_0', Data: '' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CHECK_RESULT', Target: 'text|กำลังแก้ไข Draft', Data: 'pass' },

    { Action: 'WAIT_TIME', Target: '5000', Data: '' },

  ],
  'Broker_Save_Draft_Data': [
    { username: 'user1@mail.com', password: '1', check_result: 'url|/admin/dashboard', result: 'pass', description: 'save_draft' },
  ],
};

const tc_03_broker_fulfill = {
  'Broker_Fullfill': [

    // Login
    { Action: 'GOTO', Target: '/login', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|username', Data: '${username}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|pwd', Data: '${password}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_TEXT_ROLE', Target: 'button|Sign In', Data: 'force' },

    { Action: 'WAIT_TIME', Target: '2000', Data: '' },

    { Action: 'CLICK_ID', Target: 'btn_upload_document', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_filter_status', Data: 'Pending' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_search_by_requestor', Data: 'วิภา พึ่งสมัคร' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'WAIT_SELECTOR', Target: 'tr:has-text("วิภา พึ่งสมัคร") >> #btn_fulfill_0', Data: '' },
    { Action: 'CLICK_LOCATOR', Target: 'tr:has-text("วิภา พึ่งสมัคร") >> #btn_fulfill_0', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_subject_line', Data: 'Summary Statement' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_email_template', Data: 'Monthly Statement Available' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_email_template', Data: 'Custom (Blank Canvas)' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_message_body', Data: '...' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },

    { Action: 'UPLOAD_LOCATOR', Target: '#input_file', Data: '${file}' },

    { Action: 'WAIT_TIME', Target: '10000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_submit', Data: '' },
    { Action: 'SCREENSHOT', Target: 'test-results/justkept/tc03_fullfill_${username}_${description}.png' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },

    { Action: 'CLICK_ID', Target: 'btn_upload_document', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_search_by_requestor', Data: 'วิภา พึ่งสมัคร' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_filter_status', Data: 'Completed' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'WAIT_SELECTOR', Target: 'tr:has-text("วิภา พึ่งสมัคร"):has-text("Completed")', Data: '' },

    { Action: 'WAIT_TIME', Target: '5000', Data: '' },

  ],
  'Broker_Fullfill_Data': [
    { username: 'user1@mail.com', password: '1', check_result: 'url|/admin/dashboard', result: 'pass', description: 'fullfill', file: 'data/justkept/รายการที่ต้องปรับ ID - Broker.pdf' },
  ],
};

const tc_04_broker_customer_report = {
  'Broker_CustomerReport': [

    // Login
    { Action: 'GOTO', Target: '/login', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|username', Data: '${username}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|pwd', Data: '${password}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_TEXT_ROLE', Target: 'button|Sign In', Data: 'force' },

    { Action: 'WAIT_TIME', Target: '2000', Data: '' },

    { Action: 'CLICK_ID', Target: 'btn_customer_report', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    // { Action: 'FILL_ROLE', Target: 'textbox|input_id_number', Data: '' },
    // { Action: 'WAIT_TIME', Target: '2000', Data: '' },

    { Action: 'WAIT_SELECTOR', Target: 'tr:has-text("วิภา พึ่งสมัคร")', Data: '' },
    { Action: 'CLICK_LOCATOR', Target: 'tr:has-text("วิภา พึ่งสมัคร") >> button:has-text("Log")', Data: '' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'SCREENSHOT', Target: 'test-results/justkept/tc04_${username}_${description}_viewlog.png' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_customer_report', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'WAIT_SELECTOR', Target: 'tr:has-text("วิภา พึ่งสมัคร")', Data: '' },
    { Action: 'CLICK_LOCATOR', Target: 'tr:has-text("วิภา พึ่งสมัคร") >> button:has-text("View As")', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_as_request', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_as_request_report', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CHECK_RESULT', Target: 'text|ไม่สามารถขอเอกสารได้ในโหมด View as Customer', Data: 'pass' },
    { Action: 'SCREENSHOT', Target: 'test-results/justkept/tc04_${username}_${description}_viewascustomer.png' },

    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_noti', Data: '' },
    { Action: 'SCREENSHOT', Target: 'test-results/justkept/tc04_${username}_${description}_viewNoti.png' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_filter', Data: '' },
    { Action: 'SCREENSHOT', Target: 'test-results/justkept/tc04_${username}_${description}_filter.png' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_return_to_admin', Data: '' },

    { Action: 'WAIT_TIME', Target: '5000', Data: '' },

  ],
  'Broker_CustomerReport_Data': [
    { username: 'user1@mail.com', password: '1', check_result: 'url|/admin/dashboard', result: 'pass', description: 'customer_report' },
  ],
};

const tc_05_customer_view = {
  'Customer_View': [

    // Login
    { Action: 'GOTO', Target: '/login', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|username', Data: '${username}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|pwd', Data: '${password}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_TEXT_ROLE', Target: 'button|Sign In', Data: 'force' },

    { Action: 'WAIT_TIME', Target: '2000', Data: '' },

    { Action: 'CLICK_ID', Target: 'btn_customer_onboarding_kit', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_as_request', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_all_report', Data: '' },
    { Action: 'SCREENSHOT', Target: 'test-results/justkept/tc04_${username}_${description}_viewNoti.png' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_filter', Data: '' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_quick_selection_last_1_month', Data: '' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_quick_selection_last_3_month', Data: '' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_quick_selection_last_6_month', Data: '' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_clear_filter', Data: '' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_find_report', Data: 'kpr' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_LOCATOR', Target: '[aria-label="View KPR702_EN_20260410_9876543210987_.pdf"]' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_find_report', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_noti', Data: '' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },

    { Action: 'WAIT_TIME', Target: '5000', Data: '' },

  ],
  'Customer_View_Data': [
    { username: 'user2@mail.com', password: '1', check_result: 'url|/admin/dashboard', result: 'pass', description: 'customer_view' },
  ],
};

const tc_06_customer_req_report_file_exists = {
  'Customer_file_exists': [

    // Login
    { Action: 'GOTO', Target: '/login', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|username', Data: '${username}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|pwd', Data: '${password}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_TEXT_ROLE', Target: 'button|Sign In', Data: 'force' },

    { Action: 'WAIT_TIME', Target: '2000', Data: '' },

    { Action: 'CLICK_ID', Target: 'btn_as_request', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_as_request_report', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_request_topic', Data: 'Stitch' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_request_topic', Data: 'Stitch Good new Row' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_detail', Data: 'This is Case for export file exists' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'UPLOAD_LOCATOR', Target: '#input_requiredFiles', Data: '${file}' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_submit', Data: '' },
    { Action: 'WAIT_TIME', Target: '6000', Data: '' },
    { Action: 'CHECK_RESULT', Target: 'text|ส่งคำขอสำเร็จ', Data: 'pass' },
    { Action: 'SCREENSHOT', Target: 'test-results/justkept/tc06_file_exists_${username}_${description}_alertbox.png', Data: 'full' },
    { Action: 'CLICK_TEXT_ROLE', Target: 'button|รับทราบ', Data: 'force' },
    { Action: 'CHECK_RESULT', Target: 'text|รายการที่ต้องปรับ ID - Broker.pdf', Data: 'pass' },
    { Action: 'SCREENSHOT', Target: 'test-results/justkept/tc06_file_exists_${username}_${description}.png', Data: 'full' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_noti', Data: '' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CHECK_RESULT', Target: 'text|รายการคำขอเอกสารสำเร็จ', Data: 'pass' },
    { Action: 'SCREENSHOT', Target: 'test-results/justkept/tc06_file_exists_${username}_${description}_noti.png', Data: 'full' },
    // { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    // { Action: 'CLICK_LOCATOR', Target: '[aria-label="View รายการที่ต้องปรับ ID - Broker.pdf"]' },
    // { Action: 'SCREENSHOT', Target: 'test-results/justkept/tc06_file_exists_${username}_${description}_view_pdf.png', Data: 'full' },

    { Action: 'WAIT_TIME', Target: '5000', Data: '' }

  ],
  'Customer_file_exists_Data': [
    { username: 'user2@mail.com', password: '1', check_result: 'url|/admin/dashboard', result: 'pass', description: 'customer_req_report_file_exists', file: 'data/justkept/รายการที่ต้องปรับ ID - Broker.pdf' },
  ],
};

const tc_06_customer_req_report_no_file = {
  'Customer_no_file': [

    // Login
    { Action: 'GOTO', Target: '/login', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|username', Data: '${username}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|pwd', Data: '${password}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_TEXT_ROLE', Target: 'button|Sign In', Data: 'force' },

    { Action: 'WAIT_TIME', Target: '2000', Data: '' },

    { Action: 'CLICK_ID', Target: 'btn_as_request', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_as_request_report', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_year', Data: '2024' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_date_start', Data: '01-May-2024' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_date_end', Data: '01-May-2024' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_detail', Data: 'This is Case for export no file' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'UPLOAD_LOCATOR', Target: '#input_requiredFiles', Data: '${file}' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_submit', Data: '' },
    { Action: 'WAIT_TIME', Target: '6000', Data: '' },
    { Action: 'CHECK_RESULT', Target: 'text|กำลังดำเนินการ', Data: 'pass' },
    { Action: 'SCREENSHOT', Target: 'test-results/justkept/tc06_no_file_${username}_${description}_alertbox.png', Data: 'full' },
    { Action: 'CLICK_TEXT_ROLE', Target: 'button|รับทราบ', Data: 'force' },
    { Action: 'CHECK_RESULT', Target: 'text|รายการที่ต้องปรับ ID - Broker.pdf', Data: 'pass' },
    { Action: 'SCREENSHOT', Target: 'test-results/justkept/tc06_no_file_${username}_${description}.png', Data: 'full' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_noti', Data: '' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CHECK_RESULT', Target: 'text|รายการคำขอเอกสารสำเร็จ', Data: 'pass' },
    { Action: 'SCREENSHOT', Target: 'test-results/justkept/tc06_no_file_${username}_${description}_noti.png', Data: 'full' },

    { Action: 'WAIT_TIME', Target: '5000', Data: '' }

  ],
  'Customer_no_file_Data': [
    { username: 'user2@mail.com', password: '1', check_result: 'url|/admin/dashboard', result: 'pass', description: 'customer_req_report_no_file', file: 'data/justkept/รายการที่ต้องปรับ ID - Broker.pdf' },
  ],
};

const tc_06_customer_req_report_other_form = {
  'Customer_other_form': [

    // Login
    { Action: 'GOTO', Target: '/login', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|username', Data: '${username}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|pwd', Data: '${password}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_TEXT_ROLE', Target: 'button|Sign In', Data: 'force' },

    { Action: 'WAIT_TIME', Target: '2000', Data: '' },

    { Action: 'CLICK_ID', Target: 'btn_as_request', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_as_request_report', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_year', Data: '2025' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_date_start', Data: '01-May-2024' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_date_end', Data: '01-May-2024' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|input_detail', Data: 'This is Case for export no file' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'UPLOAD_LOCATOR', Target: '#input_requiredFiles', Data: '${file}' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_submit', Data: '' },
    { Action: 'WAIT_TIME', Target: '6000', Data: '' },
    { Action: 'CHECK_RESULT', Target: 'text|กำลังดำเนินการ', Data: 'pass' },
    { Action: 'SCREENSHOT', Target: 'test-results/justkept/tc06_other_form_${username}_${description}_alertbox.png', Data: 'full' },
    { Action: 'CLICK_TEXT_ROLE', Target: 'button|รับทราบ', Data: 'force' },
    { Action: 'CHECK_RESULT', Target: 'text|รายการที่ต้องปรับ ID - Broker.pdf', Data: 'pass' },
    { Action: 'SCREENSHOT', Target: 'test-results/justkept/tc06_notc06_other_form__file_${username}_${description}.png', Data: 'full' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ID', Target: 'btn_noti', Data: '' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CHECK_RESULT', Target: 'text|รายการคำขอเอกสารสำเร็จ', Data: 'pass' },
    { Action: 'SCREENSHOT', Target: 'test-results/justkept/tc06_other_form_${username}_${description}_noti.png', Data: 'full' },

    { Action: 'WAIT_TIME', Target: '5000', Data: '' }

  ],
  'Customer_other_form_Data': [
    { username: 'user2@mail.com', password: '1', check_result: 'url|/admin/dashboard', result: 'pass', description: 'customer_req_report_other_form', file: 'data/justkept/รายการที่ต้องปรับ ID - Broker.pdf' },
  ],
};

generateExcel(tc_06_customer_req_report_no_file, outputFile);

