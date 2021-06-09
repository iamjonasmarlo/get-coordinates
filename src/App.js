import React, { useState, useEffect } from "react";
import logo from './assets/img/logo.svg';
import { GitHub } from '@material-ui/icons';  
import { Grid, Column, Coordinate, Map } from './components';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import './assets/scss/style.scss';

function App() {
    const [provider] = useState(new OpenStreetMapProvider());
    const [move, setMove] = useState(true);
    const [lat, setLat] = useState(51.507351);
    const [lng, setLng] = useState(-0.127758);

    useEffect(() => {
        getGeoLocation();
    }, []);

    function formSubmit(e) {
        e.preventDefault();
        provider.search({query: e.target[0].value}).then((result) => {
            if(result.length > 0) {
                updateCoordinates(result[0].y, result[0].x, true);
            }
        });
    }

    function updateCoordinates(lat, lng, move) {
        setLat(lat.toFixed(7));
        setLng(lng.toFixed(7));
        setMove(move);
    }

    function getGeoLocation() {
        if("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                updateCoordinates(position.coords.latitude, position.coords.longitude, true);
            });
        } else {
            alert("Geolocation is not available!");
        }
    }

    return (
        <div id="wrapper">
            <div className="content">
                <div class="content__top">
                    <header>
                        <div className="header__logo">
                            <img src={logo} alt="Logo" />
                        </div>
                    </header>
                    <h1>Get coordinates</h1>
                    <p>To find out the longitude or latitude of an address, simply type it into the address field. Alternatively, you can simply drag and drop the marker over the map.</p>
                    <Grid>
                        <Column width="full">
                            <form onSubmit={formSubmit}>
                                <input type="text" placeholder="Enter address" />
                                <div className="submit">
                                    <button type="submit" className="button">Get coordinates</button>
                                    <div className="geo-location" onClick={getGeoLocation}>Current location</div>
                                </div>
                            </form>
                        </Column>
                        <Column width="half">
                            <Coordinate title="Longitude" coordinate={lat} />
                        </Column>
                        <Column width="half">
                            <Coordinate title="Latitude" coordinate={lng} />
                        </Column>
                    </Grid>
                </div>
                <footer>
                    <div class="credit">Made with React by <a href="https://www.iamjonas.de" target="_blank">Jonas Marlo Lörken</a>.</div>
                    <a href="https://github.com/iamjonasmarlo/get-coordinates" target="_blank"><GitHub /></a>
                </footer>
            </div>
            <Map updater={updateCoordinates} lat={lat} lng={lng} move={move} />
        </div>
    );
}

export default App;
