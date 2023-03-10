# Node.js Require Enhancer

# Question

How to make an easy require instead of ../../../ ?

# Answer

Use this library, and you could use simple paths relative to the application root, like java & maven

# Installation

```
npm install jrichardsz/nodejs-require-enhancer --save
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

# Sample

```js
const include = require('nodejs-require-enhancer').include;
const Foo = include('/src/main/org/acme/context/Foo.js');
```

That's all!


# Note

- This is not designed for use in libraries. Only in the root project.
- Don't tested on windows!

## Contributors

<table>
  <tbody>
    <td>
      <img src="https://avatars0.githubusercontent.com/u/3322836?s=460&v=4" width="100px;"/>
      <br />
      <label><a href="http://jrichardsz.github.io/">JRichardsz</a></label>
      <br />
    </td>
  </tbody>
</table>