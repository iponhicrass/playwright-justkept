const path = require('path');
const { generateExcel } = require('../../test/utils/excelGenerator');

const outputFile = path.join(__dirname, 'test_cases.xlsx');


const data = {
  // TC11_Login_From_Spec
  'Login_From_Spec': [
    { Action: 'GOTO', Target: 'auth/login', Data: '' },
    { Action: 'WAIT_TIME', Target: '3000', Data: '' },
    { Action: 'FILL_LOCATOR', Target: '#input-v-0-1', Data: '${username}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_LOCATOR', Target: '#input-v-0-4', Data: '${password}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_TEXT_ROLE', Target: 'button|Sign In', Data: 'force' },
    { Action: 'WAIT_TIME', Target: '10000', Data: '' },
    { Action: 'CHECK_RESULT', Target: '${check_result}', Data: '${result}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
  ],
  'Login_From_Spec_Data': [
    { username: 'twc', password: '1', check_result: 'url|/home', result: 'pass' },
    { username: 'tso@freewill.com', password: 'tso', check_result: 'url|/home', result: 'pass' },
  ],

};

generateExcel(data, outputFile);

