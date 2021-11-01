import xlsx from "xlsx";
import { addEmails } from "./addEmails.js";

const workbook = xlsx.readFile("./Registrations_for_workshop.html1-125.xlsx");
const sheet1Name = workbook.SheetNames[0];
const sheet1 = workbook.Sheets[sheet1Name];

const values = xlsx.utils.sheet_to_json(sheet1, {
  raw: true,
  range: "D1:D1000",
});

const emails = values.map((obj) => Object.values(obj)[0]);

await addEmails(emails);
