import { Table, TableContainer, TableContent, TableHeaderButton, Tbody, Td, Th, Thead, Tr } from "@/components/Table"
import SlideOver from "@/components/SlideOverButton"
import { TextField } from "@/components/Fields"
import { Button } from "@/components/Button"

export default function Page() {
  return (
    <>
      <TableContainer>
        <TableHeaderButton header="Contacts" buttontext="Add Contact">
          <form className="space-y-6" action="#" method="POST">
            <TextField
              label="Beneficiary Name"
              name="beneficiary"
              type="text"
              required
            />

            <TextField
              label="Contact Number"
              name="contact_no"
              type="number"
              autoComplete="number"
              maxLength={15}
              max={99999999999}
              required
            />

            <TextField
              label="Address"
              name="address"
              type="text"
              required
            />

            {/* <div className="flex items-center justify-between">
              <div className="text-sm leading-6">
                <a href="/forgot" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div> */}

            <div className="col-span-full">
              <Button type="submit" variant="solid" color="blue" className="w-full">
                <span>
                  Save Beneficiary <span aria-hidden="true">&rarr;</span>
                </span>
              </Button>
            </div>
          </form>


        </TableHeaderButton>
        <TableContent>
          <Table>
            <Thead>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th>multiply by</Th>
                <Th> </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td>25.4</Td>
                <Td>
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit<span className="sr-only">, kek</span>
                  </a>

                </Td>
              </Tr>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td>25.4</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td>0.91444</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContent>
      </TableContainer>
    </>

  )
}