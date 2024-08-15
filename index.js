var iframeLoadCount = 0;

document.addEventListener("DOMContentLoaded", requestOpenRandomPage);

function requestOpenRandomPage() {
    var start = document.querySelector("#start").value;
    var finish = document.querySelector("#finish").value;
    openPageIfBoundsAreValid(start, finish);
}

function openPageIfBoundsAreValid(start, finish) {
    var url;
    var rank;

    if (isNaN(start) || Number(start) < 1 || Number(start) > paths.length) {
        alert("Please enter a 'from' value between 1 and " + paths.length);
        return;
    }

    if (isNaN(finish) || Number(finish) < 1 || Number(finish) > paths.length) {
        alert("Please enter a 'to' value between 1 and " + paths.length);
        return;
    }

    if (Number(start) >= Number(finish)) {
        alert("Please enter a 'to' value that is greater than the 'from' value");
        return;
    }

    rank = Number(start) + (Math.round(Math.random() * Number(finish - start)));
    url = "https://ja.wikipedia.org/wiki/Special:Random";

    iframeLoadCount = 0;
    document.querySelector("#wikipedia_page_iframe").setAttribute("src", url);

    document.querySelector("#rank").textContent = addCommas(rank);
}

function openPageInNewTab() {
    window.open(document.querySelector("#wikipedia_page_iframe").getAttribute("src"));
}

function addCommas(nStr) {
    nStr = String(nStr);
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
