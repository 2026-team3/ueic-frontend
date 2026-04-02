import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LevelTestPage.css"
import Header from "../components/Header";
import InputAnswer from "../components/InputAnswer";
import api from "../apis/axiosInstance.jsx";

export default function LevelTestPage() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [answers, setAnswers] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await api.get("/questions/random?countPerType=2");
                const data = res.data?.data || res.data || [];
                setQuestions(Array.isArray(data) ? data : []);

            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    if (loading) return <div>문제를 불러오는 중입니다...</div>;
    if (error) return <div>{error}</div>;

    //답안 저장
    const handleSelect = (questionId, choiceId) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: choiceId
        }));
    };

    const handleSubmit = async () => {
        if (questions.length !== Object.keys(answers).length) {
            alert("모든 문제를 선택해주세요!");
            return;
        }
        try {
            const payload = {
                userId: Number(localStorage.getItem("userId")),
                answers: Object.entries(answers).map(([questionId, choiceId]) => ({
                    questionId: Number(questionId),
                    choiceId: choiceId
                }))
            };

            const res = await api.post("/questions/submit", payload);
            const result = res.data;

            console.log("제출 성공:", result);
            alert("제출 완료!");
            navigate('/my-test-result', { state: result });

        } catch (error) {
            console.error(error);
            alert("서버 오류");
        }
    };

    return (
        <div className="level-test-page">
            <div className="level-test-container">
                <Header />

                <main className="level-test-content">
                    <h1 className="level-test-title">레벨 테스트</h1>
                    <div className="info-test">테스트 결과에 따라 맞춤 스터디 그룹을 추천해드립니다 (총 10문항)</div>

                    <div className="test-layout">

                        {/* 문제 영역 */}
                        <div className="question-area">
                            {questions.map((question, index) => (
                                <div key={question.id} className="question-card">
                                    <p>
                                        {index + 1}. {question.content}
                                    </p>

                                    <ul>
                                        {question.choices?.map((choice, i) => (
                                            <li key={choice.id}>
                                                ({String.fromCharCode(65 + i)}) {choice.content}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <InputAnswer
                            questions={questions}
                            answers={answers}
                            onSelect={handleSelect}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}