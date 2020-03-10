require.undef('circles');

define('circles', ['d3'], function (d3) {
    function draw(container, data, width, height) {
        var svg = d3.select(container).append("svg")
            .attr('width', width)
            .attr("id", "circles")
            .attr('height', height);
        svg.selectAll('circle')
            .data(data)
            .enter()
                .append('circle')
                .attr("cx", function(d, i) {return 80 * (i + 1);})
                .attr("cy", function(d, i) {return 100 + 30 * (i % 3 - 1);})
                .style("fill", "#1570a4")
                .transition().duration(2000)
                .attr("r", function(d) {return 2*d;});
    }
    return draw;
});