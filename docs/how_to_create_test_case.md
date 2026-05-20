# 📘 คู่มือการสร้าง Test Case (Excel-Driven Framework)

เอกสารนี้จะอธิบายขั้นตอนการสร้าง Test Case ใหม่ สำหรับโปรเจกต์อัตโนมัติ (Automated Testing) ที่ใช้ Playwright ร่วมกับไฟล์ Excel แบบเข้าใจง่าย ทำตามได้ทีละสเต็ป 🚀

ระบบที่เราทดสอบ (Frontend) พัฒนาด้วย **Flutter Web** ดังนั้นการหา Element บางอย่างอาจจะต้องพึ่งพาการตั้งชื่อ (Semantics Label) เป็นหลัก

---

## 🛠 ขอบเขตการทำงาน (Workflow)

กระบวนการสร้าง Test Case มีอยู่ 4 ขั้นตอนหลัก:
1. **Record** บันทึกสคริปต์แบบอัตโนมัติด้วยคำสั่ง Playwright
2. **Convert** แปลงสคริปต์ที่บันทึกไว้ ให้เป็นรูปแบบ JSON (Keyword)
3. **Add** นำชุดคำสั่งไปวางในไฟล์สร้าง Excel
4. **Run** สั่งรันเทสเพื่อดูผลลัพธ์

---

## 📝 ขั้นตอนที่ 1: บันทึกขั้นตอน (Record Playwright)

ไม่ต้องนั่งเขียนโค้ดเพื่อหา Selector แบบ manual เราจะใช้เครื่องมือ `codegen` ของ Playwright เพื่อเปิดเบราว์เซอร์และบันทึกสิ่งที่เราทำลงไป

1. เปิด Terminal ในโปรเจกต์
2. พิมพ์คำสั่งด้านล่างนี้เพื่อเปิดเบราว์เซอร์ (จะเด้งหน้าต่าง URL ขึ้นมาพร้อมตัวบันทึก):
   ```bash
   npx playwright codegen https://mspservice-uat.freewillgroup.com
   ```
3. หน้าต่าง Playwright Inspector จะโผล่ขึ้นมา **กดปุ่ม Record (ถ้ายังไม่เริ่ม)**
4. จำลองการคลิก กรอกข้อมูล ตาม Test Scenario ของคุณในหน้าต่างเบราว์เซอร์
5. เมื่อจบ Process ก๊อปปี้โค้ดที่ Playwright Inspector บันทึกเอาไว้ (จะมีหน้าตาคล้ายๆ `await page.getByRole(...)`)

⚠️ **ข้อควรระวังสำหรับ Flutter Web:** พยายามคลิกที่ Element ที่มันจับเป็นชื่อกล่องข้อความหรือชื่อปุ่มชัดเจน (เช่น `'button', { name: 'Search' }`)

---

## ⚙️ ขั้นตอนที่ 2: แปลงโค้ดเป็น Keyword (Convert)

โค้ดดิบๆ จาก Playwright ยังนำไปใช้กับระบบ Excel ของเราไม่ได้ ต้องแปลงเป็นรูปแบบ Keyword ก่อน

1. เปิดไฟล์ `test_utils/converter_helper.js`
2. เลื่อนลงมาล่างสุด หาตัวแปร `recordedCode`
3. ลบโค้ดเดิมในนั้นออก และ **วางโค้ดที่คุณก๊อปปี้มา** ใส่เข้าไปแทน:
   ```javascript
   const recordedCode = `
     await page.goto('https://mspservice-uat.freewillgroup.com/...');
     // วางโค้ดใหม่ของคุณทั้งหมดตรงนี้
   `;
   ```
4. เซฟไฟล์
5. เปิด Terminal แล้วรันคำสั่ง:
   ```bash
   node test_utils/converter_helper.js
   ```
6. ไปดูที่ Terminal คุณจะได้ Output ออกมาเป็นรูปแบบ JSON (มี Action, Target, Data) ให้ **ก๊อปปี้ Output ตรงนี้เอาไว้**

---

## ➕ ขั้นตอนที่ 3: เพิ่มคำสั่งเข้าระบบสร้าง Excel (Add)

เราจะเอา JSON ที่ได้ มาใส่ใน Script สร้าง Excel

1. เปิดไฟล์ `test_data/generate_excel.js`
2. หาบรรทัดที่เป็นตัวแปร `data` (จะเป็น Object เก็บกลุ่มของ Test Case)
3. **ตั้งชื่อ Test Case ใหม่** และ **วาง JSON ที่ก๊อปปี้มา** ใส่ลงไป เช่น:
   ```javascript
   const data = {
     // ... ของเก่าอย่าไปยุ่ง ...

     'TC02_Create_New_Request': [ // << ตั้งชื่อ Test Case (จะเป็นฉากใน Excel)
       // ลบ [ ... ] ทิ้งแล้ววางเนื้อหาจาก JSON ตรงนี้
       {
         "Action": "GOTO",
         "Target": "https://...",
         "Data": ""
       },
       {
         "Action": "FILL_ROLE",
         "Target": "textbox|login_tf_username",
         "Data": "admin"
       }
       // ...
     ],
   };
   ```
4. เซฟไฟล์

---

## ▶️ ขั้นตอนที่ 4: สั่งรันสร้างไฟล์และทดสอบ (Run)

อัปเดตไฟล์ Excel และสั่งให้ Playwright นำไฟล์ Excel ไปรัน

1. รันคำสั่งนี้เพื่อสร้าง (หรืออัปเดต) ไฟล์ `test_cases.xlsx`:
   ```bash
   node test_data/generate_excel.js
   ```
   *ไฟล์ Excel จะถูกอัปเดตไปอยู่ที่ `test_data/test_cases.xlsx`*

2. รันคำสั่ง Playwright เพื่อรันชุดคำสั่งทั้งหมดจาก Excel:
   ```bash
   npx playwright test test/sa_excel_driven.spec.js
   ```
   *(ถ้าต้องการรันแบบเห็นหน้าจอ ให้เติม `--headed` ต่อท้าย หรือรันผ่าน extension ใน VS Code)*

3. (เลือกได้) หากต้องการดูผลลัพธ์เป็นรูปแบบ XML ที่เพิ่งตั้งค่าไป (เช่นเอาไปต่อ CI/CD):
   ```bash
   npx playwright test test/sa_excel_driven.spec.js --reporter=junit
   ```

🎉 เสร็จสิ้นกระบวนการ!
