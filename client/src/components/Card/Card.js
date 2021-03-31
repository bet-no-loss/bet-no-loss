import React from "react";

function Card(props) {
    const {hometeam, awayteam, date, type, img} = props;
  return (
    <div className="column is-4">
      <div className="card">
        <div className="card-content">
          <div className="content " >
            <p className="is-size-3">{hometeam}</p>
            <div><img src={img}/></div>
            <p className="is-size-3">{awayteam}</p>
          </div>
        </div>
        <footer className="card-footer">
          <a href="#" className="card-footer-item">
            <time >{date}</time>
          </a>
          <a href="#" className="card-footer-item">
          <button className="button is-rounded " style={{width:"170px"}}>Bet</button>
          </a>
        </footer>
      </div>
    </div>
  );
}

export default Card;
