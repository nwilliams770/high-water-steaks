import React from 'react';
import Axes from './axes';
import StackedBars from './stacked_bars';
import Legend from './legend'
import { scaleBand, scaleLinear } from 'd3-scale';

class BarChart extends React.Component {
    constructor(props) {
        super();
        this.xScale = scaleBand();
        this.yScale = scaleLinear();
    }

    findMaxValue(data) {
        // https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
        return Math.max.apply(Math, data.map(obj => obj.total ));
    }

    render() {
        const { svgDimensions, margins, data, emojis, maxValue, updateSubject, activeSubject, countryKey, title } = this.props;
        const legend = this.props.legendIcons ? <Legend icons={this.props.legendIcons} svgDimensions={svgDimensions} updateSubject={updateSubject}/> : ""
        const xScale = this.xScale
                        .padding(0.5)
                        .domain(Object.values(emojis))
                        .rangeRound([margins.left, svgDimensions.width - margins.right]);
        const yScale = this.yScale
                        .domain([0, maxValue])
                        .range([svgDimensions.height - margins.bottom, margins.top]);
        return (
            <svg className="vis" width={legend ? svgDimensions.width + 50 : svgDimensions.width} height={svgDimensions.height} >
                <Axes
                    scales={{ xScale, yScale }}
                    svgDimensions={svgDimensions}
                    margins={margins}
                    countryKey={countryKey}
                />
                <StackedBars
                    scales={{ xScale, yScale }}
                    data={data}
                    activeSubject={activeSubject}
                />
                {legend}
                <Title
                    title={title}
                    svgDimensions={svgDimensions}
                    margins={margins}
                />
            </svg>
        )
    }
}

const Title = ({ title, svgDimensions, margins }) => {
    return (<text className="title" x={(svgDimensions.width - margins.top - margins.bottom) / 2 } y={margins.top * 0.4}>{title}</text>)
}

export default BarChart;