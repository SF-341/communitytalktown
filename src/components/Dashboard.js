import Covidapi from './Covidapi'

const DashBoard = () => {

    // if (!currentUser) {
    //     return <Redirect to="/login" />;
    // }

    return (
        <div>

            <div className="container mt-5">
                <Covidapi />
            </div>
        </div>
    )
}

export default DashBoard;