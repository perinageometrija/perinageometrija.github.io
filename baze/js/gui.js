var execBtn = document.getElementById("execute");
var outputElm = document.getElementById('output');
var errorElm = document.getElementById('error');
var commandsElm = document.getElementById('commands');
var dbFileElm = document.getElementById('dbfile');
var savedbElm = document.getElementById('savedb');
var pastebin = document.getElementById('save');

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
		if (results != undefined) {
			for (var i=0; i<results.length; i++) {
				outputElm.appendChild(tableCreate(results[i].columns, results[i].values));
			}
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
	execute (editor.getValue() + ';');
	
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

function paste()
{
var text = editor.getValue();
text=text.replace(new RegExp('\r?\n','g'), '<br />');
var form = document.createElement("form");
		    form.setAttribute("method", "post");
		    form.setAttribute("action", "pastebinapi.php");

		        var hiddenField = document.createElement("input");		
		        hiddenField.setAttribute("name", "text");
		        hiddenField.setAttribute("value", text);
		        form.appendChild(hiddenField);
		        document.body.appendChild(form);    // Not entirely sure if this is necessary
				form.setAttribute("target", "_blank");				
		        form.submit();
    // Create our XMLHttpRequest object
   /* var hr = new XMLHttpRequest();
    // Create some variables we need to send to our PHP file
    var url = "pastebinapi.php";
    var vars = "text="+text;
    hr.open("POST", url, true);
    // Set content type header information for sending url encoded variables in the request
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // Access the onreadystatechange event for the XMLHttpRequest object
    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
		    var return_data = hr.responseText;
			document.getElementById("link").innerHTML = return_data;
	    }
    }*/
}
savedbElm.addEventListener("click", savedb, true);
// pastebin.addEventListener("click", paste, true);
