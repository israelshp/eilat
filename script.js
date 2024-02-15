const map = L.map("map").setView([29.557872, 34.947187], 15);

L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community",
  }
).addTo(map);

const locate = () => {
  map.locate({ setView: true, maxZoom: 18 });
};

const loadData = async () => {
  let response = await fetch("old_addresses.min.geojson");
  let data = await response.json();
  return data;
};

loadData().then((geoData) => {
  const layer = L.geoJSON(geoData, {
    pointToLayer: (feature, latLng) => {
      let marker = L.marker(latLng, {
        // fillColor: "red",
        // stroke: false,
        // radius: 3,
        icon: L.divIcon({
          html: `<div class="addr-label">${feature.properties["old_addres"]}</div>`,
          className: "addr-label",
        }),
      });
      //   marker.bindTooltip(feature.properties["old_addres"], {
      //     permanent: true,
      //     direction: "bottom",
      //     className: "transparent-tooltip",
      //     offset: [0, -8],
      //   });
      return marker;
    },
    onEachFeature: (feature, layer) => {
      //   layer.bindToolTop(feature["old_addres"], {
      //     permanent: true,
      //   });
    },
  });
  layer.addTo(map);
});
