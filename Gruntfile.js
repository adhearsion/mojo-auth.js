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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('intern');

  grunt.registerTask('default', ['jshint', 'intern']);
};
