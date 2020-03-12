require.undef('world');

define('world', ['d3', 'topojson'], function (d3, topojson) {
    function draw(container, data, width, height) {
        console.log(container)
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = width - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;
        
        var svg = d3.select(container).append("svg")
            .attr("id", "world")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        
        const g = svg.append('g');

        svg.call(d3.zoom().on('zoom', () => {
            g.attr('transform', d3.event.transform);
        }));
        const projection = d3.geoNaturalEarth1();
        
        const pathGenerator = d3.geoPath().projection(projection);
        g.append('path')
            .attr('class', 'sphere')
            .attr('d', pathGenerator({type: 'Sphere'}))
            .attr('fill', 'blue');

        const countries = topojson.feature(data, data.objects.countries);
        console.log(countries)
        g.selectAll('path').data(countries.features)
          .enter().append('path')
            .attr('class', 'country')
            .attr('d', pathGenerator)
            .attr('fill', 'black')
            .attr('stroke', 'white');
    }
    return draw
});