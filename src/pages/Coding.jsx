import { useNavigate } from "react-router-dom";
import CodingPractice from "../components/CodingPractice";

function Coding() {
  const navigate = useNavigate();

  function openQuestion(questionId) {
    navigate(`/coding/${questionId}`);
  }

  return <CodingPractice onOpenQuestion={openQuestion} />;
}

export default Coding;