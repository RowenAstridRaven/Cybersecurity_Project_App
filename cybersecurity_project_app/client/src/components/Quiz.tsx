// client/src/components/Quiz.tsx
import React, { useState } from 'react';

interface QuizProps {
  topic: string;
}

const Quiz: React.FC<QuizProps> = ({ topic }) => {
  const [score, setScore] = useState<number | null>(null);

  const handleQuiz = () => {
    // Simulate quiz grading
    const newScore = Math.floor(Math.random() * 101);
    setScore(newScore);
    // Save score locally using localStorage
    localStorage.setItem(`quiz_${topic}`, newScore.toString());
  };

  return (
    <div>
      {score === null ? (
        <>
          <p>Take the quiz on {topic}!</p>
          <button onClick={handleQuiz}>Submit Quiz</button>
        </>
      ) : (
        <p>Your quiz score for {topic} is {score}.</p>
      )}
    </div>
  );
};

export default Quiz;
