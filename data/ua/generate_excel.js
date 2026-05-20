const path = require('path');
const { generateExcel } = require('../../test/utils/excelGenerator');

const outputFile = path.join(__dirname, 'test_cases.xlsx');


const data = {
  // TC11_Login_From_Spec
  'Login_From_Spec': [
    { Action: 'GOTO', Target: '', Data: '' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_LOCATOR', Target: '#username', Data: '${username}' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'FILL_LOCATOR', Target: '#password', Data: '${password}' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
    { Action: 'CLICK_TEXT_ROLE', Target: 'button|Login', Data: 'force' },
    { Action: 'WAIT_TIME', Target: '5000', Data: '' },
    { Action: 'CHECK_RESULT', Target: '${check_result}', Data: '${result}' },
    { Action: 'WAIT_TIME', Target: '2000', Data: '' },
  ],
  'Login_From_Spec_Data': [
    { username: 'uadev', password: 'ua@dev', check_result: 'url|/home', result: 'pass' },
    { username: 'tso', password: 'wrongpassword', check_result: 'url|/home', result: 'fail' },
  ],
};

generateExcel(data, outputFile);

