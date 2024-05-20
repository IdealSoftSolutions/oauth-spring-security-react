import axios from "axios";
import { useEffect, useState } from 'react';

export default function Home() {
    const token = localStorage.getItem('token');
    const storedLoggedInUser = localStorage.getItem('loggedInUser');
    const storedIsAuthorised = localStorage.getItem('isAuthorised');
    const [count, setCount] = useState('')

    const [articles, setArticles] = useState('');
    useEffect(() => {
        setCount(0);
        return () => getArticles();
    }, [0]);

    const instance = axios.create({
        baseURL: 'http://localhost:8080/api/v1/',
        timeout: 1000,
        headers: { 'Authorization': `Bearer ${token}` }
    });
    function getArticles() {
        console.log('token ==>', token)
        return instance
            .get("articles")
            .then((response) => {
                console.log('response.data ===>', response.data)
                setArticles(response.data);
            });
    };

    return (
        <div>{storedIsAuthorised && <h2>Authorised user is {storedLoggedInUser} , {articles}</h2>}
        </div>
    )
}
