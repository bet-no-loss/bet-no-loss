import React from 'react'
import Card from '../../Card/Card'
import basket from "../../../assets/image/basketball-ball.png";
import rugby from "../../../assets/image/rugby-ball.png";
import soccer from "../../../assets/image/soccer-ball.png";

function BetList() {

    const bets = [
        {
            hometeam: "PSG",
            awayteam: "OM",
            date: "15th april 2021",
            type: "soccer",
            img: {soccer}
        },
        {
            hometeam: "France",
            awayteam: "England",
            date: "26th june 2021",
            type: "rugby",
            img: {rugby}
        },
        {
            hometeam: "Lakers ",
            awayteam: "Nets",
            date: "25th december 2021",
            type: "basket",
            img: {basket}
        }
    ]
    return (
        <div>
            {bets.map(
                bet => (<Card hometeam={bet.hometeam} awayteam={bet.awayteam} date={bet.date} img={bet.img} />)
            )}
            
        </div>
    )
}

export default BetList
