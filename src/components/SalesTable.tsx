// components
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

function SalesTable({ sales, flatType, page }: { sales: any, flatType: string, page: number }) {
    return (
        <Table className="max-md:w-[48rem] max-md:text-xs">
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Flat Type</TableHead>
                    <TableHead>Street Name</TableHead>
                    <TableHead>Storey Range</TableHead>
                    <TableHead>Floor Area SQM</TableHead>
                    <TableHead>Flat Model</TableHead>
                    <TableHead>Remaining Lease</TableHead>
                    <TableHead className="text-right">Resale Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sales.filter((sale: any) => sale[0].flat_type.includes(flatType)).slice(page, page + 5).map((sale: [Sale, Building], index: number) => {
                    sales.reverse();
                    return (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{sale[0].month}</TableCell>
                            <TableCell>{sale[0].flat_type}</TableCell>
                            <TableCell>{sale[0].street_name}</TableCell>
                            <TableCell>{sale[0].storey_range}</TableCell>
                            <TableCell>{sale[0].floor_area_sqm}</TableCell>
                            <TableCell>{sale[0].flat_model}</TableCell>
                            <TableCell>{sale[0].remaining_lease}</TableCell>
                            <TableCell className="text-right">{sale[0].resale_price}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

export default SalesTable
