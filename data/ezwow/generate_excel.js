const path = require('path');
const { generateExcel } = require('../../test/utils/excelGenerator');

const outputFile = path.join(__dirname, 'test_cases.xlsx');


const data = {
  // TC11_Login_From_Spec
  'Login_From_Spec': [
    { Action: 'GOTO', Target: 'ezwow-gateway/pages/login', Data: '' },
    { Action: 'WAIT_TIME', Target: '3000', Data: '' },
    { Action: 'FILL_LOCATOR', Target: '#companyCode', Data: '${company_code}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_LOCATOR', Target: '#username', Data: '${username}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'FILL_LOCATOR', Target: '#password', Data: '${password}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
    { Action: 'CLICK_TEXT_ROLE', Target: 'button|เข้าสู่ระบบ', Data: 'force' },
    { Action: 'WAIT_TIME', Target: '10000', Data: '' },
    { Action: 'CHECK_RESULT', Target: '${check_result}', Data: '${result}' },
    { Action: 'WAIT_TIME', Target: '1000', Data: '' },
  ],
  'Login_From_Spec_Data': [
    { company_code: 'FWG-DEV', username: 'twc', password: '1', check_result: 'url|/ezwow-fwg/', result: 'pass' },
    { company_code: 'FWG-DEV', username: 'twc', password: '2', check_result: 'url|/ezwow-fwg/', result: 'pass' },
  ],

};

generateExcel(data, outputFile);

