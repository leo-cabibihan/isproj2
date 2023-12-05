//@ts-nocheck
import { Button } from "./Button"

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
  
    return (
      <>
        <Button variant={variant} color={color} onClick={handleExport}>Download Data</Button>
      </>
  
    )
  }