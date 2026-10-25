import { useNavigate } from "react-router-dom";
import CompanyPreparationList from "../components/CompanyPreparationList";

function Companies() {
  const navigate = useNavigate();

  function openCompany(companyId) {
    navigate(`/companies/${companyId}`);
  }

  return <CompanyPreparationList onSelectCompany={openCompany} />;
}

export default Companies;