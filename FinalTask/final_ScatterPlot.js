class ScatterPlot {

    constructor (config, data) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            xlabel: config.xlabel || '',
            ylabel: config.ylabel || '',
            cscale: config.cscale,
        };
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            .range( [self.inner_height, 0] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(3)
            .tickSize(5)
            .tickPadding(5);

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(3)
            .tickSize(5)
            .tickPadding(5);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis_group = self.chart.append('g');

        const xlabel_space = 40;
        self.svg.append('text')
            .style('font-size', '12px')
            .attr('x', self.config.margin.left + self.inner_width / 2)
            .attr('y', self.inner_height + self.config.margin.top + xlabel_space)
            .attr('text-anchor', 'middle')
            .text( self.config.xlabel );

        const ylabel_space = 45;
        self.svg.append('text')
            .style('font-size', '12px')
            .attr('transform', `rotate(-90)`)
            .attr('y', self.config.margin.left - ylabel_space)
            .attr('x', -self.config.margin.top - self.inner_height / 2)
            .attr('text-anchor', 'middle')
            .attr('dy', '1em')
            .text( self.config.ylabel );
    }

    update(type_num) {
        let self = this;
        self.type_num = type_num;
        self.cvalue = d => d.evalution;
        if(self.type_num == 2 || self.type_num == 3 || self.type_num == 4)  self.cvalue = d => d.prefectures;

        self.xvalue = d => d.birth_rate;
        self.yvalue = d => d.first_age;

        const xmin = d3.min( self.data, self.xvalue );
        const xmax = d3.max( self.data, self.xvalue );
        self.xscale.domain( [xmin, xmax] );

        const ymin = d3.min( self.data, self.yvalue );
        const ymax = d3.max( self.data, self.yvalue );
        self.yscale.domain( [ymax, ymin] );

        self.render();
    }

    render() {
        let self = this;


        let circles = self.chart.selectAll("circle")
            .data(self.data)
            .join('circle');

        const circle_color = 'steelblue';

        var circle_radius = 3;
        if(self.type_num == 2)     circle_radius = d => d.population/300;
        if(self.type_num == 3)     circle_radius = d => (d.wait/d.population)*50;
        if(self.type_num == 4)     circle_radius = d => (10*(d.consumption-286.2)/26+50)/3;
        

        circles
            .transition().duration(1000)
            .attr("r",  circle_radius)
            .attr("cx", d => self.xscale( self.xvalue(d) ) )
            .attr("cy", d => self.yscale( self.yvalue(d) ) )
            .attr("fill", d => self.config.cscale( self.cvalue(d) ) );

        circles
            .on('mouseover', (e,d) => {
                d3.select('#tooltip')
                    .style('opacity', 1)
                    .html(`<div class="Prefectures">${d.prefectures}</div> Birth_rate: ${d.birth_rate}, First_age: ${d.first_age}, Population: ${d.population*1000}, WaitChildren: ${d.wait},  Consumption: ${d.consumption}`);
            })
            .on('mousemove', (e) => {
                const padding = 10;
                d3.select('#tooltip')
                    .style('left', (e.pageX + padding) + 'px')
                    .style('top', (e.pageY + padding) + 'px');
            })
            .on('mouseleave', () => {
                d3.select('#tooltip')
                    .style('opacity', 0);
            });

        self.xaxis_group
            .call( self.xaxis );

        self.yaxis_group
            .call( self.yaxis );
    }
}
