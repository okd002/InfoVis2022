let input_data;
let scatter_plot;
let bar_chart;
let filter = [];

d3.csv("https://okd002.github.io/InfoVis2022/final/data.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.birth_rate= +d.birth_rate;
            d.first_age = +d.first_age;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['good','birth','age','bad']);

        scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Birth rate',
            ylabel: 'First age',
            cscale: color_scale
        }, input_data );
        scatter_plot.update();

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Species',
            cscale: color_scale
        }, input_data );
        bar_chart.update();
    
    })

    .catch( error => {
        console.log( error );
    });

function Filter() {
    if ( filter.length == 0 ) {
        scatter_plot.data = input_data;
    }
    else {
        scatter_plot.data = input_data.filter( d => filter.includes( d.evalution) );
    }
    scatter_plot.update();
}
