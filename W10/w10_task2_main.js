
d3.csv("https://okd002.github.io/InfoVis2022/W10/task2.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 256,
            margin: {top:30, right:10, bottom:50, left:100},
            title: 'The relationship between Team Score and Bases on Balls in professional baseball in 2021',
            xlabel: 'Team Score',
            ylabel: 'Bases on Balls'
        };

        const scatter_plot = new ScatterPlot( config, data);
        scatter_plot.update();


    })
    .catch( error => {
        console.log( error );
    });
 