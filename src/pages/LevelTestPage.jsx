import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LevelTestPage.css"
import Header from "../components/Header";
import InputAnswer from "../components/InputAnswer";

export default function LevelTestPage() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [answers, setAnswers] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");

                const response = await fetch("http://localhost:8080/api/questions/random?countPerType=2", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("문제 조회 실패:", response.status, errorText);
                    throw new Error(`문제 조회 실패 (${response.status})`);
                }

                const result = await response.json();
                console.log("문제 조회 성공:", result);

                setQuestions(result.data || result);
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
            const accessToken = localStorage.getItem("accessToken");

            const payload = {
                userId: Number(localStorage.getItem("userId")),
                answers: Object.entries(answers).map(([questionId, choiceId]) => ({
                    questionId: Number(questionId),
                    choiceId: choiceId
                }))
            };

            const response = await fetch("http://localhost:8080/api/questions/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("제출 실패:", result);
                alert("제출 실패");
                return;
            }

            console.log("제출 성공:", result);
            alert("제출 완료!");
            navigate('/my-test-result');

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