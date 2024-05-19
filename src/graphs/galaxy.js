import { loadSWAPIData } from '../apiRequest.js';
import * as d3 from 'd3';

// Déclaration de la variable pour stocker les données
const data = [];

// Fonction asynchrone pour charger les données et les manipuler
async function loadDataAndManipulate() {    
    
    try {
        // Utilisation d'async/await pour attendre les données de chaque requête
        const alignmentBefore = []
        const alignmentAfter = []

        if (localStorage.getItem('planets')) {
            data.push(...JSON.parse(localStorage.getItem('planets')));
            alignmentBefore.push(...JSON.parse(localStorage.getItem('alignmentBefore')));
            alignmentAfter.push(...JSON.parse(localStorage.getItem('alignmentAfter')));

        } else {
            showLoadingScreen();
            for (let i = 1; i <= 30; i++) {
                const loadPlanet = await loadSWAPIData('planets', i);
                // console.log(loadPlanet.properties.name);
                data.push(loadPlanet);
                alignmentBefore.push(Math.random() < 0.7 ? true : false)
                alignmentAfter.push(Math.random() < 0.3 ? true : false)
            }
            localStorage.setItem('alignmentBefore', JSON.stringify(alignmentBefore));
            localStorage.setItem('alignmentAfter', JSON.stringify(alignmentAfter));

            // etc etc etc t'as capté

            data.forEach((planet, i) => {
                let lat, long;
                const minDistance = 10; // Set your minimum distance here

                do {
                    lat = Math.random() * (95 - 5) + 5;
                    long = Math.random() * (95 - 5) + 5;
                } while (isTooClose(lat, long, minDistance));

                planet.properties.lat = lat;
                planet.properties.long = long;
                planet.properties.previousAlignment = planet.properties.alignment; // Store the previous alignment value
                planet.properties.alignment = alignmentBefore[i];
                i++;
            });

            localStorage.setItem('planets', JSON.stringify(data));
        }

        function isTooClose(newLat, newLong, minDistance) {
            for (let planet of data) {
                if (planet.properties.lat && planet.properties.long) {
                    const distance = Math.sqrt(Math.pow(newLat - planet.properties.lat, 2) + Math.pow(newLong - planet.properties.long, 2));
                    if (distance < minDistance) {
                        return true;
                    }
                }
            }
            return false;
        }

        // Add an event listener to the button
        document.addEventListener('DOMContentLoaded', function () {
            d3.select('#galaxy #togBtn').on('click', updateAlignment);

            // Revert back from detailview to overview
            const backBtn = d3.select('#galaxy .btn-backContainer');
            backBtn.on('click', function () {
                if (planetImg) {
                    const planetImgAnimations = planetImg.getAnimations();
                    planetImgAnimations.forEach(animation => animation.reverse());
                }
                if (planetDetails) {
                    const planetDetailsAnimations = planetDetails._groups[0];
                    planetDetailsAnimations.forEach(element => {
                        element.getAnimations().forEach(animation => animation.reverse());
                    });

                    container._groups[0][0].getAnimations().forEach(animation => animation.reverse());
                }
                const titleContainer = document.querySelector('title-container');
                titleContainer.setAttribute('backbtn', 'closed');
                d3.select('.map-container').style('pointer-events', 'initial');
            });
        });

        // Get the dimensions of the .map-container
        let container = d3.select('.map-container');
        const width = parseInt(container.style('width'));
        const height = parseInt(container.style('height'));
        const galaxyImgUrl = new URL('/src/img/galaxy.jpg', import.meta.url).href
        let planetImg;
        let planetDetails;

        // Create scales for the latitude and longitude
        const xScale = d3.scaleLinear()
            .domain([0, 100]) // Adjust the domain to go from 0 to 100
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, 100]) // Adjust the domain to go from 0 to 100
            .range([height, 0]); // Flip the y scale so that 0 is at the bottom

        // Create a zoom behavior
        const zoom = d3.zoom()
            .scaleExtent([1, 10]) // The scale extent restricts the amount of zooming (optional)
            .translateExtent([[0, 0], [width, height]]) // The translate extent restricts panning (optional)
            .on('zoom', function (event) {
                svg.attr('transform', event.transform); // Apply the zoom transform to the                
                // console.log("Current zoom level: ", event.transform.k);
                (event.transform.k) > 2 ? d3.selectAll('.planet-graphTitle').style('opacity', '1') : d3.selectAll('.planet-graphTitle').style('opacity', '0');
            });

        // Append an SVG to the .map-container
        const svg = container.append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('max-height', '700px')
            .style('border-radius', '50px')
            .call(zoom) // Apply the zoom behavior to the SVG
            .append('g'); // Append a 'g' element to apply the zoom transform to

        // Append an image to the SVG
        svg.append('image')
            .attr('xlink:href', galaxyImgUrl)
            .attr('height', '100%')
            .attr('min-height', '100%')
            .attr('preserveAspectRatio', 'none');

        // Define the update function
        function updateAlignment() {
            console.log('updateAlignment function was executed')
            // Toggle the alignment value of each planet
            data.forEach((planet, i) => {
                planet.properties.alignment = planet.properties.alignment === alignmentBefore[i] ? alignmentAfter[i] : alignmentBefore[i];
            });

            // Update the graph
            const circles = svg.selectAll('svg')
                .data(data)
                .join(
                    enter => {
                        const group = enter.append('g');
                        group.append('svg')
                            .attr('x', d => xScale(d.properties.long))
                            .attr('y', d => yScale(d.properties.lat))
                            .attr('width', 20)
                            .attr('height', 20)
                            .style('fill', d => d.properties.alignment ? 'blue' : 'red')
                            .append('use')
                            .attr('href', d => d.properties.alignment ? './src/img/sprite.svg#logo-empire' : './src/img/sprite.svg#logo-rebel');
                        group.append('text')
                            .text(d => d.properties.name)
                            .attr('x', d => xScale(d.properties.long))
                            .attr('y', d => yScale(d.properties.lat) + 40)
                            .attr('dominant-baseline', 'middle') // Center the text vertically
                            .attr('class', 'planet-graphTitle');
                    },
                    update => update
                        .each(function (d) {
                            if (d.properties.alignment !== d.properties.previousAlignment)
                                // The alignment property has changed
                                d3.select(this)
                                    .style('opacity', '1')
                                    .transition()
                                    .duration(250)
                                    .style('opacity', '0')
                                    .transition()
                                    .duration(250)
                                    .style('opacity', '1')
                                    .transition()
                                    .duration(250)
                                    .style('opacity', '0')
                                    .style('filter', 'drop-shadow(0px 0px 3px rgba(255, 255, 255, 0.25))')
                                    .attr('Alignment', d => d.properties.alignment)
                                    .style('fill', d => d.properties.alignment ? 'blue' : 'red')
                                    .select('use').attr('href', d => d.properties.alignment ? './src/img/sprite.svg#logo-empire' : './src/img/sprite.svg#logo-rebel')
                                    .select('use').attr('href', d => d.properties.alignment ? './src/img/sprite.svg#logo-empire' : './src/img/sprite.svg#logo-rebel'),
                                    d3.select(this)
                                        .transition()
                                        .delay(750)
                                        .transition()
                                        .duration(250)
                                        .style('opacity', '1')
                                        .transition()
                                        .duration(250)
                                        .style('opacity', '0')
                                        .transition()
                                        .duration(250)
                                        .style('opacity', '1')
                                        .transition()
                                        .duration(250)
                                        .style('opacity', '0')
                                        .transition()
                                        .duration(250)
                                        .style('opacity', '1')
                            // Update the previous alignment with the new value
                            d.properties.previousAlignment = d.properties.alignment;

                        }),
                    exit => exit.remove()
                );
        }

        updateAlignment();
        // This is peak bug fixing, do not delete the repetition of updateAlignment()
        updateAlignment();

        svg.selectAll('g').on('click', function () {
            const currentPlanet = this;
            const properties = currentPlanet.__data__.properties;
            d3.select('.planet-details').classed('active', true);
            d3.select('.map-container').style('pointer-events', 'none');
            // container.classed('hidden', true);                     

            d3.select('#galaxy title-container').attr('titleDetail', properties.name);

            // Get the position of the clicked element
            const rect = currentPlanet.getBoundingClientRect();

            // Get the planet image element
            planetImg = document.querySelector('.planet-img img');

            // Get the position and size of the planet image container
            const planetImgContainer = d3.select('.planet-img').node().getBoundingClientRect();

            // Calculate the central position of the planet image container
            const finalTop = planetImgContainer.height;
            const finalLeft = planetImgContainer.width;

            // Transition the position of the planet image            
            planetImg.style.transform = 'translate(-50%, -50%)';
            planetImg.style.top = `${rect.height}px`;
            planetImg.style.left = `${rect.width}px`;

            planetImg.animate([
                // keyframes
                { transform: 'translate(-50%, -50%)', height: '10%', top: `${rect.height}px`, left: `${rect.width}px,`, opacity: 0 },
                // { transform: 'translate(-100%, -100%)', height: '50%' },
                { transform: 'translate(-100%, -100%)', height: '100%', top: `${finalTop}px`, left: `${finalLeft}px`, opacity: 1 }
            ], {
                // timing options
                duration: 2000,
                iterations: 1,
                fill: 'forwards',
                easing: 'ease-out'
            });

            // Populate the planet details
            d3.select('.planet-diameter p').text(properties.diameter + ' km');
            d3.select('.planet-gravity p').text(properties.gravity + ' standard unit');
            d3.select('.planet-terrain p').text(properties.terrain);
            d3.select('.planet-climate p').text(properties.climate);
            d3.select('.planet-population p').text(properties.population);
            d3.select('.planet-rotation p').text(properties.rotation_period + ' periods');

            const imageUrl = `./src/img/planets/${properties.name.toLowerCase().replace(/ /g, '_')}.svg`;
            d3.select('.planet-img img').attr('src', imageUrl);



            // console.log('imageUrl: ', imageUrl);
            // fetch(imageUrl)
            //     .then(response => {
            //         console.log('response: ',  response)
            //         if (response.ok) {
            //             d3.select('.planet-img img').attr('src', imageUrl);
            //             console.log('is planet')
            //         } else {
            //             d3.select('.planet-img img').attr('src', `./src/img/planets/hoth.svg`);
            //             console.log('is not planet')
            //         }
            //     })
            //     .catch(error => {
            //         console.log('Error: ', error);
            //     });

            // planet details appear animation
            planetDetails = d3.selectAll('.planet-data div');
            const planetDetailsContainer = d3.select('.planet-details');


            planetDetailsContainer._groups[0].forEach(element => {
                element.animate([
                    // keyframes
                    { opacity: 0 },
                    { opacity: 1 }
                ], {
                    // timing options
                    duration: 1000,
                    iterations: 1,
                    fill: 'forwards',
                    animation: 'ease-in-out',
                    animationDelay: '1s'
                });
            });



            planetDetails._groups[0].forEach(detail => {
                detail.style.opacity = 0;

                detail.animate([
                    // keyframes
                    { opacity: 0 },
                    { opacity: 0 },
                    { opacity: 1 }
                ], {
                    // timing options
                    duration: 3000,
                    iterations: 1,
                    fill: 'forwards',
                    animation: 'ease-in-out',
                    animationDelay: '1s'
                });
            });

            // container = d3.selectAll('.map-container');            
            container._groups[0][0].animate([
                { opacity: 1 },
                { opacity: 0 }
            ], {
                duration: 1000,
                iterations: 1,
                fill: 'forwards'
            })

        });


    } catch (error) {
        console.error("Error:", error);
    } finally {
        hideLoadingScreen();
    }


}

// Display loading screen
function showLoadingScreen() {
    document.getElementById('loading-screen').style.opacity = 1;
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  }
  
  // Hide loading screen
  function hideLoadingScreen() {
    document.getElementById('loading-screen').style.opacity = 0;
    document.getElementsByTagName('body')[0].style.overflow = 'initial';
  }

// Appel de la fonction pour charger les données
loadDataAndManipulate();