//@ts-nocheck
"use client"

import { Button } from "./Button"
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import { Readable } from 'stream';
import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';

export default function ExportButton({ variant, color, data, filename }: { variant: VariantKey, color: ColorKey, data: any, filename: String }) {

  console.log("IDK ANYMORE ", data, filename)
  console.log("IS IT STRINGIFY??? ", JSON.stringify({ rows: data }))
  console.log("THIS IS IN NON-OBJECT ", JSON.stringify(data))

  const handleExport = async (e: any) => {
    e.preventDefault()
    const rawResponse = await fetch(
      `https://isproj2.vercel.app/dashboard/donations/cash/post`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rows: data,
          file_name: `${filename}.xlsx`
        }),
      },
    )
  }

  const fileDownload = async () => {
    XLSX.set_fs(fs);
    XLSX.stream.set_readable(Readable);
    XLSX.set_cptable(cpexcel);

    //THIS GENERATES AN EXCEL WORKSHEET
    const worksheet = XLSX.utils.json_to_sheet(data);
    //THIS GENERATES AN EXCEL WORKBOOK
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Exported Data")

    XLSX.writeFile(workbook, `${filename}.xlsx`, { compression: true });

    console.log("IT WORK???")
  }

  return (
    <>
      <Button variant={variant} color={color} onClick={fileDownload}>Download Data</Button>
    </>

  )
}