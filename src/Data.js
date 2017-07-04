import React, { Component } from 'react';
import batman from './batmanRealty.js';
import superman from './supermanRealty.js';
import App from './App';

class Data extends Component{
    constructor(props) {
        super(props);
        this.state = {
            'properties': []
        }
    };

    componentDidMount() {
        const originalBatman = batman;
        const originalSuperman = superman;
        let property = {};
        let properties = [];
        let propertySet = new Set();
        if(originalBatman.items === undefined) {
            for(const [value, key] of Object.entries(originalBatman)) {
                if(!propertySet.has(value)) {
                    property['address'] = value;
                    propertySet.add(value);
                }
                for(const [v, k] of Object.entries(key)) {
                    if(!propertySet.has(v)) {
                        property[v] = k;
                    }
                }
                properties.push(Object.assign({}, property));
            }
        }
        if(originalSuperman.items !== undefined) {
            originalSuperman.items.forEach((item) => {
                if (!propertySet.has(item.address)) {
                    propertySet.add(item.address);
                    properties.push(item);
                }
            })
        }

        this.prepareData(properties);
    }

    prepareData(data) {
        let obj = {};
        data.forEach((item) => {
            const address = item.address.split(',');
            item['street'] = address[0].trim();
            item['city'] = address[1].trim();
            item['state'] = address[2].trim();
        });

        const possibleKeys = [['street'], ['city'], ['state'], ['baths'], ['beds'], ['built'], ['price', 'cost'],
            ['sqft', 'sq_ft'], ['img', 'thumb'], ['url']];

        let preparedData = data.map((item) => {
            let dataSet = new Set();
            for (let synonym of possibleKeys) {
                const finalKey = synonym[0];
                obj[finalKey] = '';
                for (let word of synonym) {
                    let originalKeys = Object.keys(item);
                    for(let i = 0; i < originalKeys.length; i++) {
                        if(originalKeys[i] === word && !dataSet.has(originalKeys[i])) {
                            obj[finalKey] = Object.values(item)[i];
                            dataSet.add(originalKeys[i]);
                        }
                    }
                }
            }
            return Object.assign({}, obj);
        });

        this.setState({
            properties: preparedData
        })
    }

    render() {
        return(
            <div>
                <App properties={this.state.properties} />
            </div>
        )
    }
}

export default Data;