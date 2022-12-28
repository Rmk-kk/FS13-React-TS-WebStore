import StoreServices from "../../StoreServices/StoreServices";

const UserContent = () => {
    const service = new StoreServices();
    // useEffect(() => {
    //     service.getUserByToken(authToken["access_token"]);
    // }, [])

    return (
        <h1>User Page</h1>
    )
}

export default UserContent