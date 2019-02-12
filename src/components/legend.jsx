import React from 'react';

const Legend = ({ icons, svgDimensions, updateSubject }) => {
    // no longer using icons, keeping data here for fickleness
    const { width } = svgDimensions;
    const subjects = ["poultry", "pork", "mutton", "beef"]
    const iconMarkup = subjects.map((subject, i) => {
        return (
        <g onClick={() => updateSubject(subject)} key={`${subject}-icon`} transform={`translate(0,${10 + i * 20})`} className={subject + " article"} >
            <rect x={width - 24 } width={10} height={10} />
            <text x={width - 32} y={9} >{subject}</text>
        </g>
        )
    })
    return (
        <g className="legend">
            {iconMarkup}
        </g>
    )
}

export default Legend;