# Node.js Require Enhancer

# Installation

```
npm install nodejs-require-enhancer --save
```

# Question 

How to make node.js require absolute instead of relative ?

# Answer

Use this library, and you could use simple absolute paths relative to the application root

# Usage

If you have this folder structure
```
├── package.json
└── src
    ├── main
    │   ├── 
    │   └── org
    │       └── acme
    │           ├── context
    │           │   └── Foo.js
    │           ├── core
    │           │   ├── Bar.js
    ├── test
    │   ├── 
    │   └── org
    │       └── acme
    │           ├── context
    │           │   └── FooTest.js
    │           ├── core
    │           │   ├── BarTest.js
    
```


Instead of use `require('../../../../org/acme/context/Foo.js')` you could use `include('org/acme/context/Foo.js')`

# Sample

First line must be the require of enhancer and after that, you could use **include** instead **require**:

```
const include = require('nodejs-require-enhancer');
const Foo = include('org/acme/context/Foo.js');
```

If you want to load modules inside test folder:


```
const include = require('nodejs-require-enhancer');
const Foo = include('org/acme/context/FooTest.js','test');
```

# Disable maven structure

As you can see this library needs the src/main and src/test folders. If you want to use it without this structure, use the following code:

```
const include = require('nodejs-require-enhancer', null, false);
const Foo = include('/my/own/structure/Foo.js','test');
```
