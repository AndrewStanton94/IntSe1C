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

function newRectComponent (parent, x, y) {
    console.log("Making rect");
    var myRect = document.createElementNS(svgNS,"rect");
    myRect.setAttribute("id","myRectangle");
    myRect.setAttribute("x", x);
    myRect.setAttribute("y", y);
    myRect.setAttribute("width", 200);
    myRect.setAttribute("height", 100);
    myRect.setAttribute("fill","red");
    myRect.setAttribute("stroke","none");
    parent.appendChild(myRect);
}

function newTextComponent (parent, x, y, text) {
    // Add a text element to the node. Giving , location and text content

    var myText = document.createElementNS(svgNS,"text");
    myText.setAttribute("id","myText");
    myText.setAttribute("x", x);
    myText.setAttribute("y", y);
    myText.textContent = text; 
    parent.appendChild(myText);
}

function newNode (number, name, x, y) {
    var g = document.createElementNS(svgNS, 'g');
    newRectComponent(g, x, y);
    newTextComponent(g, x + 20, y + 40, number);
    newTextComponent(g, x + 20, y + 60, name);
    // console.log(g);
    return g;
}

function determineNodes(data) {
    // this element
    // for atr in childNodes:
        // recurse returning node ident for produced childNodes
        // use ident to link to parent
}

function buildWBT (svgElem, data) {
    // Given svg elem, and data call newNode to create the nodes. Then link them up.

    var n = newNode(1, "Root", 0, 0);
    // console.log(n);
    var svg = document.getElementById("svg");
    // console.log(svg);
    svg.appendChild(n);
    // return n


    // TODO:
    //  Unpack data for current row
    //  Call newNode with data
    //  Link parent to children
    //  data = {name, [children]}
    //
    //  Recursive

    // This node
    // For c in child nodes:
    //      recurse; Returning reference to enable nodes to be linked
}
