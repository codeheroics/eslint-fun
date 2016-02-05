import React from 'react';
import { Toggle } from 'material-ui';

export class SchemaUI extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        {this.props.schema.map((ruleValue, key) => {
          if (ruleValue.enum) {
            return (
              <select style={{ display: 'block', margin: 'auto' }}>
                {ruleValue.enum.map((possibleValue, key) => (
                  <option key={key} value={possibleValue}>{possibleValue}</option>
                ))}
              </select>
            );
          }
          if (ruleValue.type === 'object') {
            const propertiesNames = Object.keys(ruleValue.properties);
            return (
              <div>
                {'{'}
                {propertiesNames.map((propertyName, key) => {
                  const { type } = ruleValue.properties[propertyName];
                  return (
                    <div key={key} style={{maxWidth: '200px', margin: 'auto', textAlign: 'center'}}>
                      {type === 'boolean' ?
                        <Toggle label={propertyName} /> :
                        <span>propertyName ({type})</span>
                      }
                    </div>
                  );
                })}
                {'}'}
              </div>
            );
          }
          return JSON.stringify(ruleValue);
        })}
      </div>
    );
  }
}
