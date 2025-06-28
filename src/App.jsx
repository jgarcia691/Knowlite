import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import HeroSection from './components/landing/HeroSection';
import BenefitsSection from './components/landing/BenefitsSection';
import ServicesSection from './components/landing/ServicesSection';
import CallToAction from './components/landing/CallToAction';
import Footer from './components/common/Footer';
import LoginPage from './components/auth/LoginPage';
import SignUpPage from './components/auth/SignUpPage';
import UploadPage from './components/upload/UploadPage';
import ProfilePage from './components/auth/ProfilePage';
import './App.css'

function Landing() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BenefitsSection />
      <ServicesSection />
      <CallToAction />
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
