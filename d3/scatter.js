require.undef('scatter');

define('scatter', ['d3'], function (d3) {
    function draw(container, data, width, height) {
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = width - margin.left - margin.right,
            height = height - margin.top - margin.bottom;
        
        var xRange = d3.scaleLinear()
            .range([0, width])
            .nice();

        var yRange = d3.scaleLinear()
            .range([height, 0])
            .nice();

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var xAxis = d3.axisBottom(xRange).tickSize(-height);
        var yAxis = d3.axisLeft(yRange).tickSize(-width);

        var svg = d3.select(container).append("svg")
            .attr("id", "scatter")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        data.forEach( (d) => {
            d.sepalLength = +d.sepalLength;
            d.sepalWidth = +d.sepalWidth;
        });

        xRange.domain(d3.extent(data, function(d) { return d.sepalWidth; })).nice();
        yRange.domain(d3.extent(data, function(d) { return d.sepalLength; })).nice();

         svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .append("text")
          .attr("class", "label")
          .attr("x", width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .style("fill", "black")
          .text("Sepal Width (cm)");

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .style("fill", "black")
          .text("Sepal Length (cm)");

        svg.selectAll(".dot")
          .data(data)
        .enter().append("circle")
          .attr("class", "dot")
          .attr("r", 3.5)
          .attr("cx", function(d) { return xRange(d.sepalWidth); })
          .attr("cy", function(d) { return yRange(d.sepalLength); })
          .style("fill", function(d) { return color(d.species); });

        var legend = svg.selectAll(".legend")
          .data(color.domain())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

        legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d; });
    }
    return draw;
});