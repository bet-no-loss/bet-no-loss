import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Fade from "react-reveal";
import '../app/app.css'

class Header extends Component {
    render() {
        return (
            <header>
                <ParticlesBg type="circle" bg={true} color="#088C12"/>

                <div className="row banner">
                    <div className="banner-text">
                        <Fade bottom>
                            <h1 className="responsive-headline">Bet No Loss &#9971;</h1>
                        </Fade>
                        <Fade bottom duration={1200}>
                            <h3>Pari sportif sans perte de la mise &#128176;</h3>
                        </Fade>
                        <Fade bottom duration={2000}>
                            <ul className="social">
                                <a href="/app" className="btnApp">
                                    <button className="btn btn-dark btn-lg"><span className="appStyle">APP</span></button>
                                </a>
                            </ul>
                        </Fade>
                    </div>
                </div>

                <h3 className="scrolldown">
                    <a className="smoothscroll" href="#about">
                        &#11015;
                    </a>
                </h3>
            </header>
        );
    }
}

export default Header;