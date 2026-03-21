import React, {useState} from "react";
import InputForm from "../components/InputForm.jsx";
import SInputForm from "../components/SInputForm.jsx";
import Header from "../components/Header.jsx";
import "../css/SignupPage.css";

export default function SignupPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        phoneNumber: "",
        preferredMode: "",
        availableTimes: "",
        targetScore: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSignup = () => {
        //테스트 페이지로 이동
        console.log("테스트 페이지로 이동");
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <Header />

                <main className="signup-content">
                    <h1 className="signup-title">회원가입</h1>
                    <form className="signup-form" onSubmit={handleSignup}>
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
                        <InputForm
                            label="비밀번호 확인"
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="비밀번호를 다시 입력하세요"
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />
                        <SInputForm
                            label="이름"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="김덕새"
                            value={form.name}
                            onChange={handleChange}
                        />
                        <SInputForm
                            label="전화번호"
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            placeholder="01012345678"
                            value={form.phoneNumber}
                            onChange={handleChange}
                        />

                            <button
                                type="button"
                                className="signup-btn"
                                onClick={handleSignup}
                            >
                                회원가입
                            </button>
                    </form>
                </main>
            </div>
        </div>
    );
}