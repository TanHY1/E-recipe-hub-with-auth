import {Box} from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import Recipes from './pages/Recipes';
import About from './pages/About';
import RecipeDetail from './components/RecipeDetail';
// import RecipeForm from './components/RecipeForm';
import Navbar from './components/Navbar';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoadingSpinner from './components/LoadingSpinner';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';


function App() {
  const {isCheckingAuth, checkAuth, isAuthenticated, user}=useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  console.log("isAuthenticated", isAuthenticated);
  console.log("user", user);

  return (
    <Box minH="100vh">
          <Navbar />
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recipes" element={<Recipes />} /> 
              <Route path="/about" element={<About />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/verify-email" element={<EmailVerificationPage/>}/>
              <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
              <Route path="/reset-password/:token" element={<ResetPasswordPage />}/>
              {/* <Route path="/add-recipe" element={<RecipeForm />} />
              <Route path="/edit-recipe/:id" element={<RecipeForm />} /> */}
              <Route path='*' element={<Navigate to="/" />}/>
          </Routes>
    </Box>
  );
}
 

export default App;
