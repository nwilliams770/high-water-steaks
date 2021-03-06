import React from 'react';
import consumption from '../data/meat_consumption.csv';
import water from '../data/meat_water_cost.csv';
import { csv } from 'd3-fetch';
import { countries } from 'country-data';
import BarChart from './bar_chart';
import SelectorModule from './selector_module';
import { logos } from '../images/index';

// TO DO:
// - Content
        // - Deal with LegendIcons, we need to pass something, you want it in NavBar or On graph?
//  - SelectorModule: 
        // - Add Current Year if not delete the placeHolder value



// Work on: 
// UI/UX related:
// - country tooltip
// - legend
// - click filtering
// - styling
// - hard value tooltip

// NOTE TO ADD FOR DATA *************
// Meat consumption is measured in thousand tonnes of carcass weight (except for poultry expressed as ready to cook weight) 
// and in kilograms of retail weight per capita. Carcass weight to retail weight conversion factors are: 0.7 for beef and 
// veal, 0.78 for pigmeat, and 0.88 for both sheep meat and poultry meat.

// ****** Note for water conversion
// The water footprint of meat from beef cattle at 15,400 litre/kg on average globally is much larger than the 
// footprints of meat from sheep (10,400 litre/kg), pigs (6,000 litre/kg), goats (5,500 litre/kg) or chickens (4,300 litre/kg).

// Also, add note that not all countries have the same stnadards and practies for raeising livestock:
// Italy, for instance says that the water footprint for its beef production is 25 per cent below the global average.

// The Italian meat body Carni Sostenibili said that compared to the world average Italy uses 11,500 litres of water, of which 87 per cent 
// is water from renewable sources and of which only 1,495 litres actually consumed.

// The organisation adds that the entire meat sector (beef, poultry and pork) uses 80-90 per cent 
// water resources that are part of the natural water cycle and these are returned to the environment, such as rain water. Just 10-20 per cent of the water needed to produce 1 kg of meat is consumed.

// However, on the other hand, the UK’s water footprint is 17,657 litres/kg of which 84 p
// er cent is green water (14,900 litres), 15.2 per cent grey water (2,690 litres) and just 67 litres or 0.4 per cent is blue water.

class Content extends React.Component {
    constructor() {
        super();
        this.state = {
            year: '2019', // default value for this year
            activeSubject: ''
        };
        this.updateYear = this.updateYear.bind(this);
        this.updateSubject = this.updateSubject.bind(this);
    }

    componentDidMount() {
        this.getData().then((parsedData) => {
            const processedData = this.processData(parsedData);
            this.setState({ 
                // uses emoji slice for adding to objects
                meat: processedData.meat,
                // saving this slice for easy passing to axes
                emojis: parsedData.emojis,
                water: processedData.water
            });
        })

    }

    async getData() {
        const consumptionData = await csv(consumption);
        const waterData = await csv(water);
        const yearRange = [1995, 2025];
        const unsortedData = this.instantiateStarterObject(yearRange);
        
        for (let i = 0; i < consumptionData.length; i++) {
            // Filter out:
            //  - Country groups like BRICS
            //  - Years before our range (assuming we're always going up to 2025)
            //  - Different measurement tips// currently KG / CAPITA
            if (typeof countries[consumptionData[i].location] !== 'undefined' && yearRange[0] <= parseInt(consumptionData[i].year) && consumptionData[i].measure === "KG_CAP") {
                let countryName = countries[consumptionData[i].location].name;
                unsortedData['data'][consumptionData[i].year][consumptionData[i].subject.toLowerCase()][countryName] = consumptionData[i].value
                // maybe refactor, kind of annoying
                unsortedData['emojis'][[countries[consumptionData[i].location].name]] = countries[consumptionData[i].location].emoji;
            }
        }
        const processedWaterData = {};
        waterData.forEach(obj => {
            let { MEAT, WATER } = obj;
            processedWaterData[MEAT.toLowerCase()] = WATER;
        })
        unsortedData['water'] = processedWaterData;

        return unsortedData
    }

    processData(unsortedData) {
        const sorted = this.sortDataByCountry(unsortedData);
        const meatData = this.calcMeatStacks(sorted);
        const waterData = this.calcWaterStacks(sorted);        
        return {meat: meatData, water: waterData};
    }

    calcMeatStacks(sortedData) {
        const orderedSubjects = ["poultry", "pork", "mutton", "beef"].reverse();
        const { water, ...clone } = JSON.parse(JSON.stringify(sortedData)); // copying to prevent mutation, have to remove water property to properly iterate
        for (let year in clone) {
            clone[year].forEach(dataSet => {
                let y0 = 0;
                dataSet.stacks = orderedSubjects.map((subject) => {
                    return ({ subject: subject, y0: y0, y1: y0 += +dataSet[subject] })
                })
                dataSet.total = dataSet.stacks[dataSet.stacks.length - 1].y1;
            })
        }
        return clone;
    }

    calcWaterStacks(sortedData) {
        const orderedSubjects = ["poultry", "pork", "mutton", "beef"].reverse();
        const { water, ...clone } = JSON.parse(JSON.stringify(sortedData)); // copying to prevent mutation, have to remove water property to properly iterate
        for (let year in clone) {
            clone[year].forEach(dataSet => { orderedSubjects.forEach((subject) => dataSet[subject] *= +water[subject]) // Calc water cost per consumption value
                let y0 = 0;
                dataSet.stacks = orderedSubjects.map((subject) => {
                    return ({ subject: subject, y0: y0, y1: y0 += dataSet[subject]})
                })
                dataSet.total = dataSet.stacks[dataSet.stacks.length - 1].y1;
            })
        }
        return clone;
    }

    sortDataByCountry(unsortedData) {
        const { data, emojis, water } = unsortedData;
        const result = {water: water}

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
        // Used for parsing data and structuring in an easer-to-iterate format for later calculations
        const result = {'emojis': {}, 'data': {}};
        let currentYear = yearRangeArray[0];
        while (currentYear <= yearRangeArray[1]) {
            result['data'][currentYear] = {'beef': {}, 'pork': {}, 'poultry': {}, 'mutton': {}};
            currentYear += 1;
        }
        return result;
    }

    updateYear(dropdownInput) {
        this.setState({
            year: dropdownInput.value
        })
    }

    updateSubject(subject) {
        let currentSubject = this.state.activeSubject;
        if (!currentSubject) {
            this.setState({ activeSubject: subject });
            document.querySelectorAll(".article").forEach(node => {
                node.classList.contains(subject) ? node.classList.add("active") : node.classList.add("inactive");
            })
        } else if (currentSubject) {
            if (subject !== currentSubject) return;
            this.setState({ activeSubject: "" });
            document.querySelectorAll(".article").forEach(node => {
                node.classList.contains(subject) ? node.classList.remove("active") : node.classList.remove("inactive");
            })
        }
    }

    render() {
        if (!this.state.meat || !this.state.water) return "";
        const { meat, year, emojis, water, activeSubject } = this.state;
        const margins = {top: 50, right: 20, bottom: 50, left: 60},
              svgDimensions = {width: 700, height: 380},
              maxValMeat = 120, // Hard-coded to prevent axis from recalculating if client switches year 
              maxValWater = 1200000, // Hard-coded to prevent axis from recalculating if client switches year
              meatTitle = "Global Meat Consumption (Kg Per Capita)",
              waterTitle = "Water Footprint (Litres)",
              countryKey = Object.keys(emojis).reduce(function(obj,key){
                obj[ emojis[key] ] = key;
                return obj;
                },{});
    
        const iconUrls = logos;

        return (
            <div className='content'>
                <SelectorModule
                    years={Object.keys(meat)}
                    updateYear={this.updateYear}
                    defaultValue={year}
                />
                <BarChart
                    svgDimensions={svgDimensions}
                    margins={margins}
                    data={meat[year]}
                    emojis={emojis}
                    maxValue={maxValMeat}
                    legendIcons={iconUrls}
                    updateSubject={this.updateSubject}
                    activeSubject={activeSubject}
                    countryKey={countryKey}
                    title={meatTitle}

                />
                <BarChart
                    svgDimensions={svgDimensions}
                    margins={margins}
                    data={water[year]}
                    emojis={emojis}
                    maxValue={maxValWater}
                    activeSubject={activeSubject}
                    countryKey={countryKey}
                    title={waterTitle}

                />
            </div>
        )
    }
}

export default Content;