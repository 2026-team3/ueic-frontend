import React, {useState} from "react";
import Header from "../components/Header.jsx";
import InputForm from "../components/InputForm.jsx";
import SInputForm from "../components/SInputForm.jsx";
import "../css/MakeStudyPage.css"

export default function MakeStudyPage(){

    return(
        <div className="make-study-page">
            <div className="make-study-container">
                <Header />

                <main className="make-study-content">
                    <h1 className="make-study-title">스터디 생성</h1>
                    {/*<form className="signup-form" onSubmit={handleSignup}>*/}
                    <form className="make-study-form">
                        <InputForm
                            label="스터디 명"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="ex) duksae@gmail.com"
                            // value={form.email}
                            // onChange={handleChange}
                        />
                        <div className="sinput-row">
                            <SInputForm
                                label="최대 모집인원"
                                id="name"
                                name="name"
                                type="text"
                                placeholder="김덕새"
                                // value={form.name}
                                // onChange={handleChange}
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
                                    // value={form.availableTimes}
                                    // onChange={handleChange}
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
                                    // value={form.targetScore}
                                    // onChange={handleChange}
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
                                        // checked={form.preferredMode === "ONLINE"}
                                        // onChange={handleChange}
                                    />
                                    온라인
                                </label>
                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        name="preferredMode"
                                        value="OFFLINE"
                                        // checked={form.preferredMode === "OFFLINE"}
                                        // onChange={handleChange}
                                    />
                                    오프라인
                                </label>
                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        name="preferredMode"
                                        value="BOTH"
                                        // checked={form.preferredMode === "BOTH"}
                                        // onChange={handleChange}
                                    />
                                    둘 다 가능
                                </label>
                            </div>
                            <div className="tag-field">
                                <label htmlFor="studyStyleDescription">4. 원하는 스터디 스타일을 입력해주세요</label>
                                <textarea
                                    id="studyStyleDescription"
                                    name="studyStyleDescription"
                                    placeholder="ex) 집중 공부 / 공부 인증 등"
                                    // value={form.studyStyleDescription || ""}
                                    // onChange={handleChange}
                                    className="tag-textarea"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="make-study-btn"
                            //onClick={handleSignup}
                        >
                            생성하기
                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
}