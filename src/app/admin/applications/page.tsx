import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import SlideOver from "@/components/SlideOverButton";
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Th, Thead, Tr } from "@/components/Table";

const requests = [
  { Name: "EduGuru", Email: "eduguru@gmail.com", Date: "05/05/2023" },
  { Name: "Philippine Red Cross", Email: "redcross@gmail.com", Date: "05/05/2023" },
  { Name: "Helping Hands for All", Email: "handsy@gmail.com", Date: "05/05/2023" },
  { Name: "Hope4All", Email: "hope4all@gmail.com", Date: "05/05/2023" },
  { Name: "TheSoupKitchen.org", Email: "soup@gmail.com", Date: "05/05/2023" },
]

export default function Applications() {
  return (
    <>
      <div className="sm:flex sm:items-center py-9">
        <div className="sm:flex-auto">
        </div>
      </div>
      <TableContainer>
        <TableHeader header="All charity approval requests." />
        <TableContent>
          <Table>
            <Thead>
              <Tr>
                <Th>NAME</Th>
                <Th>Email Address</Th>
                <Th>Date Filed</Th>
                <Th> </Th>
              </Tr>
            </Thead>
            <Tbody>
              {requests.map(request =>

                <Tr key={request.Name}>
                  <Td>{request.Name}</Td>
                  <Td>{request.Email}</Td>
                  <Td>{request.Date}</Td>
                  <Td>
                    <SlideOver buttontext="Review" variant="solid" color="blue">
                      <form className="space-y-6" action="#" method="POST">
                        <TextField
                          label="Charity Name"
                          name="name"
                          type="text"
                          placeholder={request.Name}
                          readOnly
                        />

                        <TextField
                          label="Email"
                          name="email"
                          type="email"
                          placeholder={request.Email}
                          readOnly
                        />

                        <div className="col-span-full">
                          <Button type="submit" variant="solid" color="blue" className="w-full">
                            <span>
                              Sign up <span aria-hidden="true">&rarr;</span>
                            </span>
                          </Button>
                        </div>
                      </form>
                    </SlideOver>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContent>
      </TableContainer>
    </>
  )
}