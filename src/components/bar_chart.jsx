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
        // this.updateSubject = this.updateSubject.bind(this);
    }

    findMaxValue(data) {
        // https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
        return Math.max.apply(Math, data.map(obj => obj.total ));
    }

    // updateSubject(subject) {
    //     let currentSubject = this.state.activeSubject;


    //     if (!currentSubject) {
    //         this.setState({ activeSubject: subject });
    //     } else if (currentSubject) {
    //         if (subject === currentSubject) this.setState({ activeSubject: "" });
    //     }
    //     // if ()
    //     // this needs to be refactored and put in content, we have to thread it to both bar charts
    // }

    render() {
        const { svgDimensions, margins, data, emojis, year, maxValue, updateSubject, activeSubject, countryKey, title } = this.props;
        
        const legend = this.props.legendIcons ? <Legend icons={this.props.legendIcons} svgDimensions={svgDimensions} updateSubject={updateSubject}/> : ""
        const xScale = this.xScale
                        .padding(0.5)
                        .domain(Object.values(emojis))
                        .rangeRound([margins.left, svgDimensions.width - margins.right]);
        const yScale = this.yScale
                        .domain([0, maxValue])
                        .range([svgDimensions.height - margins.bottom, margins.top]);
        return (
            // <svg width={`${svgDimensions.width}`} height={`${svgDimensions.height}`} viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`} preserveAspectRatio='xMidYMid meet'>
            <svg width={legend ? svgDimensions.width + 50 : svgDimensions.width} height={svgDimensions.height} >

                <Axes
                    scales={{ xScale, yScale }}
                    svgDimensions={svgDimensions}
                    margins={margins}
                    countryKey={countryKey}
                />
                <StackedBars
                    scales={{ xScale, yScale }}
                    svgDimensions={svgDimensions}
                    margins={margins}
                    data={data}
                    maxValue={maxValue}
                    emojis={emojis}
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