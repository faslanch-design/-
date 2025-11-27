import { Question, LikertQuestion } from './types';

// Video URL (Modified based on user request)
export const VIDEO_EMBED_URL = "https://drive.google.com/file/d/1MHZjjp5ifLES8L4YIhpBdxJFiYZ30hNj/preview";

export const CONTENT_TITLE = "หัวน้ำนม (Colostrum) หรือน้ำนมเหลือง";
export const CONTENT_DESCRIPTION = `คือสารคัดหลั่งแรกที่ผลิตโดยต่อมน้ำนมในช่วงปลายการตั้งครรภ์และ 2-3 วันแรกหลังคลอด มีลักษณะข้นเหนียว สีเหลืองทอง เปรียบเสมือน "วัคซีนหยดแรก" ของลูก

ความสำคัญของหัวน้ำนม:
1. มีภูมิคุ้มกันสูงมาก ช่วยป้องกันการติดเชื้อ
2. ช่วยขับขี้เทา ลดอาการตัวเหลืองในทารกแรกเกิด
3. ช่วยเคลือบกระเพาะอาหารและลำไส้
4. มีสารอาหารครบถ้วน เหมาะสมกับระบบย่อยของทารก

คุณแม่ควรพยายามให้ลูกดูดนมทันทีหลังคลอด ภายใน 1 ชั่วโมงแรก เพื่อกระตุ้นการสร้างน้ำนมและสร้างสายใยความผูกพัน`;

export const EDUCATION_LEVELS = [
  "ประถมศึกษา",
  "มัธยมศึกษาตอนต้น",
  "มัธยมศึกษาตอนปลาย/ปวช.",
  "อนุปริญญา/ปวส.",
  "ปริญญาตรี",
  "สูงกว่าปริญญาตรี"
];

export const PARENTING_EXP = [
  "ไม่เคยมีบุตร (ท้องแรก)",
  "เคยมีบุตรแล้ว"
];

export const DELIVERY_METHODS = [
  "คลอดธรรมชาติ",
  "ผ่าตัดคลอด"
];

// 10 Sample Questions based on "Importance of First Drop of Breast Milk" (Colostrum)
// These replicate the structure of a pre/post test.
export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "ลักษณะน้ำนมเหลือง (Colostrum) ที่ปกติ?",
    options: [
      { id: "A", text: "สีขาวขุ่น พุ่งแรง" },
      { id: "B", text: "สีเหลืองข้น เหนียว (หยด)" },
      { id: "C", text: "ใสเหมือนน้ำ" },
    ],
    correctAnswerId: "B",
  },
  {
    id: 2,
    question: "สารอาหารสำคัญที่สุดในน้ำนมเหลือง?",
    options: [
      { id: "A", text: "ไขมัน" },
      { id: "B", text: "ภูมิคุ้มกัน (วัคซีนหยดแรก)" },
      { id: "C", text: "น้ำตาล" },
    ],
    correctAnswerId: "B",
  },
  {
    id: 3,
    question: "ขนาดกระเพาะทารกแรกเกิด?",
    options: [
      { id: "A", text: "ลูกแก้ว (5-7 cc)" },
      { id: "B", text: "ไข่ไก่" },
      { id: "C", text: "ถ้วยกาแฟ" },
    ],
    correctAnswerId: "A",
  },
  {
    id: 4,
    question: "ช่วงเวลาทอง (Golden Hour) นำลูกเข้าเต้า?",
    options: [
      { id: "A", text: "ภายใน 1 ชม. แรก" },
      { id: "B", text: "หลัง 6 ชม." },
      { id: "C", text: "รอน้ำนมมา" },
    ],
    correctAnswerId: "A",
  },
  {
    id: 5,
    question: "ประโยชน์ต่อการขับถ่ายลูก?",
    options: [
      { id: "A", text: "ขับขี้เทา ลดตัวเหลือง" },
      { id: "B", text: "หลับนาน" },
      { id: "C", text: "อึแข็ง" },
    ],
    correctAnswerId: "A",
  },
  {
    id: 6,
    question: "ลูกร้องกวน 2-3 วันแรก ทำอย่างไร?",
    options: [
      { id: "A", text: "ป้อนน้ำ" },
      { id: "B", text: "ให้นมผสม" },
      { id: "C", text: "ดูดกระตุ้นแม่บ่อยขึ้น" },
    ],
    correctAnswerId: "C",
  },
  {
    id: 7,
    question: "ข้อใด \"ผิด\" (ห้ามทำ)?",
    options: [
      { id: "A", text: "แม่ผ่าคลอดตะแคงให้นม" },
      { id: "B", text: "เช็ดหัวนมด้วยแอลกอฮอล์" },
      { id: "C", text: "ดูดบ่อยนมยิ่งมา" },
    ],
    correctAnswerId: "B",
  },
  {
    id: 8,
    question: "ความถี่ในการให้นมช่วงแรก?",
    options: [
      { id: "A", text: "3 มื้อ" },
      { id: "B", text: "ทุกครั้งที่หิว (8-12 ครั้ง/วัน)" },
      { id: "C", text: "เฉพาะกลางวัน" },
    ],
    correctAnswerId: "B",
  },
  {
    id: 9,
    question: "อาการที่บอกว่าลูก \"อิ่มพอ\"?",
    options: [
      { id: "A", text: "หลับตลอดวัน" },
      { id: "B", text: "ฉี่ใส ชุ่มผ้าอ้อม (6 ครั้ง+)" },
      { id: "C", text: "ถ่ายวันเว้นวัน" },
    ],
    correctAnswerId: "B",
  },
  {
    id: 10,
    question: "ผลดีต่อ \"แม่\" เมื่อลูกดูดเร็ว?",
    options: [
      { id: "A", text: "มดลูกหดรัดตัวดี ลดตกเลือด" },
      { id: "B", text: "น้ำหนักลดทันที 10kg" },
      { id: "C", text: "หน้าอกไม่หย่อน" },
    ],
    correctAnswerId: "A",
  },
];

export const LIKERT_QUESTIONS: LikertQuestion[] = [
  { id: 1, text: "เนื้อหามีประโยชน์ เข้าใจง่าย" },
  { id: 2, text: "สื่อการสอน (ภาพ/หุ่น/วิดีโอ) ชัดเจน" },
  { id: 3, text: "เจ้าหน้าที่พูดจาสุภาพ เป็นกันเอง" },
  { id: 4, text: "เจ้าหน้าที่ตอบคำถามได้ชัดเจน" },
  { id: 5, text: "ความรวดเร็ว/การอำนวยความสะดวก" },
  { id: 6, text: "ภาพรวมความพึงพอใจ" },
];