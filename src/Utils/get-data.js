import * as xlsx from "xlsx";

export const fetchData = () => {
  return fetch("/DataSmaller.xlsx").then(async (res) => {
    const arrBuffer = await res.arrayBuffer();
    return new Uint8Array(arrBuffer);
  });
};

export const parseData = (dataBuffer) => {
  const workbook = xlsx.read(dataBuffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(sheet);
  return jsonData;
};
