import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Layout, Loading } from './components';
import { usePrepareApp } from './helpers/auth';
import PublicRoute from './hoc/public.route';
import { HomePage, LoginPage, SignUpPage } from './pages';

function App() {
  const { isLoading } = usePrepareApp();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path='/login'
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path='/register'
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
