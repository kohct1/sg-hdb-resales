// components
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

function SalesSelect({ setFlatType, setPage }: { setFlatType: (flatType: string) => void, setPage: (page: number) => void }) {
    function handleSelect(e: string) {
        if (e == "ALL") {
            setFlatType("");
        } else {
            setFlatType(e);
        }
        setPage(0);
    }

    return (
        <Select onValueChange={handleSelect}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="ALL" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="ALL">ALL</SelectItem>
                <SelectItem value="1 ROOM">1 ROOM</SelectItem>
                <SelectItem value="2 ROOM">2 ROOM</SelectItem>
                <SelectItem value="3 ROOM">3 ROOM</SelectItem>
                <SelectItem value="4 ROOM">4 ROOM</SelectItem>
                <SelectItem value="5 ROOM">5 ROOM</SelectItem>
                <SelectItem value="EXECUTIVE">EXECUTIVE</SelectItem>
                <SelectItem value="MULTI-GENERATION">MULTI-GENERATION</SelectItem>
            </SelectContent>
        </Select>
    )
}

export default SalesSelect
