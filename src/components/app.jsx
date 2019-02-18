import React from 'react';
import Content from './content';
import Tooltip from './tooltip';
import '../stylesheets/application.scss';

class App extends React.Component {
  render() {
    return (
    <div className="app">
      <Tooltip />
      <Navbar />
      <Content />
    </div>
    );
  }
}

const Navbar = () => (
  <div className='navbar'>
    <h1 className='title'>Meat, Meet Meat</h1>
    <h2 className='subtitle'>Data-Source: <a href="http://www.oecd.org/" target="_blank" rel="noopener nonreferrer">Organization for Economic Co-Operation and Development</a> | <a href="https://www.worldwildlife.org/" target="_blank" rel="noopener nonreferrer">World Wildlife Foundation</a></h2>
  </div>
)

export default App;