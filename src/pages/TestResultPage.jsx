import React from "react";
import Header from "../components/Header";
import "../css/TestResultPage.css";

export default function TestResultPage() {
    return (
        <div className="result-page">
            <Header />
            <div className="result-container">
                <h1 className="result-title">테스트 결과</h1>
                {/* 상단 결과 영역 */}
                <div className="result-top">
                    <div className="score-box">
                        <div className="get-down">
                        <div className="score-row">
                            <p>맞춘 개수</p>
                            <h2 style={{ color: "#0099FF", fontSize:"28px", fontWeight: "800" }}>7 / 10</h2>
                        </div>
                        <div className="score-row">
                            <p>취약 분야</p>
                            <h3 style={{ color: "#0099FF", fontSize:"28px", fontWeight: "700" }}>어휘</h3>
                        </div>
                        </div>
                    </div>

                    <div className="analysis-box">
                        <h3>분야별 진단</h3>
                        <div className="analysis-list">
                            <div>어휘 - 맞춘 개수:</div>
                            <div>문장 삽입 - 맞춘 개수:</div>
                            <div>동의어 찾기 - 맞춘 개수:</div>
                            <div>내용 일치 - 맞춘 개수:</div>
                            <div>문법 - 맞춘 개수:</div>
                        </div>
                    </div>
                </div>

                {/* 스터디 조회 */}
                <h2 className="section-title">스터디 조회</h2>

                <div className="study-section">
                    <div className="study-category">
                        <div className="inner">
                            <span className="tag">취약 파트</span>
                            <div className="study-grid">
                                {Array(5).fill().map((_, i) => (
                                    <StudyCard key={i} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="study-category">
                        <span className="tag">목표 점수 기반</span>
                        <div className="study-grid">
                            {Array(5).fill().map((_, i) => (
                                <StudyCard key={i} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* 하단 버튼 */}
                <div className="bottom-area">
                    <p>원하는 스터디를 찾지 못했나요?</p>
                    <button className="create-btn">스터디 생성하기</button>
                </div>

            </div>
        </div>
    );
}

function StudyCard() {
    return (
        <div className="study-card">
            <div className="card-content">
                <p className="study-name">스터디명</p>
                <p className="study-info">모집 인원: 2 / 6</p>
            </div>
            <button className="apply-btn">신청</button>
        </div>
    );
}