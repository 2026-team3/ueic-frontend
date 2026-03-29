import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Study_detail_modal from '../components/Study_detail_modal.jsx'
import "../css/TestResultPage.css";

export default function TestResultPage() {
    const [weakStudies, setWeakStudies] = useState([]);
    const [targetStudies, setTargetStudies] = useState([]);
    const [selectedStudy, setSelectedStudy] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const location = useLocation();
    const result = location.state;

    const weakTypeMap = {
        SYNONYM: "동의어 찾기",
        GRAMMAR: "문법",
        VOCABULARY: "어휘",
        CONTENT_MATCH: "내용 일치",
        SENTENCE_INSERT: "문장 삽입"
    };
    console.log(result.correctCountByType);

    const convertWeakType = (type) => weakTypeMap[type] || type;

    useEffect(() => {
        const userId = 1;
        const token = localStorage.getItem("accessToken");

        const config = token
            ? { headers: { Authorization: `Bearer ${token}` } }
            : {};

        axios.get(`/api/matches/weak-type/${userId}`, config)
            .then(res => setWeakStudies(res.data))
            .catch(err => console.error("weak error:", err));

        axios.get(`/api/matches/target-score/${userId}`, config)
            .then(res => setTargetStudies(res.data))
            .catch(err => console.error("target error:", err));

    }, []);

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
                            <h2 style={{ color: "#0099FF", fontSize:"28px", fontWeight: "800" }}>{result?.correctCount} / {result?.totalCount}</h2>
                        </div>
                        <div className="score-row">
                            <p>취약 분야</p>
                            <h3 style={{ color: "#0099FF", fontSize:"28px", fontWeight: "700" }}>{convertWeakType(result?.weakType)}</h3>
                        </div>
                        </div>
                    </div>

                    <div className="analysis-box">
                        <h3>분야별 진단</h3>
                        <div className="analysis-list">
                            {Object.entries(result?.correctCountByType || {}).map(([type, count]) => (
                                <div key={type}>
                                    {type} - 맞춘 개수: {count}
                                </div>
                            ))}
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
                                {weakStudies.map((study) => (
                                    <StudyCard key={study.studyId} study={study}
                                        onClick={()=> {
                                            setSelectedStudy(study);
                                            setIsModalOpen(true);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="study-category">
                        <span className="tag">목표 점수</span>
                        <div className="study-grid">
                            {targetStudies.map((study) => (
                                <StudyCard key={study.studyId} study={study}
                                           onClick={()=> {
                                               setSelectedStudy(study);
                                               setIsModalOpen(true);
                                           }}
                                />
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
            {isModalOpen && (
                <Study_detail_modal
                    study={selectedStudy}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}


function StudyCard({ study, onClick }) {
    return (
        <div className="study-card" onClick={onClick}>
            <div className="card-content">
                <p className="study-name">{study.studyName}</p>
            </div>
            <div className="card-bottom">
                <p className="study-info">
                    모집 인원: {study.currentMemberCount} / {study.maxMembers}
                </p>
                <button className="apply-btn"
                        onClick={(e) => {
                            e.stopPropagation(); // 카드 클릭 막기
                            // 신청 로직
                        }}
                >
                    신청
                </button>
            </div>
        </div>
    );

}

