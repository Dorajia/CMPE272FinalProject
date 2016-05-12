
function style(feature){
				return{
					fillColor: getColor(feature.properties.Time),
					color: "#ff7800",
					fillOpacity: 0.8
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
	if(index < 5 ){
	//var olderLayer = myLayer;
	loadData(index);
	//mymap.removeLayer(olderLayer);
	}
};


function getColor(d) {
return d > 45 ? "#fee5d9" :
d > 30 ?  "#fcbba1" :
d > 15 ? "#fc9272" :
d > 8 ?   "#fb6a4a" :
d > 5 ? "#de2d26" :
d > 3 ? "#a50f15" :
d > 0 ? "#99000d" :
"#FFEDA0";
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