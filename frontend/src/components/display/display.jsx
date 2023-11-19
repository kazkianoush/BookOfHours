import InputForm from "../inputForm/inputForm"
import OutputPanel from "../outputPanel/outputPanel";

function Display() {
    return (
        <>
            <div>
                <h1>Book of Hour database</h1>
                <h3>A video game developed by WeatherFactory</h3>
            </div>
            <div style={{height: "20px"}}></div>
            <InputForm/>
            <div style={{height: "20px"}}></div>
            <OutputPanel/>
        </>
    );
}

export default Display;