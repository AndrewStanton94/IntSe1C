<?php
	include 'assets/framework/header.php';
?>
<section id="content">
	
<aside id="inputArea">
	<div id="inputTitle"><form id="nameInput"><input type="text" id="nodeName" placeholder="Add a task." /></form><img id="addNode" src="assets/img/add.svg"></img></div>
		
		
</aside>
<svg id = "svgElement" width = 100% height = 500 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background: #ccc" >

        <g id=existingItem>
            <rect id = "r2" x="701" y="251" width="200" height="100" style="stroke: #009900; stroke-width: 3; fill: none; "/>
            <text id =t1 x=720 y =290>Task name</text>
            <text x=720 y =310>Task number</text>
        </g>
        <line x1=101 y1 = 100 x2 = 101 y2 = 251 style="stroke:#006600;"/>
    </svg>
</section>
<?php
	include 'assets/framework/footer.php';
?>
