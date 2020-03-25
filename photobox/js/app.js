import * as gallery from './gallery.js';
import * as lightbox from './lightbox.js';


$(document).ready(function () {
    $("#load_gallery").on("click", gallery.initialisation);


    $("#previous_page").on("click", gallery.page_precedante);
    $("#next_page").on("click", gallery.page_suivante);


    $("#lightbox_close").on("click", lightbox.fermerLightbox);
    $("#lightbox_close").keypress(lightbox.fermerLightbox);

    $('#next-lightbox').on("click", gallery.next_lightbox);
    $('#prev-lightbox').on("click", gallery.prev_lightbox);

    $(document).keydown(function(e) {
        // ESCAPE key pressed
        if (e.keyCode == 27) {
            lightbox.fermerLightbox();
        }
    });
});
