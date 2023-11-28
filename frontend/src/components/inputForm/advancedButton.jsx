

function AdvancedButton() {

    const handleOnClick = (e) => {
        e.preventDefault();
    }

    return (
        <button className="col" onClick={handleOnClick }>Advanced</button>
    );
}

export default AdvancedButton;