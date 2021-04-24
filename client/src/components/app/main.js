import React, { Component } from 'react';
import moment from 'moment'

class Main extends Component {
    state = {
        show: false
    };

    showModal = e => {
        this.setState({
            show: true
        });
    };

    onClose = e => {
        this.setState({show: false});
    };



    render() {
        const {addSportEvent, currentAccount, adminAddress} = this.props;


        console.log('admin',this.props.adminAddress)
        console.log('current', this.props.currentAccount)
        return (
            <div className="container-fluid mt-5 text-center">
                <div className="row" style={{backgroundColor: 'white'}}>
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
                        <div className="content" style={{backgroundColor: 'white'}}>
                            <p>&nbsp;</p>
                                {currentAccount === adminAddress &&
                                (<div className="card mb-3 mx-auto bg-dark" style={{ maxWidth: '512px' }}>
                                <h2 className="text-white text-monospace bg-dark"><b><ins>Admin</ins></b></h2>
                                    <form onSubmit={(e) => {
                                        e.preventDefault()
                                        const description = this.fileDescription.value
                                        const teamA = this.fileTeamA.value
                                        const teamB = this.fileTeamB.value
                                        const date = this.date.value
                                        addSportEvent(description, teamA, teamB, date)
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

                            </div>)
                                }
                            <p>&nbsp;</p>

                            {this.props.sportEvents.map((sportEvent, key) => {
                                return (
                                    <div className="container" key={key}>
                                        <div className="cardy mb-3">
                                            <div className="row no-gutters">
                                                <div className="col-md-6 text-center">
                                                    <div className="d-flex flex-row">
                                                        <div>{sportEvent.teamA}</div>
                                                        <div>
                                                            <img
                                                                src={`https://ipfs.infura.io/ipfs/${sportEvent.fileHash}`}
                                                                style={{maxWidth: '120px'}}/>
                                                        </div>
                                                        <div>{sportEvent.teamB}</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 text-center">
                                                    <div className="d-flex flex-column">
                                                        <div>
                                                            <time>{sportEvent.date}</time>
                                                        </div>
                                                        <div className='d-flex flex-column'>
                                                            <div className="btn btn-default">
                                                                {sportEvent.eventId}
                                                            </div>
                                                            <div className="pb-4">
                                                                <strong>
                                                                    {sportEvent.description}
                                                                </strong>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button
                                                                className="btn btn-primary btn-lg rounded-pill"
                                                                style={{width: "170px"}}
                                                                onClick={e => {this.showModal(e)}}
                                                            >
                                                                Bet
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/*Modal*/}
                                        {this.state.show &&
                                            <div className="position-absolute zmodal position-fixed ">
                                                <div className="card taille">
                                                    <div className="card-header">
                                                        BET
                                                    </div>
                                                    <div className="card-body mt-5">
                                                        <h5 className="card-title">3,500 <span>$</span></h5>
                                                        <div className="card-text">
                                                            <div className="d-flex flex-column mt-5">
                                                                <a>{sportEvent.teamA}</a>
                                                                <div>
                                                                    <img
                                                                        src={`https://ipfs.infura.io/ipfs/${sportEvent.fileHash}`}
                                                                        style={{maxWidth: '120px'}}/>
                                                                </div>
                                                                <p>{sportEvent.teamB}</p>
                                                            </div>
                                                        </div>
                                                        <div className="card-body">
                                                            <label htmlFor="basic-url" className="form-label labelAmount">Amount:</label>
                                                            <div className="mb-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control text-right w-50"
                                                                    id="basic-url"
                                                                    aria-describedby="basic-addon3"
                                                                    placeholder="0,00 $"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="mt-5">
                                                            <a href="#" className="btn btn-lg btn-primary mr-4">Confirm</a>
                                                            <button type='button' className="btn btn-lg btn-outline-danger"
                                                                    onClick={e => {
                                                                        this.onClose(e)
                                                                    }}>Cancel
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                            })
                            }

                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default Main;