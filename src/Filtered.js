import React from 'react';

function Filtered(props) {
    const properties = props.properties;
    let first = [];
    let second = [];
    for(let i = 0; i < properties.length; i+=2) {
        first.push(properties[i]);
        second.push(properties[i + 1]);
    }
    const firstCol = first.map((item, index) =>
        <div className="content" key={index}>
            <div className="image-holder">
                <img src={item.img} alt="property"/>
            </div>
            <div className="content-holder">
                <div className="street">{item.street}</div>
                <div className="state">{item.city} {item.state}</div>
                <div className="price">
                    ${new Intl.NumberFormat().format(parseInt(item.price.replace(/[^0-9]/g,""), 10))}
                </div>
                <ul className="feature-list">
                    <li>{item.beds} beds</li>
                    <li>{item.baths} baths</li>
                    <li>{item.sqft} sq ft</li>
                </ul>
                <div className="built-year">
                    {item.built.length > 0 &&
                        <div>Built in {item.built}</div>
                    }
                </div>
            </div>
        </div>
    );

    const secondCol = second.map((item, index) =>
        <div className="content" key={index}>
            <div className="image-holder">
                <img src={item.img} alt="property"/>
            </div>
            <div className="content-holder">
                <div className="street">{item.street}</div>
                <div className="state">{item.city} {item.state}</div>
                <div className="price">
                    ${new Intl.NumberFormat().format(parseInt(item.price.replace(/[^0-9]/g,""), 10))}
                </div>
                <ul className="feature-list">
                    <li>{item.beds} beds</li>
                    <li>{item.baths} baths</li>
                    {item.sqft.length > 0 &&
                        <li>{item.sqft} sq ft</li>
                    }
                </ul>
                <div className="built-year">
                    {item.built.length > 0 &&
                        <div>Built in {item.built}</div>
                    }
                </div>
            </div>
        </div>
    );

    return (
        <div className="flexbox-container">
            <div className="column1">
                {firstCol}
            </div>
            <div className="column2">
                {secondCol}
            </div>
        </div>
    );
}

export default Filtered;