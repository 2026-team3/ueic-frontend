import React from "react";
import logo from "../assets/logo.jpeg";


export default function Header() {
    return(
        <header className="login-header">
            <div className="logo-box">
                <img src={logo} alt="로고" className="logo-image"  />
            </div>
            <div className="header-line"></div>
        </header>
    );
}