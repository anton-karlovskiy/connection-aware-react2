import React, { lazy, Suspense } from 'react';

import './App.css';

const Product = lazy(() => {
  return new Promise(resolve => {
    navigator.connection ? resolve(navigator.connection.effectiveType) : resolve(null);
  }).then(
    effectiveType => {
      console.log('[ProductView] effectiveType => ', effectiveType);
      switch(effectiveType) {
        case '4g':
          return import(/* webpackChunkName: "heavy" */ './components/Heavy');
        case '3g':
        case '2g':
          return import(/* webpackChunkName: "light" */ './components/Light');
        default:
          return import(/* webpackChunkName: "heavy" */ './components/Heavy');
      }
    }
  );
});

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Suspense fallback={<div>Loading...</div>}>
          <Product imageUrl="https://cdn.glitch.com/6d4798ba-e1f4-4d61-8df9-177feb77fae9%2Fbecca-tapert-sY5RjMB1KkE-unsplash.jpg?v=1562850498655" width={500} />
        </Suspense>
      </header>
    </div>
  );
};

export default App;
