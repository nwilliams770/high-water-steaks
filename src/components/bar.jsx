import React from 'react';

class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            y: props.y,
            y1: props.y1
        }
    }
}
