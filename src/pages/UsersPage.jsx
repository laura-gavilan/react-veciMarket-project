import { useEffect, useState } from "react"
import { api } from './../core/http/axios';


export const UsersPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get("/users/");
                setUsers(response.data);
            } catch (error) {
                console.error("Error al cargar usuarios:", error);
            } 
        };

        fetchUsers();
    }, []);

    return (
        <div className="min-h-screen text-white p-6">
            <h1 className="text-3xl text bg-gray-800 font-bold text-center mb-6">Lista de usuarios</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                    <div className="p-4 bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition"
                        key={user.id} >
                            <h2 className="text-xl font-semibold">{user.name}</h2>
                            <p className="text-gray-400">{user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};