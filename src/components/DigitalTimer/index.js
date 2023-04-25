import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timeInMinutes: 25 * 60,
    isTimerRunning: false,
    isTimerStartOrPaused: false,
  }

  renderTimer = () => {
    const {isTimerRunning} = this.state
    console.log(isTimerRunning)
    if (isTimerRunning) {
      this.timerID = setInterval(this.updateTimer, 1000)
    } else {
      clearInterval(this.timerID)
    }
  }

  decreaseTimer = () => {
    const {timeInMinutes} = this.state
    if (timeInMinutes > 60) {
      this.setState({timeInMinutes: timeInMinutes - 60})
    }
  }

  increaseTimer = () => {
    const {timeInMinutes} = this.state
    if (timeInMinutes < 60 * 60) {
      this.setState({timeInMinutes: timeInMinutes + 60})
    }
  }

  toggleTimer = async () => {
    const {isTimerRunning} = this.state
    await this.setState({isTimerRunning: !isTimerRunning})
    this.setState({isTimerStartOrPaused: true})
    this.renderTimer()
  }

  updateTimer = () => {
    const {timeInMinutes, isTimerRunning} = this.state
    if (timeInMinutes === 0) {
      clearInterval(this.timerID)
      this.setState({isTimerRunning: !isTimerRunning})
      this.setState({isTimerStartOrPaused: false})
    } else {
      this.setState({timeInMinutes: timeInMinutes - 1})
    }
  }

  resetTimer = () => {
    this.setState({
      timeInMinutes: 25 * 60,
      isTimerRunning: false,
      isTimerStartOrPaused: false,
    })
    clearInterval(this.timerID)
  }

  runningTimer = timeInMinutes => {
    const minutes = Math.floor(timeInMinutes / 60)
    const seconds = timeInMinutes % 60
    const strMinutes = minutes > 9 ? `${minutes}` : `0${minutes}`
    const strSeconds = seconds > 9 ? `${seconds}` : `0${seconds}`
    return `${strMinutes}:${strSeconds}`
  }

  render() {
    const {isTimerRunning, timeInMinutes, isTimerStartOrPaused} = this.state
    const setTimerTime = Math.floor(timeInMinutes / 60)
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    return (
      <div className="app-bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-card-container">
          <div className="timer-container">
            <div className="timer-card">
              <p className="timer">{this.runningTimer(timeInMinutes)}</p>
              <p className="timer-status">
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="timer-controls-container">
            <div className="start-stop-container">
              <button
                className="button"
                type="button"
                onClick={this.toggleTimer}
              >
                <img
                  className="play-img"
                  src={startOrPauseImageUrl}
                  alt={startOrPauseAltText}
                />
                <p className="text">{isTimerRunning ? 'Pause' : 'Start'}</p>
              </button>
              <button
                className="button"
                type="button"
                onClick={this.resetTimer}
              >
                <img
                  className="reset-img"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <p className="text">Reset</p>
              </button>
            </div>
            <p className="set-timer-txt">Set Timer Limit</p>
            <div className="set-timer-container">
              <button
                className="button add-btn"
                type="button"
                onClick={
                  !isTimerRunning && !isTimerStartOrPaused
                    ? this.decreaseTimer
                    : undefined
                }
              >
                -
              </button>
              <p className="set-timer">{setTimerTime}</p>
              <button
                className="button add-btn"
                type="button"
                onClick={
                  !isTimerRunning && !isTimerStartOrPaused
                    ? this.increaseTimer
                    : undefined
                }
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
