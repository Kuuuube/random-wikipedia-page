const BROWSER_LANG = navigator.language || navigator.userLanguage;

let random_range_enabled = false;

let wikipedia_top_data = [];
const TOP_DATA_FEATURE_LANGS = ["ja"];

document.addEventListener("DOMContentLoaded", init_page);

function init_page() {
    const urlParams = new URLSearchParams(window.location.search);
    let lang = urlParams.get("lang");
    if (!lang) {
        lang = BROWSER_LANG.replace(/-.*/, "");
    }
    let max_range = urlParams.get("maxrange");
    let category = urlParams.get("category");

    document.querySelector("#language").value = lang;
    document.querySelector("#rank_max").value = max_range;
    document.querySelector("#category").value = category;

    set_url_params(lang, max_range, category);

    document.querySelector("#language").addEventListener("input", apply_language_features);
    apply_language_features();

    document.querySelector("#rank_max").addEventListener("input", category_picker_visibility);
    document.querySelector("#category").addEventListener("input", max_rank_visibility);

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
    if (TOP_DATA_FEATURE_LANGS.includes(lang) && document.querySelector("#category").value.length == 0) {
        random_range_enabled = true;
        document.querySelector("#rank_picker").style.display = "initial";
    } else {
        random_range_enabled = false;
        document.querySelector("#rank_picker").style.display = "";
    }

    let categorical_index_pages = {
        en: "https://en.wikipedia.org/wiki/Portal:Contents/Categorical_index",
        zh: "https://zh.wikipedia.org/wiki/Wikipedia:%E5%88%86%E9%A1%9E%E7%B4%A2%E5%BC%95",
        ja: "https://ja.wikipedia.org/wiki/Portal:%E3%82%B3%E3%83%B3%E3%83%86%E3%83%B3%E3%83%84/%E3%82%AB%E3%83%86%E3%82%B4%E3%83%AA",
        ko: "https://ko.wikipedia.org/wiki/%ED%8F%AC%ED%84%B8:%EB%AA%A9%EC%B0%A8/%EB%B6%84%EB%A5%98",
        es: "https://es.wikipedia.org/wiki/Wikipedia:Contenidos/Categor%C3%ADas",
        it: "https://it.wikipedia.org/wiki/Wikipedia:Sommario"
    }

    document.querySelector("#categorical_index_link").href = categorical_index_pages[lang] ?? "https://" + lang + ".wikipedia.org/wiki/Special:Categories";
}

function random_page_button() {
    let lang = document.querySelector("#language").value;
    let max_range = document.querySelector("#rank_max").value;
    let category = document.querySelector("#category").value;
    hide_iframe();
    open_page(lang);
    set_url_params(lang, max_range, category);
}

function open_page(lang) {
    let url = "https://" + lang + ".wikipedia.org/wiki/Special:Random";

    let rank_max = parseInt(document.querySelector("#rank_max").value);
    let category = document.querySelector("#category").value;
    if (category.length > 0) {
        url = "https://" + lang + ".wikipedia.org/wiki/Special:RandomInCategory?wpcategory=" + category;
    } else if (random_range_enabled && rank_max && TOP_DATA_FEATURE_LANGS.includes(lang)) {
        if (wikipedia_top_data.length == 0) {
            fetch_top_data(lang);
            return;
        }
        url = "https://" + lang + ".wikipedia.org/wiki/" + wikipedia_top_data[Math.floor(Math.random() * Math.min(rank_max, wikipedia_top_data.length))];
    }

    document.querySelector("#wikipedia_page_iframe").setAttribute("src", url);
}

function set_url_params(lang, max_range, category) {
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.delete("lang");
    if (lang) {
        urlParams.set("lang", lang);
    }

    urlParams.delete("maxrange");
    if (max_range) {
        urlParams.set("maxrange", max_range);
    }

    urlParams.delete("category");
    if (category) {
        urlParams.set("category", category);
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

function category_picker_visibility(e) {
    if (e.data) {
        document.querySelector("#category_picker").style.display = "none"
        document.querySelector("#category").value = "";
    } else {
        document.querySelector("#category_picker").style.display = ""
    }
}

function max_rank_visibility(e) {
    if (e.data) {
        document.querySelector("#rank_picker").style.display = "none";
        document.querySelector("#rank_max").value = "";
    } else if (TOP_DATA_FEATURE_LANGS.includes(document.querySelector("#language").value)) {
        document.querySelector("#rank_picker").style.display = "initial";
    }
}
