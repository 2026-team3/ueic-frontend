import "../css/Study_detail_modal.css"

function Study_detail_modal({ study, onClose }) {
    if (!study) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>상세 정보</h2>

                <div className="modal-box">
                    <h3>{study.studyName}</h3>

                    <p><b>팀장</b> {study.leaderName}</p>
                    <p><b>목표 점수</b> {study.targetScore} 점</p>
                    <p><b>온/오프라인</b> {study.preferredMode}</p>
                    <p><b>최대 모집 인원</b> {study.maxMembers}명</p>

                    <p><b>해시태그</b></p>
                    <div>
                        {study.styleTags?.map(tag => (
                            <span key={tag}>#{tag} </span>
                        ))}
                    </div>
                </div>

                <div className="modal-buttons">
                    <button onClick={onClose}>취소</button>
                    <button className="apply-btn">신청</button>
                </div>
            </div>
        </div>
    );
}export default Study_detail_modal;