import React from "react";
import ReactDOM from "react-dom";
import TimerButtons from "./Components/TimerButtons";
import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentSeconds: 0,
      currentMilliseconds: 0,
      currentMinutes: 0,
      isTimerActive: false,
      timerFunction: "",
      elapseEntry: [],
      totalMS: 0
    };
    this.intervalFunction = () => {
      if (this.state.currentSeconds === 60) {
        this.setState({
          currentSeconds: 0,
          currentMinutes: this.state.currentMinutes + 1
        });
      } else if (this.state.currentMilliseconds >= 99) {
        this.setState({
          currentMilliseconds: 0,
          currentSeconds: this.state.currentSeconds + 1
        });
      } else {
        this.setState({
          currentMilliseconds: this.state.currentMilliseconds + 1
        });
      }
    };
  }
  handleTimer = () => {
    let { isTimerActive, elapseEntry } = this.state;

    if (isTimerActive) {
      clearInterval(this.timer);
    } else {
      // const startTime = Date.now() - this.state.runningTime;
      this.timer = setInterval(this.intervalFunction, 10);
    }
    this.setState(state => {
      return {
        isTimerActive: !state.isTimerActive,
        elapseEntry: [...elapseEntry, new Date()]
      };
    });
  };

  resetTimer = () => {
    this.setState({
      currentSeconds: 0,
      currentMilliseconds: 0,
      currentMinutes: 0,
      isTimerActive: false,
      elapseEntry: []
    });
    clearInterval(this.timer);
  };
  componentDidMount() {
    let { isTimerActive } = this.state;
    if (isTimerActive) {
      this.startInterval = setInterval(this.timer(), 10);
    }
  }
  componentWillUnmount() {
    let { isTimerActive } = this.state;

    if (isTimerActive) {
      clearInterval(this.startInterval);
    }
  }
  render() {
    let {
      currentSeconds,
      currentMilliseconds,
      currentMinutes,
      elapseEntry
    } = this.state;

    return (
      <div className="App">
        <h1>React StopWatch</h1>
        <h2>By: Sheriff Ahmed</h2>
        <div className="center">
          <p className="Timer">
            {currentMinutes < 10 ? "0" : ""}
            {currentMinutes}:
            {currentSeconds < 10 ? "0" : ""}
            {currentSeconds}:
            {currentMilliseconds < 10 ? "0" : ""}
            {currentMilliseconds}
          </p>

          <TimerButtons
            HandleClick={this.handleTimer}
            timingEvents={elapseEntry}
            HandleReset={this.resetTimer}
          />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
