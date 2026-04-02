import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
// import {fetchWithAuth} from "../apis/fetchWithAuth";
import api from "../apis/axiosInstance.jsx";
import Header from "../components/Header.jsx";
import InputForm from "../components/InputForm.jsx";
import SInputForm from "../components/SInputForm.jsx";
import "../css/MakeStudyPage.css"

export default function MakeStudyPage(){
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            alert("로그인이 필요합니다.");
            window.location.href = "/";
        }
    }, []);

    const [form, setForm] = useState({
        studyName: "",
        preferredMode: "ONLINE",
        maxMembers: "",
        targetScore: "",
        availableTimes: "WEEKDAY_MORNING",
        studyStyleDescription: "",
        weakType: "SYNONYM"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTimeChange = (e) => {
        setForm((prev) => ({
            ...prev,
            availableTimes: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({
            ...form,
            availableTimes: [form.availableTimes],
            maxMembers: Number(form.maxMembers),
            targetScore: Number(form.targetScore),
        });

        try {
            const res = await api.post("/studies", {
                ...form,
                availableTimes: [form.availableTimes],
                maxMembers: Number(form.maxMembers),
                targetScore: Number(form.targetScore),
                }
            );
            alert("스터디 생성 완료!");
            navigate("/mypage");

        } catch (error) {
            console.error(error);
            alert("에러 발생");
        }
    };

    return(
        <div className="make-study-page">
            <div className="make-study-container">
                <Header />

                <main className="make-study-content">
                    <h1 className="make-study-title">스터디 생성</h1>
                    <form className="make-study-form" onSubmit={handleSubmit}>
                        <InputForm
                            label="스터디 명"
                            id="studyName"
                            name="studyName"
                            type="text"
                            value={form.studyName}
                            onChange={handleChange}
                        />
                        <div className="tag-field-make-std">
                            <div className="left-group">
                                <label htmlFor="preferredMode">온/오프라인 여부</label>
                                <div className="radio-group">
                                    <label className="radio-option">
                                        <input
                                            type="radio"
                                            name="preferredMode"
                                            value="ONLINE"
                                            checked={form.preferredMode === "ONLINE"}
                                            onChange={handleChange}/>
                                        온라인
                                    </label>
                                    <label className="radio-option">
                                        <input type="radio"
                                               name="preferredMode"
                                               value="OFFLINE"
                                               checked={form.preferredMode === "OFFLINE"}
                                               onChange={handleChange} />
                                        오프라인
                                    </label>
                                    <label className="radio-option">
                                        <input type="radio"
                                               name="preferredMode"
                                               value="BOTH"
                                               checked={form.preferredMode === "BOTH"}
                                               onChange={handleChange} />
                                        둘 다
                                    </label>
                                </div>
                            </div>
                            <div className="right-group">
                                <SInputForm
                                    label="최대 모집인원"
                                    id="maxMembers"
                                    name="maxMembers"
                                    type="text"
                                    value={form.maxMembers}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="tag-field">
                            <label htmlFor="studyStyleDescription">원하는 스터디 스타일을 입력해주세요</label>
                            <textarea
                                id="studyStyleDescription"
                                name="studyStyleDescription"
                                placeholder="ex) 집중 공부 / 공부 인증 등"
                                value={form.studyStyleDescription}
                                onChange={handleChange}
                                className="tag-textarea"
                            />
                        </div>
                        <hr />
                        <p className="tag-instruction">팀 매칭을 위한 태그를 입력해주세요</p>
                        <div className="sinput-row">
                            <div className="tag-field">
                                <label htmlFor="availableTimes">1. 스터디 시간대</label>
                                <select
                                    id="availableTimes"
                                    name="availableTimes"
                                    value={form.availableTimes}
                                    onChange={handleTimeChange}
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
                        <button
                            type="submit"
                            className="make-study-btn"
                        >
                            생성하기
                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
}