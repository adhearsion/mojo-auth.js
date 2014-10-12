module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['./*.js'],
      options: {
        jshintrc: "./.jshintrc",
      }
    },
    intern: {
      unit: {
        options: {
          runType: 'client',
          config: 'tests/intern'
        }
      }
    },
    watch: {
      clear: {
        files: ['*'],
        tasks: ['clear']
      },
      grunt: {
        files: ['Gruntfile.js']
      },
      implementation: {
        files: ['index.js'],
        tasks: ['jshint', 'intern:unit']
      },
      tests: {
        files: ['tests/**/*.js'],
        tasks: ['jshint', 'intern:unit']
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-clear');
  grunt.loadNpmTasks('intern');

  grunt.registerTask('default', ['jshint', 'intern']);
};
