import React from 'react';

class Bars extends React.Component {
    constructor(props) {
        super(props);

        // this.colorScale = scaleLinear
    }

    createGroups() {
        const result = {"poultry": [], "pork": [], "beef": [], "mutton": []};
        const { data, scales, margins, svgDimensions, emojis } = this.props;
        const { xScale, yScale } = scales; 

        for (let i = 0; i < data.length; i++) {
            for (let subject in result) {
                let subjectStack = data[i].stacks.filter(obj => obj.subject === subject)[0];
                result[subject].push(
                    <rect
                        key={`${subject}-${i}`}
                        x={xScale(data[i].emoji)}
                        y={yScale(subjectStack.y1)}
                        // height={svgDimensions.height - margins.bottom - yScale(subjectStack.y0)}
                        height={ yScale(subjectStack.y0) - yScale(subjectStack.y1) }
                        width={xScale.bandwidth()}
                    />
                )
            }

        }

        // for (let subject in data) {
        //     result[subject] = Object.keys(data[subject]).map( (country, i) => {
        //         // iterating over country names
        //         return (
        //             <rect
        //                 key={`${subject}-${i}`}
        //                 x={xScale(emojis[country])}
        //                 y={yScale(data[subject][country])}
        //                 height={svgDimensions.height - margins.bottom - yScale(data[subject][country])}
        //                 width={xScale.bandwidth()}
        //                 fill={subject === "beef" ? "pink" : "yellow"}
        //             />
        //         )
        //     })
        // }

        // console.log("result");
        return result

    }

    render() {
        const barGroups = this.createGroups();

        return (
            <g className="bars">
                <g className="poultry">
                    {barGroups['poultry']}
                </g>
                <g className="pork">
                    {barGroups['pork']}
                </g>
                <g className="beef">
                    {barGroups['beef']}
                </g>
                <g className="mutton">
                    {barGroups['mutton']}
                </g>
            </g>
        )

    }



}

export default Bars;