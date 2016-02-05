/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import { AppBar } from 'material-ui';
import { without, uniq } from 'lodash';

import Colors from 'material-ui/lib/styles/colors';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';

import rules from '../../rules';

import { CategoryTable } from './CategoryTable';

const rulesByCategories = rules.reduce((obj, rule) => {
  obj[rule.category] = obj[rule.category] || [];
  obj[rule.category].push(rule);
  return obj;
}, {});

const muiTheme = getMuiTheme({
  accent1Color: Colors.deepOrange500
});

let activeRules = [];

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rulesByCategories: Object.assign({}, rulesByCategories),
      rules: Object.assign({}, rules),
      activeRules: []
    };
  }

  toggleRule(rule, isActive) {
    if (isActive) return activeRules = uniq(activeRules.concat(rule.name));
    activeRules = without(activeRules, rule.name);
  }

  render() {
    return (
      <div>
        <AppBar
          title="ESLint Fun Configurator"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />

      {Object.keys(this.state.rulesByCategories).map((category, key) => (
          <div key={key}>
            <h2>{category}</h2>
            <CategoryTable
              categoryRules={this.state.rulesByCategories[category]}
              toggleRule={this.toggleRule.bind(this)}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default themeDecorator(muiTheme)(Main);
