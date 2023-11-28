import { useState } from "react";


function FilterButton() {
    const [open, setOpen] = useState(false);
    const handleOnClick = (e) => {
        // e.preventDefault();
        setOpen(!open);
    }

    return (
        <button type="button" onClick={handleOnClick}>Filter</button>

    );
}

export default FilterButton;