import React, { useEffect, useState } from "react";
import TableList from "views/TableList";

export default function AppliedJobs() {
  const [data, setData] = useState([]);
  const [fields, setFields] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      console.log("Get Applied Jobs")
      const response = await fetch("http://localhost:3000/s/appliedJobs", {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer "+localStorage.getItem("token"),
      },
      })
      .then((response) => {
          console.log(response, "applied");
          return response;
        })
        .catch((err) => console.log("Fetch Error: ", err));
      console.log("Hi..");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      console.log("jsondatda:", jsonData);
      setFields(jsonData.fields);
      setData(jsonData.rows); // Accessing the 'rows' array in the response
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <TableList data={data} fields = {fields} heading="Applied Jobs" />
    </div>
  );
}