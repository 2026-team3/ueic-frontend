import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import axios from "axios";
import "../css/MyStudiesPage.css";

export default function MyStudiesPage(){
    const [studies, setStudies] = useState([]);

    useEffect(() => {
        const fetchMyStudies = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                const res = await axios.get("/api/studies/me/participations", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setStudies(res.data.data);
            } catch (err) {
                console.error("스터디 목록 조회 실패", err);
            }
        };

        fetchMyStudies();
    }, []);

    return(
        <div className="my-studies-list-page">
            <Header />
            <div className="menu-bar">
                <NavigationBar />
            </div>
            <div className="my-studies-container">
                <h1 className="this-page-title">참여 스터디 관리</h1>

                <div className="my-study-card-list">
                    {studies.map((study) => (
                        <div key={study.studyId} className="my-study-card">

                            {/* 역할 뱃지 */}
                            <div className={`my-role-badge ${study.role === "LEADER" ? "leader" : ""}`}>
                                {study.role === "LEADER" ? "팀장" : "팀원"}
                            </div>

                            {/* 스터디 정보 */}
                            <div className="my-study-info">
                                <h3>{study.studyName}</h3>
                                <p>
                                    현재 인원: {study.currentMemberCount}/{study.maxMembers}
                                </p>
                            </div>

                            {/* 버튼 */}
                            {study.role === "LEADER" ? (
                                <div className="my-btn-group">
                                    <button className="my-leave-btn">나가기</button>
                                    <button className="my-delete-btn">삭제</button>
                                </div>
                            ) : (
                                <button className="my-leave-btn">나가기</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}