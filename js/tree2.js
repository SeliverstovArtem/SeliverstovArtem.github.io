var s = new sigma({
    renderer: {
      container: 'task',
      type: 'canvas'
    },
    settings: {
        edgeLabels: true,
        minArrowSize: 5,
        minNodeSize: 1,
        maxNodeSize: 10,
        minEdgeSize: 0.1,
        maxEdgeSize: 2,
        sideMargin: 0.5,
        defaultNodeColor: '#00897B',
        defaultEdgeColor: '#4DB6AC',
        enableEdgeHovering: true,
        edgeHoverSizeRatio: 2,
	    labelThreshold: 0
    }
});

sigma.parsers.json('./json/tree2.json', s, function(){
	s.graph.edges().forEach(function(edge){ 
      edge.type = "def";
    });
    s.refresh();
});

var original = [
    ["0", "0", "0", "1", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "1", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "1", "0", "0", "0", "0", "0", "0"],
    ["1", "1", "1", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "1", "0", "0", "0", "0", "1"],
    ["0", "0", "0", "0", "1", "0", "0", "1", "1", "0"],
    ["0", "0", "0", "0", "0", "0", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "1", "0", "0", "0", "0"]
];