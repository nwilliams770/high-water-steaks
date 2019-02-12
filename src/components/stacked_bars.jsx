import React from 'react';
import Bar from './bar';

class StackedBars extends React.Component {
    constructor(props) {
        super(props);

        // this.colorScale = scaleLinear
    }

    createGroups() {
        const result = {"poultry": [], "pork": [], "mutton": [], "beef": []};
        const { data, scales, svgDimensions, emojis, activeSubject } = this.props;
        const { xScale, yScale } = scales; 
        for (let i = 0; i < data.length; i++) {
            for (let subject in result) {
                let subjectStack = data[i].stacks.filter(obj => obj.subject === subject)[0];
                let x = xScale(data[i].emoji),
                    y = yScale(subjectStack.y1),
                    height = yScale(subjectStack.y0) - yScale(subjectStack.y1),
                    width= xScale.bandwidth(),
                    opacity = this.calcOpacity(activeSubject, subject);

                    // console.log(`old y: ${y}`);
                
                if (activeSubject && activeSubject !== "poultry" && activeSubject === subject) {
                    // console.log("made it here to update y!");
                    y = this.calcTransform(data[i], subjectStack);
                    // console.log(`updated y: ${y}`);

                }
                result[subject].push(
                    <Bar
                        key={`${subject}-${i}`}
                        // x={xScale(data[i].emoji)}
                        // y={yScale(subjectStack.y1)}
                        // height={ yScale(subjectStack.y0) - yScale(subjectStack.y1) }
                        // width={xScale.bandwidth()}
                        x={x}
                        y={y}
                        height={height}
                        width={width}
                        opacity={opacity}
                    />
                )
            }

        }
        return result
    }

    calcOpacity(activeSubject, subject) {
        if (activeSubject) {
            return activeSubject === subject ? 100 : 0;
        } else {
            return 100;
        }
    }

    calcTransform(datum, subjectStack) {
        const { margins } = this.props;
        const yScale = this.props.scales.yScale;
        // In order to calculate the new position, we are calculating it from the bottom-most
        // bar in our stack, which is always poultry!
        let baseStack = datum.stacks.filter(obj => obj.subject === "poultry")[0],
              currentHeight = yScale(subjectStack.y0) - yScale(subjectStack.y1),
              currentY = yScale(subjectStack.y1),
              baseHeight = yScale(baseStack.y0) - yScale(baseStack.y1),
              baseY = yScale(baseStack.y1);
        
        const heightShift = currentHeight - baseHeight;
        const updatedY = baseY - heightShift;
        return updatedY;
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

export default StackedBars;