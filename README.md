ExtJSX
======

Proof of Concept JSX Transformer support for ExtJS

Simple modification to the ExtJS class loader.

I intercept the loader and look at the - to be loaded - classname. 
If a part of the classname matches i load the script via JSXTransformer.load, if not normal execuction continues.

How to use
==========

1. Include JSXtransformer.js before extjsx.js, it should be included after ExtJS.
2. Either use a folder structure like "app/react/..." or modify "scope.LAST_CLASS_NAME.indexOf('react') !== -1" in the extjsx.js file.
3. You can use JSX syntax in your "app/react/..." files (or in a custom one).