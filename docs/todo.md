# Project Todo & Progress

## 📈 Phase 1: Project Discovery & Context Initialization

- [x] Bootstrap context files (Plan: N/A, Requested by: @p-jack, Executed by: @Agent)
- [x] Interview user to establish identity and requirements (Requested by: @p-jack, Executed by: @Agent)

## 📈 Phase 2: Excel-Driven Framework Architecture

- [x] Draft Implementation Plan: `docs/plans/20260324_01_excel_keyword_driven_framework.md` (Requested by: @p-jack, Executed by: @Agent)
- [x] Implement Excel Runner and Keyword Mapping Engine (Requested by: @p-jack, Executed by: @Agent)
- [x] Create Test Material Template for SAs (Requested by: @p-jack, Executed by: @Agent)

## 📈 Phase 3: Framework Enhancements

- [x] Implement robust keyword actions (SCREENSHOT, LOGIN, DOWNLOAD_ROLE, CLICK_TEXT) (Requested by: @p-jack, Executed by: @Agent)
- [x] Dynamically load all CSV scenarios inside spec runner (Requested by: @p-jack, Executed by: @Agent)
- [x] Convert existing `filter_name_download_file.spec.js` to CSV template (Requested by: @p-jack, Executed by: @Agent)

## 📈 Phase 4: Excel Multi-Sheet Migration

- [x] Draft Implementation Plan: `docs/plans/20260324_02_migrate_to_excel.md` (Requested by: @p-jack, Executed by: @Agent)
- [x] Install `xlsx` and replace CSV runners with `excelRunner.js` (Requested by: @p-jack, Executed by: @Agent)
- [x] Update spec runner to dynamically create tests per sheet (Requested by: @p-jack, Executed by: @Agent)
- [x] Migrate existing standard CSVs to `scenarios.xlsx` (Requested by: @p-jack, Executed by: @Agent)

## 📈 Phase 5: Variable Data-Driven Injection

- [x] Draft Implementation Plan: `docs/plans/20260324_03_data_driven_variables.md` (Requested by: @p-jack, Executed by: @Agent)
- [x] Upgrade `excelRunner.js` to support cross-sheet datasets (Requested by: @p-jack, Executed by: @Agent)
- [x] Implement `variableInjector.js` (Requested by: @p-jack, Executed by: @Agent)
- [x] Update `sa_excel_driven.spec.js` to iterate loops based on Data (Requested by: @p-jack, Executed by: @Agent)

## 📈 Phase 6: Full Scenario Migration

- [x] Draft Implementation Plan: `docs/plans/20260324_04_full_scenario_migration.md`
- [x] Add new advanced keywords (`SCROLL`, `PRESS_ROLE`, `WAIT_RACE_SUCCESS`)
- [x] Convert `create_request` and `edit_request` to Excel logic
- [x] Delete legacy specific `.spec` scripts

## 📈 Phase 7: Full Coverage Test Scenarios

- [x] Draft Implementation Plan: `docs/plans/20260327_05_all_scenarios.md` (Requested by: @p-jack, Executed by: @Antigravity)
- [x] Rewrite `test_data/generate_excel.js` with all 9 TC sheets + 2 Data sheets (Requested by: @p-jack, Executed by: @Antigravity)
- [x] Regenerate `test_data/test_cases.xlsx` — 12 Playwright tests detected (Requested by: @p-jack, Executed by: @Antigravity)

## 📈 Phase 8: Login Multi-Case Data-Driven Testing

- [x] Draft Implementation Plan: `docs/plans/20260327_06_login_test_cases.md` (Requested by: @p-jack, Executed by: @Antigravity)
- [x] Update `test_data/generate_excel.js` to add TC10_Login_MultiCase with valid/invalid credentials (Requested by: @p-jack, Executed by: @Antigravity)
- [x] Regenerate `test_cases.xlsx` — 11 Playwright tests detected (Requested by: @p-jack, Executed by: @Antigravity)

## 📈 Phase 9: Excel Test Case Generation from Manual Testing

- [x] Research and Draft Plan for Excel Test Case Generation (Requested by: @p-jack, Executed by: @Antigravity)
- [x] Implement or document process for converting manual tests to Excel (Requested by: @p-jack, Executed by: @Antigravity)
- [x] Convert `login.spec.ts` to Excel test case (Requested by: @p-jack, Executed by: @Antigravity)
- [/] Migrate `create_request_external.spec.ts` and `create_request.spec.ts` to Excel (Plan: [docs/plans/20260331_01_migrate_request_creation.md](../docs/plans/20260331_01_migrate_request_creation.md), Requested by: @p-jack, Executed by: @Antigravity)

---

## 🐞 Known Defects / Tech Debt
- **[BUG-001] TC_UI_13 (Job Edit)**: การเลือกสถานะ `NEXT_CYCLE` ไม่สามารถบันทึกค่าได้ (เมื่อบันทึกแล้วระบบจะเด้งกลับเป็น `IMMEDIATE`) 
  - *Workaround in Test:* ใช้ `Data: "fail"` ในคำสั่ง `CHECK_RESULT` เพื่อ Bypass error สีแดงชั่วคราว จนกว่าฝั่ง Dev จะแก้ไขเสร็จ (ค่อยปรับกลับเป็น `Data: "pass"`)

---

## 📝 Audit Log

- **2026-03-24**: Initialized baseline project context structure. Gathered project requirements: testing prprocess customer case reception on Flutter Web at mspservice-uat.freewillgroup.com. (Requested by: @p-jack).
- **2026-03-27**: Completed Phase 6-8. Reconstructed `generate_excel.js`, established full coverage scenarios including `TC10_Login_MultiCase`. (Requested by: @p-jack, Executed by: @Antigravity).
- **2026-03-30**: Started Phase 9. Investigating how to convert manual/recorded tests into the Excel Keyword-Driven format. (Requested by: @p-jack, Executed by: @Antigravity).
- **2026-03-31**: Drafting implementation plan for migrating `create_request_external.spec.ts` and `create_request.spec.ts` to Excel-driven framework. (Requested by: @p-jack, Executed by: @Antigravity).
