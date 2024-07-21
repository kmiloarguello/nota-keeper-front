
import { Home, NewNote } from 'pages';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const router = () =>
  createBrowserRouter(
    createRoutesFromElements([
      <Route
        path="/"
        element={
          <Home nav={0} />
        }
      />,
      <Route
        path="/new"
        element={
          <NewNote />
        }
      />,
    ])
  );

export default router;
