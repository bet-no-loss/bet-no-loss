import React from 'react';
import cdp1 from '../../assets/image/cdp1.png';
import cdp2 from '../../assets/image/cdp2.png';
import dev1 from '../../assets/image/dev1.png';
import dev2 from '../../assets/image/dev2.png';
import dev3 from '../../assets/image/dev3.png';

const Team = () => {
    return (
        <div className="container-fluid my-5 bg-success">
            <h2 className="p-3 text-white font-weight-bolder">&#127942; - L'équipe sportive BNL - &#127942;</h2>
            <div className="d-flex flex-row py-5">
                <div className="w-25">
                    <img src={cdp1} alt="team1" className="rounded-circle" width="140" height="140"/>
                    <h2 className="TextTeam">Diane</h2>
                    <p className="TextTeam">Chef de projet</p>
                </div>
                <div className="w-25">
                    <img src={cdp2} alt="team2" className="rounded-circle" width="140" height="140"/>
                    <h2 className="TextTeam">Mohamed</h2>
                    <p className="TextTeam">Chef de projet</p>
                </div>
                <div className="w-25">
                    <img src={dev1} alt="team3" className="rounded-circle" width="140" height="140"/>
                    <h2 className="TextTeam">Liedel</h2>
                    <p className="TextTeam">Développeur blockchain</p>
                </div>
                <div className="w-25">
                    <img src={dev2} alt="team4" className="rounded-circle" width="140" height="140"/>
                    <h2 className="TextTeam">Tantely</h2>
                    <p className="TextTeam">Développeur blockchain</p>
                </div>
                <div className="w-25">
                    <img src={dev3} alt="team5" className="rounded-circle" width="140" height="140"/>
                    <h2 className="TextTeam">Eric</h2>
                    <p className="TextTeam">Développeur blockchain</p>
                </div>
            </div>
        </div>
    );
};

export default Team;