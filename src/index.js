import './graphs/species.js';

const titles = document.querySelectorAll('h2.glow, .fleet-datatable h3');
console.log(titles);

titles.forEach(title => {
    title.insertAdjacentHTML('beforeend', `<span class="droidobesh">${title.innerHTML}</span>`);
});

