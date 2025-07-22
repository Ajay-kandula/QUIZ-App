import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import quiz from '../Images/quiz.jpg'

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [timer, setTimer] = useState(30);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  useEffect(() => {
    axios
      .get("http://localhost:5000/api/quiz/getallquestions", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setQuestions(res.data))
      .catch(() => alert("Failed to load questions"));
  }, []);

  
  useEffect(() => {
    if (questions.length === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          if (current === questions.length - 1) {
            SubmitQuiz();
          } else {
            setCurrent((prev) => prev + 1);
            setTimer(30);
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
    } else {
      SubmitQuiz();
    }
  };

  const SubmitQuiz = async () => {
    const formattedAnswers = Object.entries(answers).map(([questionid, obj]) => ({
      questionid,
      selectedanswer: obj.selectedanswer,
    }));

    try {
      const res = await fetch("http://localhost:5000/api/result/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers: formattedAnswers }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("score", data.score);
        localStorage.setItem("total", questions.length); 
        navigate("/Scorepage");
      } else {
        const err = await res.json();
        console.error("Submission error:", err);
        alert("Submission failed. Check console.");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("An error occurred during submission.");
    }
  };

 
  if (questions.length === 0) return <p>Loading questions...</p>;

  const q = questions[current];

  return (
    <div  style={{backgroundImage:`url(${quiz})`,backgroundPosition:"center",backgroundSize:"cover",height:"100vh",width:'100vw',display:"flex",justifyContent:"flex-start",flexDirection:"column",alignItems:"flex-start"}}>
      <h4 style={{marginLeft:"1050px",marginBottom:"65px",fontSize:"25px"}}>Time Left: {timer}s</h4>
      <div style={{display:"flex", flexDirection:"column",height:"300px",width:"600px",marginLeft:"500px",border:"2px solid grey",fontSize:"20px",borderRadius:"10px"}}>
        <h2 style={{textAlign:"center"}}>Q{current + 1}: {q.question}</h2>
        <ul style={{marginLeft:"10px",marginTop:"1px"}}>
          {[q.Option1, q.Option2, q.Option3, q.Option4].map((opt, index) => (
            <li key={index}>
              <label>
                <input type="radio" name="option" value={opt} onChange={() => handleOptionChange(opt)} checked={answers[q._id]?.selectedanswer === opt}/>{opt}
                </label>
            </li>
          ))}
          </ul>
      </div>
      <button onClick={handleNext} style={{marginLeft:"780px",marginTop:"20px",backgroundColor:"#d80000",color:"white",width:"100px"}}>
        {current === questions.length - 1 ? "Submit" : "Next"}
      </button>
    </div>
  );
};

export default Quiz;
