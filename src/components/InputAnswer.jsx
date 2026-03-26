import React from "react";
import "../css/LevelTestPage.css"

export default function InputAnswer({
    questions,
    answers,
    onSelect,
    onSubmit
}){
    return(
        <div className="answer-area">
            <span className="answer-area-title">답안 작성란</span>

            {questions.map((question, index) => (
                <div key={question.id} className="answer-row">

                    {/* 문제 번호 */}
                    <div className="q-number">{index + 1}번</div>

                    {/* 선택지 */}
                    <div className="choices">
                        {question.choices?.map((choice, i) => (
                            <label key={choice.id} className="choice-item">
                                <span>({String.fromCharCode(65 + i)})</span>
                                <input
                                    type="radio"
                                    name={`q-${question.id}`}
                                    checked={answers[question.id] === choice.id}
                                    onChange={() => onSelect(question.id, choice.id)}
                                />
                            </label>
                        ))}
                    </div>

                </div>
            ))}

            <button className="answer-submit-btn" onClick={onSubmit}>
                답안 제출
            </button>
        </div>
    );
}