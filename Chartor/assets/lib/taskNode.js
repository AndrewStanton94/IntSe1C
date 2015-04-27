'use strict';

var rootNode;

// Int Id for sidebar stuff
function id(){
	this.key = document.getElementsByClassName('node').length;
	this.key = this.key === 0 ? null : this.key;

	this.generate = function generate(){
		if(this.key === null){
			this.key = 0;		// 0 index for compatibility with loops
		}
		else{
			this.key++;
		}
		return this.key;
	};
}

// Node class
function Node(name){
	this.name = name;
	this.key = keyGen.generate();
	this.target = document.getElementById('inputArea');
	this.nodeArray = document.getElementsByClassName('node');
	this.nodeTitleArray =  document.getElementsByClassName('nodeTitle');
	// this.parent;
	this.children = [];

	this.appendChild = function(valueToAdd){
		this.children.push(valueToAdd);
	};

	this.hasChildren = function(){
		return this.children.length > 0;
	};

	this.removeChildById = function(id){
		for (var i = 0; i < this.children.length; i++){
			if(this.children[i].key === id){	// Found it 
				if (this.children[i].hasChildren()){	// Item to delete has children
					if (!prompt('The node you are deleting has children. Continue?')){
						return;	// Don't delete
					}
				}
				this.children.splice(i, 1);	// Delete
			}
		}
	};

	// Mutator for parent attr
	this.editParent = function editParent(parent){
		this.parent = parent;
	};

	// Fill options for the select menus of the nodes
	this.buildOptions = function buildOptions(){
		console.log('In build options');
		var option = '<option></option><option data-id="ROOT">ROOT</option>',
			i = this.key + 'parent',
			optionsWrite = document.getElementById(i),
			previouslySelected = optionsWrite.selectedIndex;	// Prevent redraw dropping data

		optionsWrite.innerHTML = '';
		optionsWrite.insertAdjacentHTML('beforeend', option);

		for (i = 0; i < nodeObjects.length; i++){
			if(nodeObjects[i].key != this.key){
				option = document.createElement('option');
				option.textContent = nodeObjects[i].name;
				option.dataset.id = i;
				optionsWrite.appendChild(option);
			}
		}
		optionsWrite.selectedIndex = previouslySelected;	// Only takes numeric data ((int))
	};

	// Draw form representation of the node
	this.addNode = function addNode(){
		this.target.insertAdjacentHTML('beforeend', '<section class="node" id="' + this.key +'"><div class="nodeTitle"><h1>'+ this.name +'</h1><p id="' + this.key +'del">Delete</p></div><div class="input"><label for="parent">Parent</label><select name="parent" id="' + this.key +'parent"></select></div></section>');
	};

	// Delete node
	this.addDeleteListener = function addDeleteListener(){
		var o = this.key + 'del',
			key = this.key,
			delBtn = document.getElementById(o);
		
		delBtn.addEventListener('click', function(){
			var me = document.getElementById(key);
			document.getElementById('inputArea').removeChild(me);
			for(var i = 0; i < nodeObjects.length; i++){
				if(nodeObjects[i].key == key){
					nodeObjects.splice(i, 1);
					for(i = 0; i < nodeObjects.length; i++){
						nodeObjects[i].buildOptions();
					}
				}
			}
		});
	};

	// Show / hide parent selection menu
	this.addListener = function addListener(node, nodeTitle){
		nodeTitle.addEventListener('click', function(){
			if(node.style.height == '6.5em' || node.style.height === null){
				node.style.height = '3em';
			}
			else{
				node.style.height = '6.5em';
			}
		});
	};

	this.addSelectListener = function(){
		// console.log('in addSelectListener');
		var targetId = this.key + 'parent',
			parentSelectElem = document.getElementById(targetId);

		parentSelectElem.addEventListener('change', function(e){
			var selectedParentOptionElem = e.target.options[e.target.selectedIndex],
				selectedNode = parseInt(e.target.id.replace('parent', ''));

			console.log('selectedParentOptionElem');
			console.log(selectedParentOptionElem);

			if (selectedParentOptionElem.dataset.id === 'ROOT'){
				console.log(selectedNode + ' is root');
				rootNode = selectedNode;
				return;
			}
			if (selectedParentOptionElem.dataset.id){
				console.log('Valid non root node selected');
				var parentId = selectedParentOptionElem.dataset.id;
				nodeObjects[parentId].appendChild(selectedNode);
				console.log(parentId + ' isParentOf ' + selectedNode);
				console.log(nodeObjects[parentId].children);
			}
		});
	};
	
	this.constructor = function contructor(){
		// console.log('in constructor');
		this.addNode();				// Add node to sidebar
		this.addDeleteListener();
		this.addSelectListener();
		this.addListener(this.nodeArray[this.nodeArray.length - 1], this.nodeTitleArray[this.nodeTitleArray.length - 1]);	// Toggle option visibility
	};
}

var keyGen = new id(),
	addNode = document.getElementById('addNode'),
	nameInput = document.getElementById('nodeName'),

	nodeObjects = [],
	node;

// Add new node elem to list using click
addNode.addEventListener('click', function(){
	if(nodeName.value !== ''){
		node = new Node(nameInput.value);
		nodeObjects.push(node);
		node.constructor();
		for (var i = 0; i < nodeObjects.length; i++){ 
			nodeObjects[i].buildOptions();
		}
		nodeName.style.color = 'black';
		nameInput.value = '';
	}
	else{
		nodeName.style.color = 'red';
	}
});

// Add new node elem to list using enter key press
document.getElementById('nameInput').addEventListener('submit',
	function(e){
		e.preventDefault();
		if(nodeName.value !== ''){
			node = new Node(nameInput.value);
			nodeObjects.push(node);
			node.constructor();
			for (var i = 0; i < nodeObjects.length; i++){ 
				nodeObjects[i].buildOptions();
			}
			nodeName.style.color = 'black';
			nameInput.value = '';
		}
		else{
			nodeName.style.color = 'red';
		}
	}
);

function drawTree(treeRoot, currentNumberArray){
	var node = prepareNode(treeRoot.name, currentNumberArray),
		children = treeRoot.children;

	document.getElementById('svgElement').appendChild(node);
	
	for(var childIndex in children){
		var tempArray = currentNumberArray;
		tempArray.push(childIndex);
		drawTree(children[childIndex], tempArray);
	}
}

document.addEventListener('redrawTree', function(e) {
	drawTree(nodeObjects[rootNode], []);
});
