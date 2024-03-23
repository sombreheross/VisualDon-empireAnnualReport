import * as d3 from 'd3';
import { updateTitle } from '../titles.js';

const data = []

const p1 = fetch('https://swapi.dev/api/species/01')
const p2 = fetch('https://swapi.dev/api/species/02')
const p3 = fetch('https://swapi.dev/api/species/04')

Promise.all([p1, p2, p3].map(p => p.then(response => response.json())))
    .then((values) => {
        // console.log(values);
        data.push(...values);
        console.log(data)

        // data.forEach(element => {

        //     console.log('name: ' + element.name)
        //     console.log('height: ' + element.average_height)
        //     console.log('skin color: ' + element.skin_colors)
        //     console.log('lifespan: ' + element.average_lifespan)
        //     console.log('homeworld: ' + element.homeworld)
        //     console.log('-----------------------------------')
        // });        

        const SectionTitle = d3.select('#species h2')

        function update(data) {
            // console.log(data, d => d);
            d3.select('.species-container').selectAll('.species-item')
                .data(data, d => d.name)
                .join(
                    enter => enter.append('div')                    
                        .attr('class', 'species-item')
                        .attr('id', d => d.name)
                        .each(function (d) {
                            d3.select(this)
                                .append('div')
                                .attr('class', 'species-img')
                                .append('img')
                                .attr('src', 'http://placebacon.net/400/400')

                            d3.select(this)
                                .append('h3')
                                .text(d => d.name)                                                                                     
                        }
                        ),
                        
                    update => update                    
                        .attr('id', d => d.name)

                        .each(function (d) {                            
                            d3.select(this)
                                .select('h3')
                                .transition()
                                .ease(d3.easePolyInOut)
                                .duration(1000)
                                .style('opacity', '0')

                            d3.select(this)
                                .style('pointer-events', 'none')
                                .append('div')
                                .attr('class', 'species-details')
                                .style('opacity', '0')
                                .transition()
                                .ease(d3.easePolyInOut)
                                .duration(3000)

                                .style('height', '0px')
                                .transition()
                                .ease(d3.easePolyInOut)
                                .duration(1000)
                                .style('opacity', '1')
                                .style('height', 'auto')

                            d3.select(this).select('.species-details')
                                .append('div')
                                .attr('class', 'species-classification')
                            d3.select(this).select('.species-classification')
                                .append('h4')
                                .attr('class', 'h3')
                                .text('Classification')
                            d3.select(this).select('.species-classification')
                                .append('p')
                                .text(d => d.classification)

                            d3.select(this).select('.species-details')
                                .append('div')
                                .attr('class', 'species-height')
                            d3.select(this).select('.species-height')
                                .append('h4')
                                .attr('class', 'h3')
                                .text('Height')
                            d3.select(this).select('.species-height')
                                .append('p')
                                .text(d => d.average_height)

                            d3.select(this).select('.species-details')
                                .append('div')
                                .attr('class', 'species-skin')
                            d3.select(this).select('.species-skin')
                                .append('h4')
                                .attr('class', 'h3')
                                .text('Skin color')
                            d3.select(this).select('.species-skin')
                                .append('p')
                                .text(d => d.skin_colors)

                            d3.select(this).select('.species-details')
                                .append('div')
                                .attr('class', 'species-lifespan')
                            d3.select(this).select('.species-lifespan')
                                .append('h4')
                                .attr('class', 'h3')
                                .text('Lifespan')
                            d3.select(this).select('.species-lifespan')
                                .append('p')
                                .text(d => d.average_lifespan)

                            d3.select(this).select('.species-details')
                                .append('div')
                                .attr('class', 'species-homeworld')
                            d3.select(this).select('.species-homeworld')
                                .append('h4')
                                .attr('class', 'h3')
                                .text('Homeworld')
                            d3.select(this).select('.species-homeworld')
                                .append('p')
                                .text(d => d.homeworld)

                            d3.select('#species .btn-backContainer')
                                .transition()
                                .duration(1000)
                                .style('width', '50px')
                                .style('opacity', '1')
                                .style('margin-right', '0px')
                        }),



                    exit => exit
                        .transition()
                        .ease(d3.easePolyInOut)
                        .duration(1000)
                        // .attr('width', '0px')                        
                        .style('opacity', '0')
                        .attr('width', '0px')
                        .transition()
                        .ease(d3.easePolyInOut)
                        .duration(4000)
                        .style('margin-left', '-50%')
                        .style('margin-right', '-50%')

                        .each(function (d) {       
                            updateTitle('#species h2', d3.select(this).attr('id'));                                                                  
                        })

                        .on('end', function () {
                            d3.select('#species').classed('detail-view', true);
                            d3.selectAll('.species-item:not(.exit)')

                        })
                        .remove(),

                )

        }
        update(data);

        d3.selectAll('.species-item')
            .on('click', function (e, d) {

                const clickedElement = d3.select(this).attr('id');
                console.log(clickedElement);

                const updatedData = data.filter(item => item.name === clickedElement);
                update(updatedData);
            });

        d3.select('.btn-back')
            .on('click', function () {
                // Call the update function
                update(data);
            });

    })
    .catch((error) => {
        console.error("Error:", error);
    });
