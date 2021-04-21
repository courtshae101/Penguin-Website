//Read in the data and log it to the console. 

d3.csv("penguin_count.csv").then((data) => {
    const parser = d3.timeParse("%Y");

    for (i=0; i<data.length; i++) {
        data[i].year = parser(data[i].year)
    };

    data.map((d) => {
        d.Pygoscelis_papua = +d.Pygoscelis_papua;
        d.Pygoscelis_antarcticus = +d.Pygoscelis_antarcticus;
        d.Aptenodytes_forsteri = +d.Aptenodytes_forsteri;
        d.Pygoscelis_adeliae = +d.Pygoscelis_adeliae;
    });


    //Check that data was successfully converted: 
    console.log(data);

    //Nice.

    //Margin convention: Create a margin object to save the four margins around our graph. Then, we'll translate our entire graph over so that the margins can be used for padding and inclusion of axes! 

    //Because we're including the axes, we'll make the left and bottom a bit larger margin. 

    const margin = {top: 50, right:20, bottom:90, left:90}

    //Now determine the width and height by subtracting out the margins. 

    //Outer dimensions are hard-coded
    const outerWidth = 1200;
    const outerHeight = 600;

    const width = outerWidth - margin.left - margin.right;
    const height = outerHeight - margin.top - margin.bottom;

    //We'll make a time scale...
    let yearMin = d3.min(data, d=>d.year)
    let yearMax = d3.max(data, d=>d.year)

    let valMax = d3.max(data, d=>d.Pygoscelis_adeliae)
    console.log(yearMin, yearMax)
    const xScale = d3.scaleTime()
                    .domain([1970, yearMax])
                    .range([0, width])

    const yScale = d3.scaleLinear()
                     .domain([0,valMax])
                     .range([height, 0])

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const buttonsDiv = d3.select("body").append("div");
    //Now we're ready to start drawing (almost.) 
    //Do our setup..

    //Notice what's different: we're adding our visualization within a GROUP, that we position inside the SVG using our margins. 
    const svg = d3.select("body").append("svg")
        .attr("id", "line-graph")
        .attr("height", outerHeight)
        .attr("width", outerWidth)
        .style("border", "1px solid black")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Create our axes using more groups. 
    svg.append("g")
        .call(xAxis)
        .attr("transform", `translate(0,${height})`)
    
    svg.append("g")
        .call(yAxis)



    //Now, we will make our line. Line is one of many D3 "layouts" that help us make some more difficult graphical forms that can't be accomplished with just plain old SVG primitive shapes. 

    //We will give the d3.line() call an x value and a y value, and these will be determined based on our scales and data.
    
    //We are appending a PATH, which is how SVG handles any irregular shapes, and the specific coordinates of that path are calculated by the d3.line() function. It's very useful for this, and we'll set the "d" attribute of the path (fully describes the path, like x y and width and height for rectangles, but all together)

    const Pygoscelis_papua_line = d3.line()
                    .x(d => xScale(d.year))
                    .y(d=>yScale(d.Pygoscelis_papua))

    var line = svg.append("path")
        .datum(data) //DATUM! ONE! Not data - only passing in one here, because we're only making one line. 
        .attr("fill", "none")
        .transition().duration(500)
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        //"d" determines everything, is made using our line generator
        .attr("d", Pygoscelis_papua_line)
        .attr("id", "Pygoscelis-papua-line")

    const Pygoscelis_antarcticus_line = d3.line()
        .x(d => xScale(d.year))
        .y(d=>yScale(d.Pygoscelis_antarcticus))

    svg.append("path")
        .datum(data) //DATUM! ONE! Not data - only passing in one here, because we're only making one line. 
        .attr("fill", "none")
        .transition().duration(500)
        .attr("stroke", "green")
        .attr("stroke-width", 2)
        //"d" determines everything, is made using our line generator
        .attr("d", Pygoscelis_antarcticus_line)
        .attr("id", "Pygoscelis-antarcticus-line")

    const Aptenodytes_forsteri_line = d3.line()
        .x(d => xScale(d.year))
        .y(d=>yScale(d.Aptenodytes_forsteri))

    svg.append("path")
        .datum(data) //DATUM! ONE! Not data - only passing in one here, because we're only making one line. 
        .attr("fill", "none")
        .transition().duration(500)
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        //"d" determines everything, is made using our line generator
        .attr("d", Aptenodytes_forsteri_line)
        .attr("id", "Aptenodytes-forsteri-line")

    const Pygoscelis_adeliae_line = d3.line()
        .x(d => xScale(d.year))
        .y(d=>yScale(d.Pygoscelis_adeliae))

    svg.append("path")
        .datum(data) //DATUM! ONE! Not data - only passing in one here, because we're only making one line. 
        .attr("fill", "none")
        .transition().duration(500)
        .attr("stroke", "purple")
        .attr("stroke-width", 2)
        //"d" determines everything, is made using our line generator
        .attr("d", Pygoscelis_adeliae_line)
        .attr("id", "Pygoscelis-adeliae-line")

    

    const Pygoscelis_papua_button = buttonsDiv.append("button")
        .text("Pygoscelis Papua")
        .attr("id", "Pygoscelis-papua")
        .on("click", () => {
            d3.select("#Pygoscelis-papua-line").style("opacity", 1)
            d3.select("#Pygoscelis-antarcticus-line").style("opacity", 0)
            d3.select("#Aptenodytes-forsteri-line").style("opacity", 0)
            d3.select("#Pygoscelis-adeliae-line").style("opacity", 0)
        })
        .on("mouseover", () => {
            d3.select("#Pygoscelis-papua").style("opacity", 1)
            d3.select("#Pygoscelis-antarcticus").style("opacity", .5)
            d3.select("#Aptenodytes-forsteri").style("opacity", .5)
            d3.select("#Pygoscelis-adeliae").style("opacity", .5)
            d3.select("#reset").style("opactiy", .5)

            d3.select("#Pygoscelis-papua-line").style("stroke-width", 4)
        })
        .on("mouseout", () => {
            d3.select("#Pygoscelis-papua").style("opacity", 1)
            d3.select("#Pygoscelis-antarcticus").style("opacity", 1)
            d3.select("#Aptenodytes-forsteri").style("opacity", 1)
            d3.select("#Pygoscelis-adeliae").style("opacity", 1)
            d3.select("#reset").style("opactiy", 1)

            d3.select("#Pygoscelis-papua-line").style("stroke-width", 2)
        });

    const Pygoscelis_antarcticus_button = buttonsDiv.append("button")
        .text("Pygoscelis Antarcticus")
        .attr("id", "Pygoscelis-antarcticus")
        .on("click", () => {
            d3.select("#Pygoscelis-papua-line").style("opacity", 0)
            d3.select("#Pygoscelis-antarcticus-line").style("opacity", 1)
            d3.select("#Aptenodytes-forsteri-line").style("opacity", 0)
            d3.select("#Pygoscelis-adeliae-line").style("opacity", 0)
        })
        .on("mouseover", () => {
            d3.select("#Pygoscelis-papua").style("opacity", .5)
            d3.select("#Pygoscelis-antarcticus").style("opacity", 1)
            d3.select("#Aptenodytes-forsteri").style("opacity", .5)
            d3.select("#Pygoscelis-adeliae").style("opacity", .5)
            d3.select("#reset").style("opactiy", .5)

            d3.select("#Pygoscelis-antarcticus-line").style("stroke-width", 4)

        })
        .on("mouseout", () => {
            d3.select("#Pygoscelis-papua").style("opacity", 1)
            d3.select("#Pygoscelis-antarcticus").style("opacity", 1)
            d3.select("#Aptenodytes-forsteri").style("opacity", 1)
            d3.select("#Pygoscelis-adeliae").style("opacity", 1)
            d3.select("#reset").style("opactiy", 1)

            d3.select("#Pygoscelis-antarcticus-line").style("stroke-width", 2)

        });

    const Aptenodytes_forsteri_button = buttonsDiv.append("button")
        .text("Aptenodytes Forsteri")
        .attr("id", "Aptenodytes-forsteri")
        .on("click", () => {
            d3.select("#Pygoscelis-papua-line").style("opacity", 0)
            d3.select("#Pygoscelis-antarcticus-line").style("opacity", 0)
            d3.select("#Aptenodytes-forsteri-line").style("opacity", 1)
            d3.select("#Pygoscelis-adeliae-line").style("opacity", 0)
        })
        .on("mouseover", () => {
            d3.select("#Pygoscelis-papua").style("opacity", .5)
            d3.select("#Pygoscelis-antarcticus").style("opacity", .5)
            d3.select("#Aptenodytes-forsteri").style("opacity", 1)
            d3.select("#Pygoscelis-adeliae").style("opacity", .5)
            d3.select("#reset").style("opactiy", .5)

            d3.select("#Aptenodytes-forsteri-line").style("stroke-width", 4)
        })
        .on("mouseout", () => {
            d3.select("#Pygoscelis-papua").style("opacity", 1)
            d3.select("#Pygoscelis-antarcticus").style("opacity", 1)
            d3.select("#Aptenodytes-forsteri").style("opacity", 1)
            d3.select("#Pygoscelis-adeliae").style("opacity", 1)
            d3.select("#reset").style("opactiy", 1)

            d3.select("#Aptenodytes-forsteri-line").style("stroke-width", 2)
        });

    const Pygoscelis_adeliae_button = buttonsDiv.append("button")
        .text("Pygoscelis Adeliae")
        .attr("id", "Pygoscelis-adeliae")
        .on("click", () => {
            d3.select("#Pygoscelis-papua-line").style("opacity", 0)
            d3.select("#Pygoscelis-antarcticus-line").style("opacity", 0)
            d3.select("#Aptenodytes-forsteri-line").style("opacity", 0)
            d3.select("#Pygoscelis-adeliae-line").style("opacity", 1)
        })
        .on("mouseover", () => {
            d3.select("#Pygoscelis-papua").style("opacity", .5)
            d3.select("#Pygoscelis-antarcticus").style("opacity", .5)
            d3.select("#Aptenodytes-forsteri").style("opacity", .5)
            d3.select("#Pygoscelis-adeliae").style("opacity", 1)
            d3.select("#reset").style("opactiy", .5)

            d3.select("#Pygoscelis-adeliae-line").style("stroke-width", 4)
        })
        .on("mouseout", () => {
            d3.select("#Pygoscelis-papua").style("opacity", 1)
            d3.select("#Pygoscelis-antarcticus").style("opacity", 1)
            d3.select("#Aptenodytes-forsteri").style("opacity", 1)
            d3.select("#Pygoscelis-adeliae").style("opacity", 1)
            d3.select("#reset").style("opactiy", 1)

            d3.select("#Pygoscelis-adeliae-line").style("stroke-width", 2)
        });
    
     const reset_button = buttonsDiv.append("button")
        .text("Reset")
        .attr("id", "reset")
        .on("click", () => {
            d3.select("#Pygoscelis-papua-line").style("opacity", 1)
            d3.select("#Pygoscelis-antarcticus-line").style("opacity", 1)
            d3.select("#Aptenodytes-forsteri-line").style("opacity", 1)
            d3.select("#Pygoscelis-adeliae-line").style("opacity", 1)
        })
        .on("mouseover", () => {
            d3.select("#Pygoscelis-papua").style("opacity", .5)
            d3.select("#Pygoscelis-antarcticus").style("opacity", .5)
            d3.select("#Aptenodytes-forsteri").style("opacity", .5)
            d3.select("#Pygoscelis-adeliae").style("opacity", .5)
            d3.select("#reset").style("opactiy", 1)
        })
        .on("mouseout", () => {
            d3.select("#Pygoscelis-papua").style("opacity", 1)
            d3.select("#Pygoscelis-antarcticus").style("opacity", 1)
            d3.select("#Aptenodytes-forsteri").style("opacity", 1)
            d3.select("#Pygoscelis-adeliae").style("opacity", 1)
            d3.select("#reset").style("opactiy", 1)
        });
    
})