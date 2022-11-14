/*
Purpose: scripting for card swiper app
Author: Travis Mann
Date: 11/14/2022
Inspiration: https://www.youtube.com/watch?v=6TYkDy54q4E&ab_channel=Hyperplexed
 */

// --- glob vars ---
let cardGroup = document.getElementsByClassName("card-group")[0];
let cardCount = 4;
let imgIdx = 0;
let keyword = "dog"

// set initial images and category
document.getElementsByClassName("keyword-input")[0].defaultValue = keyword;
setNewImages();

// get search bar element
let searchBar = document.getElementsByClassName("keyword-input")[0]

// --- funcs ---
// - click handlers -
function handleLikeClick() {
    /**
     * purpose: move card group to the right on click of love button and replace with new card group
     */
    console.log('like button clicked...');
    presentNewCardGroup("inactive-right");
}

function handleDislikeClick() {
    /**
     * purpose: move card group to the left on click of hate button and replace with new card group
     */
    console.log('dislike button clicked...');
    presentNewCardGroup("inactive-left");
}

function handleSearchClick() {
    /**
     * purpose: move card group to the left on click of hate button and replace with new card group
     */
    console.log('search button clicked...');
    // get keyword
    keyword = searchBar.value;

    // check for spaces
    if (keyword.includes(" ")) {
        handleBadInput()
        return
    } else if (searchBar.getAttribute("data-status") == "incorrect") {
        searchBar.setAttribute("data-status", 'correct')
    }

    // set new images
    presentNewCardGroup('inactive')
}

function handleClearClick() {
    /**
     * purpose: move card group to the left on click of hate button and replace with new card group
     */
    console.log('clear button clicked...');
    document.getElementsByClassName("keyword-input")[0].value = '';
}

function handleCardClick(element) {
    /**
     * purpose: open link to image in card
     */
    console.log('card clicked...');
    // get image link
    let backgroundImage = element.style.backgroundImage.slice(4, -1).replace(/"/g, "");

    // open image link
    window.open(backgroundImage);
}

function handleBadInput() {
    /**
     * purpose: alert user upon bad input to search bar
     */
    console.log('bad input detected...');
    // set status to incorrect
    searchBar.setAttribute("data-status", 'incorrect')
}

// - helpers -
function presentNewCardGroup(cardDataStatus) {
    /**
     * purpose: deactivate, insert new images and reactivate card group
     */
    console.log('presenting a new card group...');

    // inc image index so a different order is used on the next presentation
    imgIdx++;

    // set card group to inactive
    let cardGroup = document.getElementsByClassName("card-group")[0];
    cardGroup.setAttribute("data-status", cardDataStatus);

    // wait for deactivation, then swap images and re-activate
    cardGroup.addEventListener(whichTransitionEvent(), activateCardGroup, { once: true });
}

function activateCardGroup() {
    /**
     * purpose: swap images and set card group to active
     */
    // insert new images
    setNewImages()

    // set card group to active
    cardGroup.setAttribute("data-status", "active");
}

function setNewImages() {
    /**
     * purpose: insert images to the cards
     */
    // generate new images
    let randNum = Math.floor(Math.random() * 1000)

    // insert new images
    console.log('inserting new images...');
    for (let i = 0; i < cardCount; i++) {
        // get a new image
        let image = `https://source.unsplash.com/random/?${keyword}&${randNum + i}`
        // idx offsets image from card idx to provide a different order on each refresh
        let bigCard = document.getElementsByClassName("big-card")[i%cardCount];
        bigCard.style.backgroundImage = `url(${image})`;
        let littleCard = document.getElementsByClassName("little-card")[i%cardCount];
        littleCard.style.backgroundImage = `url(${image})`;
    }
}

function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
        'transition':'transitionend',
        'OTransition':'oTransitionEnd',
        'MozTransition':'transitionend',
        'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}

