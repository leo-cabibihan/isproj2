import * as XLSX from 'xlsx';

const handleTableExport = async (data: any, filename: any) => {
    //THIS GENERATES AN EXCEL WORKSHEET
    const worksheet = XLSX.utils.json_to_sheet(data);

    //THIS GENERATES AN EXCEL WORKBOOK
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Exported Data")

    //THIS WRITES THE EXPORTED FILE
    XLSX.writeFile(workbook, `${filename}.xlsx`, { compression: true })

    return console.log("FILE EXPORTED SUCCESSFULLY!")
}

export async function POST(req: Request) {
    const requestData = await req.json();
    const rows = requestData.rows;
    const file_name = requestData.file_name;

    handleTableExport(rows, file_name)
}