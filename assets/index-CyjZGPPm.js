(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();const p=()=>({movieContainer:document.querySelector("#movies-container"),favoriteControlCardButtons:document.querySelectorAll(".add-fav"),movieDetailsOverlay:document.querySelector("#movie-details-overlay"),movieDetailsCard:document.querySelector("#movie-details-card")}),L=()=>{p().movieContainer.addEventListener("click",t=>{const e=t.target.closest(".add-fav");if(!e)return;const s={overview:e.dataset.overview,id:e.dataset.id,title:e.dataset.title,poster_path:e.dataset.poster_path,release_date:e.dataset.release_date},o=JSON.parse(localStorage.getItem("favorites"))||[];if(o.find(n=>n.id===s.id)){const n=o.filter(i=>i.id!==s.id);localStorage.setItem("favorites",JSON.stringify(n)),e.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
        2 6.42 3.42 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87
        C13.46 5.99 14.96 5 16.5 5C18.58 5 20 6.42 20 8.5
        c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      Add`,e.classList.add("bg-popcorn-gold-accent1"),e.classList.remove("bg-mint-accent2"),console.log(`The film "${s.title}" has been removed from favorites.`)}else{const n=[...o,s];localStorage.setItem("favorites",JSON.stringify(n)),e.innerHTML="Added",e.classList.add("bg-mint-accent2"),e.classList.remove("bg-popcorn-gold-accent1"),console.log(`The film "${s.title}" has been added to your favorites`)}})};function b(a){return(JSON.parse(localStorage.getItem("favorites"))||[]).some(e=>e.id===a)}const f=()=>{p().favoriteControlCardButtons.forEach(t=>{const e=t.dataset.id;b(e)?(t.innerHTML="Added",t.classList.add("bg-mint-accent2"),t.classList.remove("bg-popcorn-gold-accent1")):(t.innerHTML=`
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
          2 6.42 3.42 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87
          C13.46 5.99 14.96 5 16.5 5C18.58 5 20 6.42 20 8.5
          c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      Add`,t.classList.add("bg-popcorn-gold-accent1"),t.classList.remove("bg-mint-accent2"))})},x="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDE4OGY2ZTExYzY1NzlmMDZlMzQzOWJkYmIwNzE4OSIsIm5iZiI6MTc2Mjg5ODAwNC4xNDUsInN1YiI6IjY5MTNiMDU0NzAwNDhkODJlYzlhY2NiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G_O2_echWC-sjWgWSdiL6YuaZlbtUL7d5PoEC5260Ik",C="a0188f6e11c6579f06e3439bdbb07189",M="/configuration",_="/movie/popular",E="1",I=`&language=en-US&page=${E}`,u="?",m=`api_key=${C}`;let h;function S(a){fetch(d+M+u+m).then(t=>{if(!t.ok)throw new Error("Request Error: Get configuration failed");return t.json()}).then(t=>{console.log("Fetched config data",t),h=t,fetch(d+_+u+m+I).then(e=>{if(!e.ok)throw new Error("Request Error: Get movie data failed");return e.json()}).then(e=>{console.log("Fetched movie data",e),a(e,t)}).catch(e=>{console.error(e)})}).catch(t=>console.error(t))}function T(){return h}const $=async function(a){const e=d+D+"?query="+a+N;try{let l=function(){c.classList.add("opacity-0","translate-y-5","scale-95"),setTimeout(()=>{v.classList.add("hidden")},400)};var s=l;const o=await fetch(e,A);if(!o.ok)throw new Error("ma ente Hmar");const r=await o.json();console.log(r);const n="";let i=r.results;console.log(i[0]),console.log(i[0].poster_path),i[0]||(c.innerHTML=""),y.innerHTML="",w(r,T()),c.innerHTML=`

      <!-- close Button-->
      <div class="relative">
        <div id="close-btn" class="cursor-pointer transition group absolute top-0 right-0 z-50">
          <svg
            viewBox="0 0 24 24"
              class="w-10 h-10 fill-current text-red-coral-accent3 group-hover:text-[var(--color-popcorn-gold-accent1)] transition  "
              xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.49556 2 2 6.49556 2 12C2 17.5044 6.49556 22 12 22C17.5044 22 22 17.5044 22 12C22 6.49556 17.5044 2 12 2ZM15.9393 15.9393C15.658 16.2206 15.2319 16.2628 14.9393 16.0669L14.8536 15.9999L12 13.1464L9.14645 15.9999C8.85444 16.2919 8.37828 16.2919 8.08622 15.9999C7.80491 15.7186 7.76268 15.2924 7.95859 14.9999L8.02563 14.9142L10.8787 12.0607L8.02563 9.20711C7.74432 8.9258 7.70209 8.49964 7.898 8.20711C8.17931 7.9258 8.60547 7.88357 8.898 8.07948L8.98374 8.14645L12 11.1623L15.0163 8.14645C15.2976 7.86514 15.7238 7.8229 16.0163 8.01882L16.102 8.08579C16.3833 8.3671 16.4256 8.79326 16.2296 9.08579L16.1626 9.17152L13.1464 12.1877L16.1626 15.2039C16.4439 15.4852 16.4862 15.9114 16.2903 16.2039L16.2232 16.2896L15.9393 15.9393Z"/>
          </svg>
      </div>

      <!-- Kart Inhalte in overlaym-->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 pt-14">

          <img src="https://image.tmdb.org/t/p/w500${i[0].poster_path}" class="rounded-xl shadow-lg max-h-lg object-cover" />

          <div class="flex flex-col gap-4">
            <h2 class="text-3xl font-bold">${i[0].title}</h2>
            <p class="text-secondary-text-grey-blue text-lg">${i[0].release_date}</p>
            <p class="text-secondary-text-grey-blue leading-relaxed">${i[0].overview}</p>
          </div>
        </div>
        `,v.classList.remove("hidden"),c.classList.remove("opacity-0","translate-y-5","scale-95"),document.addEventListener("click",g=>{if(g.target.closest("#close-btn")){l();return}g.target.id==="movie-details-overlay"&&l()})}catch(o){console.log(o)}},d="https://api.themoviedb.org/3",O="1",N=`&language=en-US&page=${O}`,B=16,D="/search/movie",A={method:"GET",headers:{accept:"application/json",Authorization:`Bearer ${x}`}},y=document.querySelector("#movies-container"),z="original";function w(a,t){let e=0;for(const s of a.results)if(e++<B){const o=`
        <article
          class="#${s.id} bg-background-cards/70 rounded-xl overflow-hidden shadow-md border border-popcorn-gold-accent1/10 transition transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg duration-300"
        >
          <!-- Poster -->
          <img src="${t.images.secure_base_url}${z}${s.poster_path}" alt="Poster" class="w-full aspect-[2/3] object-cover rounded-t-xl" />

          <!-- Content -->
          <div class="p-4 flex flex-col min-h-[220px]">
            <div class="flex-grow">
              <h2 class="text-lg font-semibold text-popcorn-gold-accent1 line-clamp-2 min-h-[48px]">
                ${s.title}
              </h2>
              <p
                class="mt-1 text-sm text-secondary-text-grey-blue line-clamp-3"
              >
              ${s.overview}
              </p>
            </div>

            <!-- Footer (release + button) -->
            <div class="mt-3 flex items-center justify-between gap-3">
              <div class="text-sm text-secondary-text-grey-blue">
               ${s.release_date}
              </div>
              <button
              data-overview="${s.overview}"
              data-id="${s.id}"
              data-title="${s.title}"
              data-poster_path="${s.poster_path}"
              data-release_date="${s.release_date}"
                class="add-fav inline-flex items-center justify-center gap-2 w-22 bg-popcorn-gold-accent1 text-background-main px-3 py-2 rounded-md font-semibold hover:bg-red-coral-accent3 hover:text-background-main transition-all shadow-sm hover:shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.42
               3.42 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99
               14.96 5 16.5 5 18.58 5 20 6.42 20 8.5c0 3.78-3.4
               6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
                Add
              </button>
            </div>
          </div>
        </article>`;y.insertAdjacentHTML("beforeend",o)}else break;L(),f()}S(w);const J=document.getElementById("search-input"),j=document.getElementById("search"),v=document.querySelector("#movie-details-overlay"),c=document.querySelector("#movie-details-card");j.addEventListener("submit",a=>{a.preventDefault();const t=J.value.trim();console.log(t),$(t)});setTimeout(f,1e3);
