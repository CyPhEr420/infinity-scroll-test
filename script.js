const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let numOfImagesLoaded = 0;
let totalImages = 0;
let photoArray = [];


// Unsplash Api
const count = 5;
const apiKey = 'mga09GdBkdhQkBBXNxxFy1AnfRFDPMUasGgn20g554g'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded

function imageLoaded(){
    numOfImagesLoaded++;
    console.log("numberOfImagesLoaded:"+numOfImagesLoaded)
    if (numOfImagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log("ready ="+ ready)
    }
}


// Helper Function to Set attributes on DOM elements
function setAttributes(element,attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos(){
    numOfImagesLoaded = 0;
    totalImages = photoArray.length;
    console.log("totalImages = "+totalImages)
    photoArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement("a");

        setAttributes(item, {href:photo.links.html, target:'_blank'})
        
        // Create <img> for photo

        const img = document.createElement("img");
        setAttributes(img, {
            src:photo.urls.regular,
             alt:photo.alt_description, 
             title:photo.alt_description})
             // Event Listener, Check when each image is finished loaded
            img.addEventListener('load',imageLoaded)
        
             // Put <img> inside <a> and the add both to image-container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos From Unsplash Api

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos()

    } catch (error) {
        // Catch Error Here

    }
}

// Check to see if scrolling near the bottom of the page, Load More Photos

window.addEventListener('scroll', () =>{
    
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
            ready = false;
            getPhotos();
            console.log("load Photos")
        }
})


// On Load

getPhotos();
