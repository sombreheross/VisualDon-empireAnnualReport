import { loadSWAPIData } from '../apiRequest.js';
import * as d3 from 'd3';
// import { updateTitle } from '../titles.js';

// Déclaration de la variable pour stocker les données
const data = [];

// Fonction asynchrone pour charger les données et les manipuler
async function loadDataAndManipulate() {
    try {
        // Utilisation d'async/await pour attendre les données de chaque requête
        const species1 = await loadSWAPIData('people', 1);
        const species2 = await loadSWAPIData('people', 5);
        const species4 = await loadSWAPIData('people', 14);

        // Ajout des données au tableau 'data'
        data.push(species1, species2, species4);

        console.log('wanted', data);

        // Ici, 'data' contient les résultats et peut être manipulé
        // console.log(data); // Affiche le tableau 'data' mis à jour
        // Ajoutez ici toute manipulation supplémentaire de 'data'

        const SectionTitle = d3.select('#wanted h2')

        function update(data) {
            // console.log(data, d => d);
            d3.select('.wanted-container').selectAll('#wanted .species-item')
                .data(data, d => d.properties.name)
                .join(
                    enter => enter.append('div')
                        .style('pointer-events', 'auto')
                        // .style('background', 'red')
                        .attr('class', 'species-item')
                        .attr('id', d => d.properties.name)
                        .each(function (d) {
                            d3.select(this)
                                .append('div')
                                .attr('class', 'species-img')
                                .append('img')
                                .attr('src', `./src/img/wanted/${d.properties.name}.svg`)

                            d3.select(this)
                                .append('h3')                            
                                .text(d => d.properties.name);
                            d3.select(this).select('h3')
                            .style('opacity', '0')
                            .transition()
                            .ease(d3.easePolyInOut)
                            .duration(1000)
                            .style('opacity', '1');
                            d3.selectAll('#wanted .species-details').remove();

                        d3.select(this)
                        .style('opacity', '0')                        
                        .style('margin-left', '-50%')
                        .style('margin-right', '-50%')
                        .transition()
                        .ease(d3.easePolyInOut)
                        .duration(2000)                        
                        .style('margin-left', '0%')
                        .style('margin-right', '0%')
                        .transition()
                        .ease(d3.easePolyInOut)
                        .duration(2000)
                        .style('opacity', '1')
                        }
                        ),

                    update => update
                        .attr('id', d => d.properties.name)
                        // .style('background', 'blue')

                        .each(function (d) {



                            if (d3.select('#wanted').classed('detail-view')) {
                                d3.select(this)
                                    .style('pointer-events', 'auto')
                                    .select('h3')
                                    .transition()
                                    .ease(d3.easePolyInOut)
                                    .duration(1000)
                                    .style('opacity', '1');
                                    d3.select('#wanted').classed('detail-view', false);
                            } else {
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

                                d3.select(this).select('#wanted .species-details')
                                    .append('div')
                                    .attr('class', 'species-classification')
                                d3.select(this).select('#wanted .species-classification')
                                    .append('h4')
                                    .attr('class', 'h3')
                                    .text('hair color')
                                d3.select(this).select('#wanted .species-classification')
                                    .append('p')
                                    .text(d => d.properties.hair_color)

                                d3.select(this).select('#wanted .species-details')
                                    .append('div')
                                    .attr('class', 'species-height')
                                d3.select(this).select('#wanted .species-height')
                                    .append('h4')
                                    .attr('class', 'h3')
                                    .text('Height')
                                d3.select(this).select('#wanted .species-height')
                                    .append('p')
                                    .text(d => d.properties.height + ' cm')

                                d3.select(this).select('#wanted .species-details')
                                    .append('div')
                                    .attr('class', 'species-skin')
                                d3.select(this).select('#wanted .species-skin')
                                    .append('h4')
                                    .attr('class', 'h3')
                                    .text('Birth Year')
                                d3.select(this).select('#wanted .species-skin')
                                    .append('p')
                                    .text(d => d.properties.birth_year)

                                d3.select(this).select('#wanted .species-details')
                                    .append('div')
                                    .attr('class', 'species-homeworld')
                                d3.select(this).select('#wanted .species-homeworld')
                                    .append('h4')
                                    .attr('class', 'h3')
                                    .text('Gender')
                                d3.select(this).select('#wanted .species-homeworld')
                                    .append('p')
                                    .text(d => d.properties.gender)
                            }


                        }),



                    exit => exit
                        // .style('background', 'green')
                        .transition()
                        .ease(d3.easePolyInOut)
                        .duration(1000)                                         
                        .style('opacity', '0')
                        .attr('width', '0px')
                        .transition()
                        .ease(d3.easePolyInOut)
                        .duration(4000)
                        .style('margin-left', '-50%')
                        .style('margin-right', '-50%')


                        .on('end', function () {
                            d3.select('#wanted').classed('detail-view', true);
                            d3.selectAll('#wanted .species-item:not(.exit)')

                        })
                        .remove(),

                )

                d3.selectAll('#wanted .species-item')
                .on('click', function (e, d) {
    
                    const clickedElement = d3.select(this).attr('id');
                    d3.select('#wanted title-container').attr('titleDetail', clickedElement);
    
                    const updatedData = data.filter(item => item.properties.name === clickedElement);
                    update(updatedData);
                });

        }
        update(data);
    

        // Revert back from detailview to overview
        const backBtn = d3.select('#wanted .btn-backContainer');

        backBtn.on('click', function () {

            update(data);

            const titleContainer = document.querySelector('#wanted title-container');
            titleContainer.setAttribute('backBtn', 'closed');
        });


    } catch (error) {
        console.error("Error:", error);
    }
}

// Appel de la fonction pour charger les données
loadDataAndManipulate();