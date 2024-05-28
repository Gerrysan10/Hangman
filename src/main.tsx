import React from 'react';
import ReactDOM from 'react-dom'; // Cambia la importación aquí
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Stats from './components/Stats.tsx';
import { StatsProvider } from './components/StatsContext.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/stats',
    element: <Stats />
  }
]);

// Utiliza ReactDOM.createRoot en lugar de ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StatsProvider>
      <RouterProvider router={router} />
    </StatsProvider>
  </React.StrictMode>
);
