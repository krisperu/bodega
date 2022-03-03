import React, { useState, useEffect} from "react";
import CurrentInventoryList from "./CurrentInventoryList";
import ReorderInventoryList from "./ReorderInventoryList"

function InventoryManager() {

    const [inventory, setInventory] = useState([])
    const baseUrl = "http://localhost:8001"
    const [reorders, setReorders] = useState([])

    useEffect(() => {
        fetch(baseUrl + '/inventory')
        .then(res => res.json())
        .then(setInventory)
    }, [])

    function addToReorders(item) {
        if(!reorders.includes(item))
        setReorders([...reorders, item])
    }
    function removeFromReorders(item) {
        const newReorders = reorders.filter(reorderItem => reorderItem !== item)
        setReorders([newReorders])
    }

    return(
        <div className="container">
            <CurrentInventoryList inventory={inventory} onCardClick={addToReorders}/>
            <ReorderInventoryList reorders={reorders} onRemoveClick={removeFromReorders}/>
        </div>
    );
}

export default InventoryManager;