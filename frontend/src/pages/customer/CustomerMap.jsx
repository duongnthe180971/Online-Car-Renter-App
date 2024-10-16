import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../styles/customer/CustomerMap.css';

const LocationForm = ({ fromLocation, toLocation, setFromLocation, setToLocation, handleShowWay }) => {
    return (
        <div className="form">
            <div className="form-group">
                <label htmlFor="fromInput">From:</label>
                <input
                    id="fromInput"
                    value={fromLocation.name}
                    onChange={(e) => setFromLocation({ ...fromLocation, name: e.target.value })}
                    type="text"
                />
            </div>
            <div className="form-group">
                <label htmlFor="toInput">To:</label>
                <input
                    id="toInput"
                    value={toLocation.name}
                    onChange={(e) => setToLocation({ ...toLocation, name: e.target.value })}
                    type="text"
                />
            </div>
            <button className="show-way-button" onClick={handleShowWay}>Show Way</button>
        </div>
    );
};

const MapComponent = ({ fromLocation, toLocation }) => {
    const mapRef = useRef();

    useEffect(() => {
        if (fromLocation && toLocation && mapRef.current) {
            const map = mapRef.current;

            map.flyToBounds([
                [fromLocation.lat, fromLocation.lng],
                [toLocation.lat, toLocation.lng]
            ], { padding: [50, 50] });
        }
    }, [fromLocation, toLocation]);

    return (
        <div className="map-container">
            <MapContainer center={[21.0285, 105.8542]} zoom={13} className="map" ref={mapRef}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
                />
                {fromLocation && (
                    <Marker position={[fromLocation.lat, fromLocation.lng]}>
                        <Popup>From: {fromLocation.name}</Popup>
                    </Marker>
                )}
                {toLocation && (
                    <Marker position={[toLocation.lat, toLocation.lng]}>
                        <Popup>To: {toLocation.name}</Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

const CustomerMap = () => {
    const [fromLocation, setFromLocation] = useState({
        name: 'Dai Hoc FPT Ha Noi',
        lat: 21.0367,
        lng: 105.8342,
    });
    const [toLocation, setToLocation] = useState({
        name: 'So 33 Duong Tran Cung Quan Bac Tu Liem Ha Noi',
        lat: 21.0381,
        lng: 105.7821,
    });

    const handleShowWay = () => {
        console.log('Showing directions from:', fromLocation, 'to:', toLocation);
    };

    return (
        <div className="map-page-container">
            <LocationForm
                fromLocation={fromLocation}
                toLocation={toLocation}
                setFromLocation={setFromLocation}
                setToLocation={setToLocation}
                handleShowWay={handleShowWay}
            />
            <MapComponent fromLocation={fromLocation} toLocation={toLocation} />
        </div>
    );
};

export default CustomerMap;
