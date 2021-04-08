import React from "react";


function Card(bet) {
  /* const {hometeam, awayteam, date, type, img} = props; */
  return (
    <div className="container">
      <div className="card mb-3">
        <div class="row no-gutters">
          <div className="col-md-6 text-center">
            <div className="d-flex flex-column">
              <a>{bet.hometeam}</a>
              <div>
                <img src={bet.img} width={100} />
              </div>
              <p>{bet.awayteam}</p>
            </div>
          </div>
          <div className="col-md-6 text-center">
            <div className="d-flex flex-column">
              <a href="#">
                <time>{bet.date}</time>
              </a>
              <a href="#">
                <button type="button" class="btn btn-default">
                  Compte à rebours
                </button>
              </a>
              <a href="#">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ width: "170px" }}
                >
                  Bet
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
