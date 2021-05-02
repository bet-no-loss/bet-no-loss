import React from 'react';

const Doc = () => {
    return (
        <div className="container py-5">
            <div className="row align-content-md-stretch">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-white bg-success rounded-3">
                        <h2>BNL Docs</h2>
                        <p>&#128218;</p>
                        <button className="btn btn-outline-light">Voir</button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-light border rounded-3">
                        <h2>BNL White paper</h2>
                        <p>&#128196;</p>
                        <button className="btn btn-outline-secondary">
                            <a href="https://docs.google.com/document/d/1e_dgJMabihdXI0BpAaSZSR5D7ioXc0MDQY0OamUTVtc/edit">Lire</a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Doc;