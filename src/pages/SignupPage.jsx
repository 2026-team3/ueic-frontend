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

    const handleSignup = async (e) => {
        e.preventDefault();

        const payload = {
            email: form.email,
            password: form.password,
            passwordConfirm: form.confirmPassword,
            name: form.name,
            phoneNumber: form.phoneNumber,
            preferredMode: form.preferredMode,
            availableTimes: form.availableTimes ? [form.availableTimes] : [],
            targetScore: Number(form.targetScore),
        };

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("회원가입 실패:", result);
                alert(result.message || "회원가입에 실패했습니다.");
                return;
            }

            console.log("회원가입 성공:", result);

            const accessToken = result?.data?.accessToken;
            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
            }

            alert("회원가입이 완료되었습니다.");
            // 예: 홈이나 테스트 페이지로 이동
            // navigate("/test");
        } catch (error) {
            console.error("서버 요청 오류:", error);
            alert("서버와 통신 중 오류가 발생했습니다.");
        }

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
                        <div className="sinput-row">
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
                        </div>
                        <hr />
                        <p className="tag-instruction">팀 매칭을 위한 태그를 입력해주세요</p>

                        <div className="sinput-row">
                            <div className="tag-field">
                                <label htmlFor="availableTimes">1. 가능 시간대</label>
                                <select
                                    id="availableTimes"
                                    name="availableTimes"
                                    value={form.availableTimes}
                                    onChange={handleChange}
                                    className="tag-control"
                                >
                                    <option value="WEEKDAY_MORNING">평일 오전</option>
                                    <option value="WEEKDAY_EVENING">평일 저녁</option>
                                    <option value="WEEKEND_MORNING">주말 오전</option>
                                    <option value="WEEKEND_EVENING">주말 저녁</option>
                                </select>
                            </div>

                            <div className="tag-field">
                                <label htmlFor="targetScore">2. 목표 점수</label>
                                <input
                                    type="text"
                                    id="targetScore"
                                    name="targetScore"
                                    placeholder="ex) 800점"
                                    value={form.targetScore}
                                    onChange={handleChange}
                                    className="tag-control"
                                />
                            </div>
                        </div>
                        <div className="tag-field">
                            <label htmlFor="preferredMode">3. 온/오프라인 여부</label>
                            <div className="radio-group">
                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        name="preferredMode"
                                        value="ONLINE"
                                        checked={form.preferredMode === "ONLINE"}
                                        onChange={handleChange}
                                    />
                                        온라인
                                </label>
                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        name="preferredMode"
                                        value="OFFLINE"
                                        checked={form.preferredMode === "OFFLINE"}
                                        onChange={handleChange}
                                    />
                                        오프라인
                                </label>
                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        name="preferredMode"
                                        value="BOTH"
                                        checked={form.preferredMode === "BOTH"}
                                        onChange={handleChange}
                                    />
                                        둘 다 가능
                                    </label>
                                </div>
                        </div>

                        <button
                            type="submit"
                            className="main-signup-btn"
                            onClick={handleSignup}
                        >
                            가입하기
                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
}