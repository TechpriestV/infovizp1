d3.csv("data/realData.csv", function(error, data) {
    if(error){
      console.log("Data error");
      throw error;
    }
    // data.forEach(function(d) {
    //     d["totalSkill"]= +d["Skill 1"] + +d["Skill 2"] + +d["Skill 3"] + +d["Skill 4"] + +d["Skill 5"] + +d["Skill 6"] + +d["Skill 7"] + +d["Skill 8"] + +d["Skill 9"] + +d["Skill 10"] + +d["Skill 11"] + +d["Skill 12"];
        
    // });
    options = ["Major", "Degree"];
    details = [
        {
            "skill" :"Skill 1",
            "text" : "Visualization",
            "active" : true
        },{
            "skill" :"Skill 2",
            "text" : "Statistical",
            "active" : true
        },{
            "skill" :"Skill 3",
            "text" : "Mathematics",
            "active" : true
        },{
            "skill" :"Skill 4",
            "text" : "Artistic",
            "active" : true
        },{
            "skill" :"Skill 5",
            "text" : "Computer",
            "active" : true
        },{
            "skill" :"Skill 6",
            "text" : "Programming",
            "active" : true
        },{
            "skill" :"Skill 7",
            "text" : "Graphics",
            "active" : true
        },{
            "skill" :"Skill 8",
            "text" : "HCI",
            "active" : true
        },{
            "skill" :"Skill 9",
            "text" : "UX Eval",
            "active" : true
        },{
            "skill" :"Skill 10",
            "text" : "Communication",
            "active" : true
        },{
            "skill" :"Skill 11",
            "text" : "Collaboration",
            "active" : true
        },{
            "skill" :"Skill 12",
            "text" : "Git",
            "active" : true
        }];

    option = options[0]
    // console.log(details)
    // d3.select("buttonDiv").selectAll("button")
    //     .data(options)
    //     .enter()
    //     .append("button")
    //     .attr("id", function(d) { return d;})
    //     .text(function(d) {return d;})
    //     .style("font-weight", function(d) {
    //         if (d==option) {
    //             return "bold";
    //         }else{
    //             return "normal";
    //         }
    //     })
    //     .on("mousedown", function(d) {
    //         // columnForGroup = d;
    //         // console.log(d)
    //         option = d
    //         drawButtons()
    //         draw(d)
    //     })

    drawButtons();

    // d3.select("detailOptions").selectAll("button")
    //     .data(details)
    //     .enter()
    //     .append("button")
    //     .text(function(d) {return d.text;})

    // var chart = bubbleChart().columnForGroup("Major");
    //     d3.select("#chart").data(data).call(chart);
    // console.log(data)

    draw();

    function drawButtons() {
        $('buttonDiv').empty();
        $('detailOptions').empty()

        d3.select("buttonDiv").selectAll("button")
        .data(options)
        .enter()
        .append("button")
        .attr("id", function(d) { return d;})
        .text(function(d) {return d;})
        .style("font-weight", function(d) {
            if (d==option) {
                return "bold";
            }else{
                return "normal";
            }
        })
        .on("mousedown", function(d) {
            // columnForGroup = d;
            // console.log(d)
            option = d
            draw()
            drawButtons()
        });

        d3.select("detailOptions").selectAll("button")
        .data(details)
        .enter()
        .append("button")
        .text(function(d) {return d.text;})
        .style("font-weight", function(d) {
            // console.log(d.active)
            if (d.active) {
                return "bold";
            }else{
                return "normal";
            }
        })
        .on("mousedown", function(d) {
            d.active = !d.active
            // console.log(d)
            drawButtons()
            
            // draw()

        })
        d3.select("redraw").selectAll("button")
        .data(["Redraw"])
        .enter()
        .append("Button")
        .text(function(d) {return d})
        .style("background-color", "grey")
        .style("color", "white")
        .on("mousedown", function() {
            draw();
        });

    }

    function draw() {
        $('svg').empty()
        tmp = []
        for (var i = 0; i < details.length; i++) {
            if(details[i].active){
                tmp.push(details[i].skill)
            }
        }
        // console.log(tmp)
        var chart = bubbleChart().columnForGroup(option)//.skills(tmp);
        chart.skills(tmp);
        d3.select("#chart").data(data).call(chart);
    }
  });
// function updateFilter(argument) {
//     console.log("hej3")
//     console.log(chart.updateFilter())
    
// }