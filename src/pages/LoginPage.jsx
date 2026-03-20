import React, {useState} from "react";
import "../css/LoginPage.css";
import logo from "../assets/logo.jpeg";

export default function LoginPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();

        //나중에 API 연결
        console.log("로그인 요청:", form);
    };

    const handleSignup = () => {
        //회원가입 페이지로 이동
        console.log("회원가입 페이지로 이동");
    };

    const handleFindPassword = () => {
        //비밀번호 찾기 페이지로 이동
        console.log("비밀번호 찾기 페이지로 이동");
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <header className="login-header">
                    <div className="logo-box">
                        <img src={logo} alt="로고" className="logo-image"  />
                    </div>
                    <div className="header-line"></div>
                </header>

                <main className="login-content">
                    <h1 className="login-title">로그인</h1>
                    <form className="login-form" onSubmit={handleLogin}>
                        

                        <div className="form-group">
                            <label htmlFor="email">이메일</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="ex) duksae@gmail.com"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">비밀번호</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={form.password}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="find-password-wrap">
                                    <button
                                        type="button"
                                        className="find-password-btn"
                                        onClick={handleFindPassword}
                                    >
                                        비밀번호 찾기
                                    </button>
                                </div>

                                <div className="button-group">
                                    <button
                                        type="button"
                                        className="signup-btn"
                                        onClick={handleSignup}
                                    >
                                        회원가입
                                    </button>
                                    <button type="submit" className="login-btn">
                                        로그인
                                    </button>
                                </div>
                            </form>
                        </main>
                    </div>
            </div>
    );
}