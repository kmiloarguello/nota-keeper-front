
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const router = () =>
  createBrowserRouter(
    createRoutesFromElements([
      <Route
        path="/"
        element={
          <div>CA</div>
        }
      />
    ])
  );

export default router;
