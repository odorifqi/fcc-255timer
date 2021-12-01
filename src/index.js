/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import { TimerControl } from "./timerLengthControl";
import { reducer } from "./reducer";
console.log(`You're in ${process.env.NODE_ENV} mode`);

const SW = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    sesSec: 60,
    sesMin: 25,
    sesMinDisp: 25,
    sesOn: false,
    breSec: 60,
    breMin: 5,
    breMinDisp: 5,
    breOn: false,
    timerType: "Session",
    timerOn: false,
    beep: null,
  });

  const handleLength = (e) => {
    if (!state.sesOn && !state.breOn) {
      dispatch({
        type: "SET_LENGTH",
        payload: {
          type: e.currentTarget.id.includes("break") ? "bre" : "ses",
          value: e.currentTarget.value === "+" ? 1 : -1,
        },
      });
    }
  };

  const handleInputLength = (e) => {
    if (!state.sesOn && !state.breOn) {
      if (e.currentTarget.value < 0 || e.currentTarget.value > 60) {
        warningVal();
        dispatch({
          type: "SET_INPUT_LENGTH",
          payload: {
            type: e.currentTarget.id.includes("break") ? "bre" : "ses",
            value: e.currentTarget.id.includes("break") ? 5 : 25,
          },
        });
      } else {
        dispatch({
          type: "SET_INPUT_LENGTH",
          payload: {
            type: e.currentTarget.id.includes("break") ? "bre" : "ses",
            value: parseInt(e.currentTarget.value) || "",
          },
        });
      }
    }
  };

  const startStop = () => {
    const cond = state.timerType === "Session" ? "sesOn" : "breOn";
    dispatch({
      type: "START_STOP",
      payload: { [cond]: !state[cond], timerOn: !state.timerOn },
    });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
    state.beep.pause();
    state.beep.currentTime = 0;
  };

  let beep = null;

  const setAudio = (audio) => {
    beep = audio;
  };

  const warningVal = () =>
    alert("value cannot be smaller than 1 or larger than 60");

  React.useEffect(() => {
    dispatch({ type: "SET_BEEP", payload: beep });
  }, []);

  React.useEffect(() => {
    let s;
    if (state.sesOn) {
      s = setInterval(() => dispatch({ type: "SES_SEC" }), 1000);

      if (state.sesSec === 59) {
        dispatch({ type: "SES_MIN" });
      }

      if (state.sesSec === 0) {
        dispatch({ type: "SES_SEC", payload: 60 });

        if (state.sesMin === 0) {
          dispatch({ type: "START_BREAK" });
          state.beep.play();
        }
      }
    }

    if (state.breOn) {
      s = setInterval(() => dispatch({ type: "BRE_SEC" }), 1000);

      if (state.breSec === 59) {
        dispatch({ type: "BRE_MIN" });
      }

      if (state.breSec === 0) {
        dispatch({ type: "BRE_SEC", payload: 60 });

        if (state.breMin === 0) {
          dispatch({ type: "START_SESSION" });
          state.beep.play();
        }
      }
    }

    return () => clearInterval(s);
  }, [state.sesSec, state.breSec, state.sesOn, state.breOn]);

  return (
    <div>
      <h1>25 + 5 Clock</h1>

      <TimerControl
        length={[state.breMinDisp, state.sesMinDisp]}
        onClick={handleLength}
        onChange={handleInputLength}
      />

      <div className="timer">
        <div className="timer-wrapper">
          <div id="timer-label">{state.timerType}</div>
          <div id="time-left">
            {state.timerType === "Session"
              ? state.sesMin.toString().padStart(2, "0")
              : state.breMin.toString().padStart(2, "0")}
            :
            {state.timerType === "Session"
              ? state.sesSec == 60
                ? "00"
                : state.sesSec.toString().padStart(2, "0")
              : state.breSec == 60
              ? "00"
              : state.breSec.toString().padStart(2, "0")}
          </div>
        </div>
      </div>
      <div className="button-div">
        {(!state.sesOn || !state.breOn) && (
          <button id="start_stop" className="button" onClick={startStop}>
            {state.timerOn
              ? "Pause"
              : state.timerType === "Session"
              ? state.sesSec === 60
                ? "Start"
                : "Resume"
              : state.breSec === 60
              ? "Start"
              : "Resume"}
          </button>
        )}

        <button
          id="reset"
          className="button"
          disabled={!state.sesSec}
          onClick={reset}
        >
          reset
        </button>
      </div>
      <audio
        id="beep"
        preload="auto"
        ref={(audio) => {
          setAudio(audio);
        }}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
};

ReactDOM.render(<SW />, document.getElementById("root"));
