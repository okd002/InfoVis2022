d3.csv("https://okd002.github.io/InfoVis2022/W10/task1.csv")
    .then( data => {
        data.forEach( d => {d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 256,
            margin: {top:25, right:50, bottom:50, left:80},
            title: 'Bar Chart',
            xlabel: 'X label',
            ylabel: 'Y label'
        };

        const bar_chart = new BarChart( config, data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });