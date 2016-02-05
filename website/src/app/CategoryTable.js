import React from 'react';

import { RuleTableRow } from './RuleTableRow';

export class CategoryTable  extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categorySort: {},
      categoryRules: [...this.props.categoryRules]
    };
  }

  sortCategory(sortIndex) {
    const isAscSort = (this.state.currentSort === sortIndex) ?
      !this.state.isAscSort : true;
    const categoryRules = [...this.state.categoryRules]; // clone
    if (isAscSort) {
      categoryRules.sort((r1, r2) => r1[sortIndex] > r2[sortIndex] ? 1 : -1);
    } else {
      categoryRules.sort((r1, r2) => r1[sortIndex] > r2[sortIndex] ? -1 : 1);
    }

    this.setState({ categoryRules, isAscSort, currentSort: sortIndex });
  }

  render () {
    const { categoryRules } = this.state;
    return (
      <table>
        <thead>
          <tr>
          <th onClick={() => this.sortCategory('')}>
            Active
          </th>
          <th onClick={() => this.sortCategory('')}>
            Warning or Error
          </th>
          <th onClick={() => this.sortCategory('name')}>
            Name
          </th>
          <th onClick={() => this.sortCategory('description')}>
            Description
          </th>
          <th onClick={() => this.sortCategory('isRecommended')}>
            Recommended
          </th>
          <th onClick={() => this.sortCategory('isFixable')}>
            Fixable
          </th>
          <th onClick={() => this.sortCategory('schema')}>
            Schema
          </th>
          </tr>
        </thead>
        <tbody>
          {categoryRules.map((rule, key) =>
            <RuleTableRow
              toggleRule={this.props.toggleRule.bind(this, rule)}
              key={key}
              {...rule}
            />
          )}
        </tbody>
      </table>
    );
  }
}
