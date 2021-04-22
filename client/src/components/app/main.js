import React, { Component } from 'react';
import moment from 'moment'

class Main extends Component {

    render() {
        return (
            <div className="container-fluid mt-5 text-center">
                <div className="row" style={{backgroundColor: 'white'}}>
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
                        <div className="content" style={{backgroundColor: 'white'}}>
                            <p>&nbsp;</p>
                            <div className="card mb-3 mx-auto bg-dark" style={{ maxWidth: '512px' }}>
                                <h2 className="text-white text-monospace bg-dark"><b><ins>Admin</ins></b></h2>
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    const description = this.fileDescription.value
                                    const teamA = this.fileTeamA.value
                                    const teamB = this.fileTeamB.value
                                    const date = this.date.value
                                    this.props.addSportEvent(description, teamA, teamB, date)
                                }} >
                                    <div className="form-group">
                                        <br></br>
                                        <input
                                            id="fileDescription"
                                            type="text"
                                            ref={(input) => { this.fileDescription = input }}
                                            className="form-control text-monospace"
                                            placeholder="description..."
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <br></br>
                                        <input
                                            id="fileTeamA"
                                            type="text"
                                            ref={(input) => { this.fileTeamA = input }}
                                            className="form-control text-monospace"
                                            placeholder="team A..."
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <br></br>
                                        <input
                                            id="fileTeamB"
                                            type="text"
                                            ref={(input) => { this.fileTeamB = input }}
                                            className="form-control text-monospace"
                                            placeholder="team B..."
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <br></br>
                                        <input
                                            id="fileTeamB"
                                            type="text"
                                            ref={(input) => { this.date = input }}
                                            className="form-control text-monospace"
                                            placeholder="date du match"
                                            required />
                                    </div>
                                    <input type="file" onChange={this.props.captureFile} className="text-white text-monospace"/>
                                    <button type="submit" className="btn-primary btn-block"><b>Enjoy!</b></button>
                                </form>
                            </div>
                            <p>&nbsp;</p>
                            <table className="table-sm table-bordered text-monospace" style={{ width: '1000px', maxHeight: '450px'}}>
                                <thead style={{ 'fontSize': '15px' }}>
                                <tr className="bg-dark text-white">
                                    <th scope="col" style={{ width: '10px'}}>id</th>
                                    <th scope="col" style={{ width: '230px'}}>description</th>
                                    <th scope="col" style={{ width: '120px'}}>team A</th>
                                    <th scope="col" style={{ width: '90px'}}>team B</th>
                                    <th scope="col" style={{ width: '90px'}}>date</th>
                                    <th scope="col" style={{ width: '90px'}}>date de création</th>
                                    <th scope="col" style={{ width: '120px'}}>uploader/view</th>
                                    <th scope="col" style={{ width: '120px'}}>hash/view/get</th>
                                </tr>
                                </thead>
                                { this.props.sportEvents.map((sportEvent, key) => {
                                    return(
                                        <thead style={{ 'fontSize': '12px' }} key={key}>
                                        <tr>
                                            <td>{sportEvent.eventId}</td>
                                            <td>{sportEvent.description}</td>
                                            <td>{sportEvent.teamA}</td>
                                            <td>{sportEvent.teamB}</td>
                                            <td>{sportEvent.date}</td>
                                            {/*<td>{moment.unix(sportEvent.uploadTime).format('h:mm:ss A M/D/Y')}</td>*/}
                                            {/*<td>
                                                <a
                                                    href={"https://etherscan.io/address/" + sportEvent.uploader}
                                                    rel="noopener noreferrer"
                                                    target="_blank">
                                                    {sportEvent.uploader.substring(0,10)}...
                                                </a>
                                            </td>*/}
                                            <td>
                                                <a
                                                    href={"https://ipfs.infura.io/ipfs/" + sportEvent.fileHash}
                                                    rel="noopener noreferrer"
                                                    target="_blank">
                                                    <img src={`https://ipfs.infura.io/ipfs/${sportEvent.fileHash}`} style={{ maxWidth: '120px'}}/>
                                                </a>
                                            </td>
                                        </tr>
                                        </thead>
                                    )
                                })}
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default Main;