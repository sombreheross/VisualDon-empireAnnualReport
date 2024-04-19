class TitleContainer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="title-container">
      ${this.hasAttribute('back-btn') ? `
      <div class="btn-backContainer">
      <button class="btn-back icon">
          <svg class="">
              <use href="./src/img/sprite.svg#chevron"></use>
          </svg>
      </button>
  </div>` : ''}      
      <h2 class="glow">${this.getAttribute('title-overview')}</h2>
      ${this.hasAttribute('switch') ? `<label class="switch glow-border">
      <input type="checkbox" id="togBtn">
      <div class="slider">
          <span class="slider-button on">Après</span>
          <span class="slider-button off">Avant</span>
      </div>
  </label>` : ''}      
  </div>`

        
    }

    backBtn(display = this.getAttribute('back-btn')) {
        const backBtnContainer = this.querySelector('.btn-backContainer');

        switch (display) {
            case 'none':
                backBtnContainer.remove();

                break;
            case 'hidden':
                backBtnContainer.style.display = 'none';
                break;
            case 'visible':
                backBtnContainer.style.display = 'block';
        }
    }

    switch() {
        const currentTitle = this.querySelector('.title-container');
        const switchContainer = this.querySelector('.switch');
        console.log(currentTitle);

        if (currentTitle.hasAttribute('switch')) { console.log('cool', currentTitle); }



    }

}
customElements.define('title-container', TitleContainer)