import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/MainPage.css";
import Study_manage_modal from "../components/Study_manage_modal";

export default function MainPage(){
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [studies, setStudies] = useState([]);
    const [selectedStudy, setSelectedStudy] = useState(null);
    const [hasNewApplications, setHasNewApplications] = useState({});

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                const res = await axios.get("/api/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUserInfo(res.data.data);
            } catch (err) {
                console.error("유저 정보 조회 실패", err);
            }
        };
        const fetchStudies = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                const res = await axios.get("/api/studies/me/participations", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(res.data.data);
                setStudies(res.data.data);

                res.data.data.forEach(study => {
                    if (study.role === "LEADER") {
                        fetchApplications(study.studyId);
                    }
                });
            } catch (err) {
                console.error("스터디 목록 조회 실패", err);
            }
        };

        const fetchApplications = async (studyId) => {
            try {
                const token = localStorage.getItem("accessToken");

                const res = await axios.get(`/api/studies/${studyId}/applications`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const hasPending = res.data.data.some(app => app.status === "PENDING");

                setHasNewApplications(prev => ({
                    ...prev,
                    [studyId]: hasPending
                }));

            } catch (err) {
                console.error("신청 목록 조회 실패", err);
            }
        };

        fetchUserInfo();
        fetchStudies();
    }, []);

    return(
        <div className="main-page">
            <Header />
            <div className="menu-bar">
                <NavigationBar />
            </div>
            <div className="main-container">
                {/* 내 정보 */}
                <div className="my-info-box">
                    <h2>내 정보</h2>

                    <div className="profile-card">
                        <div className="profile-info">
                            {/* 상단: 이름 + 이메일 */}
                            <div className="top-info">
                                <span className="name"> {userInfo?.name || "이름"}</span>
                                <span className="email">{userInfo?.email || "이메일"}</span>
                            </div>

                            {/* 하단: 세로 정렬 */}
                            <div className="detail-info">
                                <div>
                                    <span>목표 점수</span>
                                    <p>{userInfo?.targetScore || 0} 점</p>
                                </div>

                                <div>
                                    <span>취약 분야</span>
                                    <p>{userInfo?.weakType === "SYNONYM" ? "어휘" : userInfo?.weakType}</p>
                                </div>

                                <div>
                                    <span>학습 방식</span>
                                    <p>{userInfo?.preferredMode === "ONLINE" ? "온라인" : "오프라인"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 참여 스터디 */}
                <div className="study-box">
                    <div className="study-header">
                        <h2>참여 스터디</h2>
                        <span className="manage-btn"
                              onClick={() => navigate("/my-studies-list") }>
                            관리</span>
                    </div>

                    <div className="study-list">
                        {studies.map((study) => (
                            <div
                                key={study.studyId}
                                className="study-item"
                                onClick={()=> setSelectedStudy(study)}
                            >
                                {/* 왼쪽 */}
                                <div className="study-left">
                                    <span>{study.studyName}</span>

                                    {study.role === "LEADER" && hasNewApplications[study.studyId] && (
                                        <span className="new-badge">신규 신청자</span>
                                    )}
                                </div>

                                {/* 오른쪽 */}
                                <button className="role-btn">
                                    {study.role === "LEADER" ? "팀장" : "팀원"}
                                </button>
                            </div>

                        ))}
                    </div>
                    {selectedStudy && (
                        <Study_manage_modal
                            study={selectedStudy}
                            onClose={() => setSelectedStudy(null)}
                            onUpdateApplications={(studyId, hasPending) => {
                                setHasNewApplications(prev => ({
                                    ...prev,
                                    [studyId]: hasPending
                                }));
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}