import React from 'react'
import './legend-item.css'

interface LegendItemsProps {
    label: string
    colour: string
}

export const LegendItem = (props: LegendItemsProps) => {
    return (
        <div className="dot-container">
            <span className={`dot-${props.colour}`}></span>
            <span className="label">{props.label}</span>
        </div>
    )
}