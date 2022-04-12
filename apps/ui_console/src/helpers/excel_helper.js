import moment from "moment";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { durationCalculator, dateFormatterExcel } from "../helpers/date_helpers";

export const DetailsExcelExport = async (parkingrecord, count, totalprice) => {
  console.log("in excel");
  try {
    const data = parkingrecord;
    console.log("In excel");
    console.log(data);
    const dateStr = moment().format("YYYYMMDD_hhmmss");
    const filename = `detail_report_${dateStr}`;
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "IV";
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.properties.date1904 = true;
    const sheet = workbook.addWorksheet("Detail");
    sheet.addRow(["Date", "Total Count", "Total Amount"]);
    sheet.addRow([new Date(), count, totalprice]);
    sheet.addRow();

    const rowValues = [];
    rowValues[1] = "ဝယ်သူအမည်";
    rowValues[2] = "နေရပ်";
    rowValues[3] = "Phone";
    rowValues[4] = "ကြွေးကျန်";
    sheet.addRow(rowValues);

    data.forEach((pr) => {
      const rowValues = [];
      rowValues[1] = pr.name;
      rowValues[2] = pr.address;
      rowValues[3] = pr.phone;
      rowValues[4] = pr.amount;
      sheet.addRow(rowValues);
    });

    sheet.getCell("A2").numFmt = "dd/mm/yyyy";
    console.log(workbook);
    const buffer = await workbook.xlsx.writeBuffer();
    console.log(buffer);
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const fileExtension = ".xlsx";

    const blob = new Blob([buffer], { type: fileType });
    saveAs(blob, filename + fileExtension);
  } catch {}
};

export const ShiftExcelExport = async (parkingrecord, from, to) => {
  console.log("in excel");
  try {
    const data = parkingrecord;
    console.log(data);
    const dateStr = moment().format("YYYYMMDD_hhmmss");
    const filename = `shift_report_${dateStr}`;
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "IV";
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.properties.date1904 = true;
    const sheet = workbook.addWorksheet("Detail");
    sheet.addRow(["From", "To"]);
    sheet.addRow([new Date(from), new Date(to)]);
    sheet.addRow();
    const rowValues = [];
    rowValues[1] = "Shift";
    rowValues[2] = "Car Count";
    rowValues[3] = "Total Parking Fee";
    sheet.addRow(rowValues);

    data.forEach((pr) => {
      const rowValues = [];
      rowValues[1] = pr.shift;
      rowValues[2] = parseInt(pr.count);
      rowValues[3] = parseFloat(pr.amount);
      sheet.addRow(rowValues);
    });
    sheet.getCell("A2").numFmt = "dd/mm/yyyy";
    sheet.getCell("B2").numFmt = "dd/mm/yyyy";
    console.log(workbook);
    const buffer = await workbook.xlsx.writeBuffer();
    console.log(buffer);
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const fileExtension = ".xlsx";

    const blob = new Blob([buffer], { type: fileType });
    saveAs(blob, filename + fileExtension);
  } catch {}
};

export const AmountExcelExport = async (parkingrecord, from, to) => {
  console.log("in excel");
  try {
    const data = parkingrecord;
    console.log(data);
    const dateStr = moment().format("YYYYMMDD_hhmmss");
    const filename = `amount_report_${dateStr}`;
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "IV";
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.properties.date1904 = true;
    const sheet = workbook.addWorksheet("Detail");
    sheet.addRow(["From", "To"]);
    sheet.addRow([new Date(from), new Date(to)]);
    sheet.addRow();
    const rowValues = [];
    rowValues[1] = "Amount";
    rowValues[2] = "Car Count";
    rowValues[3] = "Total Parking Fee";
    sheet.addRow(rowValues);

    data.forEach((pr) => {
      const rowValues = [];
      rowValues[1] = pr.collected_amount;
      rowValues[2] = pr.count;
      rowValues[3] = pr.amount;
      sheet.addRow(rowValues);
    });
    sheet.getCell("A2").numFmt = "dd/mm/yyyy";
    sheet.getCell("B2").numFmt = "dd/mm/yyyy";
    console.log(workbook);
    const buffer = await workbook.xlsx.writeBuffer();
    console.log(buffer);
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const fileExtension = ".xlsx";

    const blob = new Blob([buffer], { type: fileType });
    saveAs(blob, filename + fileExtension);
  } catch {}
};

export const OperatorExcelExport = async (parkingrecord, from, to) => {
  console.log("in excel");
  try {
    const data = parkingrecord;
    console.log(data);
    const dateStr = moment().format("YYYYMMDD_hhmmss");
    const filename = `operator_report_${dateStr}`;
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "IV";
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.properties.date1904 = true;
    const sheet = workbook.addWorksheet("Detail");
    sheet.addRow(["From", "To"]);
    sheet.addRow([new Date(from), new Date(to)]);
    sheet.addRow();
    const rowValues = [];
    rowValues[1] = "Operator";
    rowValues[2] = "Car Count";
    rowValues[3] = "Total Parking Fee";
    sheet.addRow(rowValues);

    data.forEach((pr) => {
      const rowValues = [];
      rowValues[1] = pr.operator;
      rowValues[2] = pr.count;
      rowValues[3] = pr.amount;
      sheet.addRow(rowValues);
    });
    sheet.getCell("A2").numFmt = "dd/mm/yyyy";
    sheet.getCell("B2").numFmt = "dd/mm/yyyy";
    console.log(workbook);
    const buffer = await workbook.xlsx.writeBuffer();
    console.log(buffer);
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const fileExtension = ".xlsx";

    const blob = new Blob([buffer], { type: fileType });
    saveAs(blob, filename + fileExtension);
  } catch {}
};

export const VehicleClassExcelExport = async (parkingrecord, from, to) => {
  console.log("in excel");
  try {
    const data = parkingrecord;
    console.log(data);
    const dateStr = moment().format("YYYYMMDD_hhmmss");
    const filename = `vehicle_class_report_${dateStr}`;
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "IV";
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.properties.date1904 = true;
    const sheet = workbook.addWorksheet("Detail");
    sheet.addRow(["From", "To"]);
    sheet.addRow([new Date(from), new Date(to)]);
    sheet.addRow();
    const rowValues = [];
    rowValues[1] = "Vehicle Class";
    rowValues[2] = "Car Count";
    rowValues[3] = "Total Parking Fee";
    sheet.addRow(rowValues);

    data.forEach((pr) => {
      const rowValues = [];
      rowValues[1] = pr.vehicle_class;
      rowValues[2] = pr.count;
      rowValues[3] = pr.amount;
      sheet.addRow(rowValues);
    });
    sheet.getCell("A2").numFmt = "dd/mm/yyyy";
    sheet.getCell("B2").numFmt = "dd/mm/yyyy";
    console.log(workbook);
    const buffer = await workbook.xlsx.writeBuffer();
    console.log(buffer);
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const fileExtension = ".xlsx";

    const blob = new Blob([buffer], { type: fileType });
    saveAs(blob, filename + fileExtension);
  } catch {}
};

export const HourExcelExport = async (parkingrecord, from, to) => {
  console.log("in excel");
  try {
    const data = parkingrecord;
    console.log(data);
    const dateStr = moment().format("YYYYMMDD_hhmmss");
    const filename = `hour_report_${dateStr}`;
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "IV";
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.properties.date1904 = true;
    const sheet = workbook.addWorksheet("Detail");
    sheet.addRow(["From", "To"]);
    sheet.addRow([new Date(from), new Date(to)]);
    sheet.addRow();
    const rowValues = [];
    rowValues[1] = "";
    rowValues[2] = "Date";
    rowValues[3] = "Hour";
    rowValues[4] = "Car Count";
    rowValues[5] = "Total Parking Fee";
    sheet.addRow(rowValues);
    let newdate = "";

    data.forEach((pr) => {
      console.log(pr.date);
      let dateonly = dateFormatterExcel(pr.date);
      console.log(newdate);
      if (newdate == dateonly) {
        rowValues[1] = "";
      } else {
        rowValues[1] = dateFormatterExcel(pr.date);
      }
      rowValues[2] = dateFormatterExcel(pr.date);
      newdate = dateFormatterExcel(pr.date);
      if (pr.hour === "Total") {
        rowValues[1] = "Total";
        rowValues[3] = "";
      } else {
        rowValues[3] = pr.hour;
      }
      rowValues[4] = pr.count;
      rowValues[5] = pr.amount;
      sheet.addRow(rowValues);
    });
    sheet.getCell("A2").numFmt = "dd/mm/yyyy";
    sheet.getCell("B2").numFmt = "dd/mm/yyyy";
    console.log(workbook);
    const buffer = await workbook.xlsx.writeBuffer();
    console.log(buffer);
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const fileExtension = ".xlsx";

    const blob = new Blob([buffer], { type: fileType });
    saveAs(blob, filename + fileExtension);
  } catch {}
};

export const SalePrint = async (saleRecord, date) => {
  console.log("in excel");
  try {
    const data = saleRecord;
    console.log(data);
    const dateStr = moment().format("YYYYMMDD_hhmmss");
    const filename = `shift_report_${dateStr}`;
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "IV";
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.properties.date1904 = true;
    const sheet = workbook.addWorksheet("Detail");
    // sheet.addRow(["From", "To"]);
    //sheet.addRow([new Date(from), new Date(to)]);
    //.addRow();
    const rowValues = [];
    rowValues[1] = "Shift";
    rowValues[2] = "Car Count";
    rowValues[3] = "Total Parking Fee";
    sheet.addRow(rowValues);

    sheet.getCell("A2").numFmt = "dd/mm/yyyy";
    sheet.getCell("B2").numFmt = "dd/mm/yyyy";
    console.log(workbook);
    const buffer = await workbook.xlsx.writeBuffer();
    console.log(buffer);
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const fileExtension = ".xlsx";

    const blob = new Blob([buffer], { type: fileType });
    saveAs(blob, filename + fileExtension);
  } catch {}
};
