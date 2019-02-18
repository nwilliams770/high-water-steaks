import React from 'react';
import { select } from 'd3-selection';
import { easeBounce } from 'd3-ease'
import 'd3-transition';

class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            y: props.y,
            opacity: props.opacity,
            height: props.height
        }
        this.barRef = React.createRef();
    }
    
    componentDidUpdate(prevProps, prevState) {
        let bar = select(this.barRef.current);
        if (this.props.opacity !== prevProps.opacity) {
            this.props.opacity < prevProps.opacity ? this.fadeOut(bar) : this.fadeIn(bar)
        } else if (this.props.y !== prevProps.y && this.props.height !== prevProps.height) {
            this.yearUpdated(bar);
        } else if (this.props.y !== prevProps.y) {
            this.props.y > prevProps.y ? this.transformBar(bar) : this.restoreBar(bar)
        }
    }

    fadeOut(bar) {
        bar.transition()
        .duration(1000)
        .attr("opacity", this.props.opacity)
        .on("end", () => 
            this.setState({
                opacity: this.props.opacity
            })
        )
    }

    fadeIn(bar) {
        bar.transition()
        .duration(1000)
        .delay(750)
        .attr("opacity", this.props.opacity)
        .on("end", () => 
            this.setState({
                opacity: this.props.opacity
            })
        )
    }

    yearUpdated(bar) {
        bar
        .transition()
        .duration(300)
        .attr("y", this.props.y)
        .transition()
        .duration(300)
        .attr("height", this.props.height)
        .on("end", () => 
        this.setState({
            height: this.props.height,
            y: this.props.y
        }))
    }

    transformBar(bar) {
        bar.transition()
        .duration(1000)
        .delay(800)
        .ease(easeBounce)
        .attr("y", this.props.y)
        .on("end", () => 
            this.setState({
                y: this.props.y
            })
        );
    }

    restoreBar(bar) {
        bar.transition()
        .duration(1000)
        .attr("y", this.props.y)
        .on("end", () => 
            this.setState({
                y: this.props.y
            })
        );
    }

    render() {
        const { y, opacity, height } = this.state;
        const { x, width } = this.props;
        return (
        <rect
            x={x}
            y={y}
            height={height}
            width={width}
            opacity={opacity}
            ref={this.barRef}
        />
        )
    }
}

export default Bar;
