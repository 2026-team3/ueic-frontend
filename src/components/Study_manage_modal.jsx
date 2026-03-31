import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Study_manage_modal.css";

export default function StudyManageModal({ study, onClose, onUpdateApplications }) {
    const [members, setMembers] = useState([]);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        // 1. 멤버 조회
        const fetchMembers = async () => {
            const res = await axios.get(`/api/studies/${study.studyId}/members`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMembers(res.data.data);
        };

        // 2. 신청자 조회 (팀장만 가능)
        const fetchApplications = async () => {
            try {
                const res = await axios.get(`/api/studies/${study.studyId}/applications`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setApplications(res.data.data);
            } catch (err) {
                console.log("신청자 없음 or 권한 없음");
            }
        };

        fetchMembers();
        if (study.role === "LEADER") {
            fetchApplications();
        }
    }, [study.studyId]);

    // 승인
    const handleApprove = async (studyMemberId) => {
        try {
            const token = localStorage.getItem("accessToken");

            await axios.patch(
                `/api/studies/${study.studyId}/applications/${studyMemberId}/approve`,
                null,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("승인 완료");
            // 모달 내 상태 업데이트
            setApplications(prev => {
                const updated = prev.filter(a => a.studyMemberId !== studyMemberId);

                // 부모 상태는 렌더링 후에 실행
                setTimeout(() => {
                    const hasPending = updated.some(a => a.status === "PENDING");
                    onUpdateApplications(study.studyId, hasPending);
                }, 0);

                return updated;
            });

        } catch (err) {
            console.error("승인 실패", err.response?.data);
            alert("승인 실패");
        }
    };

    // 거절
    const handleReject = async (studyMemberId) => {
        const token = localStorage.getItem("accessToken");

        await axios.patch(
            `/api/studies/${study.studyId}/applications/${studyMemberId}/reject`,
            null,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("거절 완료");
        setApplications(prev => {
            const updated = prev.filter(a => a.studyMemberId !== studyMemberId);
            setTimeout(() => {
                const hasPending = updated.some(a => a.status === "PENDING");
                onUpdateApplications(study.studyId, hasPending);
            }, 0);

            return updated;
        });
    };

    const leader = members.find(m => m.role === "LEADER");
    const memberList = members.filter(m => m.role === "MEMBER");

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                <h2>팀원 관리</h2>

                <div className="modal-box">
                    <h3>{study.studyName}</h3>

                    <div className="member-section">
                        {/* 팀장 */}
                        <div className="member-row">
                            <span className="member-title">팀장</span>
                            <span className="member-name">{leader?.userName}</span>
                        </div>

                        {/* 팀원 */}
                        <div className="member-row">
                            <span className="member-title">팀원</span>
                            <div className="member-list">
                                {memberList.map((m) => (
                                    <span key={m.userId} className="member-name">
                                        {m.userName}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {study.role === "LEADER" && applications.length > 0 && (
                    <div className="sm-application-box">
                        <p className="sm-application-title">신규 신청자</p>

                        {applications.map((app) => (
                            <div key={app.studyMemberId} className="application-item">
                                <span>{app.userName}</span>

                                <div className="sm-btn-group">
                                    <button
                                        className="sm-approve-btn"
                                        onClick={() => handleApprove(app.studyMemberId)}
                                    >
                                        수락
                                    </button>

                                    <button
                                        className="sm-reject-btn"
                                        onClick={() => handleReject(app.studyMemberId)}
                                    >
                                        거절
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="sm-modal-buttons">
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
}