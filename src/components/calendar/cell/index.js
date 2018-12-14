import React from 'react';

const Cell = (props) => (
  <div
    className={"cell " + props.className}
    onClick={props.onClick}
  >
    <div className="cell-sizer">
      <div className="inner">
        {props.children}
      </div>
    </div>
  </div>
);

export default Cell;