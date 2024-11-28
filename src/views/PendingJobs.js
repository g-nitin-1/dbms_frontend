import React, { useEffect, useState } from "react";
import TableList from "views/TableList";

export default function AdminStudents() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState([]);

  const fetchData = async () => {
    try {
        console.log("token : ", localStorage.getItem('token'));
      const response = await fetch("http://localhost:3000/a/pendingjobs", {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer "+localStorage.getItem("token"),
        },
      })
        .then((response) => {
          console.log(response, "here");
          return response;
        })
        .catch((err) => console.log("Fetch Error: ", err));
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      console.log("jsondatda:", jsonData);
      setData(jsonData.rows); // Accessing the 'rows' array in the response
      setFields(jsonData.fields); // Accessing the 'columns' array in
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const handleFormSubmit1 = async (event) => {
    const formData = new FormData(event.target);
    try {
      console.log("HI HERE HELLO ");
      const response = await fetch("http://localhost:3000/a/approve", {
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
  const handleFormSubmit2 = async (event) => {
    const formData = new FormData(event.target);
    try {
      const response = await fetch("http://localhost:3000/a/reject", {
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
      <TableList data={data} fields={fields} approve={true} val="Approve" reject={true} val1="Reject" handlesubmit={handleFormSubmit1} handlesubmit1={handleFormSubmit2} heading="My Profile" />
    </div>
  );
}

