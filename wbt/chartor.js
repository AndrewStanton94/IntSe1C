'use strict';
var svgNS = 'http://www.w3.org/2000/svg',
    nodeWidth = 150,
    nodeHeight = 60;

function getAttrAsInt (elem, attr) {
    // (int) elem.attr
    return parseInt(elem.getAttribute(attr));
}

function connectionPoint (node, isParent, leftConnect) {
    // Given node, get rect and determine were to connect lines to. If parent node, connection at bottom; else top.
    var x,y, elem = node.children[0];    // Need to use rectangle as g has no dimension attrs to read.
	if (leftConnect){
		x = getAttrAsInt(elem, 'x');
		y = getAttrAsInt(elem, 'y') + (getAttrAsInt(elem, 'height')/2);
	}
	else{
		x = getAttrAsInt(elem, 'x') + (getAttrAsInt(elem, 'width')/2);
		y = getAttrAsInt(elem, 'y') + isParent ? getAttrAsInt(elem, 'height') : 0;
	}
    return [x, y];
}

function newRectComponent (parent, x, y) {
    console.log('Making rect bg');
    var myRect = document.createElementNS(svgNS,'rect');
    myRect.setAttribute('id','myRectangle');
    myRect.setAttribute('x', x);
    myRect.setAttribute('y', y);
    myRect.setAttribute('width', nodeWidth);
    myRect.setAttribute('height', nodeHeight);
    myRect.setAttribute('fill','red');
    myRect.setAttribute('stroke','none');
    parent.appendChild(myRect);
}

function newTextComponent (parent, x, y, text) {
    // Add a text element to the node. Giving , location and text content
    var myText = document.createElementNS(svgNS,'text');
    myText.setAttribute('id','myText');
    myText.setAttribute('x', x);
    myText.setAttribute('y', y);
    myText.textContent = text; 
    parent.appendChild(myText);
}

function newNode (number, name, x, y) {
    var g = document.createElementNS(svgNS, 'g');
    newRectComponent(g, x, y);
    newTextComponent(g, x + 20, y + 20, number);
    newTextComponent(g, x + 20, y + 40, name);
    // console.log(g);
    return g;
}

function determineLevel (number) {
    var level = 0;
    for (var key in number){
        level += number[key] ? 1: 0;
    }
    return level;
}

function nodeNumberStr (number) {
    // Must have associative array
    var strOut = '';
    for (var key in number){
        console.log(number[key]);
        if (number[key]){
            strOut += (key === 't1' ? '': '.') + number[key].toString();
            // console.log('is true')
        }
        else break; // If null: no more data
    }
    if (strOut == ''){
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
    var node,  name, x, y,
        level = determineLevel(number),
        numberStr = nodeNumberStr(number),
        dimensions = getSVGdimensions('svg');
    // Retrieve parent OR have it passed
    // Use that plus set level constants to get position


    switch (level){
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

    return newNode(numberStr, name, x, y);
}

function demo () {
    var s = document.getElementById('svg'),
        n = prepareNode('Bob', {'t1': null});
    s.appendChild(n);
}

// window.addEventListener('load', demo);