//define map options
var mapOptions = {
  center: [-1.2921, 36.8219],
  zoom: 7,
};

var map = L.map("map", mapOptions);

var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//adding our google satellite maps
var googleStreets = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);
var googleSat = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);
var googleHybrid = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);
var googleTerrain = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);
var cartoDB = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
    minZoom: 0,
  }
);

let myLayerControl = L.layerGroup().addTo(map);
let myLayerControl2 = L.layerGroup().addTo(map);
let myLayerControl3 = L.layerGroup().addTo(map);
let myLayerControl4 = L.layerGroup().addTo(map);
let myLayerControl5 = L.layerGroup().addTo(map);

var baseMaps = {
  OSM: osm,
  "Google Streets": googleStreets,
  "Google Satellite": googleSat,
  "Google Hybrid": googleHybrid,
  "Google Terrain": googleTerrain,
  CartoDB: cartoDB,
};

//geoserver facilities wms
var facilities = L.tileLayer.wms("http://localhost:8081/geoserver/wms", {
  layers: "PROGRAMMING_FOR_GIS:facilities",
  transparent: true,
  format: "image/png",
});
//geoserver institutes wms
var institutes = L.tileLayer.wms("http://localhost:8081/geoserver/wms", {
  layers: "PROGRAMMING_FOR_GIS:institutes",
  transparent: true,
  format: "image/png",
});
var kajiado_ranches = L.tileLayer.wms("http://localhost:8081/geoserver/wms", {
  layers: "PROGRAMMING_FOR_GIS:kajiado_ranches",
  transparent: true,
  format: "image/png",
});
var primary_schools = L.tileLayer.wms("http://localhost:8081/geoserver/wms", {
  layers: "PROGRAMMING_FOR_GIS:primary_schools",
  transparent: true,
  format: "image/png",
});
var towns = L.tileLayer.wms("http://localhost:8081/geoserver/wms", {
  layers: "PROGRAMMING_FOR_GIS:towns",
  transparent: true,
  format: "image/png",
});

// start wfs
var geojsonStyle = {
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

//wfs request
var ranch_layer;
var ranches_wfs_url =
  "http://localhost:8081/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=PROGRAMMING_FOR_GIS:kajiado_ranches&outputFormat=application/json&srsName=epsg:4326";
var facilities_wfs_url =
  "http://localhost:8081/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=PROGRAMMING_FOR_GIS:facilities&outputFormat=application/json&srsName=epsg:4326";
var institutes_wfs_url =
  "http://localhost:8081/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=PROGRAMMING_FOR_GIS:institutes&outputFormat=application/json&srsName=epsg:4326";
var primary_schools_wfs_url =
  "http://localhost:8081/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=PROGRAMMING_FOR_GIS:primary_schools&outputFormat=application/json&srsName=epsg:4326";
var towns_wfs_url =
  "http://localhost:8081/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=PROGRAMMING_FOR_GIS:towns&outputFormat=application/json&srsName=epsg:4326";

//ranches wfs query from geoserver
$.getJSON(ranches_wfs_url).then((res) => {
  L.geoJson(res, {
    onEachFeature: addMyRanchesData,
    style: geojsonStyle,
  });
});
//facilities wfs
$.getJSON(facilities_wfs_url).then((res) => {
  L.geoJson(res, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: 5,
        stroke: true,
        weight: 2,
        opacity: 0.85,
        color: "red",
        fill: "#B53922",
        fillOpacity: 0.5,
      }).bindPopup("Facility Name:" + feature.properties.FacName);
    },
    onEachFeature: addMyFacilitiesData,
  }).addTo(map);
});
//institutes
$.getJSON(institutes_wfs_url).then((res) => {
  L.geoJson(res, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: 5,
        stroke: true,
        weight: 2,
        opacity: 0.85,
        color: "blue",
        fill: "#189DA3",
        fillOpacity: 0.5,
      }).bindPopup("Institute Name:" + feature.properties.InstName);
    },
    onEachFeature: addMyInstitutesData,
  }).addTo(map);
});
//primary schools
$.getJSON(primary_schools_wfs_url).then((res) => {
  L.geoJson(res, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: 5,
        stroke: true,
        weight: 2,
        opacity: 0.85,
        color: "#900C3F",
        fill: "#C476DA",
        fillOpacity: 0.5,
      }).bindPopup("School Name:" + feature.properties.NAME);
    },
    onEachFeature: addMyPrimaryData,
  }).addTo(map);
});
//Towns
$.getJSON(towns_wfs_url).then((res) => {
  L.geoJson(res, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: 5,
        stroke: true,
        weight: 2,
        opacity: 0.85,
        color: "green",
        fill: "#0FC145",
        fillOpacity: 0.5,
      }).bindPopup("Town Name:" + feature.properties.TName);
    },
    onEachFeature: addMyTownsData,
  }).addTo(map);
});

//add layer functions
let addMyRanchesData = (feature, layer) => {
  layer.bindPopup("Ranch Name:" + feature.properties.R_NAME);
  myLayerControl.addLayer(layer);
  map.fitBounds(layer.getBounds());
};
let addMyFacilitiesData = (feature, layer) => {
  myLayerControl2.addLayer(layer);
};
let addMyInstitutesData = (feature, layer) => {
  myLayerControl3.addLayer(layer);
};
let addMyPrimaryData = (feature, layer) => {
  myLayerControl4.addLayer(layer);
};
let addMyTownsData = (feature, layer) => {
  myLayerControl5.addLayer(layer);
};

let layerCont = {
  "Kajiado Ranches": myLayerControl,
  "Kenya Facilities": myLayerControl2,
  "Kenya Institutes": myLayerControl3,
  "Primary Schools": myLayerControl4,
  "Kenya Towns": myLayerControl5,
};

var layerControl = L.control
  .layers(baseMaps, layerCont, { collapsed: false })
  .addTo(map);
