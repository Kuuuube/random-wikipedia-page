var iframeLoadCount = 0;

$(document).ready(function () {
    setIframeHeight();
    requestOpenRandomPage();
});

$(window).resize(function () {
    setIframeHeight();
});

function setIframeHeight() {
    $("#wikipedia_page_iframe").height($(window).height() - $("#header").outerHeight());
}

function requestOpenRandomPage() {
    var start = $("#start").val();
    var finish = $("#finish").val();
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
    $("#wikipedia_page_iframe").attr("src", url);

    $("#rank").text(addCommas(rank));
    $("#pageInfo").css("visibility", "visible");
}

function openPageInNewTab() {
    window.open($("#wikipedia_page_iframe").attr("src"));
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