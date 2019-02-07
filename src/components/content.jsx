import React from 'react';
import consumption from '../data/meat_consumption.csv';
import { csv } from 'd3-fetch';
import { countries } from 'country-data';
import BarChart from './bar_chart';
import SelectorModule from './selector_module';

// TO DO: 
// Add methods to sort data


class Content extends React.Component {
    constructor() {
        super();
        this.state = {
            year: '2019' // default value for this year
        };
        this.updateYear = this.updateYear.bind(this);
    }

    componentDidMount() {
        this.getData().then((parsedData) => {
            this.setState({ 
                // uses emoji slice for adding to objects
                data: this.processData(parsedData),
                // saving this slice for easy passing to axes
                emojis: parsedData.emojis
            });
        })

    }

    async getData() {
        const data = await csv(consumption);
        const yearRange = [1995, 2025];
        const unsortedData = this.instantiateStarterObject(yearRange);
        
        for (let i = 0; i < data.length; i++) {
            // Filter out:
            //  - Country groups like BRICS
            //  - Years before our range (assuming we're always going up to 2025)
            //  - Different measurement tips// currently KG / CAPITA
            if (typeof countries[data[i].location] !== 'undefined' && yearRange[0] <= parseInt(data[i].year) && data[i].measure === "KG_CAP") {
                let countryName = countries[data[i].location].name;
                unsortedData['data'][data[i].year][data[i].subject.toLowerCase()][countryName] = data[i].value
                // maybe refactor, kind of annoying
                unsortedData['emojis'][[countries[data[i].location].name]] = countries[data[i].location].emoji;

            }
        }


        return unsortedData
    }


    processData(unsortedData) {
        const sorted = this.sortDataByCountry(unsortedData);
        const stacked = this.calcStacks(sorted);
        return stacked;
    }

    calcStacks(sortedData) {
        const orderedSubjects = ["poultry", "pork", "mutton", "beef"]
        for (let year in sortedData) {
            sortedData[year].forEach(dataSet => {
                let y0 = 0;
                dataSet.stacks = orderedSubjects.map((subject) => {
                    return ({ subject: subject, y0: y0, y1: y0 += +dataSet[subject] })
                })
                dataSet.total = dataSet.stacks[dataSet.stacks.length - 1].y1
            })
        }
        return sortedData;
    }

    sortDataByCountry(unsortedData) {
        const { data, emojis } = unsortedData;
        const result = {}

        for (let year in data) {
            let temp = {};
            for (let subject in data[year]) {
                for (let country in data[year][subject]) {
                    if (temp[country]) {
                        temp[country][subject] = data[year][subject][country];
                    }
                    else {
                        temp[country] = {name: country, emoji: emojis[country], [subject]: data[year][subject][country]};
                    }
                }


            }
            result[year] = Object.values(temp);
        }
        return result;
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
                <SelectorModule
                    years={Object.keys(data)}
                    updateYear={this.updateYear}
                />
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