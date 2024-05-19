import './Header.css'
import Form from "react-validation/build/form";
import AuthService from '../auth/Services/auth.service';
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
export default function Header() {
    const form = useRef();
    const navigate = useNavigate();

    function handleLogout() {
        AuthService.logout()
        navigate("/login");
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg header">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/dashboard">Dashboard</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/dashboard/preferences">Preferences</a>
                            </li>
                        </ul>
                        <Form onSubmit={handleLogout} ref={form}>
                            <button type="logout" className="btn btn-outline-danger">Logout</button>
                        </Form>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                    </div>
                </div>
            </nav>
        </div>

    )
}
