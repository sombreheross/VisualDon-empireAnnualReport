import { loadSWAPIData } from '../apiRequest.js';
import * as d3 from 'd3';
import { updateTitle } from '../titles.js';

// Déclaration de la variable pour stocker les données
const data = [
    {
        name: 'TIE Fighter',
        quantity: 12,
        icon: 'tie_fighter'
    },
    {
        name: 'TIE Bomber',
        quantity: 50,
        icon: 'tie_bomber'
    },
    {
        name: 'Star Destroyer',
        quantity: 24,
        icon: 'stardestroyer'
    },
    {
        name: 'Shuttle',
        quantity: 27,
        icon: 'shuttle'
    }
];

// const updatedQuantity = [8, 3, 20, 15];
const updatedQuantity = [2, 3, 4, 5];

const updatedData = (data, updatedQuantity) => {
    return data.map((d, i) => {
        return {
            ...d,
            quantity: updatedQuantity[i]
        }
    });
}


let isUpdated = false;

// Initial render
updateFleetItems(data);
updateDatatable(data);

// Button click event listener
d3.select('#fleet #togBtn').on('click', function() {
    // Toggle the data and re-render the fleet items
    isUpdated = !isUpdated;
    const currentData = isUpdated ? updatedData(data, updatedQuantity) : data;
    updateFleetItems(currentData);
    updateDatatable(currentData);
});

function updateFleetItems(data) {
    // Bind the data to the fleet items
    const fleetItems = d3.select('.fleet-container div').selectAll('.fleet-item')
        .data(data);

    // Update existing fleet items
    fleetItems.select('.fleet-itemPicto').selectAll('.icon')
        .data(d => Array.from({ length: d.quantity }, () => d))
        .join(
            enter => enter.append('div').attr('class', 'icon'),
            update => update.attr('class', 'icon'),
            exit => exit.transition()
                 .delay((d, i) => i * 200)
                 .on('start', function() {
                     d3.select(this).classed('disabled', true);
                 })
        )
        .html(d => `
            <svg class="">
                <use href="./src/img/sprite.svg#${d.icon}"></use>

            </svg>
        `); 

    // Enter new fleet items
    const fleetItemsEnter = fleetItems.enter().append('div')
        .attr('class', 'fleet-item');

    fleetItemsEnter.append('h3')
        .attr('class', 'fleet-itemTitle')
        .text(d => d.name);

    const fleetItemPicto = fleetItemsEnter.append('div')
        .attr('class', 'fleet-itemPicto');

        fleetItemPicto.selectAll('.icon')
        .data(d => Array.from({ length: d.quantity }, () => d))
        .join('div')
        .attr('class', 'icon')
        .html(d => `
            <svg class="">
                <use href="./src/img/sprite.svg#${d.icon}"></use>

            </svg>
        `);    
}

function updateDatatable(data) {
    // Bind the data to the datatable rows
    const datatableRows = d3.select('.fleet-datatable').selectAll('.fleet-datatableRow')
        .data(data);

    // Update existing datatable rows
    datatableRows.select('.fleet-datatableCell:first-child p').text(d => d.name);
    datatableRows.select('.fleet-datatableCell:last-child p')
    .each(function(d) {
        d3.select(this)
            .transition()
            .duration(Math.abs(d.quantity - (parseInt(this.textContent) || 0)) * 200) // Adjust the duration based on the difference
            .tween("text", function() {
                const previous = parseInt(this.textContent) || 0;
                const interpolator = d3.interpolateNumber(previous, d.quantity);
                return function(t) { this.textContent = Math.round(interpolator(t)); };
            });
    });

    // Enter new datatable rows
    const datatableRowsEnter = datatableRows.enter().append('div')
        .attr('class', 'fleet-datatableRow');

    datatableRowsEnter.append('div')
        .attr('class', 'fleet-datatableCell')
        .append('p')
        .text(d => d.name);

    datatableRowsEnter.append('div')
        .attr('class', 'fleet-datatableCell')
        .append('p')
        .text(d => d.quantity);

    // Exit removed datatable rows
    datatableRows.exit().remove();
}


// const lastFleetItem = d3.select('.fleet-container').select('.fleet-item:last-child');
// const rightCol = d3.select('.fleet-container:last-child');

