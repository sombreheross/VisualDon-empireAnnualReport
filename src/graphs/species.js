import { loadSWAPIData } from '../apiRequest.js';
import * as d3 from 'd3';
import { updateTitle } from '../titles.js';

// Déclaration de la variable pour stocker les données
const data = [];

// Fonction asynchrone pour charger les données et les manipuler
async function loadDataAndManipulate() {
    try {
        // Utilisation d'async/await pour attendre les données de chaque requête
        const species1 = await loadSWAPIData('species', 4);
        const species2 = await loadSWAPIData('species', 7);
        const species4 = await loadSWAPIData('species', 15);

        // Ajout des données au tableau 'data'
        data.push(species1, species2, species4);

        console.log(data);

        // Ici, 'data' contient les résultats et peut être manipulé
        // console.log(data); // Affiche le tableau 'data' mis à jour
        // Ajoutez ici toute manipulation supplémentaire de 'data'

        const SectionTitle = d3.select('#species h2')

        function update(data) {
            // console.log(data, d => d);
            d3.select('.species-container').selectAll('.species-item')
                .data(data, d => d.properties.name)
                .join(
                    enter => enter.append('div')
                    .style('background' , 'red')                    
                        .attr('class', 'species-item')
                        .attr('id', d => d.properties.name)
                        .each(function (d) {
                            d3.select(this)
                                .append('div')
                                .attr('class', 'species-img')
                                .append('img')
                                .attr('src', './src/img/species/rodian.svg')

                            d3.select(this)
                                .append('h3')
                                .text(d => d.properties.name)                                      
                                d3.selectAll('.species-details').remove();                                              
                        }
                        ),
                        
                    update => update                    
                        .attr('id', d => d.properties.name)
                        .style('background', 'blue')

                        .each(function (d) {                                 
                            updateTitle('#species', d3.select(this).attr('id'));                       
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
                                .text(d => d.properties.classification)

                            d3.select(this).select('.species-details')
                                .append('div')
                                .attr('class', 'species-height')
                            d3.select(this).select('.species-height')
                                .append('h4')
                                .attr('class', 'h3')
                                .text('Height')
                            d3.select(this).select('.species-height')
                                .append('p')
                                .text(d => d.properties.average_height)

                            d3.select(this).select('.species-details')
                                .append('div')
                                .attr('class', 'species-skin')
                            d3.select(this).select('.species-skin')
                                .append('h4')
                                .attr('class', 'h3')
                                .text('Skin color')
                            d3.select(this).select('.species-skin')
                                .append('p')
                                .text(d => d.properties.skin_colors)

                            d3.select(this).select('.species-details')
                                .append('div')
                                .attr('class', 'species-homeworld')
                            d3.select(this).select('.species-homeworld')
                                .append('h4')
                                .attr('class', 'h3')
                                .text('Homeworld')
                            d3.select(this).select('.species-homeworld')
                                .append('p')
                                .text(d => d.properties.homeworld)

                            // d3.select('#species .btn-backContainer')
                            //     .transition()
                            //     .duration(1000)
                            //     .style('width', '50px')
                            //     .style('opacity', '1')
                            //     .style('margin-right', '0px')
                        }),



                    exit => exit
                    .style('background', 'green')
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
                // console.log(clickedElement);

                const updatedData = data.filter(item => item.properties.name === clickedElement);
                update(updatedData);
            });

        d3.select('.btn-back')
            .on('click', function () {
                // Call the update function
                update(data);
            });

    } catch (error) {
        console.error("Error:", error);
    }
}

// Appel de la fonction pour charger les données
loadDataAndManipulate();