'use strict';
var svgNS = 'http://www.w3.org/2000/svg',
    nodeWidth = 150,
    nodeHeight = 60;

function getAttrAsInt (elem, attr){
    // (int) elem.attr
    return parseInt(elem.getAttribute(attr));
}

function connectionPoint (node, side){
    // Given node, get rect and determine where to connect lines to.
    // Options: Top, Bottom, Left
    var elem = node.children[0],    // Need to use rectangle as g has no dimension attrs to read.
        x = getAttrAsInt(elem, 'x'),
        y = getAttrAsInt(elem, 'y');

        switch(side){
            case 'Left':
                y += (getAttrAsInt(elem, 'height') / 2);
                break;

            case 'Bottom':
                y += getAttrAsInt(elem, 'height');      // Flows into Top to get x value

            case 'Top':
                x += (getAttrAsInt(elem, 'width')/2);
                break;

            default: console.log('Invalid side given for connectionPoint');
        }

    return [x, y];
}

function newRectComponent (parent, x, y){
    // console.log('Making rect bg');
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

function newTextComponent (parent, x, y, text){
    // Add a text element to the node. Giving , location and text content
    var myText = document.createElementNS(svgNS,'text');
    myText.setAttribute('id','myText');
    myText.setAttribute('x', x);
    myText.setAttribute('y', y);
    myText.textContent = text; 
    parent.appendChild(myText);
}

function newNode (number, name, x, y){
    var g = document.createElementNS(svgNS, 'g');
    newRectComponent(g, x, y);
    newTextComponent(g, x + 20, y + 20, number);
    newTextComponent(g, x + 20, y + 40, name);
    // console.log(g);
    return g;
}

function straightConnector(svgElem, node1, node2){
    var myLine = document.createElementNS(svgNS,'line');
    myLine.setAttribute('id','myLine');
    myLine.setAttribute('x1', node1[0]);
    myLine.setAttribute('y1', node1[1]);
    myLine.setAttribute('x2', node2[0]);
    myLine.setAttribute('y2', node2[1]);
    myLine.setAttribute('style', 'stroke:#000; stroke-width:2');
    svgElem.appendChild(myLine);
}

function lConnector(svgElem, node1, node2){
    straightConnector(svgElem, node1, [node1[0], node2[1]]);
    straightConnector(svgElem, [node1[0], node2[1]], node2);
}

function determineLevel(number){
    var level = 0;
    for (var index in number){
        level += number[index] ? 1: 0;
    }
    return level;
}

function nodeNumberStr (number){
    // Must have associative array
    var strOut = '';
    for (var key in number){
        // console.log(number[key]);
        if (number[key]){
            strOut += (key === 't1' ? '': '.') + number[key].toString();
            // console.log('is true')
        }
        else break; // If null: no more data
    }
    if (strOut === ''){
        // console.log('unchanged');
        strOut = '0';
    }
    // else{console.log('changed');};
    // strOut != '' ? strOut : '0'; // Why is this line broken?
    return strOut;
}

function getSVGdimensions (id){
    // Dimensions of svg elem
    var svgElem = document.getElementById(id) , width, height;
    console.log(svgElem);
    width = svgElem.width.baseVal.value;
    height = svgElem.height.baseVal.value;
    // console.log(width);
    // console.log(height);
    return {'width': width, 'height': height};
}

function prepareNode (name, numberArray){
    var node, x, y,
        level = determineLevel(numberArray),
        numberStr = nodeNumberStr(numberArray),
        dimensions = getSVGdimensions('svgElement');
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

function demo (){
    var s = document.getElementById('svgElement'),
        n = prepareNode('Bob', {'t1': null}),
        sideArray = ['Top', 'Bottom', 'Left'];
    s.appendChild(n);

    // for (var i = 0; i < sideArray.length; i++) {
    //      console.log(connectionPoint(n, sideArray[i]));
    // }
    lConnector(s, connectionPoint(n, 'Bottom'), connectionPoint(document.getElementById('existingItem'), 'Left'));
}

// window.addEventListener('load', demo);
