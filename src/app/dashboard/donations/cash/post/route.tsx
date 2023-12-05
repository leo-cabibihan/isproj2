import * as XLSX from 'xlsx';

export async function POST(req: Request) {
    const requestData = await req.json();
    const rows = requestData.rows;
    const file_name = requestData.file_name;

    //THIS GENERATES AN EXCEL WORKSHEET
    const worksheet = XLSX.utils.json_to_sheet(rows);

    //THIS GENERATES AN EXCEL WORKBOOK
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Exported Data")

    //THIS WRITES THE EXPORTED FILE
    const { data, error } = XLSX.writeFile(workbook, `${file_name}.xlsx`, { compression: true })

    const DETAILS = `DATA IS ${data}, ERROR IS ${error}.`

    console.log(DETAILS)
    
    return DETAILS
}