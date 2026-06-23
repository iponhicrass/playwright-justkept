const path = require('path');
const { generateExcel } = require('../../test/utils/excelGenerator');

// =============================================================================
// 📌 วิธีใช้งานไฟล์นี้:
//   1. รันคำสั่ง: node data/JustKept/generate_api_phase2_excel.js
//   2. ไฟล์ Excel จะถูกสร้างที่: data/JustKept/api/justkept_api_phase2_test_cases.xlsx
//   3. รัน Test: node data/JustKept/run_api_test.js
// =============================================================================

const BASE_URL = 'https://justkept-dev.freewillsolutions.com';
const outPath = path.join(__dirname, 'api', 'justkept_api_phase2_test_cases.xlsx');

// ขั้นตอนการล็อกอินและเตรียม Headers สำหรับใช้เริ่มต้นในทุกๆ TC เพื่อให้ทำงานแยกจากกันได้อย่างอิสระ (Self-Contained)
const loginSteps = [
  { Action: "SET_BASE_URL", Target: BASE_URL },
  { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
  { Action: "API_POST", Target: "/api/auth/local/login", Data: '{"username":"user1@mail.com","pwd":"1"}' },
  { Action: "CHECK_STATUS", Target: "200" },
  { Action: "STORE_JSON", Target: "accessToken", Data: "ACCESS_TOKEN" },
  { Action: "SET_HEADER", Target: "Authorization", Data: "Bearer {{ACCESS_TOKEN}}" }
];

const apiTestFlow = {

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 1: Login_Flow
  // ═══════════════════════════════════════════════════════════════════════════
  "Login_Flow": [
    { Action: "SET_BASE_URL", Target: BASE_URL },
    { Action: "SET_HEADER", Target: "Content-Type", Data: "application/json" },
    { Action: "API_POST", Target: "/api/auth/local/login", Data: '{"username":"user1@mail.com","pwd":"1"}' },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },
    { Action: "STORE_JSON", Target: "accessToken", Data: "ACCESS_TOKEN" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 2: TC_API_01_CreateJob
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_01_CreateJob": [
    ...loginSteps,
    {
      Action: "API_POST",
      Target: "/api/req-doc-process/create",
      Data: JSON.stringify({
        job_name: "ส่งรายงานภาษีคร่อมเดือนประจำเดือนมิถุนายน 2026",
        description: "กรุณาจัดส่งรายงานภาษีซื้อประจำเดือนเพื่อสรุปยอดภาษีมูลค่าเพิ่ม",
        assigned_person: "STAFF001",
        job_start_date: "2026-06-01T00:00:00Z",
        job_end_date: "2026-12-31T23:59:59Z",
        document_types: ["TAX_REPORT_BUY"],
        target_sub_companies: [
          { customerId: "COMP001", name: "บริษัท เอบีซี จำกัด", email: "abc@mail.com" }
        ],
        send_all_sub_companies: false,
        recurrent_tag: "Monthly",
        upload_start_day: 16,
        upload_end_day: 15,
        recurrent_detail: {
          monthly_preset: "Custom",
          is_cross_month: true,
          extend_period_hours: 72
        },
        notification_status: "Enabled",
        notification_channels: "Email",
        notification_channels_spec: [
          { toEmail: "abc@mail.com", subject: "TAX_REPORT_BUY Required", htmlBody: "<p>จัดส่งรายงานด่วน...</p>" }
        ],
        notification_setting: {
          notification_time: "09:00",
          schedule_detail: {
            preferred_days_of_month: [1, 16, "LAST_DAY"],
            advance_notice_days: 3,
            reminder_frequency_days: 3
          }
        },
        jobStatus: "STATUS#ACTIVE",
        nextRunAt: "2026-06-16T00:00:00Z",
        force_create: false
      })
    },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },
    { Action: "STORE_JSON", Target: "data.jobReqId", Data: "CREATED_JOB_REQ_ID" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 3: TC_API_02_CreateJobDuplicate
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_02_CreateJobDuplicate": [
    ...loginSteps,
    {
      Action: "API_POST",
      Target: "/api/req-doc-process/create",
      Data: JSON.stringify({
        job_name: "ส่งรายงานภาษีคร่อมเดือนประจำเดือนมิถุนายน 2026",
        description: "กรุณาจัดส่งรายงานภาษีซื้อประจำเดือนเพื่อสรุปยอดภาษีมูลค่าเพิ่ม",
        assigned_person: "STAFF001",
        job_start_date: "2026-06-01T00:00:00Z",
        job_end_date: "2026-12-31T23:59:59Z",
        document_types: ["TAX_REPORT_BUY"],
        target_sub_companies: [
          { customerId: "COMP001", name: "บริษัท เอบีซี จำกัด", email: "abc@mail.com" }
        ],
        send_all_sub_companies: false,
        recurrent_tag: "Monthly",
        upload_start_day: 16,
        upload_end_day: 15,
        recurrent_detail: {
          monthly_preset: "Custom",
          is_cross_month: true,
          extend_period_hours: 72
        },
        notification_status: "Enabled",
        notification_channels: "Email",
        notification_channels_spec: [
          { toEmail: "abc@mail.com", subject: "TAX_REPORT_BUY Required", htmlBody: "<p>จัดส่งรายงานด่วน...</p>" }
        ],
        notification_setting: {
          notification_time: "09:00",
          schedule_detail: {
            preferred_days_of_month: [1, 16, "LAST_DAY"],
            advance_notice_days: 3,
            reminder_frequency_days: 3
          }
        },
        jobStatus: "STATUS#ACTIVE",
        nextRunAt: "2026-06-16T00:00:00Z",
        force_create: false
      })
    },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "400", Data: "pass" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 4: TC_API_03_CreateJobOverride
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_03_CreateJobOverride": [
    ...loginSteps,
    {
      Action: "API_POST",
      Target: "/api/req-doc-process/create",
      Data: JSON.stringify({
        job_name: "ส่งรายงานภาษีคร่อมเดือนประจำเดือนมิถุนายน 2026",
        description: "กรุณาจัดส่งรายงานภาษีซื้อประจำเดือนเพื่อสรุปยอดภาษีมูลค่าเพิ่ม",
        assigned_person: "STAFF001",
        job_start_date: "2026-06-01T00:00:00Z",
        job_end_date: "2026-12-31T23:59:59Z",
        document_types: ["TAX_REPORT_BUY"],
        target_sub_companies: [
          { customerId: "COMP001", name: "บริษัท เอบีซี จำกัด", email: "abc@mail.com" }
        ],
        send_all_sub_companies: false,
        recurrent_tag: "Monthly",
        upload_start_day: 16,
        upload_end_day: 15,
        recurrent_detail: {
          monthly_preset: "Custom",
          is_cross_month: true,
          extend_period_hours: 72
        },
        notification_status: "Enabled",
        notification_channels: "Email",
        notification_channels_spec: [
          { toEmail: "abc@mail.com", subject: "TAX_REPORT_BUY Required", htmlBody: "<p>จัดส่งรายงานด่วน...</p>" }
        ],
        notification_setting: {
          notification_time: "09:00",
          schedule_detail: {
            preferred_days_of_month: [1, 16, "LAST_DAY"],
            advance_notice_days: 3,
            reminder_frequency_days: 3
          }
        },
        jobStatus: "STATUS#ACTIVE",
        nextRunAt: "2026-06-16T00:00:00Z",
        force_create: true
      })
    },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 5: TC_API_04_InvalidRecurrent
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_04_InvalidRecurrent": [
    ...loginSteps,
    {
      Action: "API_POST",
      Target: "/api/req-doc-process/create",
      Data: JSON.stringify({
        job_name: "ส่งรายงานภาษีคร่อมเดือนประจำเดือนมิถุนายน 2026",
        description: "กรุณาจัดส่งรายงานภาษีซื้อประจำเดือนเพื่อสรุปยอดภาษีมูลค่าเพิ่ม",
        assigned_person: "STAFF001",
        job_start_date: "2026-06-01T00:00:00Z",
        job_end_date: "2026-12-31T23:59:59Z",
        document_types: ["TAX_REPORT_BUY"],
        target_sub_companies: [
          { customerId: "COMP001", name: "บริษัท เอบีซี จำกัด", email: "abc@mail.com" }
        ],
        send_all_sub_companies: false,
        recurrent_tag: "InvalidTag",
        upload_start_day: 16,
        upload_end_day: 15,
        recurrent_detail: {
          monthly_preset: "Custom",
          is_cross_month: true,
          extend_period_hours: 72
        },
        notification_status: "Enabled",
        notification_channels: "Email",
        notification_setting: {
          notification_time: "09:00",
          schedule_detail: {
            preferred_days_of_month: [1, 16, "LAST_DAY"]
          }
        },
        jobStatus: "STATUS#ACTIVE",
        force_create: false
      })
    },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "400", Data: "pass" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 6: TC_API_05_MissingTarget
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_05_MissingTarget": [
    ...loginSteps,
    {
      Action: "API_POST",
      Target: "/api/req-doc-process/create",
      Data: JSON.stringify({
        job_name: "ส่งรายงานภาษีคร่อมเดือนประจำเดือนมิถุนายน 2026",
        description: "กรุณาจัดส่งรายงานภาษีซื้อประจำเดือนเพื่อสรุปยอดภาษีมูลค่าเพิ่ม",
        assigned_person: "STAFF001",
        job_start_date: "2026-06-01T00:00:00Z",
        job_end_date: "2026-12-31T23:59:59Z",
        document_types: ["TAX_REPORT_BUY"],
        target_sub_companies: [],
        send_all_sub_companies: false,
        recurrent_tag: "Monthly",
        upload_start_day: 16,
        upload_end_day: 15,
        recurrent_detail: {
          monthly_preset: "Custom",
          is_cross_month: true,
          extend_period_hours: 72
        },
        notification_status: "Enabled",
        notification_channels: "Email",
        notification_setting: {
          notification_time: "09:00",
          schedule_detail: {
            preferred_days_of_month: [1, 16, "LAST_DAY"]
          }
        },
        jobStatus: "STATUS#ACTIVE",
        force_create: false
      })
    },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "400", Data: "pass" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 7: TC_API_06_RejectDocument
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_06_RejectDocument": [
    ...loginSteps,
    {
      Action: "API_POST",
      Target: "/api/cust_doc-upload/reject",
      Data: JSON.stringify({
        customerId: "COMP001",
        jobReqId: "JOB-REQ-001",
        document_type: "TAX_REPORT_BUY",
        transactionId: "TXN-12345-ABCDE",
        reject_reason: "ไฟล์หน้าแรกมืดเกินไป ไม่สามารถอ่านข้อมูลยอดเงินสุทธิได้",
        additional_notes: "รบกวนสแกนและส่งเข้ามาใหม่อีกครั้งด่วนที่สุดครับ"
      })
    },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 8: TC_API_07A_ExtendHours
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_07A_ExtendHours": [
    ...loginSteps,
    {
      Action: "API_POST",
      Target: "/api/cust_doc-upload/extend",
      Data: JSON.stringify({
        jobReqId: "JOB-REQ-001",
        extend_type: "HOURLY",
        extend_hours: 4
      })
    },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 9: TC_API_07B_ExtendDays
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_07B_ExtendDays": [
    ...loginSteps,
    {
      Action: "API_POST",
      Target: "/api/cust_doc-upload/extend",
      Data: JSON.stringify({
        jobReqId: "JOB-REQ-001",
        extend_type: "DAILY",
        extend_days: 3
      })
    },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 10: TC_API_08_GetToDoList
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_08_GetToDoList": [
    ...loginSteps,
    { Action: "API_POST", Target: "/api/cust_doc-upload/list", Data: '{"customerId":"COMP001","status_filter":"TODO"}' },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 11: TC_API_09_UploadConflict
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_09_UploadConflict": [
    ...loginSteps,
    {
      Action: "API_UPLOAD",
      Target: "/api/cust_doc-upload/submit",
      Data: JSON.stringify({
        customerId: "COMP001",
        jobReqId: "JOB-REQ-001",
        document_type: "TAX_REPORT_BUY",
        transactionId: "TXN-12345-ABCDE",
        expected_version: 1,
        file: "data/sample.pdf"
      })
    },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "400", Data: "pass" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 12: TC_API_10_UploadInvalidFile
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_10_UploadInvalidFile": [
    ...loginSteps,
    {
      Action: "API_UPLOAD",
      Target: "/api/cust_doc-upload/submit",
      Data: JSON.stringify({
        customerId: "COMP001",
        jobReqId: "JOB-REQ-001",
        document_type: "TAX_REPORT_BUY",
        transactionId: "TXN-12345-ABCDE",
        expected_version: 1,
        file: "data/sample.exe"
      })
    },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "400", Data: "pass" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 13: TC_API_11_ListJobs
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_11_ListJobs": [
    ...loginSteps,
    {
      Action: "API_POST",
      Target: "/api/req-doc-process/list",
      Data: JSON.stringify({
        subComId: "BROKER001",
        search_query: "รายงานภาษี",
        status_filter: "ACTIVE",
        page: 1,
        limit: 10
      })
    },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 14: TC_API_12_UpdateJobNextCycle
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_12_UpdateJobNextCycle": [
    ...loginSteps,
    {
      Action: "API_POST",
      Target: "/api/req-doc-process/update",
      Data: JSON.stringify({
        jobReqId: "JOB-REQ-001",
        subCompanyId: "BROKER001",
        assigned_person: "STAFF001",
        job_name: "ส่งรายงานภาษีประจำเดือนมิถุนายน (แก้ไข NEXT_CYCLE)",
        description: "กรุณาจัดส่งรายงานภาษีซื้อภาษีขายพร้อมไฟล์แนบตัวปรับปรุง",
        job_start_date: "2026-06-01T00:00:00Z",
        job_end_date: "2026-12-31T23:59:59Z",
        document_types: ["TAX_REPORT_BUY", "TAX_REPORT_SELL", "TAX_REPORT_WITHHOLDING"],
        target_sub_companies: [
          { customerId: "COMP001", name: "บริษัท เอบีซี จำกัด", email: "abc@mail.com" }
        ],
        send_all_sub_companies: false,
        upload_start_day: 16,
        upload_end_day: 15,
        recurrent_tag: "Monthly",
        recurrent_detail: {
          monthly_preset: "Custom",
          is_cross_month: true,
          extend_period_hours: 72
        },
        notification_status: "Enabled",
        notification_channels: "Both",
        notification_channels_spec: [
          {
            toEmail: "abc@mail.com",
            subject: "TAX_REPORT_WITHHOLDING Required",
            htmlBody: "<p>เรียนลูกค้า... มีการอัปเดตขอเอกสารเพิ่มเติม...</p>"
          },
          {
            customerId: "COMP001",
            title: "กรุณาส่งภาษีหัก ณ ที่จ่าย",
            message: "กรุณาจัดเตรียมและอัปโหลดเอกสาร TAX_REPORT_WITHHOLDING",
            notiChannel: "On Web",
            status: "SENT"
          }
        ],
        notification_setting: {
          notification_time: "09:00",
          schedule_detail: {
            preferred_days_of_month: [1, 15, "LAST_DAY"],
            advance_notice_days: 3,
            reminder_frequency_days: 3
          }
        },
        jobStatus: "STATUS#ACTIVE",
        update_effect: "NEXT_CYCLE"
      })
    },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 15: TC_API_13_UpdateJobImmediate
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_13_UpdateJobImmediate": [
    ...loginSteps,
    {
      Action: "API_POST",
      Target: "/api/req-doc-process/update",
      Data: JSON.stringify({
        jobReqId: "JOB-REQ-001",
        subCompanyId: "BROKER001",
        assigned_person: "STAFF001",
        job_name: "ส่งรายงานภาษีประจำเดือนมิถุนายน (แก้ไข IMMEDIATE)",
        description: "กรุณาจัดส่งรายงานภาษีซื้อภาษีขายพร้อมไฟล์แนบตัวปรับปรุง",
        job_start_date: "2026-06-01T00:00:00Z",
        job_end_date: "2026-12-31T23:59:59Z",
        document_types: ["TAX_REPORT_BUY", "TAX_REPORT_SELL", "TAX_REPORT_WITHHOLDING"],
        target_sub_companies: [
          { customerId: "COMP001", name: "บริษัท เอบีซี จำกัด", email: "abc@mail.com" }
        ],
        send_all_sub_companies: false,
        upload_start_day: 16,
        upload_end_day: 15,
        recurrent_tag: "Monthly",
        recurrent_detail: {
          monthly_preset: "Custom",
          is_cross_month: true,
          extend_period_hours: 72
        },
        notification_status: "Enabled",
        notification_channels: "Both",
        notification_channels_spec: [
          {
            toEmail: "abc@mail.com",
            subject: "TAX_REPORT_WITHHOLDING Required",
            htmlBody: "<p>เรียนลูกค้า... มีการอัปเดตขอเอกสารเพิ่มเติม...</p>"
          },
          {
            customerId: "COMP001",
            title: "กรุณาส่งภาษีหัก ณ ที่จ่าย",
            message: "กรุณาจัดเตรียมและอัปโหลดเอกสาร TAX_REPORT_WITHHOLDING",
            notiChannel: "On Web",
            status: "SENT"
          }
        ],
        notification_setting: {
          notification_time: "09:00",
          schedule_detail: {
            preferred_days_of_month: [1, 15, "LAST_DAY"],
            advance_notice_days: 3,
            reminder_frequency_days: 3
          }
        },
        jobStatus: "STATUS#ACTIVE",
        update_effect: "IMMEDIATE"
      })
    },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 16: TC_API_14_ListDocMonitor
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_14_ListDocMonitor": [
    ...loginSteps,
    {
      Action: "API_POST",
      Target: "/api/document-monitor/list",
      Data: JSON.stringify({
        jobReqId: "JOB-REQ-001",
        period: "2026-06",
        status_filter: "ALL",
        search_query: ""
      })
    },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 17: TC_API_15_ToggleSystem
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_15_ToggleSystem": [
    ...loginSteps,
    { Action: "API_POST", Target: "/api/system/toggle", Data: '{"admin_token":"ADM-KEY-12345","enabled":false}' },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 18: TC_API_16_GetJobDetail
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_16_GetJobDetail": [
    ...loginSteps,
    { Action: "API_POST", Target: "/api/req-doc-process/get-detail-by-id", Data: '{"jobReqId":"JOB-REQ-001","subCompanyId":"BKK01"}' },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 19: TC_API_17_ListJobsInPeriod
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_17_ListJobsInPeriod": [
    ...loginSteps,
    { Action: "API_POST", Target: "/api/document-monitor/jobs-in-period", Data: '{"subComId":"BROKER001","period":"2026-06"}' },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 20: TC_API_18_CancelJob
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_18_CancelJob": [
    ...loginSteps,
    { Action: "API_POST", Target: "/api/req-doc-process/cancel", Data: '{"jobReqId":"JOB-REQ-001"}' },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 21: TC_API_19_GetUploadHistory
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_19_GetUploadHistory": [
    ...loginSteps,
    {
      Action: "API_POST",
      Target: "/api/cust_doc-upload/history",
      Data: JSON.stringify({
        customerId: "COMP001",
        startDate: "2026-06-01T00:00:00Z",
        endDate: "2026-06-30T23:59:59Z"
      })
    },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 22: TC_API_20_GetSelectorData
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_20_GetSelectorData": [
    ...loginSteps,
    { Action: "API_POST", Target: "/api/req-doc-process/document-types", Data: '{"subCompanyId":"BROKER001"}' },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" },
    { Action: "API_POST", Target: "/api/req-doc-process/target-sub-companies", Data: '{"subCompanyId":"BROKER001"}' },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SHEET 23: TC_API_21_UploadOverdue
  // ═══════════════════════════════════════════════════════════════════════════
  "TC_API_21_UploadOverdue": [
    ...loginSteps,
    {
      Action: "API_UPLOAD",
      Target: "/api/cust_doc-upload/submit",
      Data: JSON.stringify({
        customerId: "COMP001",
        jobReqId: "JOB-REQ-001",
        document_type: "TAX_REPORT_BUY",
        transactionId: "TXN-12345-ABCDE",
        expected_version: 1,
        file: "data/sample.pdf",
        is_overdue: true
      })
    },
    { Action: "LOG_RESPONSE", Target: "500" },
    { Action: "CHECK_STATUS", Target: "200", Data: "pass" }
  ]

};

generateExcel(apiTestFlow, outPath);
