/* eslint-disable react/prop-types */
import React from "react";

export const TimeDisplay = (props) => (
  <div id="time-left">
    {props.timerType === "Session"
      ? props.sesMin.toString().padStart(2, "0")
      : props.breMin.toString().padStart(2, "0")}
    :
    {props.timerType === "Session"
      ? props.sesSec == 60
        ? "00"
        : props.sesSec.toString().padStart(2, "0")
      : props.breSec == 60
      ? "00"
      : props.breSec.toString().padStart(2, "0")}
  </div>
);
