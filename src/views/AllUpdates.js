import React, { useEffect, useState } from 'react';
import TableList from 'views/TableList';
import { Button } from 'react-bootstrap';

export default function AllJobs() {
    const [data, setData] = useState([]);
    const [fields, setFields] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to fetch data from the API
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/a/updates', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            
            const jsonData = await response.json();
            setFields(jsonData.fields);
            setData(jsonData.rows);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    // Function to handle removing an entry
    const handleRemove = async (mid) => {
        try {
            const response = await fetch('http://localhost:3000/a/removeUpdate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ MID: mid }),
            });

            if (!response.ok) {
                throw new Error('Failed to remove update');
            }

            // Refresh the data after removing the update
            fetchData();
        } catch (error) {
            console.error('Error removing update:', error);
            alert('Failed to remove update');
        }
    };

    // Function to handle visiting a URL
    const handleVisit = (url) => {
        window.open(url, '_blank');
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Render loading or error states
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

    const deleteButtonStyle = {
        width: "100%",
        padding: "8px 12px",
        fontSize: "16px",
        backgroundColor: "#FF0000",
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
            DELETE: (
                <Button
                    style={deleteButtonStyle}
                    onClick={() => handleRemove(row.MID)}
                >
                    Remove
                </Button>
            ),
        };
    });

    // Render the TableList component
    return (
        <div>
            <TableList
                data={renderTableData}
                fields={['MID', 'AID', 'TITLE', 'CONTENT', 'LINK', 'DELETE']}
                heading="All Updates"
            />
        </div>
    );
}
