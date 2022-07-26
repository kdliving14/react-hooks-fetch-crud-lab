import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() 
{
  const [page, setPage] = useState("List");
  const [questionList, setQuestionList] = useState([])

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm setQuestionList={setQuestionList} questionList={questionList}/> : <QuestionList setQuestionList={setQuestionList} questionList={questionList}/>}
    </main>
  );
}

export default App;
