# AI Collaboration Protocol

## 🏁 Standard Closing Protocol (DoD)
1. **Sync Files:** Write all code/plans to disk.
2. **Update Todo:** Mark [x] in docs/todo.md with `@User/@Agent`.
3. **Identity Check:** Stop & ask for User Name if unknown.
4. **Portability Check:** NO absolute paths in any documentation.
5. **Audit Log:** Append summary to todo.md.
6. **Manual Maintenance:** อัปเดตไฟล์คู่มือ (`docs/project_manual.md`) ทุกครั้งที่มีการเปลี่ยนแปลงฟีเจอร์หรือโครงสร้างสำคัญ

## ⚠️ Zero Assumption Policy
If any requirement is ambiguous or conflicts with the existing state, STOP and interview the user immediately.
