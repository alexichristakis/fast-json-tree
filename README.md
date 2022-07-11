# Fast JSON Tree

A virtualized JSON viewer.

It supports the following API:

```tsx
import JSONViewer from './JSONViewer'

const JSON = {
    a: 'hello!',
    b: [0, 1, 2],
    c: {
        d: {
            e: null
        }
    }
}

const theme = {
    caret: "black",
    string: "green",
    number: "orange",
    boolean: "blueviolet",
    null: "crimson",
    undefined: "crimson",
}

// JSX
<JSONViewer theme={theme} value={JSON} />
```

## Demo
1. Clone the repository
2. Add a `SAMPLE_JSON.json` file to `src/`
3. `yarn install`
4. `yarn start`

## Current limitations
* Parses the entire source before rendering. In the future nodes will be lazily evaluated as their parents are expanded. 
* Keyboard navigation is limited (no arrow key support).