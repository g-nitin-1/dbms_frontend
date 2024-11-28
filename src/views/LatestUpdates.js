import React, { useEffect, useState } from "react";
import TableList from "views/TableList";
import { Button } from 'react-bootstrap';

export default function AllJobs() {
  const [data, setData] = useState([]);
  const [fields, setFields] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/s/updates", {
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

   // Define the styles for the buttons
   const linkButtonStyle = {
    width: "100%",
    padding: "8px 12px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

    // Map the data to include buttons
    const renderTableData = data.map((row) => {
      return {
          ...row,
          LINK: (
              <Button 
                  style={linkButtonStyle}
                  href={row.LINK} 
                  target="_blank"
              >
                  Visit
              </Button>
          ),
      };
  });

  return (
    <div>
      <TableList data={renderTableData} fields={fields} heading="All Jobs" />
    </div>
  );
}