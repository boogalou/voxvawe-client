import React from 'react';
import { withProviders } from 'app/providers/with-providers';
import { RouterProvider } from 'react-router';
import { router } from 'pages/router';

let counter = 0;
function App() {

  console.log('App количество рендеров: ', counter++);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default withProviders(App);
