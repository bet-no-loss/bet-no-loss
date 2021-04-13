import React from 'react';
import BetList from "../pages/Bets/BetList";

const Account = () => {
    return (
        <div className="container">
            <h1 className="text-left primaryColor mt-5"><strong>Mon compte </strong></h1>
            <p className="text-left primaryColor">Account overview</p>
            <div className="mt-5">
                <div
                    className="bglogo text-white container "
                    style={{height: "160px"}}
                >
                    <h3 className="card-text pt-3 display-5"><strong>
                        Assets</strong>
                    </h3>
                    <div className="d-flex row justify-content-center display-4">
                        <p className="card-text">0</p>
                        <span className="pl-1">DAI</span>
                    </div>

                </div>
            </div>
            <form className="w-50 d-flex flex-column mt-5 mx-auto">
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form5Example1">Earnings Available</label>
                    <input type="text" id="form5Example1" className="form-control w-100 ml-0"/>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form5Example2">Enter Amount to Withdraw</label>
                    <input type="email" id="form5Example2" className="form-control w-100 ml-0"/>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4">Confirm</button>
            </form>
            <div className="myBets">
                <h2 className="text-left pt-5">Ma liste:</h2>
                <BetList />
            </div>
        </div>
    );
};

export default Account;