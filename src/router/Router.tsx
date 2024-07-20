
import { Home } from 'pages';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const router = () =>
  createBrowserRouter(
    createRoutesFromElements([
      <Route
        path="/"
        element={
          <Home nav={0} />
        }
      />
    ])
  );

export default router;
