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
	}
}

function Node(name){
	this.name = name;
	this.key = keyGen.generate();
	this.target = document.getElementById('inputArea');
	this.nodeArray = document.getElementsByClassName('node');
	this.nodeTitleArray =  document.getElementsByClassName('nodeTitle');
	this.parent;

	this.editParent = function editParent(parent){
		this.parent = parent;
	}

	this.buildOptions = function buildOptions(){
	var option = '';
	var i = this.key + "parent";
	var optionsWrite = document.getElementById(i);
	for (i = 0; i < nodeObjects.length; i++) { 
		if(nodeObjects[i].key != this.key){
    		option += '<option>' + nodeObjects[i].name + '</option>';
		}
		}
		optionsWrite.innerHTML = "";
	optionsWrite.insertAdjacentHTML('beforeend', option);
	}

	this.addNode = function addNode(){
		this.target.insertAdjacentHTML('beforeend', '<section class="node" id="' + this.key +'"><div class="nodeTitle"><h1>'+ this.name +'</h1><p id="' + this.key +'del">Delete</p></div><div class="input"><label for="parent">foo</label><select name="parent" id="' + this.key +'parent"></select></div></section>');
	};

	this.addDeleteListener = function addDeleteListener(){
		var o = this.key + 'del';
		var key = this.key;
		var delBtn = document.getElementById(o);
		
		delBtn.addEventListener('click', function(){
			var me = document.getElementById(key);
			document.getElementById('inputArea').removeChild(me);
			for(i = 0; i < nodeObjects.length; i++){
				if(nodeObjects[i].key == key){
					nodeObjects.splice(i, 1);
					for(i = 0; i < nodeObjects.length; i++){nodeObjects[i].buildOptions();}
				}
			}
		});
	}

	this.addListener = function addListener(node, nodeTitle){
		nodeTitle.addEventListener('click', function(){

	if(node.style.height == '6.5em' || node.style.height == null){
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
	}
}

var keyGen = new id();

var addNode = document.getElementById('addNode');
var nameInput = document.getElementById('nodeName');

var nodeObjects = [];
var node;

addNode.addEventListener('click', function(){
	if(nodeName.value != ""){
		node = new Node(nameInput.value);
		nodeObjects.push(node);
		node.constructor();	
		nodeName.style.color = "black";
		nameInput.value = '';
	}
	else{
		nodeName.style.color = "red";
	}
});

document.getElementById('nameInput').addEventListener('submit', function(e){
	e.preventDefault();
	if(nodeName.value != ""){
		node = new Node(nameInput.value);
		nodeObjects.push(node);
		node.constructor();	
		for (i = 0; i < nodeObjects.length; i++) { 
			nodeObjects[i].buildOptions();
		}
		nodeName.style.color = "black";
		nameInput.value = '';
	}
	else{
		nodeName.style.color = "red";
	}
});


