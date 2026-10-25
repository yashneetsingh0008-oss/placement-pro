import { useNavigate } from "react-router-dom";
import MockTestList from "../components/MockTestList";

function MockTests() {
  const navigate = useNavigate();

  function openTest(testId) {
    navigate(`/mock-tests/${testId}`);
  }

  return <MockTestList onSelectTest={openTest} />;
}

export default MockTests;