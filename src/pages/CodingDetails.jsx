import { useParams } from "react-router-dom";
import CodingQuestionDetails from "../components/CodingQuestionDetails";
import { codingQuestions } from "../data/codingQuestions";

function CodingDetails() {
  const { questionId } = useParams();

  const question = codingQuestions.find((item) => item.id === questionId);

  return <CodingQuestionDetails question={question} />;
}

export default CodingDetails;