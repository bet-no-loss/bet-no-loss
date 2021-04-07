import React from "react";

function Card(bet) {
  /* const {hometeam, awayteam, date, type, img} = props; */
  return (
    <div className="container">
      <div className="card mb-3">
        <div class="row no-gutters">
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <a className="card-footer-item">{bet.hometeam}</a>
              <div className="card-footer-item">
                <img src={bet.img} width={100} />
              </div>
              <p className="card-footer-item">{bet.awayteam}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <a href="#" className="card-footer-item">
                <time>{bet.date}</time>
              </a>
              <a href="#" className="card-footer-item">
                <button type="button" class="btn btn-default">
                  Compte à rebours
                </button>
              </a>
              <a href="#" className="card-footer-item">
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
