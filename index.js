const BROWSER_LANG = navigator.language || navigator.userLanguage;

document.addEventListener("DOMContentLoaded", init_page);

function init_page() {
    let stripped_lang = BROWSER_LANG.replace(/-.*/, "");
    open_page(BROWSER_LANG.replace(/-.*/, ""));
    document.querySelector("#language").value = stripped_lang;
}

function random_page_button() {
    open_page(document.querySelector("#language").value);
}

function open_page(lang) {
    let url = "https://" + lang + ".wikipedia.org/wiki/Special:Random";
    document.querySelector("#wikipedia_page_iframe").setAttribute("src", url);
}
