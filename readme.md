# Node.js Require Enhancer

# Question

How to make an easy require instead of ../../../ ?

# Answer

Use this library, and you could use simple paths relative to the application root, like java & maven

# Installation

```
npm install jrichardsz/nodejs-require-enhancer#master --save
```

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


Instead of use `require('../../../../org/acme/context/Foo.js')` you could use `require('org/acme/context/Foo.js')`

# Sample

First line must be the require of enhancer and after that, you could use **include** instead **require**:

```
require('nodejs-require-enhancer');
```

After that, import your custom modules with:

```
const Foo = include('org/acme/context/Foo.js');
```

If you want to load modules inside test folder:


```
const Foo = include('org/acme/context/FooTest.js');
```

That's all!
