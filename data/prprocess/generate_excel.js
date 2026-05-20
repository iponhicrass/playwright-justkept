const path = require('path');
const { generateExcel } = require('../../test/utils/excelGenerator');

const outputFile = path.join(__dirname, 'test_cases.xlsx');


const data = {
  // TC11_Login_From_Spec
  'TC11_Login_From_Spec': [
    { Action: 'GOTO', Target: '/dev/prprocess-service', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|login_tf_username', Data: '${username}' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|login_tf_password', Data: '${password}' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ROLE', Target: 'button|login_btn_login', Data: 'force' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'SCREENSHOT', Target: 'test-results/prprocess/tc11_login_spec_${username}.png', Data: 'full' },
    { Action: 'CHECK_RESULT', Target: '${check_result}', Data: '${result}' },
  ],
  'TC11_Login_From_Spec_Data': [
    { username: 'admin', password: '1', check_result: 'url|/dev/prprocess-service/manage_pr/worklist', result: 'pass' },
    { username: 'testuser', password: 'wrongpassword', check_result: 'url|/dev/prprocess-service/manage_pr/worklist', result: 'pass' },
  ],

  // CreateRequestInternal
  'CreateRequestInternal': [
    { Action: 'GOTO', Target: '/dev/prprocess-service/login', Data: '' },
    { Action: 'WAIT_TIME', Target: '3000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|login_tf_username', Data: '${username}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|login_tf_password', Data: '${password}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_ROLE', Target: 'button|login_btn_login', Data: 'force' },
    { Action: 'WAIT_TIME', Target: '5000', Data: '' },

    { Action: 'CLICK_FLT', Target: '${site}_b2b_case_list', Data: 'force' },
    { Action: 'WAIT_TIME', Target: '3000', Data: '' },
    { Action: 'CLICK_FLT', Target: 'worklist_btn_create', Data: 'force' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },

    { Action: 'FILL_ROLE', Target: 'textbox|case_info_tf_supplier_no', Data: '${supplier_no}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|case_info_tf_supplier_name', Data: '${supplier_name}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|case_info_tf_contact_name', Data: '${contact_name}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|case_info_tf_tel', Data: '${tel}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|case_info_tf_tel2', Data: '${tel2}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },

    { Action: 'PICK_DATETIME', Target: 'case_info_dp_call_start_time', Data: '${time_start}' },
    { Action: 'PICK_DATETIME', Target: 'case_info_dp_call_end_time', Data: '${time_end}' },

    { Action: 'FILL_ROLE', Target: 'textbox|case_info_tf_email', Data: '${email}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|case_info_tf_email_cc', Data: '${email_cc}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },

    { Action: 'SCROLL', Target: '', Data: '600' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },

    { Action: 'SELECT_ROBOT', Target: 'case_info_dd_problem', Data: '${problem}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|case_info_ta_description', Data: '${description}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },

    { Action: 'SCROLL', Target: '', Data: '500' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },

    { Action: 'SELECT_ROBOT', Target: 'case_info_dd_root_cause', Data: '${root_cause}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'SELECT_ROBOT', Target: 'case_info_dd_sub_root_cause', Data: '${sub_root_cause}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'SELECT_ROBOT', Target: 'case_info_dd_solution_template', Data: '${solution_template}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'SCROLL', Target: '', Data: '700' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|case_info_ta_solution', Data: '${solution}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|case_info_ta_remark', Data: '${remark}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },

    { Action: 'SCROLL', Target: '', Data: '900' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },

    { Action: 'SELECT_ROBOT', Target: 'case_info_dd_status', Data: '${status}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },

    { Action: 'CLICK_ROLE', Target: 'checkbox|case_info_cb_send_mail', Data: 'force' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_ROLE', Target: 'checkbox|case_info_cb_send_mail', Data: 'force' },

    // alert submit
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_ROLE', Target: 'button|Submit', Data: 'force' },
    { Action: 'WAIT_TIME', Target: '4000', Data: '' },

    // chekc result
    { Action: 'CHECK_RESULT', Target: '${check_result}', Data: '${result}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },

    { Action: 'CLICK_ROLE', Target: 'button|OK', Data: 'force' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' }
  ],
  'CreateRequestInternal_Data': [
    {
      site: 'makro',
      username: 'admin',
      password: '1',
      supplier_no: '1234',
      supplier_name: 'makro',
      contact_name: 'fdsfsd',
      tel: '0815450501',
      tel2: '1',
      time_start: 'Wed, 01 April 2026|10:00',
      time_end: 'Wed, 01 April 2026|10:05',
      email: 't@gmail.com',
      email_cc: 'tt@gmail.com',
      problem: 'เข้าระบบไม่ได้/ login',
      description: 'trsr',
      root_cause: 'Human Error',
      sub_root_cause: 'Aging Summary',
      solution_template: 'Forget Password',
      solution: 'test solution',
      remark: 'test',
      status: 'Receive',
      check_result: 'text|Success',
      result: 'pass'
    },
    {
      site: 'lotus',
      username: 'admin',
      password: '1',
      supplier_no: '1234',
      supplier_name: 'lotus',
      contact_name: 'lotus',
      tel: '0815450501',
      tel2: '1',
      time_start: 'Wed, 01 April 2026|10:00',
      time_end: 'Wed, 01 April 2026|10:05',
      email: 't@gmail.com',
      email_cc: 'tt@gmail.com',
      problem: 'เข้าระบบไม่ได้/ login',
      description: 'trsr',
      root_cause: 'Human Error',
      sub_root_cause: 'Aging Summary',
      solution_template: 'Forget Password',
      solution: 'test solution',
      remark: 'test',
      status: 'Receive',
      check_result: 'text|Success',
      result: 'pass'
    }
  ],
  'Search': [
    { Action: 'GOTO', Target: '/dev/prprocess-service/login', Data: '' },
    { Action: 'WAIT_TIME', Target: '3000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|login_tf_username', Data: '${username}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|login_tf_password', Data: '${password}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_ROLE', Target: 'button|login_btn_login', Data: 'force' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_FLT', Target: '${site}_b2b_case_list', Data: 'force' },
    { Action: 'WAIT_TIME', Target: '3000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|worklist_tf_search', Data: '${search}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'PICK_DATETIME_RANGE', Target: 'worklist_dp_date', Data: '${time_start}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
  ],
  'Search_Data': [
    {
      site: 'makro',
      username: 'admin',
      password: '1',
      search: '0815450501',
      time_start: 'Wed, 01 April 2026,Wed, 01 April 2026'
    },
    {
      site: 'lotus',
      username: 'admin',
      password: '1',
      search: 'preem',
      time_start: 'Wed, 01 April 2026,Wed, 01 April 2026'
    }
  ],

  'CreateFormExternal': [
    { Action: 'GOTO', Target: '${path}', Data: '' },
    { Action: 'WAIT_TIME', Target: '3000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|form_field_email', Data: '${email}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|form_field_emailcc', Data: '${email_cc}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|form_field_supplierNo', Data: '${supplier_no}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|form_field_supplierName', Data: '${supplier_name}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|form_field_issuer', Data: '${issuer}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|form_field_tel1', Data: '${tel1}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|form_field_tel2', Data: '${tel2}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },

    { Action: 'SCROLL', Target: '', Data: '500' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },

    { Action: 'SELECT_ROBOT', Target: 'form_field_problemTitle', Data: '${problem}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|form_field_description', Data: '${description}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },

    { Action: 'UPLOAD_FILE', Target: 'form_field_attachFile', Data: '${file_path}' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },

    { Action: 'SCROLL', Target: '', Data: '300' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'BYPASS_TURNSTILE', Target: '', Data: '2' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },

    { Action: 'CLICK_LOCATOR', Target: 'flutter-view', Data: 'force' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },

    { Action: 'CLICK_ROLE', Target: 'button|form_btn_submit', Data: 'force' },
    { Action: 'WAIT_TIME', Target: '4000', Data: '' },

    { Action: 'CHECK_RESULT', Target: '${check_result}', Data: '${result}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },

  ],
  'CreateFormExternal_Data': [
    {
      path: "/dev/prprocess/form",
      email: 'thanit_boo@gmail.com',
      email_cc: 'tcc@gmail.com',
      supplier_no: '1234',
      supplier_name: 'playwright',
      issuer: 'ss_playwright',
      tel1: '0815450502',
      tel2: '3',
      problem: 'เข้าระบบไม่ได้/ login',
      description: 'test playwright',
      file_path: 'data/prprocess/sample_image.png', // Updated path
      check_result: 'url|/dev/prprocess/form/resource',
      result: 'pass'
    },
    {
      path: "/dev/lotus/prprocess/form",
      email: 'thanit_boo@gmail.com',
      email_cc: 'tcc@gmail.com',
      supplier_no: '1234',
      supplier_name: 'playwright-lotus',
      issuer: 'lotus_playwright',
      tel1: '0815450502',
      tel2: '3',
      problem: 'เข้าระบบไม่ได้/ login',
      description: 'test playwright',
      file_path: 'data/prprocess/sample_image.png', // Updated path
      check_result: 'url|/dev/lotus/prprocess/form/resource',
      result: 'pass'
    }
  ]
};

generateExcel(data, outputFile);

