const gulp = require('gulp');
const Q = require('q');
var exec = require('gulp-exec');

var cordovaPlugins = [
    'cordova-plugin-whitelist',
    'cordova-plugin-device',
    'cordova-plugin-splashscreen',
    'cordova-plugin-ionic-webview',
    'cordova-plugin-ionic-keyboard',
    'cordova-plugin-android-permissions',
    'cordova.plugins.diagnostic'
  ];
  // can define this in some config file
  /*
  var config = require('ionic.config');
  var .cordovaPlugins = config.cordovaPlugins
  */
  
  gulp.task('installCordovaPlugins', function() {
    var d = Q.defer();
    // execute ionic plugin add for each of the plugins
    var addPromises = cordovaPlugins.map(function(plugin) {
        console.log(plugin);
      return exec('ionic cordova plugin add '+plugin);
    });
    // wait for all shell actions to complete
    Q.all(addPromises).then(function() {
      d.resolve();
    });
    return d.promise;
  });
  
  gulp.task('uninstallCordovaPlugins', function() {
    var d = Q.defer();
    // fetch list of all installed plugins
    var installedPlugins = require('./plugins/android.json').installed_plugins;
    // execute ionic plugin rm for each installed plugin
    var rmPromises = [];
    for(var plugin in installedPlugins) {
      rmPromises.push(exec('ionic cordova plugin rm '+plugin));
    };
    // wait for all shell actions to complete
    Q.all(rmPromises).then(function() {
      d.resolve();
    });
    return d.promise;
  });