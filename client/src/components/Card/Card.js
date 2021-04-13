import React, {useState} from "react";

export default function Card(bet) {
    const [isOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!isOpen);

    /* const {hometeam, awayteam, date, type, img} = props; */
    return (
        <>
            <div className="container">
                <div className="cardy mb-3">
                    <div className="row no-gutters">
                        <div className="col-md-6 text-center">
                            <div className="d-flex flex-column">
                                <a>{bet.hometeam}</a>
                                <div>
                                    <img src={bet.img} width={100}/>
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
                                    <button type="button" className="btn btn-default">
                                        Compte à rebours
                                    </button>
                                </div>
                                <div>
                                    <div
                                        className="btn btn-primary btn-lg"
                                        style={{width: "170px"}}
                                        onClick={() => toggle(!isOpen)}
                                    >
                                        Bet
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isOpen &&
                <div
                    className="position-absolute zmodal position-fixed">
                    <div className="card taille">
                        <div className="card-header">
                            BET
                        </div>
                        <div className="card-body mt-5">
                            <h5 className="card-title">3,500 <span>$</span></h5>
                            <div className="card-text">
                                <div className="d-flex flex-column mt-5">
                                    <a>{bet.hometeam}</a>
                                    <div>
                                        <img src={bet.img} width={100}/>
                                    </div>
                                    <p>{bet.awayteam}</p>
                                </div>
                            </div>
                            <div className="card-body">
                                <label htmlFor="basic-url" className="form-label labelAmount">Amount:</label>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control text-right"
                                        id="basic-url"
                                        aria-describedby="basic-addon3"
                                        placeholder="0,00 $"
                                    />
                                </div>
                            </div>
                            <div className="mt-5">
                                <a href="#" className="btn btn-lg btn-primary mr-4">Confirm</a>
                                <button type='button' className="btn btn-lg btn-outline-danger" onClick={() => toggle(isOpen)}>Cancel
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                }
            </div>
        </>

    );
}

