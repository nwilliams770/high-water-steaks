import React from 'react';

export function showAxisTooltip(evt, key) {
    const tooltip = document.querySelector('.tooltip');

    tooltip.innerHTML = formatCountry(key[evt.target.innerHTML]);
    tooltip.style.display = 'inline-block';
    tooltip.style.left = evt.pageX + 'px';
    tooltip.style.top = evt.pageY + 15 + 'px';
}
  
export function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    tooltip.style.display = 'none';
}

function formatCountry(country) {
    return country.includes(",") ? country.split(",").reverse().join().replace(",", " ") : country
}

const Tooltip = () => (
    <div className='tooltip'></div>
)

export default Tooltip;