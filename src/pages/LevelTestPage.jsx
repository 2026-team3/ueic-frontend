import React, { useEffect, useState } from "react";
import "../css/LevelTestPage.css"
import Header from "../components/Header";

export default function LevelTestPage() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    return (
        <div className="level-test-page">
            <div className="level-test-container">
                <Header />

                <main className="level-test-content">
                    <h1 className="level-test-title">레벨 테스트</h1>

                    {questions.map((question, index) => (
                        <div key={question.id}>
                            <p>{index + 1}. {question.content}</p>

                            {question.choices?.map((choice) => (
                                <button key={choice.id} type="button">
                                    {choice.content}
                                </button>
                            ))}
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
}