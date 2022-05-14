class LineChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10}
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

        self.xaxis = d3.axisBottom( self.area )
            .ticks(5)
            .tickSizeOuter(0);

        self.yaxis = d3.axisLeft( self.area )
            .tickSizeOuter(0);
   
        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);
  
        self.yaxis_group = self.chart.append('g')
 
       
    }

    update() {
        let self = this;

        self.area
        .x( d=> d.x)
        .y1( d=> d.y)
        .y0( 0 ); 

        const space = 10;

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

        self.svg.append("path")
           .attr('d', self.area(self.data))
           .attr('stroke', 'black')
           .attr('fill', 'none');
        

        self.xaxis_group
            .call( self.xaxis );

        self.yaxis_group
            .call( self.yaxis );
    }
}