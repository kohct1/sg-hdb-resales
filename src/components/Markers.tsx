// react
import { useState, useEffect } from "react";

// leaflet
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import locationMarker from "../../public/location.svg";
import buildingMarker from "../../public/building.svg";

// components
import { Marker, Popup } from "react-leaflet";
import SalesDialog from "./SalesDialog";

// hooks
import { useMap, useMapEvent } from "react-leaflet";

const locationIcon = new L.Icon({ iconUrl: locationMarker.src, iconAnchor: [18, 36], popupAnchor: [0, -18] });
const buildingIcon = new L.Icon({ iconUrl: buildingMarker.src, iconAnchor: [18, 36], popupAnchor: [0, -18] });

function Markers({ search, setSearch }: { search: string, setSearch: (search: string) => void }) {
    const [selectedLocation, setSelectedLocation] = useState<LatLngTuple | null>(null);
    const [sales, setSales] = useState<SalesList>();
    const [buildings, setBuildings] = useState<Location | null>(null);
    const [matches, setMatches] = useState<{ [key: string]: any[] }>({});
    const [chartRecords, setChartRecords] = useState<object>([]);
    const [flatType, setFlatType] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const [road, setRoad] = useState<string>("");
    const map = useMap();
    const oneMapAccessToken: string | undefined = process.env.NEXT_PUBLIC_ONEMAP_ACCESS_TOKEN;

    async function searchLocation(search: string) {
        const res = await fetch(`https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${search}&returnGeom=Y&getAddrDetails=Y&pageNum=1`);
        const searchedLocation: Search = await res.json();
        if (searchedLocation.results[0]) {
            setSelectedLocation([searchedLocation.results[0].LATITUDE, searchedLocation.results[0].LONGITUDE]);
        }
    }

    useEffect(() => {
        if (search != "") {
            searchLocation(search);
            setSearch("");
        }
    }, [search])

    useMapEvent("click", (e) => {
        setSelectedLocation([e.latlng.lat, e.latlng.lng]);
    });

    useEffect(() => {
        async function reverseGeocode(lat: number, lng: number) {
            if (oneMapAccessToken) {
                const res = await fetch(`https://www.onemap.gov.sg/api/public/revgeocode?location=${lat},${lng}&buffer=500&addressType=All&otherFeatures=N`, {
                    headers: {
                        "Authorization": oneMapAccessToken
                    }
                });
                const nearbyBuildings: Location = await res.json();
                setBuildings(nearbyBuildings);
            }
        }

        if (selectedLocation) {
            map.setView([selectedLocation[0], selectedLocation[1]], 17);
            reverseGeocode(selectedLocation[0], selectedLocation[1]);
        }
    }, [selectedLocation])

    useEffect(() => {
        async function getSales() {
            if (buildings && buildings.GeocodeInfo) {
                var buildingRoad = buildings.GeocodeInfo[0].ROAD;

                if (buildingRoad.includes("AVENUE")) {
                    buildingRoad = buildingRoad.replace("AVENUE", "AVE");
                }
                
                if (buildingRoad.includes("BUKIT")) {
                    buildingRoad = buildingRoad.replace("BUKIT", "BT");
                }
                
                if (buildingRoad.includes("CENTRAL")) {
                    buildingRoad = buildingRoad.replace("CENTRAL", "CTRL");
                }
                
                if (buildingRoad.includes("CLOVE")) {
                    buildingRoad = buildingRoad.replace("CLOVE", "CL");
                }
                
                if (buildingRoad.includes("CRESCENT")) {
                    buildingRoad = buildingRoad.replace("CRESCENT", "CRES");
                }
                
                if (buildingRoad.includes("DRIVE")) {
                    buildingRoad = buildingRoad.replace("DRIVE", "DR");
                }
                
                if (buildingRoad.includes("HEIGHTS")) {
                    buildingRoad = buildingRoad.replace("HEIGHTS", "HTS");
                }
                
                if (buildingRoad.includes("JALAN")) {
                    buildingRoad = buildingRoad.replace("JALAN", "JLN");
                }
                
                if (buildingRoad.includes("LORONG")) {
                    buildingRoad = buildingRoad.replace("LORONG", "LOR");
                }
                
                if (buildingRoad.includes("MARKET")) {
                    buildingRoad = buildingRoad.replace("MARKET", "MKT");
                }
                
                if (buildingRoad.includes("NORTH")) {
                    buildingRoad = buildingRoad.replace("NORTH", "NTH");
                }
                
                if (buildingRoad.includes("ROAD")) {
                    buildingRoad = buildingRoad.replace("ROAD", "RD");
                }
                
                if (buildingRoad.includes("SOUTH")) {
                    buildingRoad = buildingRoad.replace("SOUTH", "STH");
                }
                
                if (buildingRoad.includes("STREET")) {
                    buildingRoad = buildingRoad.replace("STREET", "ST");
                }
                
                if (buildingRoad.includes("TERRACE")) {
                    buildingRoad = buildingRoad.replace("TERRACE", "TER");
                }
                
                if (buildingRoad.includes("UPPER")) {
                    buildingRoad = buildingRoad.replace("UPPER", "UPP");
                }                

                const res = await fetch(`https://data.gov.sg/api/action/datastore_search?resource_id=d_8b84c4ee58e3cfc0ece0d773c8ca6abc&filters={"month":{"type":"ILIKE","value":"2024"},"street_name":{"type":"ILIKE","value":"${buildingRoad}"}}`);
                const latestSales: SalesList = await res.json();
                setSales(latestSales);
                setRoad(buildingRoad);
            }
        }
        getSales();
    }, [buildings])

    useEffect(() => {
        function getMatches() {
            if (buildings) {
                var buildingMatches: { [key: string]: any[] } = {};
                buildings.GeocodeInfo.forEach((building: Building) => {
                    if (!sales || !sales.result) return;
    
                    sales.result.records.forEach((sale: Sale) => {
                        if (sale.block == building.BLOCK) {
                            if (sale.block in buildingMatches) {
                                buildingMatches[sale.block].push([sale, building]);
                            } else {
                                buildingMatches[sale.block] = [[sale, building]];
                            }
                        }
                    });
                });
                setMatches(buildingMatches);
            }
        }
        getMatches();
    }, [sales])

    useEffect(() => {
        function getChartData() {
            var charts: { [key: string]: any } = {};
            Object.keys(matches).map((key: string) => {
                matches[key].map((sale: [Sale, Building], index: number) => {
                    if (sale[0].block in charts) {
                        charts[sale[0].block].push({ index: index, resale: parseInt(sale[0].resale_price), flat_type: sale[0].flat_type });
                    } else {
                        charts[sale[0].block] = [{ index: index, resale: parseInt(sale[0].resale_price), flat_type: sale[0].flat_type }];
                    }
                });
            });
            setChartRecords(charts);
        }
        getChartData();
    }, [matches])

    if (selectedLocation && buildings) {
        return (
            <>
                <Marker position={selectedLocation} icon={locationIcon}>
                    <Popup>{road}</Popup>
                </Marker>
                {Object.values(matches).map((match: any[]) => {
                    return (
                        <Marker key={match[0][0].block} position={[match[0][1].LATITUDE, match[0][1].LONGITUDE]} icon={buildingIcon}>
                            <Popup>
                                <div className="min-w-36">
                                    <div className="flex flex-col gap-2">
                                        <h1 className="font-bold">BLOCK {match[0][1].BLOCK}</h1>
                                        <h1>{match.length} RESALES</h1>
                                    </div>
                                    <div className="flex justify-end">
                                        <SalesDialog match={match} page={page} chartRecords={chartRecords} flatType={flatType} setPage={setPage} setFlatType={setFlatType} />
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    )
                })}
            </>
        )
    }
}

export default Markers