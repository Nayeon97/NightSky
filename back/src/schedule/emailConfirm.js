import nodemailer from "nodemailer";

console.log(process.env.NODEMAILER_PASS);
let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "hosanfordevelop@gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "hosahn13@gmail.com",
    pass: "cxgwagqzkgegajzx",
  },
});
const text = "오늘의 도전과제를 아직 완료하지 않으셨습니다!";
await transporter.sendMail({
  from: `"밤하늘" <${process.env.NODEMAILER_USER}>`,
  to: "hosahn13@gmail.com",
  subject: "Auth Number",
  text: text,
  html: `<b>${text}</b>`,
});
