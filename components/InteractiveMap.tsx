"use client";

import {City} from "@/types";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type CityProps = {
    city: City;
}

const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function LocationMarker({ setCoords }: { setCoords: (latlng: L.LatLng) => void }) {
    const [position, setPosition] = useState<L.LatLng | null>(null);

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            setCoords(e.latlng);
        },
    });

    return position === null ? null : (
        <Marker position={position} icon={icon}>
            <Popup>Tanlangan joy: <br /> {position.lat.toFixed(6)}, {position.lng.toFixed(6)}</Popup>
        </Marker>
    );
}
export default function InteractiveMap({city}: CityProps) {
    const [coords, setCoords] = useState<L.LatLng | null>(null);
    const initialPosition: [number, number] = [city?.lat, city?.lng];
    return (
        <div className={'py-[30px] '}>
            <div className={"bg-white p-[20px] flex flex-col gap-3 w-full rounded-xl shadow-sm border border-gray-100"}>
                <h1 className={"text-[20px] font-[600]"}>Interactive Map</h1>
                <div>
                    <div className="h-[450px] w-full rounded-xl overflow-hidden shadow-lg border-2 border-indigo-100">
                        <MapContainer center={initialPosition} zoom={12} className="h-full w-full">
                            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                            <LocationMarker  setCoords={setCoords}  />
                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}
