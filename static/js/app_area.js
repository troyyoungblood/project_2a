let svgArea = d3.select("body").select("svg");

let svgWidth = 1000;
let svgHeight = 1000;

let margin = {
  top: 20,
  right: 40,
  bottom: 125,
  left: 110
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
let svg = d3
.select("#scatter")
.append("svg")
.attr("height", svgHeight)
.attr("width", svgWidth);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Append group element
var circleTextGroup = chartGroup.append("g")

// Initial Params
var chosenXAxis = "avg_price";
var chosenYAxis = "count_area";

// function used for updating x-scale var upon click on axis label
function xScale(areaData, chosenXAxis) {
  // create scales
  let xLinearScale = d3.scaleLinear()
    // .domain([((d3.min(areaData, d => d[chosenXAxis]))-75000), ((d3.max(areaData, d => d[chosenXAxis]))+2000)])
    .domain([0, ((d3.max(areaData, d => d[chosenXAxis]))+2)])
    .range([0, width]);

    return xLinearScale;
}

// function used for updating y-scale var upon click on axis label
function yScale(areaData, chosenYAxis) {
  // create scales
  let yLinearScale = d3.scaleLinear()
    .domain([((d3.min(areaData, d => d[chosenYAxis]))-15),((d3.max(areaData, d => d[chosenYAxis]))+10)])
    .range([height, 0]);

    return yLinearScale;
}

// function used for updating xAxis var upon click on axis label
function xRenderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

    return xAxis;
}

// function used for updating yAxis var upon click on axis label
function yRenderAxes(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]))
    .attr("cy", d => newYScale(d[chosenYAxis]))

    return circlesGroup;
}

// function used for updating circles text with a transition to
// new circles
function renderText(textGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

  textGroup.transition()
    .duration(1000)
    .attr("x", d => newXScale(d[chosenXAxis]))
    .attr("y", d => newYScale(d[chosenYAxis]));

    return textGroup;
}

// Read CSV
d3.csv("../static/data/areafinal20.csv").then(function(areaData) {

  console.log(areaData);

    // parse data
    areaData.forEach(function(data) {
      data.count_area = +data.count_area;
      data.min_price = +data.min_price;
      data.max_price = +data.max_price;
      data.avg_price = +data.avg_price;
      data.std_price = +data.std_price;
      data.avg_age = +data.avg_age;
    });

    // xLinearScale function above csv import
    let xLinearScale = xScale(areaData, chosenXAxis);

    // yLinearScale function above csv import
    let yLinearScale = yScale(areaData, chosenYAxis);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    let xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

      // append y axis
    let yAxis = chartGroup.append("g")
      .classed("y-axis", true)
      .call(leftAxis);    

    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(areaData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 25)
        .attr("fill", "blue")
        .attr("opacity", ".50");

      // add text to circles
      var textGroup = circleTextGroup.selectAll("text")
        .data(areaData)
        .enter()
        .append("text")
        .attr("class", "areaText")
        .text(d => d.area_abbr)
        .attr("x", d => xLinearScale(d[chosenXAxis]))
        // the +5 lowers the text in the circle to more the center
        // - orginally riding high 
        .attr("y", d => (yLinearScale(d[chosenYAxis]))+6);    

    // Create group for three x-axis labels
    let xLabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

    let apriceLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "avg_price") // value to grab for event listener
    .attr("class", "aText")    
    .classed("active", true)
    .text("Average Home Price in Area ($)");

    let mipriceLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 45)
    .attr("value", "min_price") // value to grab for event listener
    .attr("class", "aText")    
    .classed("active", true)    
    .attr("class", "aText")
    .text("Minimum Home Price in Area ($)");

    let mapriceLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 70)
    .attr("value", "max_price") // value to grab for event listener
    .attr("class", "aText")    
    .classed("active", true)
    .text("Maximum Home Price in Area ($)");

    let spriceLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 95)
    .attr("value", "std_price") // value to grab for event listener
    .attr("class", "aText")    
    .classed("active", true)
    .text("Standard Deviation of Home Price in Area ($)");



    // Create group for three y-axis labels
    let yLabelsGroup = chartGroup.append("g")

    let caLabel = yLabelsGroup.append("text")
    .attr("transform", "rotate(-90)")    
    .attr("y", 75 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("value", "count_area") // value to grab for event listener
    .attr("class", "aText")
    .classed("active", true)
    .text("Number of Homes for Sale in Area");

    let aaLabel = yLabelsGroup.append("text")
    .attr("transform", "rotate(-90)")    
    .attr("y", 50 - margin.left)
    .attr("x", 0 - (height / 2))    
    .attr("value", "avg_age") // value to grab for event listener
    .attr("class", "aText")
    .classed("active", true)
    .text("Average Age of Home in Area");

    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

    // x axis labels event listener
    xLabelsGroup.selectAll("text")
    .on("click", function() {
    // get value of selection
    let value = d3.select(this).attr("value");
    if (value !== chosenXAxis) {

      // replaces chosenXAxis with value
      chosenXAxis = value;

      // functions here found above csv import
      // updates x scale for new data
      xLinearScale = xScale(areaData, chosenXAxis);

      // updates x axis with transition
      xAxis = xRenderAxes(xLinearScale, xAxis);

      // updates circles with new x values
      circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis); 

      // updates circles text with new values
      textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);  

      // updates tooltips with new info
      circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

      // changes classes to change bold text
      if (chosenXAxis === "min_price") {
        mipriceLabel
          .classed("active", true)
          .classed("inactive", false);
        mapriceLabel
          .classed("active", false)
          .classed("inactive", true);
        spriceLabel
          .classed("active", false)
          .classed("inactive", true); 
        apriceLabel
          .classed("active", false)
          .classed("inactive", true);   
      }
      if (chosenXAxis === "max_price"){
        mipriceLabel
          .classed("active", false)
          .classed("inactive", true);
        mapriceLabel
          .classed("active", true)
          .classed("inactive", false);
        spriceLabel
          .classed("active", false)
          .classed("inactive", true); 
        apriceLabel
          .classed("active", false)
          .classed("inactive", true);   
      }
      if (chosenXAxis === "std_price"){
        mipriceLabel
          .classed("active", false)
          .classed("inactive", true);
        mapriceLabel
          .classed("active", false)
          .classed("inactive", true);
        spriceLabel
          .classed("active", true)
          .classed("inactive", false); 
        apriceLabel
          .classed("active", false)
          .classed("inactive", true); 
      }
      if (chosenXAxis === "avg_price"){
        mipriceLabel
          .classed("active", false)
          .classed("inactive", true);
        mapriceLabel
          .classed("active", false)
          .classed("inactive", true);
        spriceLabel
          .classed("active", false)
          .classed("inactive", true); 
        apriceLabel
          .classed("active", true)
          .classed("inactive", false); 
      }
    }
  })

    // y axis labels event listener
    yLabelsGroup.selectAll("text")
    .on("click", function() {
    // get value of selection
    let value = d3.select(this).attr("value");
    if (value !== chosenYAxis) {

      // replaces chosenXAxis with value
      chosenYAxis = value;

      // functions here found above csv import
      // updates x scale for new data
      yLinearScale = yScale(areaData, chosenYAxis);

      // updates y axis with transition
      yAxis = yRenderAxes(yLinearScale, yAxis);

      // updates circles with new y values
      circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis); 

      // updates circles text with new values
      textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);  

      // updates tooltips with new info
      circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

      // changes classes to change bold text
      if (chosenYAxis === "avg_age") {
        aaLabel
          .classed("active", true)
          .classed("inactive", false);
        caLabel
          .classed("active", false)
          .classed("inactive", true);
      }
      if (chosenYAxis === "count_area"){
        aaLabel
          .classed("active", false)
          .classed("inactive", true);
        caLabel
          .classed("active", true)
          .classed("inactive", false);
      }
    }
      // end of y listener for axis changes
  });

  // function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

  let xlabel;
  let ylabel;

  if (chosenXAxis === "avg_price") {
    xlabel = "Average Home Price in Area";
  }

  if (chosenXAxis === "min_price") {
    xlabel = "Minimum Home Price in Area";
  }

  if (chosenXAxis === "max_price"){
    xlabel = "Maximum Home Price in Area";
  }

  if (chosenXAxis === "std_price"){
    xlabel = "Standard Deviation of Home Price in Area";
  }

  if (chosenYAxis === "count_area") {
    ylabel = "Number of Homes for Sale in Area";
  }

  if (chosenYAxis === "avg_age") {
    ylabel = "Average Age of Home in Area";
  }

  let toolTip = d3.select('body').append('div').classed('xtooltip', true);
  // let toolTip = d3.select('body').append('div').classed('d3-tip', true);

  circlesGroup.on("mouseover", function(event, d) {
    // toolTip.show(`${d.abbr}<br>${xlabel} ${d[chosenXAxis]} <br> ${ylabel} ${d[chosenYAxis]}`);
    toolTip.style('display', 'block')
          .html(`${d.area}<br>${xlabel} : $ ${d[chosenXAxis]} <br> ${ylabel} : ${d[chosenYAxis]}`)
          .style('left', event.pageX+'px')
          .style('top', event.pageY+'px');
    })
    // onmouseout event
    .on("mouseout", function(event,index) {
      // toolTip.hide(event);
      console.log(event)
      console.log(index)
      toolTip.style('display', 'none');
    });

  return circlesGroup;
  // end of next axis to update labels and hover text
}
  // end of areadata function
});
