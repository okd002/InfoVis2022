d3.csv("https://okd002.github.io/InfoVis2022/W08/w08_task1.csv")
    .then( data => {
        var data = [
            {label:'Apple', value:100},
            {label:'Banana', value:200},
            {label:'Cookie', value:50},
            {label:'Doughnut', value:120},
            {label:'Egg', value:80}
        ];

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:25, right:10, bottom:50, left:50},
            title: 'Sample Data',
            xlabel: 'X label',
            ylabel: 'Y label'
        };

        const bar_chart = new BarChart( config, data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });