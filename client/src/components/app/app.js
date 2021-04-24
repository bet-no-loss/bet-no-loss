import Play from '../../contracts/Play.json'
import DAI from '../../contracts/DAI.json'
import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar'
import Main from './main'
import Web3 from 'web3';
import './app.css';
import Footer from "../Footer/Footer";

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component {

    async componentWillMount() {
        await this.init()
    }

    async init() {
        // Detect Metamask
        const metamaskInstalled = typeof window.web3 !== 'undefined'
        this.setState({ metamaskInstalled})
        if(metamaskInstalled){
            await this.loadWeb3()
            await this.loadBlockchainData()
        }
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({ currentAccount: accounts[0] })
        console.log('account',accounts)
        // Network ID
        const networkId = await web3.eth.net.getId()
        const networkData = Play.networks[networkId]
        const playNetworkData = DAI.networks[networkId]
        if(networkData) {
            // Assign contracts
            const play = new web3.eth.Contract(Play.abi, networkData.address)
            this.setState({ play })
            const dai = new web3.eth.Contract(DAI.abi, playNetworkData.address)
            this.setState({ dai })
            // Get files amount
            const eventsCount = await play.methods.eventCount().call()
            this.setState({ eventsCount })

            console.log("DAI", this.state.dai)

            // Load files&sort by the newest
            for (let i = eventsCount; i >= 1; i--) {
                const event = await play.methods.sportEvents(i).call()
                this.setState({
                    sportEvents: [...this.state.sportEvents, event]
                })
            }
        } else {
            window.alert('DStorage contract not deployed to detected network.')
        }
    }




    // Get file from user
    captureFile = event => {
        event.preventDefault()

        const file = event.target.files[0]
        const reader = new window.FileReader()

        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            this.setState({
                buffer: Buffer(reader.result),
            })
            console.log('buffer', this.state.buffer)
        }
    }

    addSportEvent = (description, teamA, teamB, date) => {
        console.log("Submitting file to IPFS...")

        // Add file to the IPFS
        ipfs.add(this.state.buffer, (error, result) => {
            console.log('IPFS result', result.size)
            if(error) {
                console.error(error)
                return
            }

            this.setState({ loading: true })

            this.state.play.methods.addSportEvent(result[0].hash, description, teamA, teamB,  date).send({ from: this.state.currentAccount }).on('transactionHash', (hash) => {
                this.setState({
                    loading: false,
                })
                window.location.reload()
            }).on('error', (e) =>{
                window.alert('Error')
                this.setState({loading: false})
            })
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            account: undefined,
            currentAccount: undefined,
            adminAddress: '0xCcabbBE53596DE0db359E998587a6Bb226AA5481',
            play: null,
            dai: null,
            sportEvents: [],
            loading: false,
        }
        this.addSportEvent = this.addSportEvent.bind(this)
        this.captureFile = this.captureFile.bind(this)
    }


    render() {
        if(window.ethereum)
            window.ethereum.on("accountsChanged", function () {
            const accounts = window.ethereum.enable();
            window.location.reload()
            this.setState({currentAccount: accounts[0]})
        })
        return (
            <div>
                <Navbar currentAccount={this.state.currentAccount} dai={this.state.dai} />
                { this.state.loading
                    ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
                    : <Main
                        sportEvents={this.state.sportEvents}
                        captureFile={this.captureFile}
                        addSportEvent={this.addSportEvent}
                        adminAddress={this.state.adminAddress}
                        currentAccount={this.state.currentAccount}
                    />
                }
                <Footer/>
            </div>
        );
    }
}

export default App;