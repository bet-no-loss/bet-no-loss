import React from "react";


function Card(bet) {

  /* const {hometeam, awayteam, date, type, img} = props; */
  return (
    <div className="container">
      <div className="card mb-3">
        <div class="row no-gutters">
          <div className="col-md-6 text-center">
            <div className="d-flex flex-column">
              <a >{bet.hometeam}</a>
              <div>
                <img src={bet.img} width={100} />
              </div>
              <p>{bet.awayteam}</p>
            </div>
          </div>
          <div className="col-md-6 text-center">
            <div className="d-flex flex-column">
              <div>
                <time>{bet.date}</time>
              </div>
              <div>
                <button type="button" class="btn btn-default">
                  Compte à rebours
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  style={{ width: "170px" }}
                >
                  Bet
                </button>

                  {/*Modal*/}
                  <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                          <div className="modal-content">
                              <div className="modal-header">
                                  <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                  <button typeName="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                              </div>
                              <div className="modal-body">
                                  ...
                              </div>
                              <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  <button type="button" className="btn btn-primary">Save changes</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
