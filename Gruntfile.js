module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['lib/**/*.js', 'test/*.js'],
      options: {
        jshintrc: "./.jshintrc",
      }
    },
    watch: {
      grunt: {
        files: ['clear', 'Gruntfile.js']
      },
      implementation: {
        files: ['lib/**/*.js'],
        tasks: ['clear', 'jshint', 'mochaTest', 'shell:docs']
      },
      tests: {
        files: ['test/**/*.js'],
        tasks: ['clear', 'jshint', 'mochaTest', 'shell:docs']
      }
    },
    mochaTest: {
      all: {
        src: 'test/*.js'
      }
    },
    shell: {
      docs: {
        command: 'node_modules/.bin/doxx --source lib --target docs'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-clear');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['jshint', 'mochaTest', 'shell:docs']);
};
