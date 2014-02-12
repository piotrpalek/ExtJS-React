ExtJSX
======

Proof of Concept JSX Transformer support for ExtJS

Simple modification to the ExtJS class loader.

I intercept the loader and look at the - to be loaded - classname. 
If a part of the classname matches i load the script via JSXTransformer.load, if not normal execuction continues.

How to use
==========

Include JSXtransformer.js before extjsx.js.
Extjsx.js should be included after ExtJS.