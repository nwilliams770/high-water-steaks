import React from 'react';
import Select from 'react-select';

const SelectorModule = props => {
    const options = props.years.map(year => {
        return { value: year, label: `${year}` }
    })
    return (
        <div className='selector module'>
            <Select
            options={options}
            className='basic-single'
            classNamePrefix='select'
            autosize={false}
            placeholder='Select overlay...'
            onChange={ input => props.updateYear(input) }
            />
        </div>
    )
}

export default SelectorModule;