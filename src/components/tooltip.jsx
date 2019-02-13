import React from 'react';

export function showAxisTooltip(evt, key) {
    const tooltip = document.querySelector('.tooltip');

    tooltip.innerHTML = key[evt.target.innerHTML];
    tooltip.style.display = 'block';
    tooltip.style.left = evt.pageX + 10 + 'px';
    tooltip.style.top = evt.pageY - 25 + 'px';
}
  
export function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    tooltip.style.display = 'none';
}

const Tooltip = () => (
    <div className='tooltip'></div>
)

export default Tooltip;