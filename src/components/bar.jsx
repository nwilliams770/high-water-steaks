import React from 'react';
import { select } from 'd3-selection';
import * as d3 from 'd3';
import { transition } from 'd3-transition';

class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            y: props.y,
        }
        this.barRef = React.createRef();
    }

    // So what are we tracking here:
    //      - we will pass an updated opacity bars that are disappearing/re-appearing ()
    //      - we will be doing a bounce down/up when we re-calc heights
    //    

    componentDidUpdate(prevProps, prevState, snapshot) {
        // gotta do something here about different transitions too
        let bar = select(this.barRef.current);
        let test = this.props.y;
        // let test = transition()
        //                 .duration(750)
        //                 .ease()
        //                 .attr("y", this.props.y)
        //                 .on("end", () => 
        //                     this.setState({
        //                         y: this.props.y
        //                     })
        //                 );

        // console.log(this.barRef.current);
        // console.log(this.props.y);

        // bar.transition(transition)
        //     .attr("y", this.props.y);
        // bar.transition()
        //     .duration(800)
        //     .attr("y", test)
        //     .on("end", () => 
        //         this.setState({
        //             y: test
        //         })
        //     );

        d3.select(this.barRef.current)
        .transition()
        .duration(1000)
        .delay(750)
        .attr("y", test);

    }

    render() {
        const { y } = this.state;
        const { x, height, width, opacity } = this.props;
        // console.log(this.props);
        return (
        <rect
            x={x}
            y={y}
            height={ height }
            width={width}
            opacity={opacity}
            ref={this.barRef}
        />
        )
    }
}

export default Bar;
