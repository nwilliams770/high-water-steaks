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
  </div>
)

export default App;