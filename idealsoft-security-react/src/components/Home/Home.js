
export default function Home() {
    const storedToken = localStorage.getItem('token');
    const storedData = localStorage.getItem('data');
    const storedExpire = localStorage.getItem('expire');
    const storedLoggedInUser = localStorage.getItem('loggedInUser');
    const storedIsAuthorised = localStorage.getItem('isAuthorised');



    return (
        <div>{storedIsAuthorised && <h2>Authorised user is {storedLoggedInUser}</h2>}
        </div>
    )
}
