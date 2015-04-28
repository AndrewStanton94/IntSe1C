'use strict';
var svgElement, test,
    svgNS = 'http://www.w3.org/2000/svg',       // URL containing definition of SVG elems
    nodeWidth = 150,                            // Global dimension constants
    nodeHeight = 60;

function getAttrAsInt (elem, attr){
    // (int) elem.attr
    return parseInt(elem.getAttribute(attr));
}

function connectionPoint(node, side){
    // Given node, get rect and determine where to connect lines to.
    // Options: Top, Bottom, Left
    if(!node){return;}
    var elem = node.children[0],    // Need to use rectangle as g has no dimension attrs to read.
        x = getAttrAsInt(elem, 'x'),
        y = getAttrAsInt(elem, 'y');

        switch(side){
            case 'Left':
                y += (getAttrAsInt(elem, 'height') / 2);
                break;

            case 'Bottom':
                x += (getAttrAsInt(elem, 'width')/3);
                y += getAttrAsInt(elem, 'height');
                break;

            case 'Top':
                x += (getAttrAsInt(elem, 'width')/2);
                break;

            default: console.log('Invalid side given for connectionPoint');
        }

    return {'x': x, 'y': y};
}

function drawLine(svgElem, connection1, connection2){
    var myLine = document.createElementNS(svgNS,'line');

    myLine.setAttribute('id','myLine');
    myLine.setAttribute('x1', connection1.x);
    myLine.setAttribute('y1', connection1.y);
    myLine.setAttribute('x2', connection2.x);
    myLine.setAttribute('y2', connection2.y);
    myLine.setAttribute('style', 'stroke:#000; stroke-width:2');
    svgElem.appendChild(myLine);
}

function straightConnector(svgElem, node1, node2){
    console.log(node1);
    test = node1;
    var connection1 = connectionPoint(node1, 'Bottom'),
        connection2 = connectionPoint(node2, 'Top');

    drawLine(svgElem, connection1, connection2);
}

function lConnector(svgElem, node1, node2){
    var connection1 = connectionPoint(node1, 'Bottom'),
        connection2 = connectionPoint(node2, 'Left'),
        joint = {'x': connection1.x, 'y': connection2.y};

    drawLine(svgElem, connection1, joint);
    drawLine(svgElem, joint, connection2);
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


function determineLevel(number){
    var level = 0;
    for (var index in number){
        level += number[index] ? 1: 0;
    }
    return level;
}

function nodeNumberStr (number){
    var strOut = '';
    // console.log('number components');
    for(var key in number){
        // console.log(number[key]);
        if(!number[key]){
            break;
        }
        strOut += (key == 0 ? '': '.') + number[key].toString();
    }
    if (strOut === ''){
        // console.log('unchanged');
        strOut = '0';
    }
    // console.log(strOut);
    return strOut;
}

function getSVGdimensions(id){
    // Dimensions of svg elem
    var svgElem = document.getElementById(id) , width, height;
    // console.log(svgElem);
    width = svgElem.width.baseVal.value;
    height = svgElem.height.baseVal.value;
    // console.log(width);
    // console.log(height);
    return {'width': width, 'height': height};
}

function prepareNode (name, numberArray){
    var x = 0,
        y = 0,
        level = determineLevel(numberArray),
        numberStr = nodeNumberStr(numberArray),
        dimensions = getSVGdimensions('svgElement');

    switch (level){
        case 0:
            x  = (dimensions.width - nodeWidth) / 2;
            y  = 10;
            break;

        case 3:
            break;

        case 2:
            x += 75;
            y += 100 * numberArray[1];

        case 1:
            y += 100;
            x += (nodeWidth + 50) * (numberArray[0] - 1);
            break;
    }

    console.log(x, y);
    return newNode(numberStr, name, x, y);
}

function demo(){
    var n = prepareNode('Bob');

    svgElement = document.getElementById('svgElement');
    svgElement.appendChild(n);

    // lConnector(svgElement, connectionPoint(n, 'Bottom'), connectionPoint(document.getElementById('existingItem'), 'Left'));
}

// window.addEventListener('load', demo);
