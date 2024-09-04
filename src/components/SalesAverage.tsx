function SalesAverage({ sales, flatType }: { sales: any, flatType: string }) {
    const filteredSales = sales.filter((sale: any) => sale[0].flat_type.includes(flatType));
    const salesAverage: number[] = getSalesAverage();

    function getSalesAverage() {
        if (filteredSales.length == 0) {
            return [0, 0];
        }   

        var totalSales = 0;
        var totalSQM = 0;

        filteredSales.forEach((sale: any) => {
            totalSales += parseInt(sale[0].resale_price);
            totalSQM += parseInt(sale[0].floor_area_sqm);
        });

        return [Math.ceil(totalSales / filteredSales.length), Math.ceil(totalSales / totalSQM)];
    }

    return (
        <div className="w-full flex justify-end items-center gap-4">
            <h1 className="text-sm text-black whitespace-nowrap">AVERAGE RESALE PRICE: {salesAverage[0]}</h1>
            <h1 className="text-sm text-black whitespace-nowrap">AVERAGE PRICE PER SQM: {salesAverage[1]}</h1>
        </div>
    )
}

export default SalesAverage
