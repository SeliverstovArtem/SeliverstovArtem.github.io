//Настройка ace-редактора
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.setHighlightActiveLine(false);

var iframe = document.getElementById('iframe');
var doc = iframe.contentDocument;
var next = document.getElementById('next');
var check = document.getElementById('check');

//Функция проверки
check.onclick = function() {
    var expect = chai.expect;
    
    try {
        if (expect(original).to.eql(resData)) {
            check.classList.remove("wrong");
            check.classList.add("right");
            next.classList.add("blink");
            next.disabled = !next.disabled;
        }
    } catch (err) {
        console.log(err);
            check.classList.remove("right");
            check.classList.add("wrong");
    }
};

var sourceData = editor.getValue();

var data;
var min = 0;
var max;
var max1;

//Функции для визуализации
function createNodes(node) {
    
    for (var i = 0; i < max; i++) {
        var x = Math.round(Math.sin(Math.PI*2*i/max)*10)/10;
        var y = -1*Math.round(Math.cos(Math.PI*2*i/max)*10)/10;
        
        node[i] = {
            'id': 'n' + i,
            'label': 'x' + (i + 1),
            'x': x,
            'y': y,
            'size': 1
        };
    }
    
    if (max > 1) {
        return node;
    }
}

function createEdges(edge, resData) {
    var id = 0;
    if (max != max1) {
        data = math.transpose(resData);
        for (var i = 0; i < max1; i++) {
            edge[id] = {
                'id': 'e' + id,
                'source': 'n' + data[i].indexOf(1),
                'target': 'n' + data[i].lastIndexOf(1)
            };
            id++;
        }
    } else {
        for (var i = 0; i < max; i++) {
            for (var j = i; j < max1; j++) {
                if (resData[i][j] == 1) {
                    edge[id] = {
                        'id': 'e' + id,
                        'source': 'n' + i,
                        'target': 'n' + j
                    };
                    id++;
                }
            }
        }
    }
    return edge;
}

var dataToVisualize = {
    'nodes': [],
    'edges': []
};

function visualizeGraph(type) {
    data = editor.getValue();
    data = data.split('\n');
    resData = [];
    for (var i = 0; i <= data.length - 1; i++) {
        resData[i] = data[i].split(' ');
    }
    max = math.size(resData)[0];
    max1 = math.size(resData)[1];
    $('#iframe').empty();
    var s = new sigma({
        renderer: {
            container: document.getElementById('iframe'),
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
            labelThreshold: 0,
            defaultEdgeType: type
        }
    });
    dataToVisualize['nodes'] = createNodes(dataToVisualize['nodes']);
    dataToVisualize['edges'].length = 0;
    dataToVisualize['edges'] = createEdges(dataToVisualize['edges'], resData);
    s.graph.read(dataToVisualize);
    s.refresh(); 
    return (resData);
}