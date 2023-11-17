chart = {
  const config_size = {
    svg_width: 800,
    svg_height: 400,
    plot_margin: {
      left: 30,
      right: 20,
      top: 20,
      buttom: 20,
    },
  }
  const map_data = {
    2010: 1,
    2011: 2,
    2012: 4,
    2013: 3,
    2014: 5,
    2015: 4,
    2016: 5,
    2017: 1,
    2018: 4,
    2019: 6,
    2020: 8,
    2021: 2,
  };
  const data = Object.keys(map_data).map(key => ({year: parseInt(key), cnt: map_data[key]}));
  const svg = d3.create("svg").attr("width", config_size.svg_width).attr("height", config_size.svg_height);
  const plot_g = svg.append('g').classed('plot', true)
    .attr('transform',  `translate(${config_size.plot_margin.left}, ${config_size.plot_margin.top})`);
  const plot_width = config_size.svg_width - config_size.plot_margin.left - config_size.plot_margin.right;
  const plot_height = config_size.svg_height - config_size.plot_margin.top - config_size.plot_margin.buttom
  const background = plot_g.append('rect')
    .attr('width', plot_width).attr('height', plot_height)
    .attr('fill', 'blue').attr('fill-opacity', 0.00);

  const x = d3.scaleLinear()
      .domain(d3.extent(data, d=>d.year))
      .range([0, plot_width]);
  plot_g.append("g")
    .attr("transform", `translate(${0},${plot_height})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d=>d.cnt)])
    .range([plot_height, 0]);
  plot_g.append("g")
    .attr("transform", `translate(${0},${0})`)
    .call(d3.axisLeft(y));

  plot_g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function(d) { return x(d.year) })
      .y(function(d) { return y(d.cnt) })
      )

  const mouse_g = plot_g.append('g').classed('mouse', true).style('display', 'none');
  mouse_g.append('rect').attr('width', 2).attr('x',-1).attr('height', plot_height).attr('fill', 'lightgray');
  mouse_g.append('circle').attr('r', 3).attr("stroke", "steelblue");
  mouse_g.append('text');

  plot_g.on("mouseover", function(mouse) {
    mouse_g.style('display', 'block');
  });
  const [min_year, max_year] = d3.extent(data, d=>d.year);
  const cnt_sum = d3.sum(data, d=>d.cnt);
  plot_g.on("mousemove", function(mouse) {
    const [x_cord,y_cord] = d3.pointer(mouse);
    const ratio = x_cord / plot_width;
    const current_year = min_year + Math.round(ratio * (max_year - min_year));
    const cnt = data.find(d => d.year === current_year).cnt;
    mouse_g.attr('transform', `translate(${x(current_year)},${0})`);
    mouse_g.select('text').text(`year: ${current_year}, ${cnt}/${cnt_sum} papers`)
      .attr('text-anchor', current_year < (min_year + max_year) / 2 ? "start" : "end");
    mouse_g.select('circle').attr('cy', y(cnt));
  });
  plot_g.on("mouseout", function(mouse) {
    mouse_g.style('display', 'none');
  });
  return svg.node();
}// JavaScript source code
