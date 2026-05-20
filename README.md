# Playwright Keyword-Driven Framework (PR Process)

โครงสร้างโปรเจกต์นี้ถูกออกแบบมาเพื่อรองรับการทำงานร่วมกับโปรเจกต์อื่นๆ (Integration) โดยมีการแยกส่วนการคำสั่งพื้นฐาน (Core) และคำสั่งเฉพาะของโปรเจกต์ (Project-specific) ออกจากกันอย่างเป็นระบบ

## 🚀 เริ่มต้นใช้งาน (Getting Started)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. ตั้งค่า Environment
Copy ไฟล์ตัวอย่าง `.env.example` ไปเป็น `.env` และกำหนดค่าที่ต้องการ
```bash
cp .env.example .env
```
กำหนดค่าในไฟล์ `.env`:
- `BASE_URL`: URL หลักของระบบ (เช่น UAT หรือ Production)
- `ADMIN_USER` / `ADMIN_PASS`: ข้อมูลสำหรับ Login
- `TEST_DATA_DIR`: โฟลเดอร์ที่เก็บไฟล์ Excel (ค่าเริ่มต้นคือ `data/prprocess`)

---

## 📊 การจัดการเทสเคส (Test Case Management)

### การสร้างไฟล์ Excel (Scenario Generation)
คุณสามารถแก้ไขสคริปต์ใน `data/prprocess/generate_excel.js` เพื่อกำหนด Scenario และชุดข้อมูล จากนั้นรันคำสั่งเพื่อสร้างไฟล์ Excel
```bash
node data/prprocess/generate_excel.js
```
ไฟล์ Excel จะถูกสร้างขึ้นที่ `data/prprocess/test_cases.xlsx`

---

## 🧪 การรันเทส (Running Tests)

### รันเทสทั้งหมด
```bash
npx playwright test
```

### รันเฉพาะเทสแบบ Keyword-Driven (จาก Excel)
```bash
npx playwright test test/sa_excel_driven.spec.js
```

### รันเทสแบบปกติ (Recorded Specs)
```bash
npx playwright test test/prprocess/spec/
```

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

- `data/prprocess/`: เก็บสคริปต์สร้าง Excel และไฟล์ Excel ของโปรเจกต์ PR Process
- `test/prprocess/spec/`: เก็บเทสไฟล์รูปแบบปกติ (Record/Script)
- `test/utils/`: รวม Utility ต่างๆ ของระบบ
    - `coreKeywords.js`: คำสั่งพื้นฐาน (GOTO, CLICK, FILL, etc.)
    - `projectKeywords.js`: คำสั่งเฉพาะของโปรเจกต์ (Flutter, Login, Turnstile)
    - `keywordMapper.js`: จุดรวมการเรียกใช้งาน Keyword ทั้งหมด
    - `excelGenerator.js`: เครื่องมือช่วยสร้างไฟล์ Excel ที่นำไปใช้ซ้ำได้
- `test/sa_excel_driven.spec.js`: Engine หลักที่ใช้อ่านไฟล์ Excel และรันเทสอัตโนมัติ

---

## 📖 การใช้งาน Keywords (Keyword Usage)

โปรเจกต์นี้แบ่ง Keyword ออกเป็น 2 ประเภทหลัก เพื่อความยืดหยุ่นและการนำไปใช้ซ้ำ

### 1. Core Keywords (`coreKeywords.js`)
เป็นคำสั่งมาตรฐานของ Playwright ที่ใช้ได้กับทุกเว็บโปรเจกต์ เน้นการสั่งงานผ่าน Role หรือ Text ทั่วไป

| Action | Target | Data | Description |
| :--- | :--- | :--- | :--- |
| `GOTO` | `URL` | - | ไปยัง URL ที่ระบุ |
| `FILL_ROLE` | `label`, `id` หรือ `role\|name` | `value` | กรอกข้อมูลใน Input (รองรับการรอ, Scroll และหาด้วย ID/Label/Semantic อัตโนมัติ) |
| `CLICK_ROLE` | `label`, `id` หรือ `role\|name` | - | คลิกที่ Element (รองรับการหาด้วย ID/Label/Role/Semantic อัตโนมัติ) |
| `WAIT_TIME` | `ms` | - | รอเวลาตามที่ระบุ (มิลลิวินาที) |
| `FILL_LOCATOR` | `selector` | `value` | กรอกข้อมูลโดยใช้ CSS/XPath selector (รองรับการรอและการ Scroll อัตโนมัติ) |
| `CLICK_TEXT_ROLE` | `label`, `id` หรือ `role\|name` | - | คลิกที่ Element แบบตรงตัว (รองรับการหาด้วย Exact Text หรือ ID/Semantic) |
| `CLICK_ID` | `id` | `force` (optional) | คลิกที่ Element โดยใช้ HTML ID หรือ Flutter Semantic ID |
| `FILL_ID` | `id` | `value` | กรอกข้อมูลใน Element โดยใช้ HTML ID หรือ Flutter Semantic ID |
| `CHECK_RESULT` | `mode\|selector` | `pass` หรือ `fail` | ตรวจสอบผลลัพธ์ (รองรับ id, text, url, etc.) |

> [!TIP]
> **CHECK_RESULT** รองรับหลายโหมด เช่น:
> - `text|สำเร็จ` (เช็คข้อความบนหน้า)
> - `url|/dashboard` (เช็ค URL หลัง Redirect)
> - `id|element_id` (เช็ค HTML ID หรือ Flutter Semantic ID)
> - `role|button,ตกลง` (เช็ค Role และชื่อ)

### 2. Project Keywords (`projectKeywords.js`)
เป็นคำสั่งที่สร้างขึ้นมาเพื่อแก้ปัญหาเฉพาะของโปรเจกต์ **PR Process** (ซึ่งพัฒนาด้วย Flutter Web) หรือ Workflow ทางธุรกิจ

| Action | Target | Data | Description |
| :--- | :--- | :--- | :--- |
| `LOGIN` | - | - | ทำการ Login เข้าสู่ระบบ (ใช้ ADMIN_USER/PASS จาก .env) |
| `CLICK_FLT` | `id` | `force` (optional) | คลิก Element โดยใช้ HTML ID หรือ Flutter Semantic ID |
| `SELECT_FLT` | `id` | `label` | เลือกค่าจาก Dropdown โดยใช้ ID (HTML/Flutter) |
| `PICK_DATETIME` | `button-label` | `date\|HH:mm` | เลือกวันที่และเวลาจาก Picker (เช่น `15\|10:30`) |
| `BYPASS_TURNSTILE` | - | - | คลิกผ่าน Cloudflare Turnstile (Captcha) อัตโนมัติ |
| `SCROLL_TO_FLT` | `id` | - | เลื่อนหน้าจอไปที่ Element โดยใช้ ID (HTML/Flutter) |

---

## 🛠 การเพิ่ม Keyword ใหม่

หากต้องการเพิ่มคำสั่งใหม่:

1. หากเป็นคำสั่งทั่วไป ให้เพิ่มใน `test/utils/coreKeywords.js`
2. หากเป็นคำสั่งเฉพาะทางธุรกิจ ให้เพิ่มใน `test/utils/projectKeywords.js`
3. เรียกใช้งานได้ทันทีในสคริปต์ `generate_excel.js` โดยระบุชื่อ Action ให้ตรงกัน
