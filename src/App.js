import React, { Component } from 'react';
import Filtered from './Filtered';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'filteredData': [],
            'searchCondition': {
                'price': false,
                'beds': false,
                'sqft': false,
            }
        };
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick(value) {
        const lastValue = this.state.searchCondition[value];
        const data = this.props.properties;
        let obj = this.state.searchCondition;
        if(!lastValue) {
            for(let k of Object.keys(obj)) {
                if(k !== value) {
                    obj[k] = false;
                }
            }
        }
        obj[value] = !lastValue;
        if(obj[value]) {
            this.filterData(value, data);
            this.setState({
                'filteredData': data
            })
        } else {
            this.setState({
                'filteredData': []
            })
        }

        this.setState(obj);
    }

    filterData(key, value) {
        value.sort((a, b)=> {
            let va = 0;
            let vb = 0;
            if(key === 'beds' || key === 'sqft') {
                va = parseInt(a[key], 10);
                vb = parseInt(b[key], 10);
            } else if(key === 'price') {
                va = parseInt(a[key].replace(/[^0-9]/g,""), 10);
                vb = parseInt(b[key].replace(/[^0-9]/g,""), 10);
            }
            return va - vb;
        })
    }

  render() {
      const {price, beds, sqft} = this.state.searchCondition;
      return (
          <div className="container">
              <h2>Awesome Listings Widget</h2>
              <div className="button-group">
                  <button
                    onClick={()=> this.handleClick('price')} className={"" + (price ? 'active' : '')}
                  >Price
                  </button>
                  <button onClick={()=> this.handleClick('beds')} className={"" + (beds ? 'active' : '')}
                  >Beds
                  </button>
                  <button onClick={()=> this.handleClick('sqft')} className={"" + (sqft ? 'active' : '')}
                  >Sq.ft.
                  </button>
              </div>
              <Filtered
                  properties={this.state.filteredData.length === 0 ? this.props.properties : this.state.filteredData}
              />
          </div>
      );
  }
}

export default App;
