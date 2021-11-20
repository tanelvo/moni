import React from "react";
import Cards from "./Cards";
function Income() {
    // Ajutised, et nuppe genereerida
    let items=[1,2,3];
    let Amount=["763.21","41.07","10000"]
    let Category=["Palk","Dividendid","Emmelt"]
    let Color=[]
    // Genereerib ükshaaval nupud
    let cardList=items.map((i)=>{
        return <Cards amount={Amount[i-1]} category={Category[i-1]} color={Color[i-1]} border="#999"/>
    })
    return(
        <>
            {cardList}
        </>
    )
}

export default Income