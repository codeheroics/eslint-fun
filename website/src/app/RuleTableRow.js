import React, { PropTypes } from 'react';
import { Checkbox, Toggle } from 'material-ui';
import { SchemaUI } from './SchemaUI';

export class RuleTableRow extends React.Component {
  render () {
    const { name, description, isRecommended, isFixable, schema } = this.props;
    return (
      <tr>
        <td>
          <Checkbox
            onCheck={ev => this.props.toggleRule(ev.target.checked)}
          />
        </td>
        <td><Toggle /></td>
        <td>{name}</td>
        <td>{description}</td>
        <td>{isRecommended ? '✓' : ''}</td>
        <td>{isFixable ? '🔧' : ''}</td>
        <td><SchemaUI schema={schema} /></td>
      </tr>
    );
  }
}

RuleTableRow.propTypes = {
  name: PropTypes.string
};
