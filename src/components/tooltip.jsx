import React from 'react';

export function showAxisTooltip(evt, key) {
    const tooltip = document.querySelector('.tooltip');
    tooltip.innerHTML = key[evt.target.innerHTML];
    tooltip.style.display = 'block';
    tooltip.style.left = evt.pageX + 10 + 'px';
    tooltip.style.top = evt.pageY - 25 + 'px';
}
  
export function hideTooltip(evt) {
    const tooltip = document.querySelector('.tooltip');
    tooltip.style.display = 'none';

    // if a Voronoi tooltip, must revert cell fill back
    if (evt.target.dataset.hasOwnProperty('deaths')) {
        evt.target.style.fill = 'transparent';
        tooltip.classList.remove('voronoi');

    }
    return
}

const Tooltip = () => (
    <div className='tooltip'><p></p></div>
)

export default Tooltip;