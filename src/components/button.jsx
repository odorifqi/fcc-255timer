/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react";

const MyButton = ({ compId, handleClick, children }) => {
  return (
    <button id={compId} className="button" onClick={handleClick}>
      {children}
    </button>
  );
};

const withStartStop =
  (Component) =>
  ({ timerOn, timerType, sesSec, breSec, ...props }) =>
    (
      <Component compId="start_stop" {...props}>
        {timerOn
          ? "Pause"
          : timerType === "Session"
          ? sesSec === 60
            ? "Start"
            : "Resume"
          : breSec === 60
          ? "Start"
          : "Resume"}
      </Component>
    );

const withReset = (Component) => (props) =>
  (
    <Component compId="reset" {...props}>
      reset
    </Component>
  );

const StartStopBtn = withStartStop(MyButton);
const ResetBtn = withReset(MyButton);

export { StartStopBtn, ResetBtn };
