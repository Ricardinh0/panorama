var fs = require('fs');
var spawn = require('child_process').spawn;

module.exports = function(grunt) {
  
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      combine: {
        files: {
          'dist/css/<%= pkg.name %>-style.css': 'css/*.css'
        }
      },
      minify: {
        expand: true,
        src: ['dist/css/<%= pkg.name %>-style.css', 'dist/css/!<%= pkg.name %>-style.min.css'],
        dest: '',
        ext: '.min.css'
      }
    },
    requirejs: {
      compile: {
        options: {
          almond: false,
          separateCSS: true,
          mainConfigFile: "js/require.config.js",
          out: "dist/js/<%= pkg.name %>.js",
          name: "require.config",
          wrap: false,
          optimize: "none"
        }
      }
    },
    uglify: {
      options: {
        //report: 'gzip',
        preserveComments: 'false',
        mangle: {
          except: []
        }
      },
      dist: {
        src: ['dist/js/<%= pkg.name %>.js'],
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },

    pngquant: {
      files: {
        src: ['dist/img/*.png','dist/img/ui/*.png']
      }
    },

    less: {
      development: {
        files: {
          "css/<%= pkg.name %>.less.css": ["less/pano.ui.less","less/pano.cube.less","less/pano.face.less"]
        }
      }
    },

    exec: {
      clear_css: {
        command: 'rm dist/css/<%= pkg.name %>-style.css'
      },
      clear_less: {
        command: 'rm css/<%= pkg.name %>.less.css'
      },
      clear_js: {
        command: 'rm dist/js/<%= pkg.name %>.js'
      },
      copy_images_to_dist: {
        command: 'rm -r dist/img && cp -r img dist/'
      },
    }

  });

  grunt.task.registerTask('index', 'Copy the index file and prep for distribution', function(){

    var done = this.async();
    var indexData = fs.readFileSync('index.html').toString('utf8');
    var pkg = grunt.file.readJSON('package.json');

    indexData = indexData.split(/\r?\n/).map( function(line){

      if(/stylesheet/i.test(line) && /trade-gothic/i.test(line)) return '\r\n';

      if(/stylesheet/i.test(line) && /pano.face/i.test(line)) return '\r\n';

      if(/stylesheet/i.test(line) && /pano.cube/i.test(line)) return '\r\n';

      if(/stylesheet/i.test(line) && /pano.ui/i.test(line)) return '    <link rel="stylesheet" type="text/css" href="css/'+pkg.name+'-style.min.css">';

      if(/data-main/i.test(line) && /require/i.test(line)) return '    <script type="text/javascript" data-main="js/'+pkg.name+'.min.js" src="require.js"></script>';

      /*
      *   Less
      */
      if(/stylesheet/i.test(line) && /less/i.test(line) || /<!-- LESS -->/i.test(line)) return '\r\n';

      if(/javascript/i.test(line) && /less/i.test(line)) return '\r\n';

      return line;

    }).join('\n');
    //
    if(!fs.existsSync('dist')) fs.mkdir('dist');
    if(!fs.existsSync('dist/img')) fs.mkdir('dist/img');
    //
    fs.writeFileSync('dist/index.html', indexData);
    //
    console.log('File dist/index.html successfully copied, reformatted and published.');
    //
    done();

  });


  grunt.task.registerMultiTask('pngquant', 'Reduce all PNG filesizes', function(){
    
    var done = this.async();
    var _c = 0;
    var _l = this.filesSrc.length;

    this.filesSrc.forEach(function(file){

      var process = spawn('pngquant/pngquant', ['-f', '--ext', '.png', file]);

      process.stderr.on('data', function (data) {
        grunt.fail.warn(data.toString(), 1);
      });

      process.on('close', function(){
        _c++
        if(_c===_l){
          console.log('All PNG files crushed.')
          done();
        }
      });

    })
    
  })

  // Default task.
  grunt.registerTask('default', ['index','less','cssmin','requirejs','uglify','exec:clear_css','exec:clear_less','exec:clear_js','exec:copy_images_to_dist'/*,'pngquant'*/]);
  
};