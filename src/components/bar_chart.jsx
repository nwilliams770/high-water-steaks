import React from 'react';
import Axes from './axes';
import { scaleBand, scaleLinear } from 'd3-scale';

class BarChart extends React.Component {
    constructor(props) {
        super();
        this.xScale = scaleBand();
        this.yScale = scaleLinear();
    }

    // taken from https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
    roundNumber(num, scale) {
        if(!("" + num).includes("e")) {
          return +(Math.round(num + "e+" + scale)  + "e-" + scale);
        } else {
          var arr = ("" + num).split("e");
          var sig = ""
          if(+arr[1] + scale > 0) {
            sig = "+";
          }
          return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
        }
    }

    // This may not work either 
    findMaxValue(data) {
        const allValues = Object.values(data).map(obj => {
            return Object.values(obj)
        }).flat().map((value) =>  this.roundNumber(parseFloat(value), 2))

        console.log("MAX Value");
        console.log(Math.max(...allValues))

        // console.log(parseFloat("277.0024291"))
        return Math.max(...allValues);
    }





    render() {
        const { svgDimensions, margins, data, emojis, year } = this.props
        const maxValue = this.findMaxValue(data);

        console.log(maxValue)

        const xScale = this.xScale
                        .padding(0.5)
                        .domain(Object.values(emojis))
                        .rangeRound([margins.left, svgDimensions.width - margins.right]);
        
        const yScale = this.yScale
                        .domain([0, 2])
                        .range([svgDimensions.height - margins.bottom, margins.top]);
        return (
            // <svg width={`${svgDimensions.width}`} height={`${svgDimensions.height}`} viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`} preserveAspectRatio='xMidYMid meet'>
            <svg width={`${svgDimensions.width}`} height={`${svgDimensions.height}`} >
                <Axes
                    scales={{ xScale, yScale }}
                    svgDimensions={svgDimensions}
                    margins={margins}
                    emojis={emojis}
                />
            </svg>
        )
    }
}

export default BarChart;