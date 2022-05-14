class PieChart {

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
            .attr('height', self.config.height)

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);

        self.color = d3.scaleOrdinal()
            .range(["#A4243B", "#D8C99B", "#D8973C", "#BD632F", "#273E47"]);
        
            self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
            self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;
            
        self.radius = Math.min( self.inner_width, self.inner_height ) / 2;

        self.pie = d3.pie();

        self.arc = d3.arc();

       
        
        const title_space = 25;
        self.svg.append('text')
            .style('font-size', '20px')
            .style('font-weight', 'bold')
            .attr('text-anchor', 'middle')
            .attr('x', self.config.width / 2)
            .attr('y', self.config.margin.top - title_space)
            .text( self.config.title );


    }

    update() {
        let self = this;
     
        self.arc
          .innerRadius(40)
          .outerRadius(self.radius);

        self.pie
          .value(d => d.value);

        self.render();
    }

    render() {
        let self = this;

        self.pie_group  = self.chart.selectAll("pie")
            .data( self.pie( self.data ))
            .enter()
            .append("g")
            .attr("class", "pie");



        self.pie_group.append("path")
            .attr("d", self.arc)
            .style("fill", d => self.color(d.index))
            .attr("opacity", 0.8)
            .attr("stroke", "white" )
            .style('stroke-width', '2px');

        self.pie_group.append("text")
            .attr("fill", "black")
            .attr("transform", d => "translate(" + self.arc.centroid(d) + ")" )
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text( d => d.data.label);
        

       
    }
}
