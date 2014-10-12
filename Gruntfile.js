module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['./*.js', 'tests/*.js'],
      options: {
        jshintrc: "./.jshintrc",
      }
    },
    watch: {
      grunt: {
        files: ['clear', 'Gruntfile.js']
      },
      implementation: {
        files: ['index.js'],
        tasks: ['clear', 'jshint', 'mochaTest']
      },
      tests: {
        files: ['tests/**/*.js'],
        tasks: ['clear', 'jshint', 'mochaTest']
      }
    },
    mochaTest: {
      all: {
        src: 'tests/*.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-clear');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['jshint', 'mochaTest']);
};
