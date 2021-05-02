import React from 'react';
import '../app/app.css';

const Timeline = () => {
    return (
        <div>
            <div className="container py-5">
                    <h1 className="text-center" style={{color: '#088C12'}}>- Roadmap -</h1>
                <div className="row py-5">
                    <div className="col-md-12 pt-3">
                        <div className="main-timeline">
                            <div className="timeline">
                                <div href="#" className="timeline-content">
                                    <span className="timeline-year">2021</span>
                                    <h3 className="title">Lancement</h3>
                                    <p className="description">
                                        Etude approfondie du  projet
                                    </p>
                                    <p>
                                        Version  Testnet du projet
                                    </p>
                                </div>
                            </div>
                            <div className="timeline">
                                <a href="#" className="timeline-content">
                                    <span className="timeline-year">2022</span>
                                    <h3 className="title">Bet No Loss 1.0</h3>
                                    <p className="description">
                                        ICO / Crowdsale
                                    </p>
                                    <p className="description">
                                        Paris sportifs.
                                    </p>
                                </a>
                            </div>
                            <div className="timeline">
                                <a href="#" className="timeline-content">
                                    <span className="timeline-year">2023</span>
                                    <h3 className="title">Bet No Loss 2.0</h3>
                                    <p className="description">
                                        Publicité, Référencements Google Ads et Sponsoring.
                                    </p>
                                </a>
                            </div>
                            <div className="timeline">
                                <a href="#" className="timeline-content">
                                    <span className="timeline-year">2024</span>
                                    <h3 className="title">Bet No Loss 3.0</h3>
                                    <p className="description">
                                        NFT & artist
                                    </p>
                                    <p className="description">
                                        Différents types de paris.
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Timeline;