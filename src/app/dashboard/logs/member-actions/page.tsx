import { Button } from "@/components/Button"
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Thead, Tr } from "@/components/Table"

const actions = [
    { name: "Myko Macawiwili", actions: "Logged in to system", date: "June 16, 2023" },
    { name: "Myko Macawiwili", actions: "Logged in to system", date: "June 16, 2023" },
    { name: "Myko Macawiwili", actions: "Logged in to system", date: "June 16, 2023" },
    { name: "Myko Macawiwili", actions: "Logged in to system", date: "June 16, 2023" },
    { name: "Myko Macawiwili", actions: "Logged in to system", date: "June 16, 2023" },
    { name: "Myko Macawiwili", actions: "Logged in to system", date: "June 16, 2023" },
]

export default function Page() {
    return (
        <>
        <div className="sm:flex sm:items-center py-9">
        <div className="sm:flex-auto">
        </div>
        </div>

        <TableContainer>
            <TableHeader header="Admin Actions"/>
            <TableContent>
                <Table>
                    <Thead>
                        <Tr>
                            <Td>Admin Name</Td>
                            <Td>Action/s</Td>
                            <Td>Date</Td>
                            <Td> </Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {actions.map(action =>
                            
                            <Tr key={action.name}>
                                <Td>{action.name}</Td>
                                <Td>{action.actions}</Td>
                                <Td>{action.date}</Td>
                                <Td>
                                    <Button variant="solid" color="blue" href="#">
                                        View Profile
                                    </Button>
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