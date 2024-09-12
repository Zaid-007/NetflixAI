import { Provider } from 'react-redux';
import Browse from './components/Browse';
import Login from './components/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import appStore from './utils/appStore';
import Error from './components/Error';
import AiSearch from './components/AiSearch';

function App() {
  const approuter = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: '/browse/',
      element: <Browse />,
      errorElement: <Error />,
    },
    {
      path: '/ai-search',
      element: <AiSearch />,
      errorElement: <Error />,
    },
  ]);

  return (
    <Provider store={appStore}>
      <RouterProvider router={approuter} />
    </Provider>
  );
}

export default App;
