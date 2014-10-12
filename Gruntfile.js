module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['src/**/*.js', 'tests/*.js'],
      options: {
        jshintrc: "./.jshintrc",
      }
    },
    watch: {
      grunt: {
        files: ['clear', 'Gruntfile.js']
      },
      implementation: {
        files: ['src/**/*.js'],
        tasks: ['clear', 'jshint', 'mochaTest', 'shell:docs']
      },
      tests: {
        files: ['tests/**/*.js'],
        tasks: ['clear', 'jshint', 'mochaTest', 'shell:docs']
      }
    },
    mochaTest: {
      all: {
        src: 'tests/*.js'
      }
    },
    shell: {
      docs: {
        command: 'node_modules/.bin/doxx --source src --target docs'
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
