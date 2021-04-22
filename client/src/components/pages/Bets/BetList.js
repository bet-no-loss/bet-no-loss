import React, {useContext} from "react";
import Card from "../../Card/Card";
import basket from "../../../assets/image/basketball-ball.svg";
import rugby from "../../../assets/image/rugby.svg";
import soccer from "../../../assets/image/football.svg";

import Web3Context from "../../Web3context";

function BetList() {
  console.log(rugby);
  const web3Context = useContext(Web3Context);
  const { web3, accounts, contract, currentAccount } = web3Context;

  const bets = [
    {
      id: 1,
      hometeam: "PSG",
      awayteam: "OM",
      date: "15th april 2021",
      type: "soccer",
      img: soccer,
    },
    {
      id: 2,
      hometeam: "France",
      awayteam: "England",
      date: "26th june 2021",
      type: "rugby",
      img: rugby,
    },
    {
      id: 3,
      hometeam: "Lakers ",
      awayteam: "Nets",
      date: "25th december 2021",
      type: "basket",
      img: basket,
    },
  ];
  return (
    <div>
      {bets.map((bet) => (
        <Card
          key={bet.id}
          hometeam={bet.hometeam}
          awayteam={bet.awayteam}
          date={bet.date}
          img={bet.img}
        />
      ))}
    </div>
  );
}

export default BetList;
