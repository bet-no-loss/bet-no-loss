import React, { Component } from "react";
import ReactGA from "react-ga";
import $ from "jquery";
import "./home.css";
import Header from "../header";
import Timeline from "../timeline";
import How from "./how";
import Doc from "../doc";
import Team from "../team";
import Questions from "../questions";
/*import Footer from "./Footer";
import About from "./About";
import Resume from "./Resume";
import Contact from "./Contact";
import Portfolio from "./Portfolio";*/

class Home extends Component {
    /*constructor(props) {
        super(props);
        this.state = {
            foo: "bar",
            resumeData: {}
        };

        ReactGA.initialize("UA-110570651-1");
        ReactGA.pageview(window.location.pathname);
    }

    getResumeData() {
        $.ajax({
            url: "./resumeData.json",
            dataType: "json",
            cache: false,
            success: function(data) {
                this.setState({ resumeData: data });
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
                alert(err);
            }
        });
    }

    componentDidMount() {
        this.getResumeData();
    }*/

    render() {
        return (
            <div className="App">
                <Header />
                <How/>
                <Doc/>
                <Timeline/>
                <Team/>
                <Questions/>
                {/*<About data={this.state.resumeData.main} />
                <Resume data={this.state.resumeData.resume} />
                <Portfolio data={this.state.resumeData.portfolio} />
                <Contact data={this.state.resumeData.main} />
                <Footer data={this.state.resumeData.main} />*/}
            </div>
        );
    }
}

export default Home;