import React from "react";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import "../css/MainPage.css";

export default function MainPage(){
    const navigate = useNavigate();

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
                                <span className="name">홍길동</span>
                                <span className="email">email@example.com</span>
                            </div>

                            {/* 하단: 세로 정렬 */}
                            <div className="detail-info">
                                <div>
                                    <span>목표 점수</span>
                                    <p>000 점</p>
                                </div>

                                <div>
                                    <span>취약 분야</span>
                                    <p>어휘</p>
                                </div>

                                <div>
                                    <span>학습 방식</span>
                                    <p>온라인</p>
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
                        <div className="study-item">
                            <span>스터디명1</span>
                            <button className="role-btn">팀원</button>
                        </div>

                        <div className="study-item">
                            <span>스터디명2</span>
                            <button className="role-btn">팀장</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}