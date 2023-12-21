import './App.css'
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {QueryClient,QueryClientProvider} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import useAuth from './hooks/useAuth';
import { PrivateRoute } from './routes/privateRoute';
import Overview from './pages/Overview';
import Appartment from './pages/Appartment';
import Payments from './pages/Payments';
import AddApartment from './pages/AddApartment';
import AddClient from './pages/AddClient';
import AddPayment from './pages/AddPayment';
import Clients from './pages/Clients';
import EditApartment from './pages/EditApartment';
import EditPayment from './pages/EditPayment';
import { useContext } from 'react';
// import { AuthContext, AuthProvider } from './hooks/useContext';

// import {useAuth} from '../src/hooks/useContext'
const Home = lazy(() => import('./pages/Home'))
const Inscreption = lazy(() => import('./pages/Inscreption'))
function App() {
  const { isLoading, isAuthenticated } = useAuth();
  // const {useAuth,isAuth} = useContext(AuthContext)
  if (isLoading) {
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <div className='w-10 h-10 border-4 border-red-500 rounded-full animate-spin'></div>
      </div>
    );
  }

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      <Suspense fallback={
        <div className='w-screen h-screen flex justify-center items-center'>
          <div className='w-10 h-10 border-4 border-red-500 rounded-full animate-spin'></div>
        </div>
      }>
        
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/inscription' element={<Inscreption />}/>
            <Route 
              path='/dashboard' 
              element={
                <PrivateRoute 
                  authenticated={isAuthenticated}
                  element={<Dashboard/>}
                />
              }
            >
              <Route path="/dashboard" element={<Overview />} />
              <Route path="/dashboard/appartement" element={<Appartment />} />
              <Route path="/dashboard/paiement" element={<Payments />} />
              <Route path="/dashboard/paiement/add" element={<AddPayment />} />
              <Route path="/dashboard/client" element={<Clients />} />
              <Route path="/dashboard/appartement/add" element={<AddApartment />} />
              <Route path="/dashboard/client/add" element={<AddClient />} />
              <Route
                path="/dashboard/appartement/edit/:id"
                element={<EditApartment />}
              />
              <Route
                path="/dashboard/paiement/edit/:id"
                element={<EditPayment />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
      </Suspense>
      </Router>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}

export default App
