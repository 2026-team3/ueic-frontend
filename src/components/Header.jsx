import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";


export default function Header() {
    const navigate = useNavigate();

    return(
        <header className="login-header">
            <div className="logo-box"
                 onClick={() => navigate("/")}
                 style={{ cursor: "pointer" }}
            >
                <img src={logo} alt="로고" className="logo-image"  />
            </div>
            <div className="header-line"></div>
        </header>
    );
}