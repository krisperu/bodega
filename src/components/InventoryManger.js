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
        setReorders(newReorders)
    }
    function handleDelete(e, item) {
        e.stopPropagation()
        // console.log("item:", item)
        fetch(baseUrl + `/inventory/${item.id}`, {method: 'DELETE' })

        const newReorders = reorders.filter(reorderItem => reorderItem !== item)
        setReorders(newReorders)
        
        const newInventory = inventory.filter(inventoryItem => inventoryItem !== item)
        setInventory(newInventory)
    }

    return(
        <div className="container">
            <CurrentInventoryList inventory={inventory} onCardClick={addToReorders} onDelete={handleDelete}/>
            <ReorderInventoryList reorders={reorders} onRemoveClick={removeFromReorders} onDelete={handleDelete}/>
        </div>
    );
}

export default InventoryManager;