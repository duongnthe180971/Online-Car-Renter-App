import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import HomeHeader from "../../modules/components/HomeHeader";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import '../../styles/customer/CustomerMap.css';

const geocodeLocation = async (locationName) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`
        );
        const data = await response.json();
        if (data.length > 0) {
            return {
                name: locationName,
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
            };
        } else {
            console.error('Location not found:', locationName);
            return null;
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
};

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const fromIcon = L.divIcon({
    html: ReactDOMServer.renderToString(<FaMapMarkerAlt style={{ color: 'red', fontSize: '24px' }} />),
    iconSize: [24, 24],
    className: '',
});

const toIcon = L.divIcon({
    html: ReactDOMServer.renderToString(<FaMapMarkerAlt style={{ color: 'green', fontSize: '24px' }} />),
    iconSize: [24, 24],
    className: '',
});

const LocationForm = ({ fromLocation, toLocation, setFromLocation, setToLocation, handleShowWay, error }) => {
    return (
        <div className="form">
            <div className="form-group">
                <label htmlFor="fromInput">Your Location:</label>
                <input
                    id="fromInput"
                    value={fromLocation.name}
                    onChange={(e) => setFromLocation({ ...fromLocation, name: e.target.value })}
                    type="text"
                />
            </div>
            <div className="form-group">
                <label htmlFor="toInput">Destination:</label>
                <input
                    id="toInput"
                    value={toLocation.name}
                    onChange={(e) => setToLocation({ ...toLocation, name: e.target.value })}
                    type="text"
                />
            </div>
            <button className="show-way-button" onClick={handleShowWay}>Show Way</button>
            {error && <p className="error-message" style={{margin: 2 + 'em'}}>{error}</p>}
        </div>
    );
};

const Routing = ({ fromLocation, toLocation }) => {
    const map = useMap();
    const routingControlRef = useRef(null);

    useEffect(() => {
        if (!fromLocation || !toLocation ) return;

        if (routingControlRef.current) {
            try {
                routingControlRef.current.getPlan().setWaypoints([]);
                map.removeControl(routingControlRef.current);
            } catch (err) {
                console.error('Error while removing routing control:', err);
            }
        }

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(fromLocation.lat, fromLocation.lng),
                L.latLng(toLocation.lat, toLocation.lng),
            ],
            routeWhileDragging: true,
            lineOptions: {
                styles: [{ color: 'navy', weight: 4 }],
            },
            createMarker: () => null,
            addWaypoints: false,
        }).addTo(map);

        const controlContainer = document.getElementsByClassName('leaflet-routing-container')[0];
        if (controlContainer) {
            controlContainer.style.display = 'none';
        }

        routingControlRef.current = routingControl;

        return () => {
            if (routingControlRef.current) {
                try {
                    routingControlRef.current.getPlan().setWaypoints([]);
                    map.removeControl(routingControlRef.current);
                } catch (err) {
                    console.error('Error while removing routing control during cleanup:', err);
                }
                routingControlRef.current = null;
            }
        };
    }, [fromLocation, toLocation, map]);

    return null;
};


const MapComponent = ({ fromLocation, toLocation }) => {
    return (
        <div className="map-container">
            <MapContainer
                center={[fromLocation.lat || 21.0285, fromLocation.lng || 105.8542]}
                zoom={13}
                className="map"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
                />
                {fromLocation.lat && (
                    <Marker position={[fromLocation.lat, fromLocation.lng]} icon={fromIcon}>
                        <Popup>From: {fromLocation.name}</Popup>
                    </Marker>
                )}
                {toLocation.lat && (
                    <Marker position={[toLocation.lat, toLocation.lng]} icon={toIcon}>
                        <Popup>To: {toLocation.name}</Popup>
                    </Marker>
                )}
                <Routing fromLocation={fromLocation} toLocation={toLocation} />
            </MapContainer>
        </div>
    );
};

const CustomerMap = () => {
    const location = useLocation();
    const { fromName } = location.state || {fromName: 'Dai Hoc FPT Ha Noi'};
    const { toName } = location.state || {toName: 'Ho Hoan Kiem'};
    const [fromLocation, setFromLocation] = useState({
        name: '',
        lat: 0,
        lng: 0,
    });
    const [toLocation, setToLocation] = useState({
        name: '',
        lat: 0,
        lng: 0,
    });

    const [error, setError] = useState("");

    useEffect(() => {
        const geocodeDefaultLocations = async () => {
            const geocodedFrom = await geocodeLocation(fromName);
            const geocodedTo = await geocodeLocation(toName);

            if (geocodedFrom && geocodedTo) {
                setFromLocation(geocodedFrom);
                setToLocation(geocodedTo);
            }
        };

        geocodeDefaultLocations();
    }, []);

    const handleShowWay = async () => {
        const cleanFromLocationName = removeAccents(fromLocation.name);
        const cleanToLocationName = removeAccents(toLocation.name);

        const geocodedFrom = await geocodeLocation(cleanFromLocationName);
        const geocodedTo = await geocodeLocation(cleanToLocationName);

        if (geocodedFrom && geocodedTo) {
            setFromLocation(geocodedFrom);
            setToLocation(geocodedTo);
            setError("");
        } else {
            setError("One or both locations were not found. Please check the inputs.");
        }
    };

    return (
        <div className="map-page-container">
            <HomeHeader/>
            <LocationForm
                fromLocation={fromLocation}
                toLocation={toLocation}
                setFromLocation={setFromLocation}
                setToLocation={setToLocation}
                handleShowWay={handleShowWay}
                error={error}
            />
            <MapComponent fromLocation={fromLocation} toLocation={toLocation} />
        </div>
    );
};

export default CustomerMap;
