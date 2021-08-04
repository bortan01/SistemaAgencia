document.getElementById("doPrint").onclick = function () {
    printElement(document.getElementById("printDiv"));
}

function printElement(elem) {
    let domClone = elem.cloneNode(true);
    let $printSection = document.getElementById("printSection");

    if (!$printSection) {
        let $printSection = document.createElement("div");
        $printSection.id = "printSection";
        document.body.appendChild($printSection);
    }

    $printSection.innerHTML = "";
    $printSection.appendChild(domClone);
    window.print();
}