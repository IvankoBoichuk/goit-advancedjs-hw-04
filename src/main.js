import "izitoast/dist/css/iziToast.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";

import "./css/iziToast.css";
import { fetchImages } from "./js/pixabay-api";
import { clearGallery, hideLoader, render, showLoader } from "./js/render-functions";


document.addEventListener("DOMContentLoaded", () => {
    const refs = {
        form: document.getElementById("search-form"),
        gallery: document.getElementById("gallery"),
        loader: document.getElementById("loader"),
        loadMoreBtn: document.getElementById("load-more"),
    }

    let page = 1;
    let lastQuery = null;
    
    const lightbox = new SimpleLightbox('.gallery a');

    refs.gallery.addEventListener('click', clicHandler);
    
    refs.form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const query = formData.get("q");

        if (!query) {
            iziToast.error({
                title: 'Error',
                message: 'Please enter a search query.',
                position: 'topRight',
            });
            return;
        }

        if (query !== lastQuery) {
            page = 1;
            lastQuery = query;
            refs.loadMoreBtn.classList.remove("active");
        }

        clearGallery(refs.gallery);
        
        showLoader(refs.loader);

        const {total, hits, totalHits} = await fetchImages(query);
        
        if (hits.length === 0) {
            iziToast.error({
                title: 'Error',
                message: '"Sorry, there are no images matching your search query. Please try again!".',
                position: 'topRight',
            });
            hideLoader(refs.loader);
            return;
        }

        if (totalHits > hits.length) {
            refs.loadMoreBtn.classList.add("active");
        }
        
        hideLoader(refs.loader);

        render(refs.gallery, hits);
        
        lightbox.refresh();
    });

    refs.loadMoreBtn.addEventListener("click", async () => {
        page += 1;
        const formData = new FormData(refs.form);
        const query = formData.get("q");

        showLoader(refs.loader);

        const { hits, totalHits } = await fetchImages(query, page);
        
        if (hits.length === 0) {
            iziToast.info({
                title: 'Info',
                message: 'No more images to load.',
                position: 'topRight',
            });
            hideLoader(refs.loader);
            return;
        }

        const isFinish = (totalHits / 15) <= page;
        if (isFinish) {
            refs.loadMoreBtn.classList.remove("active");
            iziToast.info({
                title: 'Info',
                message: 'We\'re sorry, but you\'ve reached the end of search results..',
                position: 'topRight',
            });
        } 
        
        render(refs.gallery, hits);

        hideLoader(refs.loader);
        
        lightbox.refresh();
    });

});



const clicHandler = (e) => {
    e.preventDefault();
    if (!e.target.classList.contains("gallery-image")) return;
    // SimpleLightbox.create(`<img src="${e.target.dataset.source}" width="800" height="600">`).show()
}