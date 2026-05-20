const path = require('path');
const { generateExcel } = require('../../test/utils/excelGenerator');

const outputFile = path.join(__dirname, 'test_cases.xlsx');


const data = {
  // TC11_Login_From_Spec
  'Login_From_Spec': [
    { Action: 'GOTO', Target: '', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|Username', Data: '${username}' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|Password', Data: '${password}' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_ROLE', Target: 'button|เข้าสู่ระบบ', Data: 'force' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    // { Action: 'SCREENSHOT', Target: 'test-results/prprocess/tc11_login_spec_${username}.png', Data: 'full' },
    { Action: 'CHECK_RESULT', Target: '${check_result}', Data: '${result}' },
  ],
  'Login_From_Spec_Data': [
    { username: 'arndee', password: 'A2d@test', check_result: 'url|/renewals', result: 'pass' },
    { username: 'tso', password: 'wrongpassword', check_result: 'url|/renewals', result: 'fail' },
  ],
  'Renewals_Filter_Date_Spec': [
    { Action: 'GOTO', Target: '', Data: '' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|Username', Data: '${username}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_ROLE', Target: 'textbox|Password', Data: '${password}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_ROLE', Target: 'button|เข้าสู่ระบบ', Data: 'force' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },

    // renewals
    { Action: 'CLICK_ROLE', Target: 'button|ยอดต่ออายุ', Data: 'force' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_ROLE', Target: 'button|${filter_value}', Data: 'force' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
  ],
  'Renewals_Filter_Date_Spec_Data': [
    { username: 'arndee', password: 'A2d@test', filter_value: 'เดือนที่ผ่านมา' },
    { username: 'arndee', password: 'A2d@test', filter_value: 'เดือนนี้' },
    { username: 'arndee', password: 'A2d@test', filter_value: 'ตั้งแต่ต้นปี' },
  ],
};

generateExcel(data, outputFile);

