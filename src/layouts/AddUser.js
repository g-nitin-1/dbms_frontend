import React, { useState } from "react";

function AddUser() {
    const [userRole, setUserRole] = useState('student');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:3000/adduser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userRole: userRole,
                    userId: userId,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add user');
            }

            alert('User added successfully!');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className="mx-auto border d-flex justify-content-center align-items-left flex-column" style={{ marginTop: 120, width: 400, padding: 20 }}>
            <p>
                <b>User Role:</b>
                <hr />
                <label>
                    <input
                        type="radio"
                        name="userRole"
                        value="student"
                        checked={userRole === 'student'}
                        onChange={(e) => setUserRole(e.target.value)}
                    />
                    Student
                </label>
                <hr />
                <label>
                    <input
                        type="radio"
                        name="userRole"
                        value="admin"
                        checked={userRole === 'admin'}
                        onChange={(e) => setUserRole(e.target.value)}
                    />
                    Admin
                </label>
                <hr />
                <label>
                    <input
                        type="radio"
                        name="userRole"
                        value="company"
                        checked={userRole === 'company'}
                        onChange={(e) => setUserRole(e.target.value)}
                    />
                    Company
                </label>
            </p>
            <hr />
            <label>
                <b>User ID:</b> 
                <input
                    name="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
            </label>
            <hr />
            <label>
                <b>Password:</b> 
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <hr />
            <button type="submit" onClick={handleClick}>Add User</button>
        </div>
    );
}

export default AddUser;
