class LineChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            title: config.title || '',
            xlabel: config.xlabel || '',
            ylabel: config.ylabel || ''
        }
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

       self.area = d3.area();

        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            .range( [0, self.inner_height] )

        self.xaxis = d3.axisBottom(self.xscale )
            .ticks(3)
            .tickSize(5)
            .tickPadding(5);
        self.yaxis = d3.axisLeft(self.yscale)
            .ticks(3)
            .tickSize(5)
            .tickPadding(5);
        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);
  
        self.yaxis_group = self.chart.append('g');
         

        const title_space = 10;
        self.svg.append('text')
            .style('font-size', '20px')
            .style('font-weight', 'bold')
            .attr('text-anchor', 'middle')
            .attr('x', self.config.width / 2)
            .attr('y', self.config.margin.top - title_space)
            .text( self.config.title );

        const xlabel_space = 40;
        self.svg.append('text')
            .attr('x', self.config.width / 2)
            .attr('y', self.inner_height + self.config.margin.top + xlabel_space)
            .text( self.config.xlabel );

        const ylabel_space = 50;
        self.svg.append('text')
            .attr('transform', `rotate(-90)`)
            .attr('y', self.config.margin.left - ylabel_space)
            .attr('x', -(self.config.height / 2))
            .attr('text-anchor', 'middle')
            .attr('dy', '1em')
            .text( self.config.ylabel );
 
       
    }

    update() {
        let self = this;


        const space = 0;

        const xmin = 0;
        const xmax = d3.max( self.data, d => d.x ) + space;
        self.xscale.domain( [xmin, xmax] );

        const ymin = 0;
        const ymax = d3.max( self.data, d => d.y ) + space;
        self.yscale.domain( [ymin, ymax] );

     


        self.render();
    }

    render() {
        let self = this;


        self.area 
          .x( d => self.xscale( d.x ))
          .y1( d => self.yscale( d.y ) )
          .y0( d3.max( self.data, d => self.yscale( d.y ) ) );
       

        self.chart.append('path')
           .attr('d', self.area(self.data))
           .attr('stroke', 'black')
           .attr('fill', 'yellow');

           self.chart.selectAll("circle")
           .data(self.data)
           .enter()
           .append("circle")
           .attr("cx", d => self.xscale( d.x ) )
           .attr("cy", d => self.yscale( d.y ) )
           .attr("r", 4 );
        

        self.xaxis_group
            .call( self.xaxis );

        self.yaxis_group
            .call( self.yaxis );
    }
}