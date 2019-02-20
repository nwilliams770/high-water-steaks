import React from 'react';
import Bar from './bar';

class StackedBars extends React.Component {
    constructor(props) {
        super(props);
        // this.colorScale = scaleLinear
    }

    createBarGroups() {
        // For each country, we are:
            // -extracting the stack calcs for each subject
            // -putting them to scale
            // -passing them to the Bar component to track its own position
        const result = {'poultry': [], 'pork': [], 'mutton': [], 'beef': []};
        const { data, scales, activeSubject } = this.props;
        const { xScale, yScale } = scales; 
        for (let i = 0; i < data.length; i++) {
            for (let subject in result) {
                let subjectStack = data[i].stacks.filter(obj => obj.subject === subject)[0];
                let x = xScale(data[i].emoji),
                    y = yScale(subjectStack.y1),
                    height = yScale(subjectStack.y0) - yScale(subjectStack.y1),
                    width= xScale.bandwidth(),
                    opacity = this.calcOpacity(activeSubject, subject);
                if (this.subjectActive(subject, activeSubject)) {
                    y = this.calcBarTransformation(data[i], subjectStack);
                }
                result[subject].push(
                    <Bar
                        key={`${subject}-${i}`}
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

    subjectActive(subject, activeSubject) {
        // Poultry is on the base of the graph and does not require tranformations
        return (activeSubject && activeSubject !== 'beef' && activeSubject === subject)
    }

    calcOpacity(activeSubject, subject) {
        if (activeSubject) {
            return activeSubject === subject ? 100 : 0;
        } else {
            return 100;
        }
    }

    calcBarTransformation(datum, subjectStack) {
        const yScale = this.props.scales.yScale;
        // In order to calculate the new position, we are calculating it from the bottom-most
        // bar in our stack, which is always poultry!
        let baseStack = datum.stacks.filter(obj => obj.subject === 'beef')[0],
              currentHeight = yScale(subjectStack.y0) - yScale(subjectStack.y1),
              currentY = yScale(subjectStack.y1),
              baseHeight = yScale(baseStack.y0) - yScale(baseStack.y1),
              baseY = yScale(baseStack.y1);
        
        const heightShift = currentHeight - baseHeight;
        const updatedY = baseY - heightShift;
        return updatedY;
    }

    render() {
        const barGroups = this.createBarGroups();

        return (
            <g className='bars'>
                <g className='poultry'>
                    {barGroups['poultry']}
                </g>
                <g className='pork'>
                    {barGroups['pork']}
                </g>
                <g className='mutton'>
                    {barGroups['mutton']}
                </g>
                <g className='beef'>
                    {barGroups['beef']}
                </g>

            </g>
        )

    }



}

export default StackedBars;