import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loading from "./Loading";

export default function PrivateRoutes() {
    const [ok, setOk] = useState(false);
    const storedIsAuthorised = localStorage.getItem('isAuthorised');

    useEffect(() => {
        if (storedIsAuthorised) {
            setOk(true);
        } else {
            setOk(false);
        }
    }, [storedIsAuthorised])

    return ok ? < Outlet /> : <Loading />;
}
