/* =========================================================
   SUPABASE PORTFOLIO SYNC
   Admin uploads -> Supabase -> Main Website
========================================================= */

const SUPABASE_URL =
"https://idnaxcwiskgzyodrlhzi.supabase.co";

const SUPABASE_KEY =
"sb_publishable_I4tdxFDZe6P8Wq215eRlLg_J3c85jAC";

const SUPABASE_TABLE = "portfolio";


/* =========================================================
   GET PORTFOLIO FROM SUPABASE
========================================================= */

async function loadSupabasePortfolio(){

    const grid =
        document.getElementById("portfolio-grid");

    if(!grid)
        return;


    grid.innerHTML = `
        <div class="col-span-full text-center py-20">
            <div class="font-mono text-xs text-raw-cement">
                LOADING PORTFOLIO...
            </div>
        </div>
    `;


    try{

        const response = await fetch(

            SUPABASE_URL +
            "/rest/v1/" +
            SUPABASE_TABLE +
            "?select=*&order=created_at.desc",

            {
                method:"GET",

                headers:{
                    "apikey":SUPABASE_KEY,
                    "Content-Type":"application/json"
                }
            }

        );


        if(!response.ok){

            const error =
                await response.text();

            throw new Error(error);

        }


        const data =
            await response.json();


        console.log(
            "SUPABASE PORTFOLIO:",
            data
        );


        renderSupabasePortfolio(data);


    }
    catch(error){

        console.error(
            "SUPABASE PORTFOLIO ERROR:",
            error
        );


        grid.innerHTML = `

            <div class="col-span-full text-center py-20">

                <div class="text-red-400 font-mono text-xs">
                    PORTFOLIO LOAD FAILED
                </div>

                <div class="text-raw-cement font-mono text-[10px] mt-3">
                    ${escapePortfolioHTML(error.message)}
                </div>

            </div>

        `;

    }

}


/* =========================================================
   RENDER
========================================================= */

function renderSupabasePortfolio(items){

    const grid =
        document.getElementById(
            "portfolio-grid"
        );


    if(!grid)
        return;


    grid.innerHTML = "";


    if(!items || items.length === 0){

        grid.innerHTML = `

            <div class="col-span-full text-center py-20">

                <div class="text-raw-sand font-serif text-xl">
                    NO PORTFOLIO YET
                </div>

                <div class="text-raw-cement font-mono text-xs mt-3">
                    Upload your first work from Admin Dashboard.
                </div>

            </div>

        `;

        return;

    }


    items.forEach(function(item){

        const type =
            String(
                item.type || "photo"
            ).toLowerCase();


        const isVideo =
            type === "video" ||
            type === "mp4" ||
            type === "webm" ||
            type === "mov";


        const mediaURL =
            item.url || "";


        if(!mediaURL)
            return;


        const category =
            isVideo
                ? "videography"
                : "photography";


        const title =
            item.title ||
            "Untitled Portfolio";


        const mappedItem = {

            id:
                item.id,

            title:
                title,

            category:
                category,

            mediaType:
                isVideo
                    ? "video"
                    : "photo",

            mediaUrl:
                mediaURL,

            thumbUrl:
                isVideo
                    ? mediaURL
                    : mediaURL,

            desc:
                isVideo
                    ? "Video • Uploaded from Admin Dashboard"
                    : "Photography • Uploaded from Admin Dashboard"

        };


        const card =
            document.createElement(
                "div"
            );


        card.className =
            "portfolio-item rounded-sm overflow-hidden flex flex-col justify-between cursor-pointer group relative";


        /* =====================================================
           VIDEO CARD
        ===================================================== */

        if(isVideo){

            card.innerHTML = `

                <div class="
                    relative
                    aspect-video
                    w-full
                    overflow-hidden
                    bg-raw-charcoal
                    media-wrapper
                ">

                    <video
                        src="${escapePortfolioHTML(mediaURL)}"
                        class="media-thumb w-full h-full object-cover"
                        muted
                        playsinline
                        preload="metadata"
                    ></video>


                    <div class="
                        absolute
                        top-3
                        left-3
                    ">

                        <span class="
                            px-2.5
                            py-1
                            rounded-sm
                            bg-raw-wall/90
                            border
                            border-raw-border
                            font-mono
                            text-[9px]
                            uppercase
                            tracking-wider
                            text-raw-sand
                        ">
                            REEL / VIDEO
                        </span>

                    </div>


                    <div class="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        bg-black/20
                        group-hover:bg-black/40
                        transition-colors
                    ">

                        <div class="
                            w-11
                            h-11
                            rounded-sm
                            bg-raw-sand
                            text-raw-charcoal
                            flex
                            items-center
                            justify-center
                            group-hover:scale-105
                            transition-transform
                        ">

                            ▶

                        </div>

                    </div>

                </div>


                <div class="
                    p-5
                    flex
                    flex-col
                    flex-1
                    justify-between
                    bg-raw-stucco
                    border-t
                    border-raw-border
                ">

                    <div>

                        <h3 class="
                            font-serif
                            text-sm
                            text-raw-linen
                            uppercase
                            font-medium
                            tracking-wide
                        ">
                            ${escapePortfolioHTML(title)}
                        </h3>


                        <p class="
                            font-mono
                            text-[11px]
                            text-raw-cement
                            mt-1
                        ">
                            Video uploaded from Admin
                        </p>

                    </div>


                    <div class="
                        mt-4
                        pt-3
                        border-t
                        border-raw-border
                        flex
                        items-center
                        justify-between
                        font-mono
                        text-[11px]
                    ">

                        <span class="
                            text-raw-ochre
                            uppercase
                            font-semibold
                        ">
                            Play Video
                        </span>

                        <span>
                            →
                        </span>

                    </div>

                </div>

            `;

        }


        /* =====================================================
           IMAGE CARD
        ===================================================== */

        else{

            card.innerHTML = `

                <div class="
                    relative
                    aspect-video
                    w-full
                    overflow-hidden
                    bg-raw-charcoal
                    media-wrapper
                ">

                    <img
                        src="${escapePortfolioHTML(mediaURL)}"
                        alt="${escapePortfolioHTML(title)}"
                        class="
                            media-thumb
                            w-full
                            h-full
                            object-cover
                        "
                        loading="lazy"
                    >


                    <div class="
                        absolute
                        top-3
                        left-3
                    ">

                        <span class="
                            px-2.5
                            py-1
                            rounded-sm
                            bg-raw-wall/90
                            border
                            border-raw-border
                            font-mono
                            text-[9px]
                            uppercase
                            tracking-wider
                            text-raw-sand
                        ">
                            PHOTOGRAPHY
                        </span>

                    </div>


                    <div class="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        bg-black/20
                        group-hover:bg-black/40
                        transition-colors
                    ">

                        <div class="
                            w-11
                            h-11
                            rounded-sm
                            bg-raw-sand
                            text-raw-charcoal
                            flex
                            items-center
                            justify-center
                            group-hover:scale-105
                            transition-transform
                        ">

                            ⛶

                        </div>

                    </div>

                </div>


                <div class="
                    p-5
                    flex
                    flex-col
                    flex-1
                    justify-between
                    bg-raw-stucco
                    border-t
                    border-raw-border
                ">

                    <div>

                        <h3 class="
                            font-serif
                            text-sm
                            text-raw-linen
                            uppercase
                            font-medium
                            tracking-wide
                        ">
                            ${escapePortfolioHTML(title)}
                        </h3>


                        <p class="
                            font-mono
                            text-[11px]
                            text-raw-cement
                            mt-1
                        ">
                            Image uploaded from Admin
                        </p>

                    </div>


                    <div class="
                        mt-4
                        pt-3
                        border-t
                        border-raw-border
                        flex
                        items-center
                        justify-between
                        font-mono
                        text-[11px]
                    ">

                        <span class="
                            text-raw-ochre
                            uppercase
                            font-semibold
                        ">
                            View Photograph
                        </span>

                        <span>
                            →
                        </span>

                    </div>

                </div>

            `;

        }


        /* =====================================================
           CLICK -> MODAL
        ===================================================== */

        card.addEventListener(
            "click",
            function(){

                if(
                    typeof openMediaModal ===
                    "function"
                ){

                    openMediaModal(
                        mappedItem
                    );

                }

            }
        );


        grid.appendChild(
            card
        );

    });

}


/* =========================================================
   HTML SECURITY
========================================================= */

function escapePortfolioHTML(value){

    return String(value ?? "")
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        loadSupabasePortfolio();

    }
);
