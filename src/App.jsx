import Browse from './components/Browse';
import Login from './components/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const approuter = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/browse',
      element: <Browse />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={approuter} />
    </div>
  );
}

export default App;
