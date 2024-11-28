import React, { useEffect, useState } from "react";
import TableList from "views/TableList";

export default function EligibleJobs() {
  const [data, setData] = useState([]);
  const [fields, setFields] = useState([]);
  const [apply, setApply] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/s/eligibleJobs", {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer "+localStorage.getItem("token"),
      },
      })
      .then((response) => {
        console.log(response, "here");
        console.log("Hi..");
          return response;
        })
        .catch((err) => console.log("Fetch Error: ", err));
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      console.log("jsondatda:", jsonData.fields);
      console.log("jsondatda",jsonData.fields);
      setFields(jsonData.fields);
      setData(jsonData.rows); // Accessing the 'rows' array in the response
      console.log("jsonrows:", data);
      console.log("jsondatda:", fields);
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await fetch("http://localhost:3000/s/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({jid : formData.get('user_id')}),
      });

      if (!response.ok) {
        throw new Error("Failed to Apply");
      }
      event.target.reset();
      // Optionally, you can fetch data again after updating
      fetchData();
    } catch (error) {
      console.error("Error Applying", error);
    }
  };

  return (
    <div>
      <TableList data={data} fields={fields} apply={true} val={"Apply"} handlesubmit={handleFormSubmit} heading="Eligible Jobs" />
    </div>
  );
}
