import { Provider } from 'react-redux';
import Browse from './pages/Browse/Browse';
import Login from './pages/Login/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import appStore from './utils/appStore';
import Error from './components/Error';
import AiSearch from './pages/AiSearch/AiSearch';
import MovieInfo from './pages/MovieInfo/MovieInfo';

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
    {
      path: '/title/:id',
      element: <MovieInfo />,
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
