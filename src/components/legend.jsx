import React from 'react';

const Legend = ({ icons }) => {
    const iconMarkup = Object.keys(icons).map(subject => {
        return (<img key={`${subject}-icon`}src={icons[subject]} className={subject} />)
    })

    console.log(iconMarkup);
    return (
        <g className="legend">
            {iconMarkup}
        </g>
    )
}

export default Legend;