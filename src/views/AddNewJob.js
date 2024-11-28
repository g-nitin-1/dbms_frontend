import React, { useState, useEffect } from "react";

function JobRegistrationForm() {
  const [formData, setFormData] = useState({
    JobRole: "",
    JobSalary: "",
    JobDescription: "",
    JobStartDate: "",
    JobDuration: "",
    MinimumCGPA: "",
    MaximumArrears: "",
    Branches: [],
    Gender: [],
  });
  const [branches, setBranches] = useState([]);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/c/branches", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).catch((err) => console.log("Fetch Error: ", err));

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      console.log(jsonData)
      setBranches(jsonData.rows); // Accessing the 'rows' array in the response
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const toggleAccordion = (e) => {
    e.preventDefault();
    setAccordionOpen(!accordionOpen);
  };

  const handleBranchChange = (e) => {
    const { value } = e.target;
    console.log(e.target);
    console.log(value);
    const updatedBranches = [...formData.Branches];
    if (updatedBranches.includes(value)) {
      // Remove branch if already selected
      const index = updatedBranches.indexOf(value);
      updatedBranches.splice(index, 1);
    } else {
      // Add branch if not already selected
      updatedBranches.push(value);
    }
    setFormData({
      ...formData,
      Branches: updatedBranches,
    });
    console.log(formData.Branches);
  };

  const handleCriteriaChange = (e) => {
    const { value } = e.target;
    console.log(value);
    const updatedBranches = [...formData.Gender];
    if (updatedBranches.includes(value)) {
      // Remove branch if already selected
      const index = updatedBranches.indexOf(value);
      updatedBranches.splice(index, 1);
    } else {
      // Add branch if not already selected
      updatedBranches.push(value);
    }
    setFormData({
      ...formData,
      Gender: updatedBranches,
    });
    console.log(formData.Gender);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  const handleSubmit1 = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/c/addjob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      console.log(formData)
      setFormData({
        JobRole: "",
        JobSalary: "",
        JobDescription: "",
        JobStartDate: "",
        JobDuration: "",
        MinimumCGPA: "",
        MaximumArrears: "",
        Branches: [],
        Gender: [],
      });
      // Optionally, you can fetch data again after updating
      fetchData();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#f7f7f7",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Company Job Registration Form</h2>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          // onSubmit={handleSubmit1}
        >
          <label style={{ marginBottom: "10px" }}>
            Job Role:
            <input
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "4px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              type="text"
              name="JobRole"
              value={formData.JobRole}
              onChange={(e) =>
                setFormData({ ...formData, JobRole: e.target.value })
              }
            />
          </label>
          <label style={{ marginBottom: "10px" }}>
            Job Salary:
            <input
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "4px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              type="text"
              name="JobSalary"
              value={formData.JobSalary}
              onChange={(e) =>
                setFormData({ ...formData, JobSalary: e.target.value })
              }
            />
          </label>
          <label style={{ marginBottom: "10px" }}>
            Job Description:
            <textarea
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "4px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              name="JobDescription"
              value={formData.JobDescription}
              onChange={(e) =>
                setFormData({ ...formData, JobDescription: e.target.value })
              }
            />
          </label>
          <label style={{ marginBottom: "10px" }}>
            Job Start Date:
            <input
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "4px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              type="date"
              name="JobStartDate"
              value={formData.JobStartDate}
              onChange={(e) =>
                setFormData({ ...formData, JobStartDate: e.target.value })
              }
            />
          </label>
          <label style={{ marginBottom: "10px" }}>
            Job Duration:
            <input
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "4px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              type="text"
              name="JobDuration"
              value={formData.JobDuration}
              onChange={(e) =>
                setFormData({ ...formData, JobDuration: e.target.value })
              }
            />
          </label>
          <label style={{ marginBottom: "10px" }}>
            Minimum CGPA:
            <input
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "4px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              type="text"
              name="MinimumCGPA"
              value={formData.MinimumCGPA}
              onChange={(e) =>
                setFormData({ ...formData, MinimumCGPA: e.target.value })
              }
            />
          </label>
          <label style={{ marginBottom: "10px" }}>
            Maximum Arrears:
            <input
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "4px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              type="text"
              name="MaximumArrears"
              value={formData.MaximumArrears}
              onChange={(e) =>
                setFormData({ ...formData, MaximumArrears: e.target.value })
              }
            />
          </label>
          <div style={{ marginBottom: "10px" }}>
            Gender and extra eligibility:
            <div style={{ marginBottom: "10px" }}>
              <label>
                <input
                  type="checkbox"
                  value="Male"
                  checked={formData.Gender.includes("Male")}
                  onChange={handleCriteriaChange}
                />
                Male
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Female"
                  checked={formData.Gender.includes("Female")}
                  onChange={handleCriteriaChange}
                />
                Female
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Pwd and other Educational backward classes"
                  checked={formData.Gender.includes(
                    "Pwd and other Educational backward classes"
                  )}
                  onChange={handleCriteriaChange}
                />
                Pwd and other Educational backward classes
              </label>
            </div>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <button
              style={{
                width: "100%",
                padding: "8px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={toggleAccordion}
            >
              {accordionOpen ? "Hide Branches" : "Select Branches"}
            </button>
            {accordionOpen && (
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginTop: "10px",
                }}
              >
                {branches.map((value, index) => (
                  <label
                    key={index}
                    style={{
                      display: "block",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      value={value.BR_ID}
                      checked={formData.Branches.includes(String(value.BR_ID))}
                      onChange={handleBranchChange}
                    />
                    {value.BR_NAME}
                  </label>
                ))}
              </div>
            )}
          </div>
          <button
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            type="submit"
            onClick={handleSubmit1}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default JobRegistrationForm;
