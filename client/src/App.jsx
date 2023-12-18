import './App.css'
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {QueryClient,QueryClientProvider} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import useAuth from './hooks/useAuth';
import { PrivateRoute } from './routes/privateRoute';
const Home = lazy(() => import('./pages/Home'))
const Inscreption = lazy(() => import('./pages/Inscreption'))
function App() {
  const { isLoading, isAuthenticated } = useAuth();
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
                element={<Profile/>}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      </Router>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}

export default App
