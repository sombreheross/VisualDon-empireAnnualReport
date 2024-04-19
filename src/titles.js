import * as d3 from 'd3';

const titles = document.querySelectorAll('h2.glow, .fleet-datatable h3');

export function createSubtitles(arr) {
  arr.forEach(title => {
    title.insertAdjacentHTML('beforeend', `<span class="droidobesh">${title.innerHTML}</span>`);
  });
}


export function updateTitle(selector, newTitle) {
  const title = document.querySelector(selector);
  const titleH2 = title.querySelector('h2');
  const oldTitle = titleH2.innerHTML;
  const togBtn = title.querySelector('.switch') ? document.querySelector('.switch') : null;

  titleH2.animate([
    // keyframes
    { opacity: '1' },
    { opacity: '0' },
    { opacity: '1' }
  ], {
    // timing options
    duration: 2000,
    iterations: 1,
    fill: 'forwards'
  });

  if (togBtn) {
    togBtn.animate([
      // keyframes
      { opacity: '1' },
      { opacity: '0' }
    ], {
      // timing options
      duration: 1000,
      iterations: 1,
      fill: 'forwards'
    });
  }

  setTimeout(() => {
    titleH2.innerHTML = newTitle;
    titleH2.insertAdjacentHTML('beforeend', `<span class="droidobesh">${newTitle}</span>`);
  }, 1000);
  console.log('yeet')
}

export function toggleTitle(selector) {
  console.log('toggleTitle', this)


  const btnBackContainer = document.querySelector(`${selector} .btn-backContainer`);
  const title = document.querySelector(selector);
  const titleH2 = title.querySelector('h2');
  
  if (btnBackContainer.classList.contains('opened')) {
    console.log('cool')
    // Reverse the animations when clicking the back button
    const titleH2Animations = titleH2.getAnimations();
      titleH2Animations.forEach(animation => animation.reverse());

      setTimeout(() => {
        titleH2.innerHTML = '';
        titleH2.innerHTML = oldTitle;
      }, 1000);

      const btnBackContainerAnimations = btnBackContainer.getAnimations();
      btnBackContainerAnimations.forEach(animation => animation.reverse());
      if (btnBackContainer) {
        setTimeout(() => {
          const togBtnAnimations = togBtn.getAnimations();
          togBtnAnimations.forEach(animation => animation.reverse());
        }, 2000);
      }

  } else {
    btnBackContainer.animate([
      // keyframes
      { width: btnBackContainer.style.width, opacity: btnBackContainer.style.opacity, marginRight: btnBackContainer.style.marginRight },
      { width: '50px', opacity: '1', marginRight: '0px' }
    ], {
      // timing options
      duration: 1000,
      iterations: 1,
      fill: 'forwards'
    });
    btnBackContainer.classList.toggle('opened');
  }
}




