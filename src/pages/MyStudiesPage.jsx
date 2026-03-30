import react from "react";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import "../css/MyStudiesPage.css";

export default function MyStudiesPage(){
    return(
        <div className="my-studies-list-page">
            <Header />
            <div className="menu-bar">
                <NavigationBar />
            </div>
            <div className="my-studies-container">
                <h1 className="this-page-title">참여 스터디 관리</h1>

                <div className="my-study-card-list">
                    {/* 카드 1 */}
                    <div className="my-study-card">
                        <div className="my-role-badge">팀원</div>
                        <div className="my-study-info">
                            <h3>스터디명1</h3>
                            <p>현재 인원: 5/5</p>
                        </div>
                        <button className="my-leave-btn">나가기</button>
                    </div>

                    {/* 카드 2 */}
                    <div className="my-study-card">
                        <div className="my-role-badge leader">팀장</div>
                        <div className="my-study-info">
                            <h3>스터디명2</h3>
                            <p>현재 인원: 4/5</p>
                        </div>
                        <div className="my-btn-group">
                            <button className="my-leave-btn">나가기</button>
                            <button className="my-delete-btn">삭제</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}