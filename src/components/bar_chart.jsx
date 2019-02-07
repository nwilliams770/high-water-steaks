import React from 'react';
import Axes from './axes';
import Bars from './bars';
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

    findMaxValue(data) {
        // https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
        return Math.max.apply(Math, data.map(obj => obj.total ));
    }

    render() {
        const { svgDimensions, margins, data, emojis, year } = this.props;
        // const dataByCountry = this.sortDataByCountry(data);
        const maxValue = this.findMaxValue(data);
        const xScale = this.xScale
                        .padding(0.5)
                        .domain(Object.values(emojis))
                        .rangeRound([margins.left, svgDimensions.width - margins.right]);
        const yScale = this.yScale
                        .domain([0, maxValue + (0.10 * maxValue)])
                        .range([svgDimensions.height - margins.bottom, margins.top]);
        return (
            // <svg width={`${svgDimensions.width}`} height={`${svgDimensions.height}`} viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`} preserveAspectRatio='xMidYMid meet'>
            <svg width={`${svgDimensions.width}`} height={`${svgDimensions.height}`} >
                <Axes
                    scales={{ xScale, yScale }}
                    svgDimensions={svgDimensions}
                    margins={margins}
                />
                <Bars
                    scales={{ xScale, yScale }}
                    svgDimensions={svgDimensions}
                    margins={margins}
                    data={data}
                    // dataByCountry={dataByCountry}
                    maxValue={maxValue}
                    emojis={emojis}
                />
            </svg>
        )
    }
}

export default BarChart;