/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import ReactDOM from "react-dom";
export const TimerLengthControl = (props) => {
  return (
    <div className="length-control">
      <div id={props.titleID}>{props.title}</div>
      <button
        className="btn-level"
        id={`${props.typeId}-decrement`}
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
        id={`${props.typeId}-increment`}
        onClick={props.onClick}
        value="+"
      >
        <i className="fa fa-arrow-up fa-2x" />
      </button>
    </div>
  );
};
