import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import AuthProvider from './AuthProvider';
import PrivateRoute from './PrivateRoute';
import { Baseline, Home, Summary } from "./pages";
import ForgetPassword from './pages/Auth/ForgetPassword';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Verify from './pages/Auth/Verify';
import store from './store/store';
import UserLogin from './pages/UserAuth/UserLogin';
import UserRegister from './pages/UserAuth/UserRegister';
import TenderForm from './pages/UserAuth/TenderForm';
import UserVerify from './pages/UserAuth/UserVerify';
import UserDashboard from './pages/UserAuth/UserDashboard';
import UserReview from './pages/UserAuth/UserReview';
import Dashboard from './pages/Dashboard/Dashboard';
import UserCancelReview from './pages/UserAuth/UserCancelReview';
import CompanyProfile from './pages/Dashboard/CompanyProfile';



function App() {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <AuthProvider>
            <ToastContainer />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/baseline' element={<Baseline />} />
              <Route exact path='/summary' element={<Summary />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/userlogin" element={<UserLogin />} />
              <Route exact path="/userregister" element={<UserRegister />} />
              <Route exact path='/userverify' element={<UserVerify />} />
              <Route exact path="/tender" element={<TenderForm />} />
              <Route element={<PrivateRoute />}>
                <Route path="/userdashboard" element={<UserDashboard />} />
                <Route path="/userreview" element={<UserReview />} />
                <Route path="/usercancelreview" element={<UserCancelReview />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<CompanyProfile />} />
              </Route>
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/verify' element={<Verify />} />
              <Route exact path='/forgetpassword' element={<ForgetPassword />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
