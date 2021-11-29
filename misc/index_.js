/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";

const accurateInterval = function (fn, time) {
  var cancel, nextAt, timeout, wrapper;
  nextAt = new Date().getTime() + time;
  timeout = null;
  wrapper = function () {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return fn();
  };
  cancel = function () {
    return clearTimeout(timeout);
  };
  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  return {
    cancel: cancel,
  };
};

const TimerLengthControl = (props) => {
  return (
    <div className="length-control">
      <div id={props.titleID}>{props.title}</div>
      <button
        className="btn-level"
        id={props.minID}
        onClick={props.onClick}
        value="-"
      >
        <i className="fa fa-arrow-down fa-2x" />
      </button>
      <div className="btn-level" id={props.lengthID}>
        {props.length}
      </div>
      <button
        className="btn-level"
        id={props.addID}
        onClick={props.onClick}
        value="+"
      >
        <i className="fa fa-arrow-up fa-2x" />
      </button>
    </div>
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case "lengthControl":
    case "timerControl":
    case "beginCountDown":
    case "decrementTimer":
    case "phaseControl":
    case "warning":
    case "buzzer":
    case "switchTimer":
    case "clockify":
    case "reset":
      return { ...state, ...action.payload };

    default:
      throw new Error();
  }
};

const Timer = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    brkLength: 5,
    seshLength: 25,
    timerState: "stopped",
    timerType: "Session",
    timer: 1500,
    intervalID: "",
    alarmColor: { color: "white" },
    audioBeep: null,
  });

  const setBrkLength = (e) => {
    lengthControl(
      "brkLength",
      e.currentTarget.value,
      state.brkLength,
      "Session"
    );
  };

  const setSeshLength = (e) => {
    lengthControl(
      "seshLength",
      e.currentTarget.value,
      state.seshLength,
      "Break"
    );
  };

  const timerControl = () => {
    if (state.timerState === "stopped") {
      beginCountDown();
      dispatch({ type: "timerControl", payload: { timerState: "running" } });
    } else {
      dispatch({ type: "timerControl", payload: { timerState: "stopped" } });

      if (state.intervalID) {
        state.intervalID.cancel();
      }
    }
  };

  const lengthControl = (stateToChange, sign, currentLength, timerType) => {
    if (state.timerState === "running") {
      return;
    }
    if (state.timerType === timerType) {
      if (sign === "-" && currentLength !== 1) {
        dispatch({
          type: "lengthControl",
          payload: { [stateToChange]: currentLength - 1 },
        });
      } else if (sign === "+" && currentLength !== 60) {
        dispatch({
          type: "lengthControl",
          payload: { [stateToChange]: currentLength + 1 },
        });
      }
    } else if (sign === "-" && currentLength !== 1) {
      dispatch({
        type: "lengthControl",
        payload: {
          [stateToChange]: currentLength - 1,
          timer: currentLength * 60 - 60,
        },
      });
    } else if (sign === "+" && currentLength !== 60) {
      dispatch({
        type: "lengthControl",
        payload: {
          [stateToChange]: currentLength + 1,
          timer: currentLength * 60 + 60,
        },
      });
    }
  };

  const beginCountDown = () => {
    dispatch({
      type: "beginCountDown",
      payload: {
        intervalID: accurateInterval(() => {
          decrementTimer();
          phaseControl();
        }, 1000),
      },
    });
  };

  const decrementTimer = () => {
    dispatch({
      type: "decrementTimer",
      payload: { timer: state.timer - 1 },
    });
  };

  const phaseControl = () => {
    let timer = state.timer;
    warning(timer);
    // buzzer(timer);
    if (timer < 0) {
      if (state.intervalID) {
        state.intervalID.cancel();
      }
      if (state.timerType === "Session") {
        beginCountDown();
        switchTimer(state.brkLength * 60, "Break");
      } else {
        beginCountDown();
        switchTimer(state.seshLength * 60, "Session");
      }
    }
  };

  const clockify = () => {
    let minutes = Math.floor(state.timer / 60);
    let seconds = state.timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  };

  const warning = (_timer) => {
    dispatch({
      type: "warning",
      payload:
        _timer < 61
          ? { alarmColor: { color: "#a50d0d" } }
          : { alarmColor: { color: "white" } },
    });
  };

  // const buzzer = (_timer) => {
  //   if (_timer === 0) {
  //     state.audioBeep.play();
  //   }
  // };

  const switchTimer = (num, str) => {
    dispatch({
      type: "switchTimer",
      payload: {
        timer: num,
        timerType: str,
        alarmColor: { color: "white" },
      },
    });
  };

  const reset = () => {
    dispatch({
      type: "reset",
      payload: {
        brkLength: 5,
        seshLength: 25,
        timerState: "stopped",
        timerType: "Session",
        timer: 1500,
        intervalID: "",
        alarmColor: { color: "white" },
      },
    });
    if (state.intervalID) {
      state.intervalID.cancel();
    }
    // state.audioBeep.pause();
    // state.audioBeep.currentTime = 0;
  };

  return (
    <div>
      <div className="main-title">25 + 5 Clock</div>
      <TimerLengthControl
        addID="break-increment"
        length={state.brkLength}
        lengthID="break-length"
        minID="break-decrement"
        onClick={setBrkLength}
        title="Break Length"
        titleID="break-label"
      />
      <TimerLengthControl
        addID="session-increment"
        length={state.seshLength}
        lengthID="session-length"
        minID="session-decrement"
        onClick={setSeshLength}
        title="Session Length"
        titleID="session-label"
      />
      <div className="timer" style={state.alarmColor}>
        <div className="timer-wrapper">
          <div id="timer-label">{state.timerType}</div>
          <div id="time-left">{clockify()}</div>
        </div>
      </div>
      <div className="timer-control">
        <button id="start_stop" onClick={timerControl}>
          <i className="fa fa-play fa-2x" />
          <i className="fa fa-pause fa-2x" />
        </button>
        <button id="reset" onClick={reset}>
          <i className="fa fa-refresh fa-2x" />
        </button>
      </div>

      {/* <audio
        id="beep"
        preload="auto"
        ref={(audio) => {
          state.audioBeep = audio;
        }}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      /> */}
    </div>
  );
};

ReactDOM.render(<Timer />, document.getElementById("root"));

/* eslint-disable no-undef */
module.hot.accept();
