const BROWSER_LANG = navigator.language || navigator.userLanguage;

let random_range_enabled = false;

let ja_wikipedia_top_data = [];

document.addEventListener("DOMContentLoaded", init_page);

function init_page() {
    let stripped_lang = BROWSER_LANG.replace(/-.*/, "");
    document.querySelector("#language").value = stripped_lang;

    document.querySelector("#language").addEventListener("input", apply_language_features);
    apply_language_features();

    open_page(BROWSER_LANG.replace(/-.*/, ""));
}

async function fetch_top_data(lang) {
    let response = await fetch("pageview_data/ja_wikipedia_top.json");
    ja_wikipedia_top_data = await response.json()
    if (ja_wikipedia_top_data.length > 0) {
        open_page(lang);
    }
}

function apply_language_features() {
    let lang = document.querySelector("#language").value;
    let rank_feature_langs = ["ja"];
    if (rank_feature_langs.includes(lang)) {
        random_range_enabled = true;
        document.querySelector("#rank_picker").style.display = "initial";
    } else {
        random_range_enabled = false;
        document.querySelector("#rank_picker").style.display = "";
    }
}

function random_page_button() {
    hide_iframe();
    open_page(document.querySelector("#language").value);
}

function open_page(lang) {
    let url = "https://" + lang + ".wikipedia.org/wiki/Special:Random";

    let rank_max = parseInt(document.querySelector("#rank_max").value);
    if (random_range_enabled && rank_max && lang == "ja") {
        if (ja_wikipedia_top_data.length == 0) {
            fetch_top_data(lang);
            return;
        }
        url = "https://" + lang + ".wikipedia.org/wiki/" + ja_wikipedia_top_data[Math.floor(Math.random() * Math.min(rank_max, ja_wikipedia_top_data.length))];
    }

    document.querySelector("#wikipedia_page_iframe").setAttribute("src", url);
}

function hide_iframe() {
    document.querySelector("#random_page_button").disabled = true;
    document.querySelector("#wikipedia_page_iframe").style.display = "none";
}

function show_iframe() {
    document.querySelector("#random_page_button").disabled = false;
    document.querySelector("#wikipedia_page_iframe").style.display = "";
}
