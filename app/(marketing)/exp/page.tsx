"use client"
import React, { useEffect, useState } from 'react';
export default function ExpPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [msg, setMsg] = useState('');
    useEffect(() => {
        const getUsers = async () => {
            const response = await fetch('/api/exp', {
                method: 'GET',
                headers: {
                    "content-type": "application/json"
                },
                cache: 'no-store'
            });
            const data = await response.json();
            setUsers(data.users);
        }
    
        const postUsers = async () => {
            const response = await fetch('api/exp', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({msg: "dafeizhu"})
            })
            const data = await response.json()
            setMsg(data.msg)
        }
    
        getUsers();
        postUsers()
    }, []);

    return (
        <div>
            <ul>
                {users.map(u => <li key={u.id}>{u.firstName}</li>)}
            </ul>
            {`message is ${msg}`}
        </div>
    );
}
