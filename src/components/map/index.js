import React from 'react';
import './map.scss';
import '../../../node_modules/leaflet/dist/leaflet.css';
import marker from '../../assets/img/marker.svg';
import L from 'leaflet';
import { Add, Remove } from '@material-ui/icons';  

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            marker: null,
            zoomControls: false,
            scrollWheelZoom: false,
            zoom: 18,
            maxZoom: 18,
            minZoom: 4,
            zoomInActive: false,
            zoomOutActive: true
        }
    }
    customIcon() {
        var icon = L.icon({
            iconUrl: marker,
            iconSize: [24, 34],
            iconAnchor: [12, 34],
            popupAnchor: [0, 0],
            shadowUrl: null,
            shadowSize: null,
            shadowAnchor: null
        });
        return icon;
    }
    renderMap() {
        var map = L.map('map', {zoomControl: this.state.zoomControls, zoom: this.state.zoom, scrollWheelZoom: this.state.scrollWheelZoom, maxZoom: this.state.maxZoom, minZoom: this.state.minZoom, center: [this.props.lat, this.props.lng]}),
            marker = L.marker([this.props.lat, this.props.lng], {"icon": this.customIcon(), "draggable": true});

        L.tileLayer('https://api.mapbox.com/styles/v1/jonasloerken/ckpl47xlb2qgn17ny133reqt7/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoiam9uYXNsb2Vya2VuIiwiYSI6ImNrbGo4YmMxbTIzNG4yd3A3cWdwaWNza2cifQ.e6914Ove3M7KK_RJWA0xWA', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        map.on('locationfound', this.onLocationFound);
        map.on('locationerror', () => {console.log("Location not found!")});
        marker.on('drag', this.onMoveMarker);

        this.setState({
            map: map,
            marker: marker
        });
    }
    onMoveMarker = (e) => {
        this.props.updater(e.latlng.lat, e.latlng.lng, false);
    }
    onLocationFound = (e) => {
        this.props.updater(e.latlng.lat, e.latlng.lng, true);
        this.changeLocation();
    }
    changeLocation = () => {
        if(this.props.move) {
            this.state.marker.setLatLng([this.props.lat, this.props.lng]).addTo(this.state.map);
            this.state.map.setView([this.props.lat, this.props.lng]);
        }
    }
    zoomIn = () => {
        this.state.map.zoomIn();
        this.setState({
            zoomOutActive: true
        });
        if((this.state.map.getZoom() + 1) === this.state.maxZoom) {
            this.setState({
                zoomInActive: false
            });
        }
    }
    zoomOut = () => {
        this.state.map.zoomOut();
        this.setState({
            zoomInActive: true
        });
        if((this.state.map.getZoom() - 1) === this.state.minZoom) {
            this.setState({
                zoomOutActive: false
            });
        }
    }
    render() {
        return (
            <div className="map">
                <div className="map__controls">
                    <button className={this.state.zoomInActive ? 'control-button': 'control-button disabled'} onClick={this.zoomIn}><Add /></button>
                    <button className={this.state.zoomOutActive ? 'control-button': 'control-button disabled'} onClick={this.zoomOut}><Remove /></button> 
                </div>
                <div id="map"></div>
            </div>
        )
    }
    componentDidMount() {
        this.renderMap();
    }
    componentDidUpdate() {
        this.changeLocation();
    }
}

export default Map;