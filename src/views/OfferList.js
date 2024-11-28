import React from "react";
import {useLocation} from "react-router-dom";
import TableList from "./TableList";

function OfferList() {
 
  const location = useLocation();
  const data = location.state;
  console.log(data.data);

  return (
    <div>
        <TableList fields={data.fields} data={data.data} heading="offered list"/>
    </div>
  );
}

export default OfferList;