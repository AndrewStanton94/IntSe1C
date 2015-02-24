function Node(){
	this.target = document.getElementById('inputArea');
	this.nodeArray = document.getElementsByClassName('node');
	this.nodeTitleArray =  document.getElementsByClassName('nodeTitle');

	this.addNode = function addNode(){
		this.target.insertAdjacentHTML('beforeend', '<section class="node"><div class="nodeTitle"><h1>Node</h1></div><form><div class="input"><label for="foo">foo</label><input type="text" name="foo" id="foo" placeholder="bar"></div><div class="input"><label for="foo">foo</label><input type="text" name="foo" id="foo" placeholder="bar"></div><div class="input"><label for="foo">foo</label><input type="text" name="foo" id="foo" placeholder="bar"></div><div class="input"><label for="foo">foo</label><input type="text" name="foo" id="foo" placeholder="bar"></div></form></section>');
	};

	this.addNode();

	this.addListener = function addListener(node, nodeTitle){
		nodeTitle.addEventListener('click', function(){

	if(node.style.height == '16em' || node.style.height == null){
			node.style.height = '3em';
		}
	else{
			node.style.height = '16em';
		}
	});
	};
	this.addListener(this.nodeArray[this.nodeArray.length - 1], this.nodeTitleArray[this.nodeTitleArray.length - 1]);
}




