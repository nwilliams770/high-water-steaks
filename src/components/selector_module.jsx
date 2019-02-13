import React from 'react';
import Select from 'react-select';

const SelectorModule = ({years, updateYear, defaultValue }) => {
    const options = years.map(year => {
        return { value: year, label: `${year}` }
    })

    console.log(defaultValue);
    return (
        <div className='selector module'>
            <Select
            options={options}
            defaultValue={{value: defaultValue, label: defaultValue}}
            className='basic-single'
            classNamePrefix='select'
            autosize={false}
            placeholder='Select overlay...'
            onChange={ input => updateYear(input) }
            />
        </div>
    )
}

export default SelectorModule;