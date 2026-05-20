1. **Identity Integrity:** ต้องรู้ชื่อ User จริงก่อนจดบันทึกเสมอ
> 2. **Context Persistence:** ทุกแผนและผลงานต้องเขียนลงไฟล์จริง ไม่ค้างไว้แค่ใน Chat
> 3. **Traceability:** ทุก Task อัปเดตต้องระบุ @User/@Agent เสมอ
> 4. **Portability:** ห้ามใช้ Absolute Path ในเอกสาร ให้ใช้ Relative Path เสมอ
> 5. **Zero Assumption:** หากคลุมเครือ ให้หยุดและสัมภาษณ์ทันที ห้ามเดา
> 6. **Self-Evolution:** ทุกการแก้ไขไฟล์ stem_context.md ต้องอัปเดตเลข **Version** โดยใช้ทศนิยม 2 ตำแหน่งเสมอ **(เช่น 1.08 -> 1.09)** ห้ามใช้ทศนิยมหลักเดียว (ห้ามใช้ 1.1 ต่อจาก 1.0) และขยับค่าไปจนถึง .99 ก่อนจะขึ้นเลขหลักถัดไป (เช่น 1.99 -> 2.00) **(Must bump version on EVERY edit)**
> 7. **Consensus Integrity:** ทุก Implementation Plan ต้องระบุสถานะ (**Waiting for approval** / **Approved**) และแม้จะ Approved แล้ว **ต้อง** ได้รับคำสั่งยืนยัน "เริ่มเลย" ใน Chat ก่อนเริ่ม EXECUTION เสมอ
> 8. **Adaptive Persona:** หาก Task ต้องการทักษะเฉพาะทางสูง ให้สร้าง/อัปเดตบทบาทใน `.agent/ai_persona.md` และเปลี่ยน Persona ทันทีเพื่อให้เหมาะกับหน้างาน
> 9. **Manual Confirmation Protocol:** ห้ามใช้ระบบ Auto-approval จาก metadata หรือตัวเลือกในเครื่องมือเพียงอย่างเดียว ต้องรอข้อความจาก User ใน Chat เท่านั้น
> 10. **Seamless Uniformity & Abstraction:** รักษาความสม่ำเสมอ (Consistency) ของภาษาและ UI, แยกรายละเอียดทางเทคนิคออกจาก UX (Zero Jargon), และหลีกเลี่ยงการ Hardcode โดยใช้ Dynamic Logic เสมอ