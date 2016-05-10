function style(feature){
				return{
					fillColor: getColor(feature.properties.Index),
					color: "#ff7800",
					fillOpacity: 0.4
				};
			};



function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: loadLayer
//		dblclick: loadLayer(geo)
    });
};

function highlightFeature(e){

    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.9
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
};

function resetHighlight(e){
	 myLayer.resetStyle(e.target);
};

function loadLayer(e){
	console.log(e.target.feature.properties.Index%2);
	console.log(e.target.feature.properties.Index%2==0);
	console.log(e.target.feature.properties.Index%2===0);
	var data =e.target.feature.properties.Index%2==0 ? geo2 : geo;

	mymap.removeLayer(myLayer);
	myLayer = L.geoJson(data,
			{
			style:style,
			onEachFeature: onEachFeature
			}
			).addTo(mymap);
};


function getColor(d) {
return d > 800 ? "#fee5d9" :
d > 650  ? "#fcbba1" :
d > 500  ? "#fc9272" :
d > 350  ? "#fb6a4a" :
d > 200   ? "#de2d26" :
d > 100   ? "#a50f15" :
d > 0   ? "#99000d" :
"#FFEDA0";
};