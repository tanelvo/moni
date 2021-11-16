import React from 'react'
import Cards from './Cards'
function Expenses() {

    return(<div className="mt-3">
        <Cards amount={"123"} category={"Food"} color={"red"}/>
        <Cards amount={"123"} category={"Food"} color={"blue"}/>
        <Cards amount={"123"} category={"Food"} color={"#000"}/>
        <Cards amount={"123"} category={"Food"}/>
        <Cards amount={"123"} category={"Food"}/>
        <Cards amount={"123"} category={"Food"}/>
        <Cards amount={"123"} category={"Food"}/>
        <Cards amount={"123"} category={"Food"}/>
        <Cards amount={"123"} category={"Food"}/>

    </div>
    )
}

export default Expenses