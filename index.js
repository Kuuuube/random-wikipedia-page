const BROWSER_LANG = navigator.language || navigator.userLanguage;

document.addEventListener("DOMContentLoaded", init_page);

function init_page() {
    let stripped_lang = BROWSER_LANG.replace(/-.*/, "");
    open_page(BROWSER_LANG.replace(/-.*/, ""));
    document.querySelector("#language").value = stripped_lang;
}

function random_page_button() {
    hide_iframe();
    open_page(document.querySelector("#language").value);
}

function open_page(lang) {
    let url = "https://" + lang + ".wikipedia.org/wiki/Special:Random";
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
