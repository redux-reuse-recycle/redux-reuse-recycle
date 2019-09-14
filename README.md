# Redux Reuse Recycle

Redux Reuse Recycle is a DSL that generates redux boilerplate code in a simple, easy to use syntax that allows front end developers to spend less time writing boilerplate and more time writing features.

## Syntax

```
// Comments:
// I'm Doing this from memory, may be incorrect.

// Variables
number myVariable = 1;

// Actions
action network MY_ACTION(url: "/items", type: GET);

// Flows
flow MY_FLOW_NAME {
  number myFirstField = 1;
  string mySecondField;
  MY_ACTION >> MY_FLOW_NAME.myFirstField;
}
```

## Setup
```
// Installs typescript globally.
> npm install -g typescript

// Installs ts-node globally.
> npm install -g ts-node

// Installs local dependencies.
> npm install
```

## Authors
- Gina Bolognesi
- Jeffrey Doyle
- Gregory Gzik
- Brian Neumann
- Jessica Yang
