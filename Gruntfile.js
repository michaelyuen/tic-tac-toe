module.exports = function(grunt) {
	grunt.initConfig({
		less: {
			options: {
				compress: true,
				yuicompress: true,
				optimization: 2
			},
			compile: {
				expand: true,
				cwd: 'app/src/assets/less/',
				src: ['*.less', '!**/variables.less', '!**/font-standards.less', '!**/mixins.less'],
				dest: 'app/src/assets/css/',
				ext: '.css'
			}
		},
		bowercopy: {
			options: {
				srcPrefix: 'bower_components'
			},
			css: {
				options: {
					destPrefix: 'app/src/lib/css'
				},
				files: {
					'angular-material/angular-material.min.css': 'angular-material/angular-material.min.css'
				}
			},
			js: {
				options: {
					destPrefix: 'app/src/lib/js'
				},
				files: {
					'angular/angular.min.js': 'angular/angular.min.js',
					'angular-animate/angular-animate.min.js': 'angular-animate/angular-animate.min.js',
					'angular-aria/angular-aria.min.js': 'angular-aria/angular-aria.min.js',
					'angular-ui-router/angular-ui-router.min.js': 'angular-ui-router/release/angular-ui-router.min.js'
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 3000,
					hostname: '*',
					base: 'app/src/',
					livereload: true
				}
			}
		},
		watch: {
			styles: {
				files: [
					'**/*.less'
				],
				tasks: ['less'],
				options: {
					nospawn: true
				}
			},
			all: {
				files: '**/*.html',
				options: {
					livereload: true
				}
			}

		},
		uglify: {
			options: {
				compress: false,
				mangle: false,
				sourceMap: true
			},
			build: {
				files: {
					'app/prod/assets/js/uglify-all/all.min.js': ['app/src/app.js', 'app/src/assets/js/**/*.js', '!**/angular/*', '!**/angular-ui-router/*']
				}
			}
		},
		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true,
				minifyJS: true
			},
			prod: {
				files: {
					'app/production/index.html': 'app/development/index.html',
					'app/production/views/about/about.html': 'app/development/views/about/about.html',
					'app/production/views/work/work.html': 'app/development/views/work/work.html',
					'app/production/views/work/sub/animalfax.html': 'app/development/views/work/sub/animalfax.html',
					'app/production/views/work/sub/logoji-labs.html': 'app/development/views/work/sub/logoji-labs.html',
					'app/production/views/work/sub/printaire.html': 'app/development/views/work/sub/printaire.html',
					'app/production/views/work/sub/spur.html': 'app/development/views/work/sub/spur.html',
					'app/production/views/contact/contact.html': 'app/development/views/contact/contact.html',
					'app/production/views/blog/blog.html': 'app/development/views/blog/blog.html'
				}
			}
		},
		copy: {
			prod: {
				cwd: 'app/src/assets',
				src: ['css/*', 'fonts/*', 'img/*'],
				dest: 'app/prod/assets',
				expand: true
			}
		},
		compress: {
			prod: {
				options: {
					mode: 'gzip'
				},
				cwd: 'app/prod',
				src: ['assets/css/*.css', 'assets/js/uglify-all/*.js', 'views/**/*.html', 'index.html'],
				dest: 'app/production',
				expand: true,
				ext: '.gz'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-bowercopy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.registerTask('default', ['bowercopy', 'connect', 'watch']);
	grunt.registerTask('uglify-all', ['uglify']);
	grunt.registerTask('htmlmin-all', ['htmlmin']);
	grunt.registerTask('compress-all', ['compress']);

	// Automate everything for production
	// TODO: update copy to copy over libs
	grunt.registerTask('prod', ['copy', 'uglify', 'htmlmin', 'compress']);
};