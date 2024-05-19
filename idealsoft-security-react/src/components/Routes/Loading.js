
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    useEffect(() => {
        const inteval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);
        // redirecting once count is 0
        count == 0 && navigate("/login")
        return () => clearInterval(inteval);
    }, [count]);

    return (
        <div>User not authonticated redirecting to login in {count} seconds....</div>
    )
}
