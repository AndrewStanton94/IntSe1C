var svgNS = "http://www.w3.org/2000/svg";

function getAttrAsInt (elem, attr) {
    // (int) elem.attr
    return parseInt(elem.getAttribute(attr));
}

function connectionPoint (elem, isBtm) {
    var x,y;
    x = getAttrAsInt(elem, "x") + (getAttrAsInt(elem, "width")/2)
    y = getAttrAsInt(elem, "y") + isBtm ? getAttrAsInt(elem, "height") : 0;
    return [x, y];
}

function newTextComponent (parent, x, y, text) {
    // Add a text element to the node. Giving , location and text content
    // var component = document.createElement("text");
    var component = document.createElementNS(svgNS, "text");
    parent.appendChild(component);
    component.setAttribute("x", x);
    component.setAttribute("y", y);
    component.textContent = text;
}

function newNode (number, name, x, y) {
    // console.log("In function newNode");
    var g = document.createElement('g');
    newTextComponent(g, x +20, y +40, number);
    newTextComponent(g, x +20, y +60, name);
    // console.log(g);
    return g;
}

function buildWBT (svgElem, data) {
    // Given svg elem, and data call newNode to create the nodes. Then link them up.
    var n = newNode(1, "Root", 0, 0);
    // console.log(n);
    var svg = document.getElementById("svg");
    console.log(svg);
    svg.appendChild(n);
    return n
}
