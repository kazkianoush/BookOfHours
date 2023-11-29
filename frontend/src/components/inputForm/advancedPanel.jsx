

function AdvancedPanel() {

    const handleOnClick = (e) => {
        e.preventDefault();
    }

    return (
        <>
        <div>Allows special views of the data</div>
        <div>Memory: &nbsp;
             Numen only <input type="checkbox"/> &nbsp;
        </div>
        <div>Book: &nbsp;
             Group aspect requirement <input type="checkbox"/> &nbsp;
             {/* should not be opened until the checkbox is ticked */}
             Count the books that unlocks: <input/> &nbsp;
        </div>
        <div>Visitors: &nbsp;
            Show languages spoken by only 1 visitor <input type="checkbox"/> &nbsp;
            Show visitors that don&apos;t teach player a new language  <input type="checkbox"/> &nbsp;
        </div>
        </>
    );
}

export default AdvancedPanel;