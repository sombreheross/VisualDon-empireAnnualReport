import * as d3 from 'd3';

const titles = document.querySelectorAll('h2.glow, .fleet-datatable h3');

export function createSubtitles(arr) {
  arr.forEach(title => {
    title.insertAdjacentHTML('beforeend', `<span class="droidobesh">${title.innerHTML}</span>`);
});
}

createSubtitles(titles);

export function updateTitle(selector, newTitle) {
  const title = document.querySelector(selector);

  d3.select(title).transition()
  .duration(1000)
  .style('opacity', '0')
  .transition()
  .duration(1000)
  .style('opacity', '1'),
    
  setTimeout(() => {
    title.innerHTML = newTitle;
  title.insertAdjacentHTML('beforeend', `<span class="droidobesh">${newTitle.innerHTML}</span>`);
  }, 1000);

  console.log(selector, newTitle);

}



