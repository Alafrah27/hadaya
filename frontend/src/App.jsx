import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import LoadingApp from './ui/LoadingApp';
import ErrorBoundary from './components/ErrorBoundary';
const LoginPage = lazy(() => import('./pages/LoginPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const Contacts = lazy(() => import('./pages/Contacts'));
const Gifts = lazy(() => import('./pages/Gifts'));
const Register = lazy(() => import('./pages/Rigister'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const QRcode = lazy(() => import('./pages/QRcode'));
const ForgetPassword = lazy(() => import('./pages/ForgetPassword'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const SenderDetail = lazy(() => import('./pages/SenderDetail'));
const SuccessPage = lazy(() => import('./pages/SuccessPage'));
const DeclinePage = lazy(() => import('./pages/DeclinePage'));

// https://nrvfdrwf-5173.uks1.devtunnels.ms/
function App() {

  return (
    <LanguageProvider>
      <ErrorBoundary>
        <Router>
          <div className="min-h-screen bg-primary-bg">


            <main className="container mx-auto ">
              <Suspense fallback={<LoadingApp />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/contact" element={<Contacts />} />
                  <Route path="/gifts" element={<Gifts />} />
                  <Route path="/gifts/:slug" element={<SenderDetail />} />
                  <Route path="/gift-qr/:id" element={<QRcode />} />
                  <Route path="/success" element={<SuccessPage />} />
                  <Route path="/decline" element={<DeclinePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/verify-email" element={<VerifyEmail />} />
                  <Route path="/forget-password" element={<ForgetPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </Router>
      </ErrorBoundary>
      <ToastContainer
        position='bottom-right'
      />
    </LanguageProvider>
  );
}



export default App;
