# React Address Book

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

After installing dependencies (`npm install`) in the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

## FAQ

### Why CRA and not Next.js?

[Next.js](https://nextjs.org/) might be a better choice for a real project, as it gives several features for free: SSR, SSG, directory-based routing, code-splitting, etc. CRA is IMO better suited for proving my good understanding of React concepts, such as hand-made routing.

### What do I use for managing state?

I chose React's [Context API](https://reactjs.org/docs/context.html), but it could also be replaced with a state-management library, like [Redux](https://redux.js.org/).

### What is the styling setup?

I went for [CSS Modules](https://github.com/css-modules/css-modules) + [SASS/SCSS](https://sass-lang.com/documentation/syntax#scss) preprocessor. CSS-in-JS would be also an alternative, with [styled-components](https://styled-components.com/) or [Emotion](https://emotion.sh/).

### How did I implement infinite scrolling?

With help of [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).
