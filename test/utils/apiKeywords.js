/**
 * API Keywords สำหรับ Playwright API Testing
 * ทุก keyword รับ (request, target, data) — ไม่ใช้ page/browser
 *
 * Keywords ที่รองรับ:
 * ┌────────────────────┬───────────────────────────────────────────────────────────┐
 * │ Keyword            │ รายละเอียด                                                │
 * ├────────────────────┼───────────────────────────────────────────────────────────┤
 * │ SET_BASE_URL       │ กำหนด Base URL ของ API                                    │
 * │ SET_HEADER         │ กำหนด Request Header (Target=key, Data=value)             │
 * │ CLEAR_HEADERS      │ ล้าง headers ทั้งหมด                                      │
 * │ SET_VAR            │ เก็บค่าตัวแปรไว้ใช้ใน step ถัดไป (Target=name, Data=val) │
 * │ API_GET            │ HTTP GET  (Target=path หรือ full URL)                     │
 * │ API_POST           │ HTTP POST (Target=path, Data=JSON string หรือ text)       │
 * │ API_PUT            │ HTTP PUT  (Target=path, Data=JSON string หรือ text)       │
 * │ API_PATCH          │ HTTP PATCH (Target=path, Data=JSON string หรือ text)      │
 * │ API_DELETE         │ HTTP DELETE (Target=path)                                 │
 * │ CHECK_STATUS       │ ตรวจสอบ HTTP Status Code                                  │
 * │ CHECK_BODY         │ ตรวจสอบว่า Response Body มีข้อความนี้หรือไม่             │
 * │ CHECK_JSON         │ ตรวจสอบค่าใน JSON path (dot-notation) กับ Data           │
 * │ STORE_JSON         │ เก็บค่าจาก JSON path ลงตัวแปร (Target=path, Data=varName)│
 * │ LOG_RESPONSE       │ แสดง Response ออก console                                 │
 * └────────────────────┴───────────────────────────────────────────────────────────┘
 */

// ─── Module-level state ────────────────────────────────────────────────────────
let _baseUrl = '';
let _headers = {};
let _lastResponse = null;
let _lastResponseText = null;
let _lastResponseJson = null;
let _vars = {};

/** แทน {{VAR_NAME}} ใน string ด้วยค่าตัวแปรที่เก็บไว้ */
function interpolate(str) {
  if (!str) return str;
  return str.replace(/\{\{(\w+)\}\}/g, (_, name) => _vars[name] ?? `{{${name}}}`);
}

/** สร้าง full URL จาก target (อาจเป็น path หรือ full URL) */
function resolveUrl(target) {
  const t = interpolate(target);
  return t.startsWith('http') ? t : `${_baseUrl}${t}`;
}

/** parse body: ถ้า JSON string → object, ถ้าไม่ใช่ → string ธรรมดา */
function parseBody(data) {
  if (!data) return undefined;
  const d = interpolate(data);
  try {
    if (d.trim().startsWith('{') || d.trim().startsWith('[')) {
      return JSON.parse(d);
    }
  } catch (_) { }
  return d;
}

/** เข้าถึง JSON path แบบ dot-notation เช่น "data.user.id" */
function getJsonPath(json, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], json);
}

// ─── Cache response text/json เพื่อไม่ต้องเรียกซ้ำ ─────────────────────────
async function cacheResponse() {
  if (!_lastResponse) return;
  _lastResponseText = await _lastResponse.text();
  try {
    _lastResponseJson = JSON.parse(_lastResponseText);
  } catch (_) {
    _lastResponseJson = null;
  }
}

// ─── API Keywords ──────────────────────────────────────────────────────────────
export const apiKeywords = {

  SET_BASE_URL: async (request, target, data) => {
    _baseUrl = interpolate(target)?.replace(/\/$/, '') ?? '';
    console.log(`  🌐 Base URL: ${_baseUrl}`);
  },

  SET_HEADER: async (request, target, data) => {
    _headers[target] = interpolate(data);
    console.log(`  📋 Header set: ${target} = ${_headers[target]}`);
  },

  CLEAR_HEADERS: async (request, target, data) => {
    _headers = {};
    console.log('  🗑️ Headers cleared');
  },

  SET_VAR: async (request, target, data) => {
    _vars[target] = interpolate(data);
    console.log(`  📌 Variable set: ${target} = ${_vars[target]}`);
  },

  // ─── HTTP Methods ────────────────────────────────────────────────────────────

  API_GET: async (request, target, data) => {
    const url = resolveUrl(target);
    _lastResponse = await request.get(url, { headers: _headers });
    await cacheResponse();
    console.log(`  ➡️  GET  [${url}] → ${_lastResponse.status()} ${_lastResponse.statusText()}`);
  },

  API_POST: async (request, target, data) => {
    const url = resolveUrl(target);
    const body = parseBody(data);
    const isJson = body && typeof body === 'object';
    _lastResponse = await request.post(url, {
      headers: isJson
        ? { 'Content-Type': 'application/json', ..._headers }
        : _headers,
      data: body,
    });
    await cacheResponse();
    console.log(`  ➡️  POST [${url}] → ${_lastResponse.status()} ${_lastResponse.statusText()}`);
  },

  API_PUT: async (request, target, data) => {
    const url = resolveUrl(target);
    const body = parseBody(data);
    const isJson = body && typeof body === 'object';
    _lastResponse = await request.put(url, {
      headers: isJson
        ? { 'Content-Type': 'application/json', ..._headers }
        : _headers,
      data: body,
    });
    await cacheResponse();
    console.log(`  ➡️  PUT  [${url}] → ${_lastResponse.status()} ${_lastResponse.statusText()}`);
  },

  API_PATCH: async (request, target, data) => {
    const url = resolveUrl(target);
    const body = parseBody(data);
    const isJson = body && typeof body === 'object';
    _lastResponse = await request.patch(url, {
      headers: isJson
        ? { 'Content-Type': 'application/json', ..._headers }
        : _headers,
      data: body,
    });
    await cacheResponse();
    console.log(`  ➡️  PATCH[${url}] → ${_lastResponse.status()} ${_lastResponse.statusText()}`);
  },

  API_DELETE: async (request, target, data) => {
    const url = resolveUrl(target);
    _lastResponse = await request.delete(url, { headers: _headers });
    await cacheResponse();
    console.log(`  ➡️  DEL  [${url}] → ${_lastResponse.status()} ${_lastResponse.statusText()}`);
  },

  // ─── Assertions ──────────────────────────────────────────────────────────────

  /**
   * CHECK_STATUS: ตรวจสอบ HTTP Status Code
   * Target: status code ที่คาดหวัง เช่น "200"
   * Data:   "pass" หรือ "fail" (default: pass)
   */
  CHECK_STATUS: async (request, target, data) => {
    if (!_lastResponse) throw new Error('❌ CHECK_STATUS: ยังไม่มี API response — กรุณาเรียก API keyword ก่อน');
    const expected = interpolate(target);
    const actual = _lastResponse.status().toString();
    const expectPass = (data?.toString().toLowerCase() ?? 'pass') !== 'fail';
    const isMatch = actual === expected;
    _evaluate(`CHECK_STATUS`, `status=${expected}`, actual, isMatch, expectPass);
  },

  /**
   * CHECK_BODY: ตรวจสอบว่า Response body มีข้อความที่ระบุ (partial match)
   * Target: ข้อความที่ต้องการหา
   * Data:   "pass" หรือ "fail" (default: pass)
   */
  CHECK_BODY: async (request, target, data) => {
    if (!_lastResponse) throw new Error('❌ CHECK_BODY: ยังไม่มี API response');
    const expected = interpolate(target);
    const expectPass = (data?.toString().toLowerCase() ?? 'pass') !== 'fail';
    const isMatch = (_lastResponseText ?? '').includes(expected);
    const preview = (_lastResponseText ?? '').substring(0, 200);
    _evaluate(`CHECK_BODY`, `contains "${expected}"`, `body preview: ${preview}`, isMatch, expectPass);
  },

  /**
   * CHECK_JSON: ตรวจสอบค่าใน JSON path
   * Target: "jsonPath|expectedValue"  เช่น "data.name|John"
   * Data:   "pass" หรือ "fail" (default: pass)
   *
   * ตัวอย่าง:
   *   Target = "status|success"       → เช็ค json.status === "success"
   *   Target = "data.user.id|42"      → เช็ค json.data.user.id == "42"
   *   Target = "data.items.length|3"  → เช็ค items มี 3 รายการ
   */
  CHECK_JSON: async (request, target, data) => {
    if (!_lastResponse) throw new Error('❌ CHECK_JSON: ยังไม่มี API response');
    if (!_lastResponseJson) throw new Error('❌ CHECK_JSON: Response ไม่ใช่ JSON format');

    const pipeIdx = target.indexOf('|');
    if (pipeIdx === -1) throw new Error(`❌ CHECK_JSON: Target ต้องอยู่ในรูปแบบ "jsonPath|expectedValue" แต่ได้ "${target}"`);

    const jsonPath = interpolate(target.substring(0, pipeIdx).trim());
    const expected = interpolate(target.substring(pipeIdx + 1).trim());
    const expectPass = (data?.toString().toLowerCase() ?? 'pass') !== 'fail';

    let actual = getJsonPath(_lastResponseJson, jsonPath);
    // รองรับ array.length
    if (jsonPath.endsWith('.length') && Array.isArray(actual)) {
      actual = actual.length;
    }
    const actualStr = JSON.stringify(actual) ?? 'undefined';
    const isMatch = actualStr === expected || actualStr === `"${expected}"` || String(actual) === expected;

    _evaluate(`CHECK_JSON`, `${jsonPath} = "${expected}"`, actualStr, isMatch, expectPass);
  },

  /**
   * STORE_JSON: เก็บค่าจาก JSON path ลงตัวแปร เพื่อนำไปใช้ใน step ถัดไป
   * Target: JSON path เช่น "data.token"
   * Data:   ชื่อตัวแปร เช่น "AUTH_TOKEN"
   *
   * ใน step ถัดไปสามารถใช้ด้วย {{AUTH_TOKEN}} เช่น:
   *   SET_HEADER | Authorization | Bearer {{AUTH_TOKEN}}
   */
  STORE_JSON: async (request, target, data) => {
    if (!_lastResponseJson) throw new Error('❌ STORE_JSON: Response ไม่ใช่ JSON format');
    const jsonPath = interpolate(target);
    const varName = data?.trim();
    if (!varName) throw new Error('❌ STORE_JSON: Data ต้องระบุชื่อตัวแปร');

    const val = getJsonPath(_lastResponseJson, jsonPath);
    _vars[varName] = String(val ?? '');
    console.log(`  📌 Stored: ${varName} = ${_vars[varName]}`);
  },

  /**
   * LOG_RESPONSE: แสดง Response status + body ออก console
   * Target: ไม่จำเป็น (ถ้าระบุ จะตัดแสดง N ตัวอักษรแรก เช่น "500")
   */
  LOG_RESPONSE: async (request, target, data) => {
    if (!_lastResponse) {
      console.log('  ℹ️ LOG_RESPONSE: ยังไม่มี response');
      return;
    }
    const maxLen = parseInt(target, 10) || 1000;
    const preview = (_lastResponseText ?? '').substring(0, maxLen);
    console.log(`  📄 Response [${_lastResponse.status()}]:\n${preview}`);
  },
};

// ─── Internal helper ──────────────────────────────────────────────────────────
function _evaluate(keyword, check, actual, isMatch, expectPass) {
  const status = (expectPass && isMatch) || (!expectPass && !isMatch) ? '✅ PASS' : '❌ FAIL';
  const expectStr = expectPass ? 'expected: match' : 'expected: not match';
  const msg = `${keyword} [${check}] → ${status} | ${expectStr}, actual: ${actual}`;
  if ((expectPass && isMatch) || (!expectPass && !isMatch)) {
    console.log(`  ${msg}`);
  } else {
    throw new Error(msg);
  }
}
