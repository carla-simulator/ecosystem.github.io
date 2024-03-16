//import LocomotiveScroll from './js/locomotive-scroll.min.js';


const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});

var current_section = null;
var auto_scrolling = false;
var scroll_count = 0;
var sections = ['#landing_page', '#inverted_ai_section', '#synkrotron_section', '#avl_section', '#mathworks_section', '#ansys_section', '#ptv_section', '#community_section', '#chrono_section', '#autoware_section', '#ros_section', '#sumo_section', '#asam_section', '#last_section']
var currentSection = 0;
addEventListener("keypress", (event) => { });
var scrollLock = false;
var deltaY = 0;

addEventListener("wheel", (event) => { deltaY = event.deltaY });

addEventListener("resize", (event) => { scrollLock = true; setTimeout(() => { scrollLock = false;}, 100)});

scroll.on('scroll', (args) => {
    if (!scrollLock) {
        scroll_count += 1;
    }
    console.log(currentSection)
    if (scroll_count > 10 & !scrollLock) {
        console.log('move')
        scrollLock = true;
        scroll_count = 0;
        if (deltaY > 0) {
            currentSection += 1;
        } else {
            currentSection -= 1;
        }
        if (currentSection < 0) { currentSection = 0; }
        if (currentSection >= sections.length) { currentSection = sections.length - 1 }
        scroll.scrollTo(document.querySelector(sections[currentSection]), { duration: 200, callback: () => { setTimeout(function () { console.log(sections[currentSection]); scrollLock = false; }, 1000) } })
    }
})

var touchMoveCounter = 0;

var touchX = 0;
var touchY = 0;
var lcolumn = null;
var rcolumn = null;

var handleTouchStart = (event) => {
    //console.log(event)
    touchMoveCounter = 0;
    touchX = event.touches[0].screenX;
}
var handleTouchEnd = (event) => {
    touchMoveCounter = 0;
    //console.log('touchend')
}
var handleTouchMove = (event) => {
    //event.preventDefault()
    if (touchMoveCounter > 10) {
        if (event.touches[0].screenX < touchX) {
            lcolumn = document.getElementsByClassName('page-flex-column-left')
            rcolumn = document.getElementsByClassName('page-flex-column-right')
            lcolumn[0].classList.add('remove-column')
            rcolumn[0].classList.remove('remove-column')
        } else {
            lcolumn = document.getElementsByClassName('page-flex-column-left')
            rcolumn = document.getElementsByClassName('page-flex-column-right')
            rcolumn[0].classList.add('remove-column')
            lcolumn[0].classList.remove('remove-column')
        }
    }
    touchMoveCounter += 1;
}

document.body.addEventListener('touchstart', handleTouchStart)
document.body.addEventListener('touchend', handleTouchEnd)
document.body.addEventListener('touchmove', handleTouchMove)
