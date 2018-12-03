import _ from "lodash";
import React, { Component } from "react";
import { View, ImageBackground } from "react-native";
import { connect } from "react-redux";
import { usersFetch } from "../actions";
import DebitListItem from "./DebitListItem";
import Piechart from "./DebitPieChart";
// import { Card, CardSection } from './common';
import moment from "moment";

class CurrentBudget extends Component {
  state = {};

  componentDidMount() {
    this.props.usersFetch();
  }

  render() {
    console.log(this.props.debitsTotal);
    const currentBudget = () => {
      console.log(this.props.debitsTotal);
      return (
        <DebitListItem
          thisMonth={this.props.momentMonth}
          incomeTotal={this.props.creditsTotal}
          expenseTotal={this.props.debitsTotal}
        />
      );
    };

    return (
      <ImageBackground
        source={require("../images/gradientsilverbackground.png")}
        style={styles.viewStyle}
      >
        <View>
            {currentBudget()}
        </View>
        <Piechart
          x={100}
          y={100}
          outerRadius={100}
          innerRadius={50}
          data={[
            { value: 92 - 34, label: "Code lines" },
            { value: 34, label: "Empty lines" }
          ]}
        />
      </ImageBackground>
    );
  }
}

const styles = {
  viewStyle: {
    width: "100%",
    height: "100%",
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    padding: 0
  }
};

const mapStateToProps = state => {
  console.log(state);
  const userObjects = state.users;

  const userData = _.map(userObjects, val => {
    return { ...val };
  });
  const momentMonth = moment().format("MMMM");
  const momentYear = moment().format("YYYY");
  console.log(userData, momentMonth, momentYear);

  const arrayCredits = userData.filter(entry => {
    if (entry["creditProp"]) {
      return entry;
    }
  });

  const arrayDebits = userData.filter(entry => {
    if (entry["debitProp"]) {
      return entry;
    }
  });

  const arrayCreditsByYear = arrayCredits.filter(entry => {
    if (entry["creditDate"].slice(-4) == momentYear) {
      return entry;
    }
  });

  const arrayDebitsByYear = arrayDebits.filter(entry => {
    if (entry["debitDate"].slice(-4) == momentYear) {
      return entry;
    }
  });

  const arrayCreditsByYearMonth = arrayCreditsByYear.filter(entry => {
    if (entry["creditDate"].slice(0, momentMonth.length) === momentMonth) {
      // const extractedPropsArray = entry.splice(0, 1)
      return entry;
    }
  });

  const arrayDebitsByYearMonth = arrayDebitsByYear.filter(entry => {
    if (entry["debitDate"].slice(0, momentMonth.length) === momentMonth) {
      // const extractedPropsArray = entry.splice(0, 1)
      return entry;
    }
  });

  const creditAmountsArray = [];
  const creditAmounts = arrayCreditsByYearMonth.filter(object => {
    console.log(object);
    const amount = object["creditAmount"];
    console.log(amount);
    return creditAmountsArray.push(parseInt(amount));
  });

  const debitAmountsArray = [];
  const debitAmounts = arrayDebitsByYearMonth.filter(object => {
    console.log(object);
    const amount = object["debitAmount"];
    console.log(amount);
    return debitAmountsArray.push(parseInt(amount));
  });

  const creditsTotal = creditAmountsArray.reduce(function(result, number) {
    result += number;
    return result;
  }, 0);

  const debitsTotal = debitAmountsArray.reduce(function(result, number) {
    result += number;
    return result;
  }, 0);

  console.log(debitAmountsArray, creditsTotal, debitsTotal);
  return { creditsTotal, debitsTotal, momentMonth };
};

export default connect(
  mapStateToProps,
  { usersFetch }
)(CurrentBudget);


