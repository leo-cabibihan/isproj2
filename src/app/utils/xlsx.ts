import * as XLSX from 'xlsx';

export async function handleTableExport(data: any, filename: any) {
//THIS GENERATES AN EXCEL WORKSHEET
const worksheet = XLSX.utils.json_to_sheet(data);

//THIS GENERATES AN EXCEL WORKBOOK
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Exported Data")

//THIS WRITES THE EXPORTED FILE
XLSX.writeFile(workbook, `${filename}.xlsx`, { compression: true })

return console.log("FILE EXPORTED SUCCESSFULLY!")
}