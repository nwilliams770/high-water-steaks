import React from 'react';
import consumption from '../data/meat_consumption.csv';
import { csv } from 'd3-fetch';
import { countries } from 'country-data';
import BarChart from './bar_chart';

// TO DO: 
// Add methods to sort data


class Content extends React.Component {
    constructor() {
        super();
        this.state = {
            year: '2019' // default value for this year
        };
    }

    componentDidMount() {
        // data shape:
            // year => subject => country => value
        this.getData().then((parsedData) => {
            this.setState({ 
                data: parsedData.data,
                emojis: parsedData.emojis
            });
        })

    }

    async getData() {
        const data = await csv(consumption);
        const yearRange = [1995, 2025];
        const result = this.instantiateStarterObject(yearRange);
        
        for (let i = 0; i < data.length; i++) {
            // Filter out:
            //  - Country groups like BRICS
            //  - Years before our range (assuming we're always going up to 2025)
            //  - Different measurement tips// currently KG / CAPITA
            if (typeof countries[data[i].location] !== 'undefined' && yearRange[0] <= parseInt(data[i].year) && data[i].measure === "KG_CAP") {
                let countryName = countries[data[i].location].name;
                result['data'][data[i].year][data[i].subject.toLowerCase()][countryName] = data[i].value
                // maybe refactor, kind of annoying
                result['emojis'][[countries[data[i].location].name]] = countries[data[i].location].emoji;

            }
        }
        console.log("Data")
        console.log(result);
        return result
    }

    instantiateStarterObject(yearRangeArray) {
        // Potentially refactor to have shape be 
        // year => country => subject
        const result = {'emojis': {}, 'data': {}};
        let currentYear = yearRangeArray[0];
        while (currentYear <= yearRangeArray[1]) {
            result['data'][currentYear] = {'beef': {}, 'pork': {}, 'poultry': {}, 'mutton': {}};
            currentYear += 1;
        }
        return result;
    }

    updateYear(dropdownInput) {
        // We'll decide what slice we currently need after maybe?
        this.setState({
            year: dropdownInput.value
        })
    }

    render() {
        if (!this.state.data) return "";
        const margins = {top: 50, right: 20, bottom: 100, left: 60},
              svgDimensions = {width: 800, height: 500}
        const { data, year, emojis } = this.state;
        return (
            <div className='content'>
                <BarChart
                    svgDimensions={svgDimensions}
                    margins={margins}
                    data={data[year]}
                    year={year}
                    emojis={emojis}
                />
            </div>
        )
    }
}

export default Content;