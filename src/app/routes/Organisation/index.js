import React from "react";
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";
import DataTable from "./Components/dataTable/DataTable";
const Organisation = ({ match }) => {
  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader title={"Organisation"} match={match} />
      <div className="row">
        <div className="col-12 isin-details">
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default Organisation;
