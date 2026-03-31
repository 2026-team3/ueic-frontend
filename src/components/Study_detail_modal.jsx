import { useEffect, useState } from "react";
import "../css/Study_detail_modal.css"
import axios from "axios";

function Study_detail_modal({ study, onClose }) {
    if (!study) return null;
    const [members, setMembers] = useState([]);
    const leader = members.find(m => m.role === "LEADER");

    useEffect(() => {
        if (!study) return;

        const fetchMembers = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const res = await axios.get(`/api/studies/${study.studyId}/members`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMembers(res.data.data);
                console.log(res.data.data)
            } catch (error) {
                console.error("멤버 조회 실패", error);
            }

        };

        fetchMembers();
    }, [study.studyId]);

    const handleApply = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            await axios.post(
                `/api/studies/${study.studyId}/apply`,
                null, // Body 없음
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // 신청 완료 후 멤버 재조회
            const res = await axios.get(`/api/studies/${study.studyId}/members`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMembers(res.data.data)
            console.log("토큰:", token);

            alert("신청 완료!");
            onClose();

        } catch (error) {
            console.error(error);
            alert("신청 실패");
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="study-detail-title">상세 정보</h2>

                <div className="modal-box">
                    <h3>{study.studyName}</h3>

                    <div className="info-row">
                        <span className="label">팀장</span>
                        <span className="value">{leader?.userName || "정보 없음"}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">팀원</span>
                        <span className="value">
                            {members
                                .filter(m => m.role === "MEMBER")
                                .map(m => m.userName)
                                .join(", ")
                            }
                        </span>
                    </div>

                    <div className="info-row">
                        <span className="label">목표 점수</span>
                        <span className="value">{study.targetScore} 점</span>
                    </div>

                    <div className="info-row">
                        <span className="label">온/오프라인</span>
                        <span className="value">{study.preferredMode}</span>
                    </div>

                    <div className="info-row">
                        <span className="label">최대 모집 인원</span>
                        <span className="value">{study.maxMembers}명</span>
                    </div>

                    <div className="hashtag">
                        {study.styleTags?.map(tag => (
                            <span key={tag}>#{tag} </span>
                        ))}
                    </div>
                </div>

                <div className="modal-buttons">
                    <button className="cancel-btn" onClick={onClose}>취소</button>
                    <button className="apply-study-btn" onClick={handleApply}>신청</button>
                </div>
            </div>
        </div>
    );
}export default Study_detail_modal;