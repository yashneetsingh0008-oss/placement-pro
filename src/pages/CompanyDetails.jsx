import { useParams } from "react-router-dom";
import CompanyDetails from "../components/CompanyDetails";
import { companies } from "../data/companies";

function CompanyDetailsPage() {
  const { companyId } = useParams();

  const company = companies.find((item) => item.id === companyId);

  return <CompanyDetails company={company} />;
}

export default CompanyDetailsPage;