# Build RESTful API using Node and MongoDB

## Instruction : 
Server.js is used to get the informaiton from Google Maps Distance Matrix API, generate the GeoJson format data and store it in MongoDB.

testdata.js is for the map to get the GeoJson data from MongoDB.

## Installation : 
Install node at your server first.
Download or clone the code and run the command below:
 
 node Server.js

## Testing REST api : 

Open up REST simulator ( Postman recommended )

Hit following URL's : 
Http://localhost:8080/0
0 is the index of hexagon.

if you are runing node Server.js, it will store GeoJson data from 0 to all other 841 hexagons.






