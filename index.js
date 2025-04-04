import{a as u,S as y,i as c}from"./assets/vendor-BH9GyP-n.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();u.defaults.baseURL="https://pixabay.com/api/";const m=async(e,a="1")=>{const o="49625718-2fc374da92b01abb8788a4564",t=`?${new URLSearchParams({key:o,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:15}).toString()}`;return(await u.get(t)).data},h=(e,{webformatURL:a,largeImageURL:o,tags:i,likes:t,views:r,comments:s,downloads:n})=>e+`
        <li class="gallery-item">
            <a class="gallery-link" href="${o}">
                <img
                    class="gallery-image"
                    src="${a}"
                    data-source="${o}"
                    alt="${i}"
                />
            </a>
            <ul class="gallery-item--list">
                <li class="gallery-item--info">
                    <b>Likes</b>
                    <span>${t}</span>
                </li>
                <li class="gallery-item--info">
                    <b>Views</b>
                    <span>${r}</span>
                </li>
                <li class="gallery-item--info">
                    <b>Comments</b>
                    <span>${s}</span>
                </li>
                <li class="gallery-item--info">
                    <b>Downloads</b>
                    <span>${n}</span>
                </li>
            </ul>
        </li>
    `,L=e=>{e.innerHTML=""},f=(e,a)=>{const o=a.reduce(h,"");e.insertAdjacentHTML("beforeend",o)},g=e=>{e.classList.add("active")},d=e=>{e.classList.remove("active")};document.addEventListener("DOMContentLoaded",()=>{const e={form:document.getElementById("search-form"),gallery:document.getElementById("gallery"),loader:document.getElementById("loader"),loadMoreBtn:document.getElementById("load-more")};let a=1,o=null;const i=new y(".gallery a");e.gallery.addEventListener("click",b),e.form.addEventListener("submit",async t=>{t.preventDefault();const s=new FormData(t.target).get("q");if(!s){c.error({title:"Error",message:"Please enter a search query.",position:"topRight"});return}s!==o&&(a=1,o=s,e.loadMoreBtn.classList.remove("active")),L(e.gallery),g(e.loader);const{total:n,hits:l,totalHits:p}=await m(s);if(l.length===0){c.error({title:"Error",message:'"Sorry, there are no images matching your search query. Please try again!".',position:"topRight"}),d(e.loader);return}p>l.length&&e.loadMoreBtn.classList.add("active"),d(e.loader),f(e.gallery,l),i.refresh()}),e.loadMoreBtn.addEventListener("click",async()=>{a+=1;const r=new FormData(e.form).get("q");g(e.loader);const{hits:s,totalHits:n}=await m(r,a);if(s.length===0){c.info({title:"Info",message:"No more images to load.",position:"topRight"}),d(e.loader);return}n/15<=a&&(e.loadMoreBtn.classList.remove("active"),c.info({title:"Info",message:"We're sorry, but you've reached the end of search results..",position:"topRight"})),f(e.gallery,s),d(e.loader),i.refresh()})});const b=e=>{e.preventDefault(),e.target.classList.contains("gallery-image")};
//# sourceMappingURL=index.js.map
