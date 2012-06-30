/*
 * grunt-yuidocs
 * https://github.com/gcpantazis/grunt-yuidocs
 *
 * Copyright (c) 2012 George Pantazis
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {


	grunt.registerMultiTask( "yuidocs", "Create YUIDocs", function() {

		var Y = require('yuidocjs');

		// This is an asyncronous task.
		var done = this.async();

		var options = { 
			external: { 
				data: 'http://yuilibrary.com/yui/docs/api/data.json' 
			},
			linkNatives: 'true',
			attributesEmit: 'true',
			paths: [this.data.sourcePath],
			outdir: this.data.outputPath,
			port: 3000,
			nocode: false,
			project: { 
				name: 'YUIDoc',
				description: 'YUIDoc documentation tool written in Javascript',
				version: '0.3.14',
				url: 'http://github.com/yui/yuidoc/issues',
				logo: 'http://yuilibrary.com/img/yui-logo.png' 
			} 
		}

		var starttime = (new Date).getTime();
		var json = (new Y.YUIDoc(options)).run();

		options = Y.Project.mix(json, options);

		if (!options.parseOnly) {
			var builder = new Y.DocBuilder(options, json);
			builder.compile(function() {
				var endtime = (new Date).getTime();
				Y.log('Completed in ' + ((endtime - starttime) / 1000) + ' seconds' , 'info', 'yuidoc');
			});
		}

	});
};