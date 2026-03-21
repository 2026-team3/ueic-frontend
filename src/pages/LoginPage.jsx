import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm.jsx";
import Header from "../components/Header.jsx";
import "../css/LoginPage.css";

export default function LoginPage() {
    const navigate = useNavigate();
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
        navigate("/signup");
    };

    const handleFindPassword = () => {
        //비밀번호 찾기 페이지로 이동
        console.log("비밀번호 찾기 페이지로 이동");
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <Header />

                <main className="login-content">
                    <h1 className="login-title">로그인</h1>
                    <form className="login-form" onSubmit={handleLogin}>
                        <InputForm
                            label="이메일"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="ex) duksae@gmail.com"
                            value={form.email}
                            onChange={handleChange}
                        />

                        <InputForm
                            label="비밀번호"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            value={form.password}
                            onChange={handleChange}
                        />

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