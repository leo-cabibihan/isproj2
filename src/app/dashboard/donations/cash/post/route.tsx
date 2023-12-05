import * as XLSX from 'xlsx';
import * as fs from 'fs';
import { Readable } from 'stream';
import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';

export async function POST(req: Request) {
    XLSX.set_fs(fs);
    XLSX.stream.set_readable(Readable);
    XLSX.set_cptable(cpexcel);


    const requestData = await req.json();
    const rows = requestData.rows;
    const file_name = requestData.file_name;

    console.log("REQUESTDATA: ", requestData)
    console.log("ROWS AAAHHH: ", rows + " ", file_name)

    //THIS GENERATES AN EXCEL WORKSHEET
    const worksheet = XLSX.utils.json_to_sheet(rows);

    //THIS GENERATES AN EXCEL WORKBOOK
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Exported Data")

    //THIS WRITES THE EXPORTED FILE
    const { data, error } = XLSX.writeFile(workbook, `/tmp/${file_name}.xlsx`, { compression: true })

    const DETAILS = `DATA IS ${data}, ERROR IS ${error}.`

    console.log(DETAILS)
    
    return DETAILS
}