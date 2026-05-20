const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const outputDir = path.join(__dirname, '../data/api');
fs.mkdirSync(outputDir, { recursive: true });

const wb = xlsx.utils.book_new();


const getUsers = [
  { Step: 1, Action: 'SET_BASE_URL', Target: 'https://reqres.in', Data: '' },
  { Step: 2, Action: 'API_GET', Target: '/api/users?page=2', Data: '' },
  { Step: 3, Action: 'CHECK_STATUS', Target: '200', Data: 'pass' },
  { Step: 4, Action: 'CHECK_JSON', Target: 'page|2', Data: 'pass' },
  { Step: 5, Action: 'CHECK_JSON', Target: 'total|12', Data: 'pass' },
  { Step: 6, Action: 'LOG_RESPONSE', Target: '300', Data: '' },
];

const loginFlow = [
  { Step: 1, Action: 'SET_BASE_URL', Target: 'https://reqres.in', Data: '' },
  { Step: 2, Action: 'SET_HEADER', Target: 'Content-Type', Data: 'application/json' },
  { Step: 3, Action: 'API_POST', Target: '/api/login', Data: '{"email":"eve.holt@reqres.in","password":"cityslicka"}' },
  { Step: 4, Action: 'CHECK_STATUS', Target: '200', Data: 'pass' },
  { Step: 5, Action: 'STORE_JSON', Target: 'token', Data: 'AUTH_TOKEN' },
  { Step: 6, Action: 'SET_HEADER', Target: 'Authorization', Data: 'Bearer {{AUTH_TOKEN}}' },
  { Step: 7, Action: 'API_GET', Target: '/api/users/2', Data: '' },
  { Step: 8, Action: 'CHECK_STATUS', Target: '200', Data: 'pass' },
  { Step: 9, Action: 'CHECK_JSON', Target: 'data.first_name|Janet', Data: 'pass' },
  { Step: 10, Action: 'LOG_RESPONSE', Target: '500', Data: '' },
];


const createUser = [
  { Step: 1, Action: 'SET_BASE_URL', Target: 'https://reqres.in', Data: '' },
  { Step: 2, Action: 'SET_HEADER', Target: 'Content-Type', Data: 'application/json' },
  { Step: 3, Action: 'API_POST', Target: '/api/users', Data: '{"name":"${name}","job":"${job}"}' },
  { Step: 4, Action: 'CHECK_STATUS', Target: '201', Data: 'pass' },
  { Step: 5, Action: 'CHECK_BODY', Target: '"name":"${name}"', Data: 'pass' },
];

const createUserData = [
  { name: 'Alice', job: 'Developer' },
  { name: 'Bob', job: 'Designer' },
  { name: 'Carol', job: 'Manager' },
];

xlsx.utils.book_append_sheet(wb, xlsx.utils.json_to_sheet(getUsers), 'Get_Users');
xlsx.utils.book_append_sheet(wb, xlsx.utils.json_to_sheet(loginFlow), 'Login_Flow');
xlsx.utils.book_append_sheet(wb, xlsx.utils.json_to_sheet(createUser), 'Create_User');
xlsx.utils.book_append_sheet(wb, xlsx.utils.json_to_sheet(createUserData), 'Create_User_Data');

const outputPath = path.join(outputDir, 'api_test_cases.xlsx');
xlsx.writeFile(wb, outputPath);

console.log(`\n✅ Sample API Excel created: ${outputPath}`);
console.log('   Sheets: Get_Users, Login_Flow, Create_User (+ Create_User_Data)');
console.log('\nFor run :');
console.log('  npx playwright test test/sa_api_driven.spec.js\n');
