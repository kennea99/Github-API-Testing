function importStars()
{
    d3.json("https://api.github.com/search/repositories?q=stars:>50000", function(data)
    {
    console.log(data);
    var canvas = ds.select(".importStars").append("svg")
        .attr("width", 1000)
        .attr("height" ,1000);

    canvas.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", function(d)
        {
            return d.stargazers_count
        })
    })
}