import React from 'react';
import consumption from '../data/meat_consumption.csv';
import { csv } from 'd3-fetch';
import { countries } from 'country-data';

class Content extends React.Component {
    constructor() {
        super();
        this.state = {
            year: '2019' // default value for this year
        };
    }

    componentDidMount() {
        const { currentYear } = this.state.year;
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

        data.forEach(line => {
            // filter out groups of countries such as BRIC and years we don't care about
            if (typeof countries[line.location] !== 'undefined' && yearRange[0] <= parseInt(line.year)) {
                result['data'][line.year][line.subject.toLowerCase()][countries[line.location].name] = line.value;

                // maybe refactor, kind of annoying
                result['emojis'][[countries[line.location].name]] = countries[line.location].emoji;
            }
        })
        return result
    }

    instantiateStarterObject(yearRangeArray) {
        const result = {'emojis': {}, 'data': {}};
        const subjects = {'beef': {}, 'pork': {}, 'poultry': {}, 'mutton': {}};
        let currentYear = yearRangeArray[0];
        while (currentYear <= yearRangeArray[1]) {
            result['data'][currentYear] = subjects;
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
        return (
            <div className='content'>
            </div>
        )
    }
}

export default Content;