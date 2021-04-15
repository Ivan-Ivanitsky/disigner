import {sliders} from './modules/slider/slider'
import{Burger} from './modules/burger/burger';

window.addEventListener('DOMContentLoaded',()=>{
    sliders('.slider-container');
    const burger = new Burger({burgerOpen:'.home__hamburger',menuActive:'.menu',burgerClose:'.menu__close',bodyOverflov:'body'})

    burger.init()

})
