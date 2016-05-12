
function style(feature){
				return{
					fillColor: getColor(feature.properties.Time),
					color: "#ff7800",
					weight: 0.5,
					fillOpacity: 0.6
				};
			};



function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
       click: loadLayer
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
	console.log(e.target.feature.properties.Index);
	console.log(e.target.feature.properties.Time);
	var index = e.target.feature.properties.Index;
	if(index < 41 || index > 800 ){
	//var olderLayer = myLayer;
	loadData(index);
	//mymap.removeLayer(olderLayer);
	}
	highlightFeature(e);
};


function getColor(d) {
return d > 45 ? "#4575b4" :
d > 30 ?  "#74add1" :
d > 15 ? "#abd9e9" :
d > 8 ?   "#e0f3f8" :
d > 5 ? "#fee090" :
d > 3 ? "#fdae61" :
"#f46d43" ;
};



	function loadData(index){
	$.ajax({
                type: 'GET',
                url: 'http://ec2-52-11-87-42.us-west-2.compute.amazonaws.com/data?index='+index,
                data: { format:'json'},
				dataType: 'application/json',
				
                done:function(data) 
								{ 
									console.log(data.responseText);
									//console.log('got here with data'+data[0]);
									
								},
                error: function(err) { console.log(err); 
										mymap.removeLayer(myLayer);
										myLayer = L.geoJson(JSON.parse(err.responseText),
													{
													style:style,
													onEachFeature: onEachFeature		
													}
													).addTo(mymap);
										},
				success: function(data) 
								{ 
									console.log(data.responseText);
									mymap.removeLayer(myLayer);
									//console.log('got here with data'+data[0]);
									myLayer = L.geoJson(JSON.parse(err.responseText),
													{
													style:style,
													onEachFeature: onEachFeature		
													}
													).addTo(mymap);
								}
            });
		};
