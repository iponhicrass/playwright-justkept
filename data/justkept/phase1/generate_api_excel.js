const path = require('path');
const { generateExcel } = require('../../test/utils/excelGenerator');

// =============================================================================
// 📌 วิธีใช้งานไฟล์นี้:
//   1. กำหนด BASE_URL ด้านล่างให้ถูกต้อง (Dev / UAT / Prod)
//   2. รันคำสั่ง: node data/JustKept/generate_api_excel.js
//   3. ไฟล์ Excel จะถูกสร้างที่: data/JustKept/api/justkept_api_test_cases.xlsx
//   4. รัน Test: npx playwright test test/sa_api_driven.spec.js --project=chromium
// npx playwright test test/sa_api_driven.spec.js
// =============================================================================

// ✏️ [TODO] เปลี่ยน URL ให้ตรงกับ Environment ที่ต้องการทดสอบ
// const BASE_URL = 'https://d24s92ppm4un04.cloudfront.net';
const BASE_URL = 'justkept-dev.freewillsolutions.com';
const outPath = path.join(__dirname, 'api', 'justkept_api_test_cases.xlsx');

// =============================================================================
// 📖 คำอธิบาย Keyword ที่ใช้ใน Excel:
//
//   SET_BASE_URL  | URL              |           → กำหนด Base URL
//   SET_HEADER    | Key              | Value     → กำหนด HTTP Header
//   API_POST      | /path            | {body}    → ยิง HTTP POST
//   API_GET       | /path            |           → ยิง HTTP GET
//   CHECK_STATUS  | 200              | pass      → เช็ค Status Code
//   CHECK_JSON    | jsonPath|value   | pass      → เช็คค่าใน JSON
//   CHECK_BODY    | keyword          | pass      → เช็คว่า Body มีข้อความนี้
//   STORE_JSON    | jsonPath         | VAR_NAME  → เก็บค่าจาก JSON ลงตัวแปร
//   LOG_RESPONSE  |                  |           → Print Response ออก Console
//   SET_VAR       | VAR_NAME         | value     → กำหนดตัวแปรเอง
//
//   ✨ การใช้ตัวแปร: ใช้ {{VAR_NAME}} ใน Target หรือ Data field
// =============================================================================

const apiTestFlow = {

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 1: Login_Flow
  // วัตถุประสงค์: Login เพื่อดึง accessToken มาเก็บไว้ใช้ใน Sheet อื่น
  //
  // ⚠️ หมายเหตุ: Postman ใช้ Script "postman.setEnvironmentVariable" เพื่อเก็บ token
  //   ใน Playwright เราใช้ STORE_JSON แทน
  // ═══════════════════════════════════════════════════════════════════════════
  "Login_Flow": [
    // Step 1: กำหนด Base URL
    { Action: "SET_BASE_URL", Target: BASE_URL },

    // Step 2: กำหนด Header พื้นฐาน
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },

    // Step 3: ยิง Login API
    //   Postman body: { "username": "user1@mail.com", "pwd": "1" }
    //   ✏️ [TODO] เปลี่ยน username/pwd ให้ตรงกับ test account จริง
    { Action: "API_POST", Target: "/api/auth/local/login", Data: '{"username":"user1@mail.com","pwd":"1"}' },

    // Step 4: Log ดูผลลัพธ์ (ตัด Output ที่ 500 ตัวอักษร)
    { Action: "LOG_RESPONSE", Target: "500" },

    // Step 5: ตรวจสอบ Status Code ว่าได้ 200
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },

    // Step 6: ตรวจสอบว่า Response มี accessToken อยู่
    //   ✏️ [TODO] ปรับ JSON path ให้ตรงกับ response จริงของ API
    { Action: "CHECK_BODY", Target: "accessToken", Data: "pass" },

    // Step 7: เก็บ accessToken ลงตัวแปร ACCESS_TOKEN (ใช้ใน Sheet อื่นด้วย {{ACCESS_TOKEN}})
    //   ✏️ [TODO] ปรับ JSON path "accessToken" ตาม response จริง เช่น "data.accessToken"
    { Action: "STORE_JSON", Target: "accessToken", Data: "ACCESS_TOKEN" },

    // Step 8: เก็บ refreshToken ไว้ด้วย
    { Action: "STORE_JSON", Target: "refreshToken", Data: "REFRESH_TOKEN" },
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 2: Customer_FindProfile
  // วัตถุประสงค์: ค้นหาข้อมูลโปรไฟล์ลูกค้า
  //   API: POST /api/customer/findcustomerprofile
  //   Auth: Bearer {{accessToken}}
  // ═══════════════════════════════════════════════════════════════════════════
  "Customer_FindProfile": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },

    // ✏️ [TODO] ใส่ {{ACCESS_TOKEN}} จาก Login_Flow หากรันต่อกัน
    //   หรือวาง accessToken จริงตรงนี้เพื่อ test แบบ standalone
    { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" },

    // ✏️ [TODO] เปลี่ยน customerId ให้ตรงกับ test data จริง
    { Action: "API_POST", Target: "/api/customer/findcustomerprofile", Data: '{"customerId":"9876543210987"}' },
    { Action: "LOG_RESPONSE", Target: "500" },

    // ตรวจสอบผลลัพธ์
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },

    // ✏️ [TODO] ปรับ CHECK_JSON ให้ตรงกับ field ที่คาดหวังจาก API จริง
    // ตัวอย่าง: เช็คว่า response มี customerId ถูกต้อง
    // { Action: "CHECK_JSON", Target: "data.customerId|9876543210987", Data: "pass" },
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 3: Customer_FindDocument
  // วัตถุประสงค์: ดึงรายการเอกสารของลูกค้า
  //   API: POST /api/customer/finddocument
  // ═══════════════════════════════════════════════════════════════════════════
  "Customer_FindDocument": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
    { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" },

    { Action: "API_POST", Target: "/api/customer/finddocument", Data: '{"customerId":"9876543210987"}' },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },

    // ✏️ [TODO] เพิ่ม Assertion เพิ่มเติมหลังทราบ Response จริง
    // { Action: "CHECK_JSON", Target: "data.length|1", Data: "pass" },  // เช็คว่ามีเอกสาร 1 รายการ
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 4: Customer_FindRequest
  // วัตถุประสงค์: ดึงรายการ Request ของลูกค้า
  //   API: POST /api/customer/findcustomerrequest
  // ═══════════════════════════════════════════════════════════════════════════
  "Customer_FindRequest": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
    { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" },

    { Action: "API_POST", Target: "/api/customer/findcustomerrequest", Data: '{"customerId":"9876543210987"}' },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 5: Customer_FindDocFromRequest
  // วัตถุประสงค์: ดึงเอกสารที่แนบมากับ Request
  //   API: POST /api/customer/finddocfromrequest
  // ═══════════════════════════════════════════════════════════════════════════
  "Customer_FindDocFromRequest": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
    { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" },

    { Action: "API_POST", Target: "/api/customer/finddocfromrequest", Data: '{"customerId":"9876543210987"}' },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 6: Customer_FindRequestTopic
  // วัตถุประสงค์: ดึงหัวข้อ Request ของลูกค้า
  //   API: POST /api/customer/findrequesttopic
  // ═══════════════════════════════════════════════════════════════════════════
  "Customer_FindRequestTopic": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
    { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" },

    { Action: "API_POST", Target: "/api/customer/findrequesttopic", Data: '{"customerId":"9876543210987"}' },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 7: Customer_FindNotification
  // วัตถุประสงค์: ดึง Notification ของลูกค้า
  //   API: POST /api/customer/findnotificationtocustomer
  // ═══════════════════════════════════════════════════════════════════════════
  "Customer_FindNotification": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
    { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" },

    { Action: "API_POST", Target: "/api/customer/findnotificationtocustomer", Data: '{"customerId":"9876543210987"}' },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 8: Customer_CreateRequest
  // วัตถุประสงค์: สร้าง Request ใหม่ของลูกค้า
  //   API: POST /api/customer/request/createcustomerrequest
  //
  // ⚠️ หมายเหตุ: Postman body ต้นฉบับมี comment (//) อยู่ ซึ่ง JSON ปกติไม่รองรับ
  //   ไฟล์นี้ได้ตัด comment ออกแล้ว และเก็บเฉพาะ field ที่จำเป็น
  //   Field ที่เป็น optional (มี comment ไว้ใน Postman) สามารถเพิ่มกลับได้
  // ═══════════════════════════════════════════════════════════════════════════
  "Customer_CreateRequest": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
    { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" },

    // ✏️ [TODO] ปรับ Body ให้ตรงกับ test data จริง
    {
      Action: "API_POST",
      Target: "/api/customer/request/createcustomerrequest",
      Data: JSON.stringify({
        specifyDocType: "Stitch Good new Row",
        requestTopic: "Stitch Good new Row",
        customerId: "9876543210987",
        customerName: "stitch Sukjai",
        customerEmail: "stitch@example.com",
        subCompanyId: "BKK01",
        filter: { year: "2026", startDate: "", endDate: "" },
        fileNonRequiredPath: [],
        fileRequiredPath: [],
        detail: "playwright test"
      })
    },
    { Action: "LOG_RESPONSE", Target: "500" },

    // ✏️ [TODO] ปรับ Status Code ที่คาดหวัง (อาจเป็น 200 หรือ 201)
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },

    // ✏️ [TODO] เพิ่ม Assertion หลังรู้ response จริง เช่น:
    // { Action: "STORE_JSON", Target: "data.requestId", Data: "REQUEST_ID" },
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 9: Broker_FindSchedules
  // วัตถุประสงค์: ดึง schedule job ของ Broker
  //   API: POST /api/broker/findschedules
  //
  //   ✏️ [TODO] เปลี่ยน brokerId ให้ตรงกับ test data
  // ═══════════════════════════════════════════════════════════════════════════
  "Broker_FindSchedules": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
    { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" },

    { Action: "API_POST", Target: "/api/broker/findschedules", Data: '{"brokerId":"0105566000888"}' },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 10: Broker_FindAllCustomer
  // วัตถุประสงค์: ดึงรายชื่อลูกค้าทั้งหมดของ Broker
  //   API: POST /api/broker/findallcustomerbybrokerid
  // ═══════════════════════════════════════════════════════════════════════════
  "Broker_FindAllCustomer": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
    { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" },

    { Action: "API_POST", Target: "/api/broker/findallcustomerbybrokerid", Data: '{"brokerId":"U1001"}' },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 11: Broker_FindAllRequested
  // วัตถุประสงค์: ดึงรายการ Request ทั้งหมดที่ Broker ดูแล
  //   API: POST /api/broker/findallrequested
  // ═══════════════════════════════════════════════════════════════════════════
  "Broker_FindAllRequested": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
    { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" },

    { Action: "API_POST", Target: "/api/broker/findallrequested", Data: '{"brokerId":"U1001"}' },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 12: Notification_SendFirebase
  // วัตถุประสงค์: ส่ง Firebase Notification ไปยังลูกค้า
  //   API: POST /api/notification/create
  //
  //   ✏️ [TODO] ปรับ customerId, message, title ให้ตรงกับ test case จริง
  // ═══════════════════════════════════════════════════════════════════════════
  "Notification_SendFirebase": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
    { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" },

    {
      Action: "API_POST",
      Target: "/api/notification/create",
      Data: JSON.stringify({
        customerId: "9876543210987",
        message: "playwright test notification",
        notiChannel: "On Web",
        status: "SENT",
        title: "Test Title",
        metadata: {}
      })
    },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },
  ],


  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 13: S3_GetObject
  // วัตถุประสงค์: ดึงไฟล์จาก S3
  //   API: POST /api/s3/getobject
  //
  // ⚠️ หมายเหตุ: Postman ใช้ JWT Auth แยกต่างหาก (ไม่ใช่ accessToken ปกติ)
  //   ต้องสอบถามทีม Dev ว่า Playwright ควรใช้ Auth อะไร
  //   ตอนนี้ใช้ accessToken ปกติไปก่อน แล้วสังเกต response
  //
  //   ✏️ [TODO] ปรับ fileKey ให้ตรงกับไฟล์ที่มีอยู่จริงใน S3
  // ═══════════════════════════════════════════════════════════════════════════
  "S3_GetObject": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
    { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" },

    { Action: "API_POST", Target: "/api/s3/getobject", Data: '{"fileKey":"document/CUSTOMER/9876543210987/JustKept_overview.drawio.pdf"}' },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 14: Broker_ListUploadDraft
  // วัตถุประสงค์: ดึงรายการเอกสารฉบับร่างที่อัปโหลด
  //   API: POST /api/broker/listuploaddraft
  // ═══════════════════════════════════════════════════════════════════════════
  "Broker_ListUploadDraft": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
    { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" },

    { Action: "API_POST", Target: "/api/broker/listuploaddraft", Data: JSON.stringify({ brokerId: "U1001", requestId: "REQ404" }) },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 15: Broker_DeleteDocumentDraft
  // วัตถุประสงค์: ลบเอกสารฉบับร่าง
  //   API: POST /api/broker/deletedocumentdraft
  // ═══════════════════════════════════════════════════════════════════════════
  "Broker_DeleteDocumentDraft": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
    { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" },

    { Action: "API_POST", Target: "/api/broker/deletedocumentdraft", Data: JSON.stringify({ brokerId: "12345678910", draftSK: "DRAFT_DOC#2026-03-24T06:20:31.353Z#DRAFT-3BC5BCDF" }) },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 16: Broker_CreateDocumentDraft
  // วัตถุประสงค์: สร้างเอกสารฉบับร่างใหม่
  //   API: POST /api/broker/createdocumentdraft
  // ═══════════════════════════════════════════════════════════════════════════
  "Broker_CreateDocumentDraft": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
    { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" },

    {
      Action: "API_POST", Target: "/api/broker/createdocumentdraft", Data: JSON.stringify({
        brokerId: "U1001",
        customerId: "9876543210987",
        requestId: "fa00fc86-20e6-463f-8f98-6ad112107d9d",
        subjectLine: "Request 404 Draft",
        docType: "Stitch Good new Row",
        privacy: "private",
        emailTemplate: "emtp003",
        messageBody: "<p>Dear <strong>{customer_name}</strong>,</p><p><br></p><p>The document <strong>{doc_type}</strong> that you requested has been processed and is now ready for download.</p><p>Please login to your JustKept account to access the file.</p><p><br></p><p><a href=\"https://d24s92ppm4un04.cloudfront.net\" rel=\"noopener noreferrer\" target=\"_blank\">Click here</a> to login to your JustKept account.</p><p><br></p><p><br></p><p>Best regards,</p><p><strong>JustKept Support Team</strong></p>",
        draftSK: "DRAFT_DOC#2026-05-13T06:37:02.432Z#DRAFT-7BA3C31C",
        entity: "doc_draft",
        requestSK: "REQ#2026-05-12T11:12:15.176Z"
      })
    },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 17: Document_FindRequestByReqId
  // วัตถุประสงค์: ค้นหา Request ด้วย requestId
  //   API: POST /api/document/findrequestbyrequestid
  // ═══════════════════════════════════════════════════════════════════════════
  "Document_FindRequestByReqId": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
    { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" },

    { Action: "API_POST", Target: "/api/document/findrequestbyrequestid", Data: JSON.stringify({ customerId: "9876543210987", requestId: "2f70d0ec-f6f1-4ffb-aca3-fc93ea50749e" }) },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 18: Broker_ListScheduleDraft
  // วัตถุประสงค์: ดึงรายการ Schedule Draft ของ Broker
  //   API: POST /api/broker/listscheduledraft
  // ═══════════════════════════════════════════════════════════════════════════
  "Broker_ListScheduleDraft": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
    { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" },

    { Action: "API_POST", Target: "/api/broker/listscheduledraft", Data: JSON.stringify({ brokerId: "0105566000888" }) },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 19: Audit_FindAuditLogs
  // วัตถุประสงค์: ค้นหา Audit Logs ของผู้ใช้งาน
  //   API: POST /api/audit/findauditlogs
  // ═══════════════════════════════════════════════════════════════════════════
  "Audit_FindAuditLogs": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
    { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" },

    { Action: "API_POST", Target: "/api/audit/findauditlogs", Data: JSON.stringify({ actorId: "9876543210987", actorRole: "CUSTOMER" }) },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 20: Broker_CustomerLogs
  // วัตถุประสงค์: ดู Log การใช้งานของลูกค้า
  //   API: POST /api/broker/customerlogs
  // ═══════════════════════════════════════════════════════════════════════════
  "Broker_CustomerLogs": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
    { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" },

    { Action: "API_POST", Target: "/api/broker/customerlogs", Data: JSON.stringify({ customerId: "9876543210987" }) },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 21: Broker_FindAllCustomerBySubComId
  // วัตถุประสงค์: ค้นหาลูกค้าทั้งหมดจาก sub company id
  //   API: POST /api/broker/findallcustomerbysubcomid
  // ═══════════════════════════════════════════════════════════════════════════
  "Broker_FindAllCusBySubComId": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
    { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" },

    { Action: "API_POST", Target: "/api/broker/findallcustomerbysubcomid", Data: JSON.stringify({ brokerId: "U1001" }) },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // ⛔ S3_PutObject (File Upload) — ข้ามไปก่อน
  // ═══════════════════════════════════════════════════════════════════════════
  // S3 putObject ใช้ multipart/form-data + file upload
  // apiKeywords.js ที่มีอยู่ยังไม่รองรับ ต้องเพิ่ม keyword ใหม่ก่อน
  // หากต้องการเพิ่มในอนาคต ให้แจ้ง AI เพื่อเพิ่ม API_UPLOAD keyword

};

// =============================================================================
// สร้างไฟล์ Excel
// บันทึกลงโฟลเดอร์ data/JustKept/api/
// =============================================================================

generateExcel(apiTestFlow, outPath);
