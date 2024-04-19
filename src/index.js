import './graphs/galaxy.js';
import './graphs/mostWanted.js';
import './graphs/species.js';
import './graphs/vehicle.js';
import './graphs/starship.js';
import './graphs/fleet.js';

import './titles.js';
import './js/custom-elements/title.js'

const titles = document.querySelectorAll('h2.glow, .fleet-datatable h3, .blueprint-title h2');
// console.log(titles);

titles.forEach(title => {
    title.insertAdjacentHTML('beforeend', `<span class="droidobesh">${title.innerHTML}</span>`);
});

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 355,
      "density": {
        "enable": true,
        "value_area": 789.1476416322727
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.48927153781200905,
      "random": false,
      "anim": {
        "enable": true,
        "speed": 0.2,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 2,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 2,
        "size_min": 0,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 0.2,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 83.91608391608392,
        "size": 1,
        "duration": 3,
        "opacity": 1,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});




// Get all sections in the HTML document
const sections = document.querySelectorAll('section');

// Create an array of section IDs
const sectionIds = Array.from(sections).map(section => section.id);



// let scrolling = 0;
// let scrollFlag = 1;

// function scrollEvent(event){
//   console.log(event);
//   if (event.deltaY < 0) {
//     console.log("deltay");
//     if (scrolling !== 0) {
//       console.log("scrolling");
//       scrolling += 100;
//       document.getElementById(
//         "layout"
//       ).style.transform = `translateY(${scrolling}vh)`;
//     }
//   } else if (event.deltaY > 0) {
//     if (scrolling > -300) {
//       scrolling -= 100;
//       document.getElementById(
//         "layout"
//       ).style.transform = `translateY(${scrolling}vh)`;
//     }
//   }
// }

// window.addEventListener("wheel", function (event) {
//   if(scrollFlag === 1){
//     setTimeout(()=>{
//       scrollEvent(event)
//       scrollFlag = 1;
//     },1000)
//     scrollFlag = 0;
//   }
// });