const BROWSER_LANG = navigator.language || navigator.userLanguage;

let random_range_enabled = false;

let wikipedia_top_data = [];
const TOP_DATA_FEATURE_LANGS = ["ja"];

document.addEventListener("DOMContentLoaded", init_page);

function init_page() {
    const urlParams = new URLSearchParams(window.location.search);
    let lang = urlParams.get('lang');
    let max_range = urlParams.get('maxrange');
    if (!lang) {
        lang = BROWSER_LANG.replace(/-.*/, "");
    }
    document.querySelector("#language").value = lang;
    document.querySelector("#rank_max").value = max_range;

    set_url_params(lang, max_range);

    document.querySelector("#language").addEventListener("input", apply_language_features);
    apply_language_features();

    open_page(lang);
}

async function fetch_top_data(lang) {
    let response = await fetch("pageview_data/" + lang + "_wikipedia_top.json");
    wikipedia_top_data = await response.json()
    if (wikipedia_top_data.length > 0) {
        open_page(lang);
    }
}

function apply_language_features() {
    let lang = document.querySelector("#language").value;
    wikipedia_top_data = [];
    if (TOP_DATA_FEATURE_LANGS.includes(lang)) {
        random_range_enabled = true;
        document.querySelector("#rank_picker").style.display = "initial";
    } else {
        random_range_enabled = false;
        document.querySelector("#rank_picker").style.display = "";
    }
}

function random_page_button() {
    let lang = document.querySelector("#language").value;
    let max_range = document.querySelector("#rank_max").value;
    hide_iframe();
    open_page(lang);
    set_url_params(lang, max_range);
}

function open_page(lang) {
    let url = "https://" + lang + ".wikipedia.org/wiki/Special:Random";

    let rank_max = parseInt(document.querySelector("#rank_max").value);
    if (random_range_enabled && rank_max && TOP_DATA_FEATURE_LANGS.includes(lang)) {
        if (wikipedia_top_data.length == 0) {
            fetch_top_data(lang);
            return;
        }
        url = "https://" + lang + ".wikipedia.org/wiki/" + wikipedia_top_data[Math.floor(Math.random() * Math.min(rank_max, wikipedia_top_data.length))];
    }

    document.querySelector("#wikipedia_page_iframe").setAttribute("src", url);
}

function set_url_params(lang, max_range) {
    const urlParams = new URLSearchParams(window.location.search);
    if (lang) {
        urlParams.set('lang', lang);
    }
    if (max_range) {
        urlParams.set('maxrange', max_range);
    }
    window.history.pushState(null, null, "?" + urlParams.toString());
}

function hide_iframe() {
    document.querySelector("#random_page_button").disabled = true;
    document.querySelector("#wikipedia_page_iframe").style.display = "none";
}

function show_iframe() {
    document.querySelector("#random_page_button").disabled = false;
    document.querySelector("#wikipedia_page_iframe").style.display = "";
}
