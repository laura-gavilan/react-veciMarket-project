import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { AboutUsPage } from './pages/AboutUsPage';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { UsersPage } from './pages/UsersPage';
import { PrivateRoute } from './components/PrivateRoute';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <div>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUsPage />} />
          {/* <Route path="/products" element={<ProductsPage />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />} >
            {/* <Route path="/user" element={<UserProfilePage />}   //RUTA DEL USUARIO
              <Route path='/user/profile' element={<UserDetails />} />
            </Route> */}
            <Route path="/users" element={<UsersPage />} />
            {/* <Route path="/commerce" element={<CommercePage />} /> */}
            {/* 
            <Route path="/user" element={<UserProfilePage />} > RUTA DEL PERFIL DEL COMERCIO
              <Route path='/user/settings' element={<UserSettings />} />
              <Route path='/user/profile' element={<UserDetails />} />
            </Route> */}
          </Route>
        </Routes>

      </main>

      {/* <Footer></Footer> */}


    </div>
  );
};


