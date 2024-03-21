import * as d3 from 'd3';

const data = []

const p1 = fetch('https://swapi.dev/api/species/01')
const p2 = fetch('https://swapi.dev/api/species/02')
const p3 = fetch('https://swapi.dev/api/species/04')

Promise.all([p1, p2, p3].map(p => p.then(response => response.json())))
  .then((values) => {
    console.log(values);
    data.push(...values);
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });



d3.selectAll('.species-item')
  .on('click', function(e, d) {
    d3.select(this)
      .style('background', 'orange');
  });