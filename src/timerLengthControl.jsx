/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import ReactDOM from "react-dom";

// export
const TimerLengthControl = (props) => {
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
        <input
          type="number"
          name=""
          id={props.typeId}
          min={1}
          max={60}
          value={props.length}
          onChange={props.onChange}
        />
        {/* {props.length} */}
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

const BreakControl = ({ length, onClick, onChange }) => (
  <TimerLengthControl
    typeId="break"
    length={length}
    lengthID="break-length"
    onClick={onClick}
    onChange={onChange}
    title="Break Length"
    titleID="break-label"
  />
);

const SessionControl = ({ length, onClick, onChange }) => (
  <TimerLengthControl
    typeId="session"
    length={length}
    lengthID="session-length"
    onClick={onClick}
    onChange={onChange}
    title="Session Length"
    titleID="session-label"
  />
);

export const TimerControl = ({ length, onClick, onChange }) =>
  [BreakControl, SessionControl].map((Control, index) => (
    <Control
      length={length[index]}
      onClick={onClick}
      key={index}
      onChange={onChange}
    />
  ));
