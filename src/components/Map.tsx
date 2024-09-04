// leaflet
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"

// components
import Markers from "@/components/Markers";

function Map({ search, setSearch }: { search: string, setSearch: (search: string) => void }) {
    return (
        <MapContainer className="w-[90%] h-full border-2 border-black rounded-lg shadow-md z-0" center={[1.3521, 103.8198]} zoom={13} scrollWheelZoom={true}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Markers search={search} setSearch={setSearch} />
        </MapContainer>
    )
}

export default Map