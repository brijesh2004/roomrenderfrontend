import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import RoomItem from '../components/RoomItem';

const Userprofile = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchUser = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_PATH}/user/${id}`, {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': process.env.REACT_APP_PATH
                }
            });
            const userData = await response.json();
            setName(userData.mess.name);
            setRooms(userData.rooms);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            alert(`Error fetching user: ${err.message}`);
        }
    }, [id]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <>
            <center>{!loading && <h1>Name - {name}</h1>}</center>
            <RoomItem searchedData={rooms} Loading={loading} isAdmin={false}/>
        </>
    );
}

export default Userprofile;
