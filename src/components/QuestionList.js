import React from "react";
import {useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questionList, setQuestionList}) 
{
  useEffect(() => 
	{
	    fetch("http://localhost:4000/questions")
	      .then((data) => data.json())
	      .then((data) => {setQuestionList(data)});
  }, []);

  function handleDeleteClick(id)
  {
    fetch(`http://localhost:4000/questions/${id}`, 
    {method: "DELETE"})
      .then((data) => data.json())
      .then(() => 
      {
        const updatedQuestions = questionList.filter((q) => q.id !== id);
        setQuestionList(updatedQuestions);
      })
  }

  function handleAnswerChange(id, correctIndex) 
  {
    fetch(`http://localhost:4000/questions/${id}`, 
    {
      method: "PATCH",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ correctIndex }),
    })
      .then((data) => data.json())
      .then((updatedQuestion) => 
      {
        const updatedQuestions = questionList.map((q) => 
        {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setQuestionList(updatedQuestions);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul className="Questions">
        {questionList.map((item) => 
        (
          <QuestionItem 
            key={item.id} 
            question={item}
            onDeleteClick={handleDeleteClick}
            onAnswerChange={handleAnswerChange}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
