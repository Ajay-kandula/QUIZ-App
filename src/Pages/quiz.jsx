import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [timer, setTimer] = useState(30);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/quiz/getallquestions", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setQuestions(res.data);
    })
    .catch(() => {
      alert("Failed to load questions");
    });
  }, []);

  useEffect(() => {
    if (questions.length === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          if(current===questions.length-1){
            SubmitQuiz()
          }else{
            setCurrent((prev)=>prev+1)
            setTimer(30)
          }
          return 30;
          
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [current, questions]);

  const handleOptionChange = (selected) => {
    const questionId = questions[current]._id;
    setAnswers({ ...answers, [questionId]: { selectedanswer: selected } });
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
      setTimer(30);
    }else{
      SubmitQuiz();
    }
  };

  const SubmitQuiz = async () => {
    const userId = localStorage.getItem("userId");
    const formattedAnswers = Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      selectedanswer: value.selectedanswer,
    }));
    try {
      const res = await fetch('http://localhost:5000/api/result/submit', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({answers:formattedAnswers })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("score", data.score); 
        navigate("/Scorepage");
      }
    } catch (err) {
      console.error("Error submitting quiz:", err);
    }
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  const q = questions[current];

  return (
    <div>
      <h1>Time Left: {timer}s</h1>
      <h2>Q{current + 1}:{q.question}</h2>

      <ul>
        {[q.Option1, q.Option2, q.Option3, q.Option4].map((opt, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="option"
                value={opt}
                onChange={() => handleOptionChange(opt)}
                checked={answers[q._id]?.selectedanswer === opt}
              />
              {opt}
            </label>
          </li>
        ))}
      </ul>

      <button onClick={handleNext}>Next</button>
      {current === questions.length - 1 && (
        <button onClick={SubmitQuiz}>Submit</button>
      )}
    </div>
  );
};

export default Quiz;
