var execBtn = document.getElementById("execute");
var outputElm = document.getElementById('output');
var errorElm = document.getElementById('error');
var commandsElm = document.getElementById('commands');
var dbFileElm = document.getElementById('dbfile');
var savedbElm = document.getElementById('savedb');

// Start the worker in which sql.js will run
var worker = new Worker("js/worker.sql.js");
worker.onerror = error;

// Open a database
worker.postMessage({action:'open'});

// Connect to the HTML element we 'print' to
function print(text) {
    outputElm.innerHTML = text.replace(/\n/g, '<br>');
}
function error(e) {
  console.log(e);
	errorElm.style.height = '2em';
	errorElm.textContent = e.message;
}

function noerror() {
		errorElm.style.height = '0';
}

// Run a command in the database
function execute(commands) {
	tic();
	worker.onmessage = function(event) {
		var results = event.data.results;
		toc("Izvršava SQL");

		tic();
		outputElm.innerHTML = "";
		for (var i=0; i<results.length; i++) {
			outputElm.appendChild(tableCreate(results[i].columns, results[i].values));
		}
		toc("Prikazuje rezultate");
	}
	worker.postMessage({action:'exec', sql:commands});
	outputElm.textContent = "Izvlači rezultate...";
}

// Create an HTML table
var tableCreate = function () {
  function valconcat(vals, tagName) {
    if (vals.length === 0) return '';
    var open = '<'+tagName+'>', close='</'+tagName+'>';
    return open + vals.join(close + open) + close;
  }
  return function (columns, values){
    var tbl  = document.createElement('table');
	tbl.className += ' table table-bordered';
    var html = '<thead>' + valconcat(columns, 'th') + '</thead>';
    var rows = values.map(function(v){ return valconcat(v, 'td'); });
    html += '<tbody>' + valconcat(rows, 'tr') + '</tbody>';
	  tbl.innerHTML = html;
    return tbl;
  }
}();

// Execute the commands when the button is clicked
function execEditorContents () {
	noerror()
	toc("Priprema upit");
	runConversion (editor.getValue() + ';');
	
}
execBtn.addEventListener("click", execEditorContents, true);

// Performance measurement functions
var tictime;
if (!window.performance || !performance.now) {window.performance = {now:Date.now}}
function tic () {tictime = performance.now()}
function toc(msg) {
	var dt = performance.now()-tictime;
	console.log((msg||'toc') + ": " + dt + "ms");
}

// Add syntax highlihjting to the textarea
var editor = CodeMirror.fromTextArea(commandsElm, {
    mode: 'text/x-mysql',
    viewportMargin: Infinity,
    indentWithTabs: true,
    smartIndent: true,
    lineNumbers: true,
    matchBrackets : true,
    autofocus: true,
		extraKeys: {
			"Ctrl-Enter": execEditorContents,
			"Ctrl-S": savedb,
		}
});

// Load a db from a file
dbFileElm.onchange = function() {
	var f = dbFileElm.files[0];
	var r = new FileReader();
	r.onload = function() {
		worker.onmessage = function () {
			toc("Učitavam bazu iz fajla");
			// Show the schema of the loaded database
			editor.setValue("SELECT `name`, `sql`\n  FROM `sqlite_master`\n  WHERE type='table';");
			execEditorContents();
		};
		tic();
		try {
			worker.postMessage({action:'open',buffer:r.result}, [r.result]);
		}
		catch(exception) {
			worker.postMessage({action:'open',buffer:r.result});
		}
	}
	r.readAsArrayBuffer(f);
}

// Save the db to a file
function savedb () {
	worker.onmessage = function(event) {
		toc("Izvozi bazu podataka");
		var arraybuff = event.data.buffer;
		var blob = new Blob([arraybuff]);
		var url = window.URL.createObjectURL(blob);
		window.location = url;
	};
	tic();
	worker.postMessage({action:'export'});
}
function FileHelper()
{}
{
	FileHelper.readStringFromFileAtPath = function(pathOfFileToReadFrom)
	{
		var request = new XMLHttpRequest();
		request.open("GET", pathOfFileToReadFrom, false);
		request.send(null);
		var returnValue = request.responseText;

		return returnValue;
	}
}

function loadDb()
{
var pathOfFileToRead = "baza.sql";
	var contentsOfFileAsString = FileHelper.readStringFromFileAtPath(pathOfFileToRead);

	execute (contentsOfFileAsString + ';');
}
savedbElm.addEventListener("click", savedb, true);



function getXMLHttpRequest()
{
  var xmlhttp;

  try {
    // Firefox, Chrome, IE 7+, Opera 8.0+, Safari
    xmlhttp = new XMLHttpRequest();
  } catch(e) {
    // IE 6 and earlier
    try  { xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); }
    catch(e) { 
	  try { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); }
      catch(e) { alert("Your browser does not support XMLHttpRequest!"); return false; }
    }
  }
  return xmlhttp;
}
 
function runConversion(text) {
		var xmlhttp = getXMLHttpRequest();
  
		if(xmlhttp) { 
			xmlhttp.onreadystatechange=function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				
				    var response = xmlhttp.responseText.split("__SQLINES_MULTI_PART__");
					execute(response[0]);
				}
				//else {execute(text); alert('mod2');}
			}
		
			var params = "source=" + encodeURIComponent(text) + 
						"&source_type=Microsoft SQL Server" +
						"&target_type= MySQL";
					 
			xmlhttp.open("POST","post.php?url=http://sqlines.com/sqlines_run.php", true); 
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.setRequestHeader("Content-length", params.length);
			xmlhttp.setRequestHeader("Connection", "close");
			xmlhttp.send(params);
		}
}
