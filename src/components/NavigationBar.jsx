import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import api from "../apis/axiosInstance.jsx";
import "../css/NavigationBar.css";

export default function NavigationBar(){
    const navigate = useNavigate();
    const menuItems = [
        { name: "홈", path: "/mypage" },
        { name: "진단테스트", path: "/level-test" },
        { name: "스터디 참여", path: "my-test-result" },
        { name: "스터디 생성", path: "/make-my-study" },
    ];

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // accessToken 존재 여부로 로그인 상태 판단
        const token = localStorage.getItem("accessToken");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");

            const res = await api.post("/auth/logout");

            if (res.data.success) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("userId");

                window.dispatchEvent(new Event("storage"));

                setIsLoggedIn(false); // 상태 업데이트
                alert(res.data.message);
                navigate("/");
            }
        } catch (error) {
            console.error("로그아웃 실패:", error);
            alert("로그아웃 중 오류가 발생했습니다.");
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="menu">
                    <Link to="/mypage">홈</Link>
                    <Link to="/level-test">진단테스트</Link>
                    <Link to="/my-test-result">스터디 참여</Link>
                    <Link to="/make-my-study">스터디 생성</Link>
                </div>
                {isLoggedIn ? (
                    <button className="logout-btn" onClick={handleLogout}>
                        로그아웃
                    </button>
                ) : (
                    <Link to="/" className="logout-btn">
                        로그인
                    </Link>
                )}
            </div>
        </nav>
    );
}