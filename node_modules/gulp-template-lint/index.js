var Stream = require('stream');
var gutil = require('gulp-util');

var TemplateLint = require('template-lint');
var Linter = TemplateLint.Linter;
const defaultRules = TemplateLint.DefaultRules;

module.exports = function(rules, reporter) {
       
    if (!rules)
        rules = defaultRules;
            
    if(!reporter)
        reporter = (error, file)=>{            
             gutil.log(`WARNING: ${error.message} Ln ${error.line} Col ${error.column}`, file);
        }
          
    var linter = new Linter(rules);
   
    var stream = new Stream.Transform({objectMode: true});
    stream._transform = function(file, encoding, cb) {
        // When null just pass through
        if (file.isNull()) {
            this.push(file);
            cb();
            return;
        }   
         
        var pathshort = undefined;
          
        if(file.path !=null && file.cwd != null)  
            pathshort = file.path.substring(file.cwd.length, file.path.Length);
        
        var html = String(file.contents); 
        var self = this;
        
        linter
            .lint(html, pathshort)        
            .then((errors) => {           
                errors.forEach((error) => {reporter(error,pathshort)});
            })
            .then(() => {
                self.push(file);              
                cb(null, file) });
    };
    return stream;
};