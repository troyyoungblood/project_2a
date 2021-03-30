// Use this link to get the geojson data in folder.
// let link = "../static/data/har.geojson";

let link = "/filter_table";

let myMap = L.map("map", {
  center: [29.76, -95.37],
  zoom: 4
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

function getColor(d) {
  return d >= 100 ? 'brown' : 
    d >= 50 ? 'red' : 
    d >= 25 ? 'orange' :
    d >= 10 ? 'green' : 
    'grey';
}

  // d3.selectAll("li").style("color", "black");

d3.json(link).then(function(data1) {
  console.log(data1);
});


  // Grabbing our GeoJSON data..
  console.log(link)
  d3.json(link).then(function(data) {

  datafeatures = data.features
  //console.log(datafeatures)
  lisDict=[]
  let index=[]
  for (let i=0; i<datafeatures.length; i++){  
  item = datafeatures[i]
  //console.log(item)
  properties = item.properties
  //console.log(properties)
  index.push(i)
  //console.log(index)
  dict_i={}



  //***********************GET HAR DATA*********************/
  mls=properties.mls
  //console.log(mls)
  // street_number=properties.street_number 
  // street_name = properties.street_name  
  // unit = properties.unit
  // city = properties.city
  zip = properties.zip
  // county = properties.county
  subdivision = properties.subdivision
  // home_type = properties.home_type
  // year_built = properties.year_built
  bedrooms = properties.bedrooms
  // full_bath = properties.full_bath
  // half_bath = properties.half_bath
  total_baths = properties.total_baths
  // room_count = properties.room_count_i
  // fireplaces = properties.fireplaces
  // stories = properties.stories
  // pool_private = properties.pool_private
  // garages = properties.garages
  // style = properties.style
  list_price = properties.list_price
  market_area = properties.market_area
  area = properties.area
  // dom = properties.dom
  // cdom = properties.cdom
  // list_date = properties.list_date
  // school_district = properties.school_district
  // elementary = properties.elementary
  // high_school = properties.high_school
  full_address = properties.full_address
  // latitude = properties.latitude
  // longitude = properties.longitude
  // geocode = properties.geocode
  rating = properties.rating
  dict_i["mls"]= mls
  dict_i["address"]= full_address
  dict_i["zip"]= zip
  dict_i["subdivision"]= subdivision
  dict_i["Price"]= parseInt(list_price)
  dict_i["bedrooms"]= bedrooms
  dict_i["total baths"]= total_baths
  dict_i["rating"] = rating
  
  lisDict.push(dict_i)
  //console.log(lisDict)
}

  //-------------IMPORT DATA TABLE-------------------------
    //select the table inside html
    d3.select('.table')
    //Assign this table to a D3 element for manipulation
    let tableElement = d3.select('.table')
    //change the table format to something more attractive
    tableElement.classed('table-striped', true)
    //select the body of the html table
    let tbodyElem = tableElement.select('tbody');

    //let tbody = d3.select("tbody");
    //define callback function
    function processRecord(row1){
      let item = tbodyElem.append('tr');
      Object.values(row1).forEach(function(thing){ 
      item.append('td').text(thing);});
    }

    lisDict.forEach (processRecord);


  //----------------------------------------


  // ~~~~~~~~~~~~~~~~FORMS~~~~~~~~~~~~~~~~~~~~

  // Assign the data from `data.js` to a descriptive variable
  let RScase = lisDict;
  let buttonA = d3.select("#buttonA");
  let buttonB = d3.select("#buttonB");
  let buttonC = d3.select("#buttonC");
  let buttonD = d3.select("#buttonD");
  let form1 = d3.select("#form1");
  let form2 = d3.select("#form2");
  let form3 = d3.select("#form3");
  let form4 = d3.select("#form4");



  // for (let i=1; i < RScase.length; i++){
  //     console.log(RScase.datetime).text()}

  // Create event handlers 
  buttonA.on("click", runEnter1);
  form1.on("submit", runEnter1);
  buttonB.on("click", runEnter2)
  form2.on("submit", runEnter2);
  buttonC.on("click", runEnter3);
  form3.on("submit",runEnter3);
  buttonD.on("click", runEnter4);
  form4.on("submit",runEnter4);

  // Complete the event handler function for the form
  function runEnter1(event) {
  // Prevent the page from refreshing
  event.preventDefault();  
  // Select the input element and get the raw HTML node
  let inputElement = d3.select("#chaseSearcher"); 
  // Get the value property of the input element
  let inputValue = inputElement.property("value");
  let inputValueint = parseInt(inputValue)

  console.log(inputValueint)
  let maxPrice = inputValueint+inputValueint*0.10
  let minPrice = inputValueint-inputValueint*0.10
  console.log(maxPrice)
  //console.log(RScase)

    let filteredData1 = RScase.filter(theones => 
      theones.Price >= minPrice && theones.Price <= maxPrice); 

      console.log(filteredData1);

    
      // d3.select('.table')
      tableElement1=d3.select("#Subset")
      tableElement1.classed('table-striped', true)
      let tbody1 = tableElement1.select('tbody')
      tbody1.html("")
      console.log(tableElement1)
      console.log(tbody1)


      //define callback function
      function processRecord1(row){
      let item = tbody1.append('tr');
      Object.values(row).forEach(function(thing){
      item.append('td').text(thing);});
    }
      filteredData1.forEach (processRecord1);
    }





  function runEnter2(event) {

    // Prevent the page from refreshing
    event.preventDefault(); 
    
    //// elementary to rating
    // Select the input element and get the raw HTML node
    let inputElement = d3.select("#S2"); 
    console.log(`rating ${inputElement}`)

    // Get the value property of the input element
    let inputValue = inputElement.property("value");
    console.log(`values ${inputValue}`)

    console.log(inputValue);

    let filteredData2 = RScase.filter(theones => 
      theones.rating >= inputValue);

      console.log(filteredData2); 
    
    ////////// end of elementary

  
      let tableElement2 = d3.select('#Subset')
      //change the table format to something more attractive
      tableElement2.classed('table-striped', true)
      //select the body of the html table
      let tbody2 = tableElement2.select('tbody')
      tbody2.html("")

      //define callback function
      function processRecord2(row){
      let item = tbody2.append('tr');
      Object.values(row).forEach(function(thing){
      item.append('td').text(thing);});
      }
    filteredData2.forEach (processRecord2);
  }

  function runEnter3(event) {
    // Prevent the page from refreshing
    event.preventDefault();  
    // Select the input element and get the raw HTML node

    ////////// high-school mls number
    let inputElement = d3.select("#S3"); 
    // Get the value property of the input element
    let inputValue = inputElement.property("value");
    console.log(`mls ${inputValue}`)
    console.log(inputValue);
  
    let filteredData3 = RScase.filter(theones => 
    theones.mls === inputValue); 
    console.log(filteredData3); 

    let tableElement3 = d3.select('#Subset')
    //change the table format to something more attractive
    tableElement3.classed('table-striped', true)
    //select the body of the html table
    let tbody3 = tableElement3.select('tbody')
    tbody3.html("")

    //define callback function
    function processRecord3(row){
    let item = tbody3.append('tr');
    Object.values(row).forEach(function(thing){
    item.append('td').text(thing);});
  }
  filteredData3.forEach (processRecord3);

  }

  function runEnter4(event) {
    // Prevent the page from refreshing
    event.preventDefault();  
    // Select the input element and get the raw HTML node
    let inputElement = d3.select("#S4"); 
    // Get the value property of the input element
    let inputValue = inputElement.property("value");
    console.log(`zip ${inputValue}`)

  console.log(inputValue);

    let filteredData4 = RScase.filter(theones => 
      theones.zip === inputValue);   

    console.log(filteredData4);  
    
    let tableElement4 = d3.select('#Subset')
    //change the table format to something more attractive
    tableElement4.classed('table-striped', true)
    //select the body of the html table
    let tbody4 = tableElement4.select('tbody')
    tbody4.html("")

  //define callback function
  function processRecord4(row){
    let item = tbody4.append('tr');
    Object.values(row).forEach(function(thing){
    item.append('td').text(thing);});
  }
  filteredData4.forEach (processRecord4);
    
  }


  }
)
