import React from "react";

export default function TimerButtons(props) {
  // console.log(props.timingEvents);
  const label =
    props.timingEvents.length === 0
      ? "Start"
      : props.timingEvents.length % 2 === 0
        ? "Resume"
        : "Pause";

  return (
    <div className="timerButtons">
      <button onClick={props.HandleClick}>{label} Timer</button>
      <button onClick={props.HandleReset}>Reset Timer</button>
    </div>
  );
}
