import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import axios from "axios";
import api from "../apis/axiosInstance.jsx";
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
                console.log(res.data.data);
                console.log("token:", token);

            } catch (err) {
                console.error("스터디 목록 조회 실패", err);
            }
        };
        fetchMyStudies();
    }, []);

    //스터디 나가기
    const handleLeave =async (studyId, role) => {
        try {
            const token = localStorage.getItem("accessToken");
            const res = await api.patch(`/studies/${studyId}/leave`);
            alert(res.data.data);


            setStudies((prev) => prev.filter((s) => s.studyId !== studyId));
        } catch(err) {
            console.error("스터디 나가기 실패:", err.response?.data || err);
            alert(err.response?.data?.message || "스터디 나가기 실패");

        }
    };

    // 스터디 삭제 (팀장만)
    const handleDelete = async (studyId) => {
        if (!window.confirm("정말 스터디를 삭제하시겠습니까?")) return;

        try {
            const token = localStorage.getItem("accessToken");
            const res = await axios.delete(`/api/studies/${studyId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert(res.data.data);
            setStudies((prev) => prev.filter((s) => s.studyId !== studyId));
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "스터디 삭제 실패");
        }
    };


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
                                <button
                                    className="my-delete-btn"
                                    onClick={()=>handleDelete(study.studyId)}
                                >
                                    삭제
                                </button>
                            ) : (
                                <button
                                    className="my-leave-btn"
                                    onClick={()=> handleLeave(study.studyId, study.role)}
                                >
                                    나가기
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}