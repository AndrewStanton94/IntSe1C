var svgNS = "http://www.w3.org/2000/svg";

function getAttrAsInt (elem, attr) {
    // (int) elem.attr
    return parseInt(elem.getAttribute(attr));
}

function connectionPoint (node, isParent) {
    // Given node, get rect and determine were to connect lines to. If parent node, connection at bottom; else top.
    var x,y, elem;
    elem = node.children[0];    // Need to use rectangle as g has no dimension attrs to read.
    x = getAttrAsInt(elem, "x") + (getAttrAsInt(elem, "width")/2)
    y = getAttrAsInt(elem, "y") + isParent ? getAttrAsInt(elem, "height") : 0;
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

function determineNodes(svgElem, data, number, x, y) {
    // Recursive function to oversee node creation
    var parent, parentConnection,
    childrenConnections = [],
    name = data.name,
    children = data.children,

    recurse = function (element, index, array) {
        // Inner function to use forEach method to ensure order
        var num = number + "." + toString(index + 1);
        childrenConnections.push(determineNodes(svgElem, element, num, x, y));
    };

    parent = newNode(number, name, x, y);
    svgElem.appendChild(n);
    parentConnection = connectionPoint(parent, true);
    console.log(parentConnection);

    children.forEach(recurse);  // Using forEach method as other form doesn't ensure order.

    return parent;
}

function buildWBT (data) {
    // Gets svg element, and data then calls determineNodes to create the nodes and link them up.

    var svgElem, data;
    svgElem = document.getElementById("svg");


    var n = newNode(1, "Root", 0, 0);
}
