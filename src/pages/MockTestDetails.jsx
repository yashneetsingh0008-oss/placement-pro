import { useParams } from "react-router-dom";
import MockTest from "../components/MockTest";
import { mockTests } from "../data/mockTests";

function MockTestDetails() {
  const { testId } = useParams();

  const test = mockTests.find((item) => item.id === testId);

  return <MockTest test={test} />;
}

export default MockTestDetails;