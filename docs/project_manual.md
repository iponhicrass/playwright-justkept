# Project Manual

Welcome to the Playwright E2E Testing project for prprocess-testcase. This manual centralizes knowledge to ensure users and AI agents can seamlessly understand and execute tests within the repository.

## 🎯 Project Goals

- ทดสอบระบบ `prprocess` ส่วนของการรับ case จากลูกค้า

## 🌐 Domain & Environment

- **Target URL:** `https://mspservice-uat.freewillgroup.com`

## 🛠️ Tech Stack & Constraints

- **Testing Framework:** Playwright (TypeScript/JavaScript)
- **Target Application:** Flutter Web Frontend
  - *Note for Playwright with Flutter Web:* เนื่องจาก Frontend เขียนด้วย Flutter Web การใช้ Selector ปกติอาจจะใช้งานยาก ควรระวังการใช้ DOM element และอาจจะต้องพึ่งพา Semantics labels (`flt-semantics-identifier` / `aria-label`) เป็นหลักเพื่อให้เทสต์มีความเสถียร

## 📊 Excel-Driven Test Case Creation

ระบบนี้ใช้ **Keyword-Driven Framework** ในการรันเทสต์ผ่านไฟล์ Excel คุณสามารถสร้าง Test Case ใหม่จากการบันทึกผลการเทสจริงตามขั้นตอนดังนี้:

### 1. บันทึกขั้นตอน (Manual Record)

ใช้ Playwright Codegen เพื่อดูชื่อ Role/Label ของปุ่มหรือฟิลด์ที่ต้องการ:

```bash
npx playwright codegen https://mspservice-uat.freewillgroup.com
```

### 2. แปลงเป็น Keyword

ใช้เครื่องมือช่วยใน `test_utils/converter_helper.js` เพื่อแปลง Code ที่ได้จาก Codegen มาเป็น JSON สำหรับใส่ในระบบ:

- นำ Code จาก Codegen มาวางในไฟล์ `converter_helper.js`
- รันคำสั่ง `node test_utils/converter_helper.js`
- คุณจะได้รายการ `{ Action, Target, Data }` สำหรับนำไปใช้ต่อ

### 3. เพิ่มลงใน `test_data/generate_excel.js`

เพิ่มขั้นตอนที่แปลงแล้วลงในตัวแปร `data` ในไฟล์ `test_data/generate_excel.js`:

```javascript
'TCXX_New_Scenario': [
  { Action: 'LOGIN', Target: 'admin', Data: '1' },
  // ... แปะขั้นตอนที่ได้จาก Step 2 ...
]
```

### 4. Build & Run

```bash
node test_data/generate_excel.js
npx playwright test test/sa_excel_driven.spec.js
```

---
*This manual is updated dynamically to reflect the latest framework capabilities.*
