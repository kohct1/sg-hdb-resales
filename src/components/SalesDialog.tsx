// react
import { useState } from "react";

// components
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import SalesTable from "./SalesTable";
import SalesSelect from "./SalesSelect";
import SalesChart from "./SalesChart";
import SalesAverage from "./SalesAverage";

function SalesDialog({ match, page, chartRecords, flatType, setPage, setFlatType }: { match: any[], page: number, chartRecords: object, flatType: string, setPage: (page: number) => void, setFlatType: (flatType: string) => void }) {
    const [isChart, setIsChart] = useState<boolean>(false);

    function handleTrigger() {
        setFlatType("");
        setPage(0);
    }

    return (
        <Dialog>
            <DialogTrigger className="bg-black rounded text-white py-1 px-3 hover:bg-primary/90" onClick={handleTrigger}>View</DialogTrigger>
            <DialogContent className="min-w-fit z-50 max-lg:min-w-0 max-lg:max-w-[90%] max-lg:max-h-[80%] max-lg:rounded-lg max-lg:overflow-x-scroll">
                <DialogHeader>
                    <DialogTitle className="text-2xl max-lg:text-start">{match[0][0].street_name} BLOCK {match[0][1].BLOCK} FLAT RESALE PRICES</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    {isChart ?
                        <>
                            <div className="flex items-center">
                                <h1 className="text-lg text-black">CHART OF {match[0][0].street_name} BLOCK {match[0][1].BLOCK} FLAT RESALE PRICES</h1>
                            </div>
                            <div className="w-full flex flex-col gap-4">
                                <SalesChart chartRecords={chartRecords} match={match} flatType={flatType} />
                                <div className="flex justify-between gap-4 max-lg:flex-col">
                                    <div className="flex gap-4">
                                        <Button className="bg-black" onClick={() => isChart ? setIsChart(false) : setIsChart(true)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path className="fill-white" d="M760-200v-120H200v120h560Zm0-200v-160H200v160h560Zm0-240v-120H200v120h560ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"/></svg></Button>
                                        <SalesSelect setFlatType={setFlatType} setPage={setPage} />
                                    </div>
                                    <SalesAverage sales={match} flatType={flatType} />
                                </div>
                            </div>
                        </> :
                        <>
                            <SalesTable sales={match} flatType={flatType} page={page} />
                            <div className="flex justify-between gap-4">
                                <div className="flex gap-4">
                                    <Button className="bg-black" onClick={() => isChart ? setIsChart(false) : setIsChart(true)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path className="fill-white" d="M200-120q-33 0-56.5-23.5T120-200v-640h80v640h640v80H200Zm40-120v-360h160v360H240Zm200 0v-560h160v560H440Zm200 0v-200h160v200H640Z"/></svg></Button>
                                    <SalesSelect setFlatType={setFlatType} setPage={setPage} />
                                </div>
                                <div className="flex gap-2">
                                    <Button className="bg-black" disabled={page - 5 < 0} onClick={() => setPage(page - 5)}>{"<"}</Button>
                                    <Button className="bg-black" disabled={page + 5 >= match.filter((sale: any) => sale[0].flat_type.includes(flatType)).length} onClick={() => setPage(page + 5)}>{">"}</Button>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SalesDialog
