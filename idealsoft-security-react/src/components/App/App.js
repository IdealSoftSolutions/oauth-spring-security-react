import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Preferences from '../Preferences/Preferences';
import Login from '../auth/Login/Login';
import Home from '../Home/Home';
import AuthorizeApp from '../auth/Services/AuthorizeApp';
import OAuthPopup from '../auth/Services/OAuth2Popup'
import PrivateRoutes from '../Routes/PrivateRoutes'
import UsersNotFound from '../Home/UsersNotFound';
import Header from '../Header/Header';
import Footer from '../footer/Footer';


export default function App() {
    return (
        <div className='wrapper'>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/authorize' element={<AuthorizeApp />} />
                    <Route path='/' element={<Login />} />
                    <Route path='/callback' element={<OAuthPopup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/dashboard' element={<PrivateRoutes />} >
                        <Route path='' element={<Home />} />
                        <Route path='preferences' element={<Preferences />} />
                    </Route>
                    <Route path='*' Component={UsersNotFound} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    )
}
