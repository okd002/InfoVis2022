var data;
var bar_chart;

d3.csv("https://okd002.github.io/InfoVis2022/W10/task1.csv")
    .then( data => {
        data.forEach( d => {d.value = +d.value; });
        this.data = data;

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 256,
            margin: {top:25, right:10, bottom:50, left:100},
            title: 'Car sales by manufacturer in 2020',
            xlabel: 'Car sales',
            ylabel: 'Manufacturer'
        };

        bar_chart = new BarChart( config);
        bar_chart.update(data);


    })
    .catch( error => {
        console.log( error );
    });
   
d3.select('#reverse')
    .on('click', d => {
        data.reverse();
        bar_chart.update(data);
    });

d3.select('#ascend')
    .on('click', d => {
        data.sort((a,b) => {
          return d3.ascending(a.value, b.value);
        });

        bar_chart.update(data);
    });    

d3.select('#descend')
    .on('click', d => {
        data.sort((a,b) => {
          return d3.descending(a.value, b.value);
        });

        bar_chart.update(data);
    });    