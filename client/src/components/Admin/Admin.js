import React, {useContext, useEffect, useState} from 'react';
import SportEventForm from "../SportEventsForm/SportEventForm";
import Web3 from "web3";
import ipfsImage from "../../contracts/ipfsImage.json";

import Web3Context from "../Web3context";

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })


const Admin = () => {
    const [buffer, setBuffer] = useState(null);
    const [ihash, setIhash] = useState('');
    const [eventName, setEventName] = useState('');
    const [teamA, setTeamA] = useState('');
    const [teamB, setTeamB] = useState('');
    const [account, setAccount] = useState('');

    const web3Context = useContext(Web3Context);
    const { web3, accounts, contract, currentAccount, sportEvent } = web3Context;

    console.log('accounts Admin', accounts);
    console.log('contract Admin', contract);
    console.log('sportEvent', sportEvent);

    // const componentWillMount = async ()=> {
    //     await loadWeb3()
    //     await loadBlockchainData()
    // }
    //
    // const loadBlockchainData = async ()=> {
    //     const web3 = window.web3
    //     setAccount(accounts[0])
    //     const networkId = await web3.eth.net.getId()
    //     const networkData = ipfsImage.networks[networkId]
    //     if(networkData) {
    //
    //     } else {
    //         window.alert('smart contract not deployed to detected network')
    //     }
    // }
    //
    // const loadWeb3 = async ()=> {
    //     if(window.ethereum) {
    //         window.web3 = new Web3(window.ethereum)
    //         await window.ethereum.enable()
    //     } if (window.web3) {
    //         window.web3 = new Web3(window.web3.currentProvider)
    //     } else {
    //         window.alert('please use metamask')
    //     }
    // }

    const getIHash = async ()=> {
        try {
            const iHash = await contract.methods.get().call()
            console.log('hash call', iHash)

        } catch (error) {
            console.log('error hash', error)
        }
    }


    const captureFile = (event)=> {
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file)
        reader.onloadend = ()=> {
            setBuffer(Buffer(reader.result))
        }
    }

    // Example hash: "QmbY96forHbmMgbbF9YVs54Gb8dhGyV3oAqo91bqVexH2c"
    // Example url: https://ipfs.infura.io/ipfs/QmbY96forHbmMgbbF9YVs54Gb8dhGyV3oAqo91bqVexH2c
    const handleSubmit = async (event)=> {
        event.preventDefault()
        console.log('Submit ...')
        ipfs.add(buffer, (error, result)=> {
            console.log('ipfs result', result)
            /*const ihash = result[0].hash
            setIhash(ihash)*/
            if(error) {
                console.error(error)
                return
            }
            contract.methods.set(ihash).send({from: accounts}).then((r)=> {
                setIhash(ihash);
            });
        })
    }

    useEffect(() => {
    }, []);

    return (
        <div>
           <h1>Admin page</h1>
            <div className="container">
                <SportEventForm />
            </div>

            {/*Formulaire création event*/}
            <div className="container my-5">

                <div className="card">

                    <h5 className="card-header info-color white-text text-center py-4">
                        <strong>Créer un pari sportif</strong>
                    </h5>


                    <div className="card-body">


                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Titre</label>
                                    <input
                                        type="text"
                                        className="form-control mx-auto w-100"
                                        value={eventName}
                                        onChange={(e)=> setEventName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Image</label>
                                    <input
                                        className="form-control mx-auto w-100"
                                        type='file'
                                        onChange={captureFile}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Equipe A</label>
                                    <input
                                        type="text"
                                        className="form-control mx-auto w-100"
                                        value={teamA}
                                        onChange={(e)=> setTeamA(e.target.value)}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Equipe B</label>
                                    <input
                                        type="text"
                                        className="form-control mx-auto w-100"
                                        value={teamB}
                                        onChange={(e)=> setTeamB(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button className="btn btn-outline-info btn-rounded btn-block z-depth-0 my-4 waves-effect" type="submit">Send</button>

                        </form>

                        <img src={`https://ipfs.infura.io/ipfs/${ihash}`} alt="chat"/>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Admin;