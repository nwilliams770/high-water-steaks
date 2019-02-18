import React from 'react';

const Legend = ({ icons, svgDimensions, updateSubject }) => {
    // no longer using icons, keeping data here for fickleness
    const { width } = svgDimensions;
    const subjects = ["beef",  "mutton", "pork", "poultry"]
    const iconMarkup = subjects.map((subject, i) => {
        return (
        <g onClick={() => updateSubject(subject)} key={`${subject}-icon`} transform={`translate(0,${10 + i * 20})`} className={subject + " article"} >
            <rect x={width - 24 } width={12} height={12} />
            <text x={width - 32} y={9}>{subject}</text>
        </g>
        )
    })
    return (
        <g className="legend" transform={`translate(60, 0)`}>
            {iconMarkup}
        </g>
    )
}

export default Legend;