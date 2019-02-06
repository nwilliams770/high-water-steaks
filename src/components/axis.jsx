import React from 'react';
import { select } from 'd3-selection';
import * as d3Axis from 'd3-axis';

export default class Axis extends React.Component {
    constructor(props) {
        super();
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
          .ticks([4])
        const axisEl = select(this.axisElement);
    
        axis(axisEl);
    }

    render() {
        return (
          <g
            className={`Axis Axis-${this.props.orient}`}
            ref={(el) => { this.axisElement = el; }}
            transform={this.props.translate}
          />
        )
    }

}