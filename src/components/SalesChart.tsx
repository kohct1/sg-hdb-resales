// components
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "./ui/chart";

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

function SalesChart({ chartRecords, match, flatType } : { chartRecords : { [key: string]: any }, match : any, flatType : string }) {
    return (
        <ChartContainer config={chartConfig}>
            <LineChart accessibilityLayer data={chartRecords[match[0][1].BLOCK] ? chartRecords[match[0][1].BLOCK].filter((chartRecord : Sale) => chartRecord.flat_type.includes(flatType)) : chartRecords[match[0][1].BLOCK]}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="index" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis dataKey="resale" domain={["dataMin", "dataMax"]} tickLine={false} axisLine={false} tickMargin={10} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Line dataKey="resale" type="linear" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
            </LineChart>
        </ChartContainer>
    )
}

export default SalesChart
