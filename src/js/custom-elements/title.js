// import '../../titles.js';

class TitleContainer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="title-container">
      ${this.hasAttribute('backbtn') ? `
      <div class="btn-backContainer">
      <button class="btn-back icon">
          <svg class="">
              <use href="./src/img/sprite.svg#chevron"></use>
          </svg>
      </button>
  </div>` : ''}      
      <h2 class="glow">${this.getAttribute('titleoverview')}</h2>
      ${this.hasAttribute('switch') ? `<label class="switch glow-border">
      <input type="checkbox" id="togBtn">
      <div class="slider">
          <span class="slider-button on">Après</span>
          <span class="slider-button off">Avant</span>
      </div>
  </label>` : ''}      
  </div>`
    }

    static get observedAttributes() {
        return ['titleoverview', 'titledetail', 'backbtn', 'switch'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // console.log(
        //     `Attribute ${name} has changed from ${oldValue} to ${newValue}.`,
        // );

        switch (name) {
            case 'titledetail':
                this.updateTitle(newValue);                
                if (this.backbtn === 'opened') {
                   this.backbtn = 'closed';
                } else if (this.backbtn === 'closed') {
                    this.backbtn = 'opened';
                }
                break;

            case 'backbtn':
                this.toggleTitle();
                console.log('backbtn attribute was updated to ' + this.backbtn)
                if (this.backbtn === 'closed') {
                    this.updateTitle(this.titleoverview);
                    
                }                
                // this.backbtn = 'opened' ? this.backbtn = 'closed' : this.backbtn = 'opened';
                
        
            default:
                break;
        }

    }

    updateTitle(newTitle) {
        // const title = document.querySelector(selector);
        const titleH2 = this.querySelector('h2');
        const togBtn = this.querySelector('.switch') ? document.querySelector('.switch') : null;        

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

        if (togBtn){
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
    }

    toggleTitle() {
        const currentTitleContainer = this;
        const togBtn = this.querySelector('.switch') ? document.querySelector('.switch') : null;
        console.log('toggleTitle function in title.js was executed')

        const btnBackContainer = this.querySelector(`.btn-backContainer`);
        
        
        if(this.backbtn === 'closed') {            
            const btnBackContainerAnimations = btnBackContainer.getAnimations();
            btnBackContainerAnimations.forEach(animation => animation.reverse());
            if (togBtn) {
              setTimeout(() => {
                const togBtnAnimations = togBtn.getAnimations();
                togBtnAnimations.forEach(animation => animation.reverse());
              }, 2000);              
            }
        } else if(this.backbtn === 'opened') {
            console.log('toggleTitle (else) function in title.js was executed')
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
        }
      
        console.log('toggleTitle function in title.js was executed')            
    }

    get backbtn() {
        return this.getAttribute('backbtn');
    }

    set backbtn(newValue) {
        this.setAttribute('backbtn', newValue);
    }

    get titleoverview() {
        return this.getAttribute('titleoverview');
    }

    set titleoverview(newValue) {
        this.setAttribute('titleoverview', newValue);
    }

    get titledetail() {
        return this.getAttribute('titledetail');
    }

    set titledetail(newValue) {
        this.setAttribute('titledetail', newValue);
    }

}
customElements.define('title-container', TitleContainer)