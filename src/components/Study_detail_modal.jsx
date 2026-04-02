import { useEffect, useState } from "react";
import "../css/Study_detail_modal.css"
import api from "../apis/axiosInstance.jsx";

function Study_detail_modal({ study, onClose, setPendingStudies }) {
    if (!study) return null;

    const [members, setMembers] = useState([]);
    const leader = members.find(m => m.role === "LEADER");
    const pending = JSON.parse(localStorage.getItem("pendingStudies") || "[]");
    const isPending = pending.some(p => p.studyId === study.studyId);

    useEffect(() => {
        if (!study) return;

        const fetchMembers = async () => {
            try {
                const res = await api.get(`/studies/${study.studyId}/members`);
                setMembers(res.data.data);

            } catch (error) {
                console.error("멤버 조회 실패", error);
            }
        };
        fetchMembers();
    }, [study]);

    const handleApply = async () => {
        try {
            // 신청
            await api.post(`/studies/${study.studyId}/apply`);

            // 신청 후 멤버 재조회
            const res = await api.get(`/studies/${study.studyId}/members`);
            setMembers(res.data.data);

            // 로컬에 저장 (신청 중인 것도 표시)
            const pending = JSON.parse(localStorage.getItem("pendingStudies") || "[]");
            if (!pending.includes(study.studyId)) {
                const updated = [...pending, study.studyId];
                localStorage.setItem("pendingStudies", JSON.stringify(updated));

                setPendingStudies(updated);
            }

            alert("신청 완료!");
            onClose();

        } catch (error) {
            const code = error.response?.data?.code;

            if (code === "S003") {
                alert("이미 신청한 스터디입니다.");

                const pending = JSON.parse(localStorage.getItem("pendingStudies") || "[]");

                if (!pending.some(p => p.studyId === study.studyId)) {
                    localStorage.setItem(
                        "pendingStudies",
                        JSON.stringify([...pending, study])
                    );
                }s
                onClose();
                return;
            }
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
                    <button className={`apply-study-btn ${isPending ? "pending-detail" : ""}`}
                            onClick={handleApply}
                            disabled={isPending}
                    >
                        {isPending ? "승인 중" : "신청"}
                    </button>
                </div>
            </div>
        </div>
    );
}export default Study_detail_modal