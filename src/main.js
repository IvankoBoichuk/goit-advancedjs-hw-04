import "izitoast/dist/css/iziToast.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";

import "./css/iziToast.css";
import { fetchImages } from "./js/pixabay-api";
import { clearGallery, hideLoader, render, showLoader } from "./js/render-functions";

const refs = {
    form: document.getElementById("search-form"),
    gallery: document.getElementById("gallery"),
    loader: document.getElementById("loader"),
}

document.addEventListener("DOMContentLoaded", () => {
    const lightbox = new SimpleLightbox('.gallery a');

    refs.gallery.addEventListener('click', clicHandler);
    
    refs.form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const query = data.get("q");

        if (!query) {
            iziToast.error({
                title: 'Error',
                message: 'Please enter a search query.',
                position: 'topRight',
            });
            return;
        }

        clearGallery(refs.gallery);
        
        showLoader(refs.loader);

        fetchImages(query)
            .then((data) => {
                if (data.hits.length === 0) {
                    iziToast.error({
                        title: 'Error',
                        message: '"Sorry, there are no images matching your search query. Please try again!".',
                        position: 'topRight',
                    });
                    hideLoader(refs.loader);
                    return;
                }
                render(refs.gallery, data.hits);
                lightbox.refresh();
            })
            .catch((error) => {
                console.error("Error fetching images:", error);
            })
            .finally(() => {
                hideLoader(refs.loader);
            })
    });

});



const clicHandler = (e) => {
    e.preventDefault();
    if (!e.target.classList.contains("gallery-image")) return;
    // SimpleLightbox.create(`<img src="${e.target.dataset.source}" width="800" height="600">`).show()
}