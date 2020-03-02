export function createLightbox(e){
    let img_src = $(e.target).attr("data-img");
    $("#lightbox_full_img").attr("src", img_src);
    $("#lightbox_container").show();
}

export function fermerLightbox(){
    $("#lightbox_container").hide();
}
