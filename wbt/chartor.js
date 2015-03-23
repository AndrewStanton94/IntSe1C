'use strict';
var svgNS = 'http://www.w3.org/2000/svg',       // URL containing definition of SVG elems
    nodeWidth = 150,                            // Global dimension constants
    nodeHeight = 60;

function getAttrAsInt (elem, attr) {
    // (int) elem.attr
    return parseInt(elem.getAttribute(attr));
}

function connectionPoint (node, isParent, leftConnect) {
    /*Given node, get rect elem and determine where to connect lines to.
    If parent node, connection at bottom; else top.
    left connection for layer 2 & 3
    */
    var elem = node.children[0],    // Need to use rectangle as g has no dimension attrs to read.
        x = getAttrAsInt(elem, 'x'),
        y = getAttrAsInt(elem, 'y');    // Top left corner of rect elem

	if (leftConnect){
		y += (getAttrAsInt(elem, 'height')/2);    // Connector at central Y postion
	}
	else{
		x += (getAttrAsInt(elem, 'width')/2);    // Connector at central X postion
		y += isParent ? getAttrAsInt(elem, 'height') : 0;     // Connector at bottom of rect elem if parent
	}
    return [x, y];
}

function newRectComponent (container, x, y) {
    console.log('Making rect bg');
    var myRect = document.createElementNS(svgNS,'rect');
    myRect.setAttribute('id','myRectangle');
    myRect.setAttribute('x', x);
    myRect.setAttribute('y', y);
    myRect.setAttribute('width', nodeWidth);
    myRect.setAttribute('height', nodeHeight);
    myRect.setAttribute('fill','red');
    myRect.setAttribute('stroke','none');
    container.appendChild(myRect);
}

function newTextComponent (container, x, y, text) {
    // Add a text element to the node. Giving , location and text content
    var myText = document.createElementNS(svgNS,'text');
    myText.setAttribute('id','myText');
    myText.setAttribute('x', x);
    myText.setAttribute('y', y);
    myText.textContent = text; 
    container.appendChild(myText);
}

function newNode (number, name, x, y) {
    // Creates a g elem with rectangle for bg and 2 text elems
    var g = document.createElementNS(svgNS, 'g');
    newRectComponent(g, x, y);
    newTextComponent(g, x + 20, y + 20, number);
    newTextComponent(g, x + 20, y + 40, name);
    // console.log(g);
    return g;
}

function determineLevel (numberArray) {
    // Takes array representing the node's number. Returns the level
    var level = 0;              // For root
    for (var key in numberArray){
        level += numberArray[key] ? 1: 0;    // Increment for forall existing levels
    }
    return level;
}

function nodeNumberStr (numberArray) {
    // Takes array representing the node's number. Returns string representation
    // Must have associative array
    var strOut = '';
    for (var key in numberArray){
        console.log(numberArray[key]);
        if (numberArray[key]){      // Presence check
            strOut += (key === 't1' ? '': '.') + numberArray[key].toString();   // Concatonate str(levelNumber) with .
            // console.log('is true')
        }
        else break; // If null: no more data
    }
    if (strOut == ''){                  // Level 0; empty array
        // console.log('unchanged');
        strOut = '0';
    }
    // else{console.log('changed');};
    // strOut != '' ? strOut : '0'; // Why is this line broken?
    return strOut;
}

function getSVGdimensions (id) {
	// Dimensions of svg elem
    var svgElem = document.getElementById(id) , width, height;
    console.log(svgElem);
    width = svgElem.width.baseVal.value;
    height = svgElem.height.baseVal.value;
    // console.log(width);
    // console.log(height);
    return {'width': width, 'height': height};
}

function prepareNode (name, number) {
    // Takes info for single node, draws it

    // Retrieve parent OR have it passed
    // Use that plus set level constants to get position
    var node, x, y,
        dimensions = getSVGdimensions('svg');

    switch (determineLevel(number)){
        case 0:
            x  = (dimensions.width / 2) - (nodeWidth / 2);
            y  = 10;
            console.log(dimensions.width, x, y);    // dimensions.width can be 0. Race Condition?
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
    }
    return newNode(nodeNumberStr(number), name, x, y);
}

function demo () {
    var s = document.getElementById('svg'),
        n = prepareNode('Bob', {'t1': null});
    s.appendChild(n);
}

window.addEventListener('load', demo);