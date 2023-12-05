import * as XLSX from 'xlsx';
import * as fs from 'fs'
import { Readable } from 'stream';
import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';

export async function handleTableExport(data: any, filename: any) {

    XLSX.set_fs(fs);
    XLSX.stream.set_readable(Readable);
    XLSX.set_cptable(cpexcel);

    //THIS GENERATES AN EXCEL WORKSHEET
    const worksheet = XLSX.utils.json_to_sheet(data);

    //THIS GENERATES AN EXCEL WORKBOOK
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Exported Data")

    //THIS WRITES THE EXPORTED FILE
    XLSX.writeFile(workbook, `${filename}.xlsx`, { compression: true })

    return console.log("FILE EXPORTED SUCCESSFULLY!")
}