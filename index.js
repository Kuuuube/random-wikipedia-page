document.addEventListener("DOMContentLoaded", requestOpenRandomPage);

function requestOpenRandomPage() {
    let lang = document.querySelector("#language").value;
    let url = "https://" + lang + ".wikipedia.org/wiki/Special:Random";

    document.querySelector("#wikipedia_page_iframe").setAttribute("src", url);
}
