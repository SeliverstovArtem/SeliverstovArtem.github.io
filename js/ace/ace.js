//Настройка ace-редактора
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
//editor.getSession().setMode("ace/mode/javascript");
editor.setHighlightActiveLine(false);

var iframe = document.getElementById('iframe');
var doc = iframe.contentDocument;

/*var btn = document.getElementById('btn');
btn.onclick = function() {
//    editor.getSession().on('change', function () {
        doc.write("<script>" + editor.getValue() + "</script>");
        doc.close();
//    });
};*/

var next = document.getElementById('next');
var check = document.getElementById('check');

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

function createNodes(asd) {
    
    for (var i = 0; i < max; i++) {
        var x = Math.round(Math.cos(Math.PI*2*i/max)*10)/10;
        var y = Math.round(Math.sin(Math.PI*2*i/max)*10)/10;
//        console.log(Math.round(10*x)/10);
//        console.log(Math.round(10*y)/10);
        
        asd[i] = {
            'id': 'n' + i,
            'label': 'x' + (i + 1),
            'x': x,
            'y': y,
            'size': 1
        };
        console.log(asd[i]);
        console.log(original[i]);
        console.log(resData[i]);
    }
    
    console.log(original);
    console.log(resData);

    if (max > 1) {
        return asd;
    }
}

function createEdges(asd, resData) {
    var idNumber = 0;
    if (max != max1) {
        data = math.transpose(resData);
        //console.log(resData);
        for (var i = 0; i < max1; i++) {
            asd[idNumber] = {
                'id': 'e' + idNumber,
                'source': 'n' + data[i].indexOf(1),
                'target': 'n' + data[i].lastIndexOf(1)
            };
            //console.log(asd[idNumber]);
            idNumber += 1;
        }
    } else {
        for (var k = 0; k < max; k++) {
            for (var j = k; j < max1; j++) {
                if (resData[k][j] == 1) {
                    asd[idNumber] = {
                        'id': 'e' + idNumber,
                        'source': 'n' + k,
                        'target': 'n' + j
                    };
                    //console.log(asd[idNumber]);
                    idNumber += 1;
                }
            }
        }
    }
    return asd;
}

var dataToVisualize = {
    'nodes': [],
    'edges': []
};

function visualizeGraph() {
    data = editor.getValue();
    data = data.split('\n');
    resData = [];
    for (var i = 0; i <= data.length - 1; i++) {
        //console.log(data[i]);
        resData[i] = data[i].split(' ');
    }
    max = math.size(resData)[0];
    max1 = math.size(resData)[1];
    //while(data[0]) {
    //resData.push(data.splice(0,5));
    //}
    $('#iframe').empty();
    var s = new sigma({
        renderer: {
            container: document.getElementById('iframe'),
            type: 'canvas'
        },
        settings: {
            minEdgeSize: 0.1,
            maxEdgeSize: 2,
            sideMargin: 0.5,
            defaultNodeColor: '#00897b',
            defaultEdgeColor: '#4db6ac'
        }
    });
    dataToVisualize['nodes'] = createNodes(dataToVisualize['nodes']);
    dataToVisualize['edges'].length = 0;
    dataToVisualize['edges'] = createEdges(dataToVisualize['edges'], resData);
    s.graph.read(dataToVisualize);
    s.refresh(); 
    return (resData);
}