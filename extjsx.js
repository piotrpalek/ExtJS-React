(function(){
var orgGetPath = Ext.Loader.getPath,
    orgloadScriptFile = Ext.Loader.loadScriptFile;

Ext.Loader.getPath = function (className) {
  this.LAST_CLASS_NAME = className;
  return orgGetPath.call(this, className);
};

Ext.Loader.loadScriptFile = function (url, onLoad, onError, scope, synchronous) {
  if (scope.isFileLoaded[url]) {
      return Ext.Loader;
  }

  var config = Ext.Loader.getConfig(),
      noCacheUrl = url + (config.disableCaching ? ('?' + config.disableCachingParam + '=' + Ext.Date.now()) : ''),
      isCrossOriginRestricted = false,
      xhr, status, onScriptError,
      debugSourceURL = "";

  scope = scope || Ext.Loader;

  Ext.Loader.isLoading = true;

  if(scope.LAST_CLASS_NAME.indexOf('react') !== -1){
      var transformer = JSXTransformer;
      try {
          transformer.load(noCacheUrl, function () {onLoad.call(scope); });
      }
      catch(e){
          onError.call(scope);
      }
  }
  else {
    orgloadScriptFile.call(this, url, onLoad, onError, scope, synchronous);
  }
};  
})()
