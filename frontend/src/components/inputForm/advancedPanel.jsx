import { useState } from "react";


function AdvancedPanel(props) {
    const [advancedOptions, setAdvancedOptions] = useState(new Array(4).fill(false));
    const [memoryString, setMemoryString] = useState("");


    // const handleNumenOnlyCheckbox = () => {
    //     advancedOptions[0] = !advancedOptions[0];
    //     props.advancedColumns(advancedOptions);
    // }
    
    const handleAdvancedPanelCheckboxes = (index) => {
        const updatedAdvancedOptions = advancedOptions;
        updatedAdvancedOptions[index] = !updatedAdvancedOptions[index];
        console.log(updatedAdvancedOptions);
        switch (index) {
            case 1: {
                    const memField = document.getElementById('memField');
                if  (advancedOptions[1]) {
                    memField.disabled = false;
                } else {
                    memField.disabled = true;
                }
                break;
            }
        }
        setAdvancedOptions(updatedAdvancedOptions);
        props.advancedColumns(advancedOptions);
    }

    // const handleGroupAspectCheckbox = () => {
    //     advancedOptions[1] = !advancedOptions[1];
    //     const memField = document.getElementById('memField');
    //     if (advancedOptions[1]) {
    //         memField.disabled = false;
    //     } else {
    //         memField.disabled = true;
    //     }
    //     props.advancedColumns(advancedOptions);
    //     console.log(advancedOptions);
    // }

    // const handleLanguageSpokeByOneCheckbox = () => {
    //     advancedOptions[2] = !advancedOptions[2];
    //     props.advancedColumns(advancedOptions);

    // }

    // const handleVisitorNotTeachNewLanguageCheckbox = () => {
    //     advancedOptions[3] = !advancedOptions[3];
    //     props.advancedColumns(advancedOptions);
    // }

    return (
        <>
        <div>Allows special views of the data</div>
        <div>Memory: &nbsp;
             Numen only <input key = {Math.random()} type="checkbox" checked = {advancedOptions[0] == true} onChange={() => handleAdvancedPanelCheckboxes(0)}/> &nbsp;
        </div>
        <div>Book: &nbsp;
             Group aspect requirement <input type="checkbox" id = "groupCheckbox" checked ={advancedOptions[1]} onChange={() => handleAdvancedPanelCheckboxes(1)}/> &nbsp;
             {/* should not be opened until the checkbox is ticked */}
             Count the books that unlocks memory: <input id="memField" disabled/> &nbsp;
        </div>
        <div>Visitors: &nbsp;
            Show languages spoken by only 1 visitor <input type="checkbox" checked ={advancedOptions[2]} onChange={() => handleAdvancedPanelCheckboxes(2)} /> &nbsp;
            Show visitors that don&apos;t teach player a new language  <input type="checkbox" checked ={advancedOptions[3]} onChange={() => handleAdvancedPanelCheckboxes(3)}/> &nbsp;
        </div>
        </>
    );
}

export default AdvancedPanel;