class BarChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            radius: Math.min( width, height ) / 2,
            margin: config.margin || {top:10, right:10, bottom:10, left:10}
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height)

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.width/2}, ${self.config.margin.height/2})`);

        self.pie = d3.pie();

        const arc = d3.arc()
          .innerRadius(radius/2)
          .outerRadius(radius);

    }

    update() {
        let self = this;
     
        self.pie.value(d => dvalue);
        

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll('pie')
        .data( self.pie(self.data) )
        .enter()
        .append('path')
        .attr('d', self.arc)
        .attr('fill', 'black')
        .attr('stroke', 'white')
        .style('stroke-width', '2px');
        

       
    }
}