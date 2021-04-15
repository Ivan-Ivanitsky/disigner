export {Burger};

class Burger {
    constructor({
        burgerOpen,
        menuActive,
        burgerClose,
        bodyOverflov
    }) {
        this.burgerOpen = document.querySelector(burgerOpen)
        this.menuActive = document.querySelector(menuActive)
        this.burgerClose = document.querySelector(burgerClose)
        this.bodyOverflov = document.querySelector(bodyOverflov)
    }

    openClose() {
        this.burgerOpen.addEventListener('click', (e) => {
            this.open = e.target
            if (this.open) {
                this.burgerOpen.classList.add('hamburger-active')
                this.menuActive.classList.add('menu-active')
                this.burgerClose.classList.add('close-hide')
                this.bodyOverflov.classList.add('overflowHiden')

                // this.burgerOpen.classList.add(this.burgerActive)
            }

            this.burgerClose.addEventListener('click', (e) => {
                this.close = e.target
                if (this.close) {
                    this.burgerOpen.classList.remove('hamburger-active')
                    this.menuActive.classList.remove('menu-active')
                    this.burgerClose.classList.remove('close-hide')
                    this.bodyOverflov.classList.remove('overflowHiden')
                }
            })
        })
    }

    init() {
        this.openClose()
    }

}