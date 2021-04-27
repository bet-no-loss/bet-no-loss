import React, { Component } from 'react';
import moment from 'moment'

class Main extends Component {
    state = {
        show: false,
        teamA: '',
        teamB: '',
        value: undefined
    };

    showModal = () => {
        this.setState({
            show: true
        });
    };

    onClose = () => {
        this.setState({show: false});
    };

    handleChange = (e)=> {
        e.preventDefault()
        this.setState({value: e.target.value})
    }

    handleSubmit = (e)=> {
        e.preventDefault()
        console.log('')
    }


    render() {
        const {addSportEvent, currentAccount, adminAddress, adminAddress2} = this.props;
        const {value, teamA, teamB} = this.state;


        console.log('admin',this.props.adminAddress)
        console.log('current', this.props.currentAccount)
        return (
            <div className="container-fluid mt-5 text-center">
                <div className="row" style={{backgroundColor: 'white'}}>
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
                        <div className="content" style={{backgroundColor: 'white'}}>
                            <p>&nbsp;</p>
                                {currentAccount === adminAddress2 && adminAddress ?
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
                                        <button type="submit" className="btn-primary btn-block mt-5 "><b>Enjoy!</b></button>
                                    </form>

                            </div>) : ''
                                }
                            <p>&nbsp;</p>

                            {this.props.sportEvents.map((sportEvent, index) => {
                                return (
                                    <div key={index} className="container">
                                        <div className="cardy mb-3">
                                            <div className="row no-gutters">
                                                <div className="col-md-6 d-flex flex-row align-items-center justify-content-center">
                                                    <div className="col-4">
                                                        <span className="fontTeam">{sportEvent.teamA}</span>
                                                    </div>
                                                    <div className="col-4">
                                                        <img
                                                            src={`https://ipfs.infura.io/ipfs/${sportEvent.fileHash}`}
                                                            style={{maxWidth: '120px'}}/>
                                                    </div>
                                                    <div className="col-4">
                                                        <span className="fontTeam">{sportEvent.teamB}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 text-center">
                                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                                        <div>
                                                            <time>{sportEvent.date}</time>
                                                        </div>
                                                        <div className='d-flex flex-column'>
                                                            <div className="btn btn-default">
                                                                <span>Pari - </span>{sportEvent.eventId}
                                                            </div>
                                                            <div className="pb-4">
                                                                <span className="fontDescription">
                                                                    {sportEvent.description}
                                                                </span>
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
                                                        <div className="card-title">
                                                            <span className="pr-2">&#127942;</span> 3,500 <span>$</span>
                                                        </div>
                                                        <form onSubmit={this.handleSubmit}>
                                                            <div className="card-text d-flex flex-row col-12 mt-5">
                                                                <div className="col-4">
                                                                    <div>Sélectionner cet équipe :</div>
                                                                    <div className="fontTeam">{sportEvent.teamA}</div>
                                                                    <input
                                                                        type="radio"
                                                                        value={sportEvent.teamA}
                                                                        checked={value === sportEvent.teamA}
                                                                        onChange={this.handleChange}
                                                                    />
                                                                </div>
                                                                <div className="col-4">
                                                                    <img
                                                                        src={`https://ipfs.infura.io/ipfs/${sportEvent.fileHash}`}
                                                                        style={{maxWidth: '120px'}}/>
                                                                </div>
                                                                <div className="col-4">
                                                                    <div>Sélectionner cet équipe :</div>
                                                                    <div className="fontTeam">{sportEvent.teamB}</div>
                                                                    <input
                                                                        type="radio"
                                                                        value={sportEvent.teamB}
                                                                        checked={value === sportEvent.teamB}
                                                                        onChange={this.handleChange}
                                                                    />
                                                                </div>

                                                            </div>
                                                            <div className="card-body mt-5 col-12 d-flex flex-row align-items-center justify-content-center">
                                                                <div className="mb-3 col-4">
                                                                    <span className="montantBet">Montant à parier :</span>
                                                                </div>
                                                                <div className="col-4">

                                                                    <input
                                                                        type="text"
                                                                        className="form-control text-right"
                                                                        id="basic-url"
                                                                        aria-describedby="basic-addon3"
                                                                        placeholder="0 Dai"
                                                                    />
                                                                </div>
                                                                <div className="col-4 ">
                                                                    <span className="inputTeam">pour {value}  &#128640;</span>
                                                                </div>
                                                            </div>
                                                            <div className="mt-5">
                                                                <button href="#" className="btn btn-lg btn-primary mr-4">Confirm</button>
                                                                <button type='button' className="btn btn-lg btn-outline-danger"
                                                                        onClick={e => {
                                                                            this.onClose(e)
                                                                        }}>Cancel
                                                                </button>
                                                            </div>
                                                        </form>

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