(function(){
var orgGetPath = Ext.Loader.getPath,
    orgloadScriptFile = Ext.Loader.loadScriptFile,
    transformer = JSXTransformer;

// modified load method from JSXTransformer
function load (url, options) {
  var xhr;
  xhr = window.ActiveXObject ? new window.ActiveXObject('Microsoft.XMLHTTP')
                             : new XMLHttpRequest();

  // Disable async since we need to execute scripts in the order they are in the
  // DOM to mirror normal script loading.
  xhr.open('GET', url, false);
  if ('overrideMimeType' in xhr) {
    xhr.overrideMimeType('text/plain');
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 0 || xhr.status === 200) {
        var responseText = xhr.responseText;

        if(options && options.beforeRun){
          responseText = options.beforeRun(responseText);
        }

        transformer.run(responseText);
      } else {
        throw new Error("Could not load " + url);
      }
      if (options && options.callback) {
        return options.callback(responseText);
      }
    }
  };
  return xhr.send(null);
}

function beforeLoadFn (responseText) {
  return "/** @jsx React.DOM */" + responseText;
}

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
      try {
          load(noCacheUrl, {
            beforeRun: beforeLoadFn,
            callback: function () { onLoad.call(scope); }
          });
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
