import React from 'react';
import './legend-item.css';

interface LegendItemsProps {
    label: string
    colour: string
}

export const LegendItem = (props: LegendItemsProps) => (
  <div className="dot-container">
    <span className={`dot-${props.colour}`} />
    <span className="label">{props.label}</span>
  </div>
);
