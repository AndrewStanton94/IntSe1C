'use strict';
// Int Id for sidebar stuff
function id(){
	this.key = document.getElementsByClassName('node').length;

	this.generate = function generate(){
		if(this.key == 0){
			this.key = 1;
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
		var option = '<option></option><option>ROOT</option>',
			i = this.key + 'parent',
			optionsWrite = document.getElementById(i);

		for (i = 0; i < nodeObjects.length; i++){
			if(nodeObjects[i].key != this.key){
	    		option += '<option>' + nodeObjects[i].name + '</option>';
			}
		}
		optionsWrite.innerHTML = '';
		optionsWrite.insertAdjacentHTML('beforeend', option);
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
	
	this.constructor = function contructor(){
		this.addNode();
		this.addDeleteListener();
		this.addListener(this.nodeArray[this.nodeArray.length - 1], this.nodeTitleArray[this.nodeTitleArray.length - 1]);
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
