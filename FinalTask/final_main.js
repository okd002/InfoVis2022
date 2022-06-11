var input_data;
var scatter_plot;
var bar_chart;
var bar_chart2;
var type_num=1;
var value;

var filter = [];

d3.csv("https://okd002.github.io/InfoVis2022/FinalTask/data.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.birth_rate= +d.birth_rate;
            d.first_age = +d.first_age;
            d.population = +d.population;
            d.wait = +d.wait;
            d.consumption = +d.consumption;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['good','birth','age','bad']);

        scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 512,
            height: 512,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Birth rate',
            ylabel: 'First age',
            cscale: color_scale,
        }, input_data );
        scatter_plot.update(type_num);

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Results classified into 3 types',
            cscale: color_scale,
        }, input_data );
        bar_chart.update();

        bar_chart2 = new BarChart2( {
            parent: '#drawing_region_barchart2',
            width: 512,
            height: 512,
            margin: {top:10, right:10, bottom:50, left:70},
            xlabel: 'Population or WaitChiledren or Consumption',
            cscale: color_scale,
        }, input_data );
        bar_chart2.update(type_num);


    d3.select('#normal')
    .on('click', d => {
        type_num = 1;
        scatter_plot.update( type_num);
        bar_chart2.update(type_num);
    });

    d3.select('#population')
    .on('click', d => {
       type_num = 2;
        scatter_plot.update( type_num);
        bar_chart2.update(type_num);
    });

    d3.select('#wait')
    .on('click', d => {
       type_num = 3;
        scatter_plot.update( type_num);
        bar_chart2.update(type_num);
    });

    d3.select('#consumption')
    .on('click', d => {
       type_num = 4;
        scatter_plot.update( type_num);
        bar_chart2.update(type_num);
    });

    d3.select('#ascend')
    .on('click', d => {
        data.sort((a,b) => {
             
          if(type_num ==1 || type_num == 2){
            return d3.ascending(a.population, b.population);
          }else if(type_num ==3){
            return d3.ascending(a.wait/a.population, b.wait/b.population);
          }else if(type_num ==4){
            return d3.ascending(a.consumption, b.consumption);
          }else return 0;

        });

        bar_chart2.update(type_num);
    });    

    d3.select('#descend')
    .on('click', d => {
        data.sort((a,b) => {
           
            if(type_num ==1 || type_num == 2){
                return d3.descending(a.population, b.population);
              }else if(type_num ==3){
                return d3.descending(a.wait/a.population, b.wait/b.population);
              }else if(type_num ==4){
                return d3.descending(a.consumption, b.consumption);
              }else return 0;


        });

        bar_chart2.update(type_num);
    });    
 

    
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
