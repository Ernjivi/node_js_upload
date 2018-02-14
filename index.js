var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function(req, res){
    if(req.url == '/fileupload'){
        form = formidable.IncomingForm();
        form.parse(req, function(err, fields, files){
            oldPath = files.fileupload.path;
            newPath = './uploads/' + files.fileupload.name;
            fs.rename(oldPath, newPath, function(){
                if(err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('File upload');
            });
        });
    } else{
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="fileupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        res.end();
    }
    
}).listen(8080);