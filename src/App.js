import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const randomNum = () => {
    const min = 10;
    const max = 99;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [randomNumber, setRandomNumber] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [isAnswerFalse, setIsAnswerFalse] = useState(false);
  const [seconds, setSeconds] = useState();
  const [correctNum, setCorrectNum] = useState(0);
  const [falseNum, setFalseNum] = useState(0);
  const [showModal, setShowModel] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [intermediate, setIntermediate] = useState(false);
  const [beginner, setBeginner] = useState(false);
  const [equalSign,setEqualSign] = useState(false);
  const [plusSign,setPlusSign] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : []));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function startTime() {
    setSeconds(30);
    setAdvanced(false);
    setIntermediate(false);
    setBeginner(false);
    setTimeout(()=>{
      setShowModel(true)
    },30000)};
   
  

  function handleGenerateRandom() {
    const num1 = randomNum();
    const num2 = randomNum();
    setRandomNumber([num1, num2]);
    const newCorrectAnswer = num1 + num2;
    setCorrectAnswer(newCorrectAnswer);
    const randomAnswer1 = randomNum() * 2;
    const randomAnswer2 = randomNum() * 2;
    const allAnswers = [randomAnswer1, randomAnswer2, newCorrectAnswer];
    const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
    setAnswers(shuffledAnswers);
    setEqualSign(true);
    setPlusSign(true);
  }

  const correctAnswerAppear = (clickedAnswer) => {
    if (!isAnswerCorrect && !isAnswerFalse) {
      if (clickedAnswer === correctAnswer) {
        setIsAnswerCorrect(true);
        setCorrectNum((prevCorrectNum) => prevCorrectNum + 1);
      } else {
        setIsAnswerFalse(true);
        setFalseNum((prevFalseNum) => prevFalseNum + 1);
      }
      setTimeout(() => {
        setIsAnswerCorrect(false);
        setIsAnswerFalse(false);
      }, 500);

      setTimeout(() => {
        handleGenerateRandom();
      }, 500);
    }
  };

  const CustomModal = ({ onClose, correctNum, falseNum }) => {
    if (correctNum >= 15) {
      setAdvanced(true);
    } else if (correctNum >= 10) {
      setIntermediate(true);
    } else {
      setBeginner(true);
    }
    return (
      <div className="custom-modal">
        <div className="modal-content">
          {advanced && <p className="advanced">Brilliant!</p>}
          {intermediate && (
            <p className="intermediate">
              Congratz! You did well. Not the best though.
            </p>
          )}
          {beginner && (
            <p className="beginner">Cmon man... You can do better</p>
          )}
          <h2>Score</h2>
          <p>CORRECT: {correctNum}</p>
          <p>FALSE: {falseNum}</p>
          <button className="closeButton" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };

  function closeModal() {
    setShowModel(false);
    setCorrectNum(0);
    setFalseNum(0);
  }

  return (
    <>
      <h1 className="header">MATH QUIZ</h1>
      <p className="task-description">
        CHOSE THE RIGHT ANSWER! TRY TO BE AS QUICK AS POSSIBLE!
      </p>
      <img className="arrow" src={process.env.PUBLIC_URL + "/arrow.png"} />
      <button
        className="startButton"
        onClick={() => {
          handleGenerateRandom();
          startTime();
        }}
      >
        START
      </button>
      <div className="numbers">
        <div className="first-number">{randomNumber[0]}</div>
        {plusSign && <div className="sign">+</div>}
        <div className="second-number">{randomNumber[1]}</div>
      </div>
      {equalSign && <p className="isEqualTo">=</p>}
      <div className="answers">
        <div
          className="first-random"
          onClick={() => correctAnswerAppear(answers[0])}
        >
          {answers[0]}
        </div>
        <div
          className="second-random"
          onClick={() => correctAnswerAppear(answers[1])}
        >
          {answers[1]}
        </div>
        <div
          className="third-random"
          onClick={() => correctAnswerAppear(answers[2])}
        >
          {answers[2]}
        </div>
      </div>
      {isAnswerCorrect && <div className="answer">CORRECT</div>}
      {isAnswerFalse && <div className="badAnswer">FALSE</div>}
      {isAnswerFalse && <div className="tryAgain">TRY AGAIN!</div>}
      <div className="seconds">{seconds}</div>
      {/* <div className="correctNum">
        <p>CORRECT:{correctNum}</p>
      </div>
      <div className="falseNum">
        <p>FALSE:{falseNum}</p>
      </div> */}
      <div>
        {showModal && (
          <CustomModal
            onClose={closeModal}
            correctNum={correctNum}
            falseNum={falseNum}
          />
        )}
      </div>
    </>
  );
}

export default App;
