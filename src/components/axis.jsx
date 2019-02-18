import React from 'react';
import { select } from 'd3-selection';
import * as d3Axis from 'd3-axis';
import { showAxisTooltip, hideTooltip } from './tooltip';

export default class Axis extends React.Component {
    // Have to refactor tooltip or decide another function to use cause this one is whackkk
    constructor(props) {
        super();
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    componentDidMount() {
        this.renderAxis()
    }
    
    componentDidUpdate() {
        this.renderAxis()
    }

    renderAxis() {
        const axisType = `axis${this.props.orient}`
        const axis = d3Axis[axisType]()
          .scale(this.props.scale)
          .tickSize(-this.props.tickSize)
          .tickPadding([12])
          .ticks(4, "s")
        const axisEl = select(this.axisElement);
    
        axis(axisEl);
    }

    handleMouseOver(evt) {
        if (!this.props.tooltip) return;
        const { countryKey } = this.props;
        showAxisTooltip(evt, countryKey);
    }

    render() {
        return (
          <g
            onMouseOver={(evt) => this.handleMouseOver(evt)}
            onMouseLeave={hideTooltip}
            className={`Axis Axis-${this.props.orient}`}
            ref={(el) => { this.axisElement = el; }}
            transform={this.props.translate}
          />
        )
    }

}