interface Building {
    BLOCK: string;
    ROAD: string;
    LATITUDE: number;
    LONGITUDE: number;
}

interface Location {
    GeocodeInfo: Building[];
}

interface Sale {
    month: string;
    town: string;
    flat_type: string;
    block: string;
    street_name: string;
    storey_range: string;
    floor_area_sqm: string;
    flat_model: string;
    remaining_lease: string;
    resale_price: string;
}

interface SalesList {
    result : { records : Sale[] }
}

interface Search {
    results : Building[];
}