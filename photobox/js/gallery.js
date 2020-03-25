import * as photoloader from './photoloader.js';
import * as lightbox from "./lightbox.js";


let prev = "";
let next = "";
let current = "/www/canals5/photobox/photos";
//extension
let page_photos = [];
let server_url = "https://webetu.iutnc.univ-lorraine.fr";
let current_lightbox;

export function initialisation(){
    photoloader.initialisation(server_url);
    let promise = photoloader.chargement(current);
    chargementInsertionPhotos(promise, server_url);
}


function chargementInsertionPhotos(promise, server_url){
    promise.then(function (response) {
        let uri_photos = [];
        let uri_thumbnails = [];
        next = response.data.links.next.href;
        prev = response.data.links.prev.href;
        response.data.photos.forEach( (e) => {
            uri_photos.push(e.photo.original.href);
            //extension
            page_photos.push(e.photo.original.href);
            uri_thumbnails.push(e.photo.thumbnail.href)
        });

        afficher(uri_thumbnails, uri_photos, server_url);
        $("img").on("click", lightbox.createLightbox);

    });

    promise.catch(function (error){
        console.log('error : '+ error);
    });
}


function afficher(array_uri_thumbnails, array_uri_photos, server_url){
    let gallery = $('#photobox-gallery');
    let stringbuilder = "<div class=\"\" id=\"photobox-gallery\">";
    for (let i = 0; i < array_uri_photos.length; i++) {
        if (i%3 === 0){
            if (i !== 0){
                stringbuilder+="</div>";
            }
            stringbuilder += '<div class="row">';
        }
        stringbuilder += '<div class="col-sm-4"><img data-img="' + server_url + array_uri_photos[i] + '" class="img-thumbnail" src="' + server_url+array_uri_thumbnails[i] + '" alt=""></div>';
    }
    stringbuilder += '</div>';
    gallery.replaceWith(stringbuilder);
}

export function page_suivante (){
    current = next;
    initialisation();
}

export function page_precedante(){
    current = prev;
    initialisation();
}


export function next_lightbox(){
    if(current_lightbox <= 8) {
        $("#lightbox_full_img").attr("src", server_url + page_photos[current_lightbox + 1]);
        setCurrentLightbox(server_url + page_photos[current_lightbox + 1]);
    }
}

export function prev_lightbox(){
    if(current_lightbox >= 1){
        $("#lightbox_full_img").attr("src", server_url+page_photos[current_lightbox-1]);
        setCurrentLightbox(server_url+page_photos[current_lightbox-1]);
    }
}

export function setCurrentLightbox(uri) {
    let compteur = 0;
    page_photos.forEach(function (element){
        if(server_url + element === uri){
            current_lightbox = compteur;
        }else{
            compteur++
        }
    });
}
