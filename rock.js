#!/usr/bin/env node
var fs = require('fs');
var program = require('commander');
var async = require('async');

var boiler_template = __dirname + '/boilerplate/component';

var extensions = {
  'actions'     : '.js',
  'components'  : '.jsx',
  'constants'   : '.js',
  'stores'      : '.js'
};

function component(c) {
  
  fs.readdir(boiler_template, function(error, directories) {
    if(error || !directories) {
      console.log(__dirname);
      console.log('could not find the component boilerplate');
      return;
    }
    var parentDir = './' + c;
    fs.exists(parentDir, function(exists) {
      if(exists) {
        console.log('component ' + c + ' already exists');
        return;
      }
      
      fs.mkdir(parentDir, function(err) {
        if(err) {
          throw err;
          return;
        }

        async.each(directories, function(dir, next) {
          
          var extension = extensions[dir];
          var readdir   = boiler_template + '/' + dir + '/';
          var path      = readdir + 'boilerplate' + extension;

          fs.readFile(path, 'utf8', function(err, text) {
            if(err) return next(err);

            var convertedText = text.replace(/Boilerplate/g, c.charAt(0).toUpperCase() + c.slice(1)),
                convertedText = convertedText.replace(/boilerplate/g, c.toLowerCase()),
                convertedText = convertedText.replace(/BOILERPLATE/g, c.toUpperCase());

            
            var childDir = './' + c + '/' + dir; 

              fs.mkdir(childDir, function(err) {
                if(err) return next(err);

                var newFile = childDir + '/' + c + extension;
                fs.writeFile(newFile, convertedText, function (err, result) {
                  if(err) return next(err);
                  next();
                });

              });

            });

          });

        });
      });
    },
    function(err) {
      if(err) {
        console.log(err);
      }
      else {
        console.log("read all done");
        console.log(__dirname);
      }
    });
};


 program
   .version('0.0.1')

program
  .command('mc <component>')
  .description('run the given remote command')
  .action(component);


 program.parse(process.argv);