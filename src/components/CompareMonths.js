import _ from "lodash";
import React, { Component } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground
} from "react-native";
import { connect } from "react-redux";
import { usersFetch } from "../actions";
import moment from "moment";

const numColumns = 5;

class CompareMonths extends Component {
  componentDidMount() {
    this.props.usersFetch();
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );
  };

  render() {
    console.log(this.props.compiledCredDebArrays);
    const {
      compiledCredDebArrays
    } = this.props;

    const gridData = [
      { key: "Month /Year" },
      { key: "Total Credit" },
      { key: "Total Debit" },
      { key: "Credit /Day" },
      { key: "Debit /Day" }
    ];

    compiledCredDebArrays.forEach(each => {
      const credDay = Math.floor(each.credMonthTotal / each.daysInMonth);
      const debDay = Math.round(each.debMonthTotal / each.daysInMonth);

      gridData.push(
        { key: each.formattedDate },
        { key: "$" + each.credMonthTotal },
        { key: "$" + each.debMonthTotal },
        { key: "$" + credDay },
        { key: "$" + debDay }
      );
    });
    console.log(gridData);

    return (
      <ImageBackground
        source={require("../images/gradientsilverbackground.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <FlatList
          data={gridData}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20
  },
  item: {
    backgroundColor: "#AC37FB",
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / numColumns // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent"
  },
  itemText: {
    color: "#fff",
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 2
  }
});

const mapStateToProps = state => {
  console.log(state);
  const userObjects = state.users;

  const userData = _.map(userObjects, val => {
    return { ...val };
  });

  // BEGINNING OF BUDGET LOGIC
  //DEBIT

  const dateDebitProp = "debitDateYYYYMM";

  const arrayDebits = userData.filter(entry => {
    console.log(userData);
    if (entry[dateDebitProp]) {
      return entry;
    }
  });

  const debsGroupByYearMM = () => {
    let debGroupedYearMMs = {};
    for (var i = 0; i < arrayDebits.length; i++) {
      var p = arrayDebits[i][dateDebitProp];
      if (!debGroupedYearMMs[p]) {
        debGroupedYearMMs[p] = [];
      }
      debGroupedYearMMs[p].push(arrayDebits[i]);
    }
    return debGroupedYearMMs;
  };

  const yearMMKeysDeb = Object.keys(debsGroupByYearMM());
  const newYearMMKeysDeb = yearMMKeysDeb.reverse();
// IS THIS BELOW A USELESS ARRAY NOW?
  const formattedDebDatesArrObj = newYearMMKeysDeb.map(each => {
    let slicedYear = parseInt(each.slice(0,4))
    let slicedMonth = parseInt(each.slice(-2))
    console.log(each)
    // function daysInMonth (month, year) { // Use 1 for January, 2 for February, etc.
      // const daysInMonthDeb = new Date(slicedYear, slicedMonth, 0).getDate().toString();
      const daysInMonthDeb = new Date(slicedYear, slicedMonth, 0).getDate();

    // let formattedDebDate = moment(fixedDateStrings, "YYYYMMDD").format("MMM YYYY");    
    return {
      id: each,
      daysInMonth: daysInMonthDeb
    };
  });

  const arrayOfObjectsTotalDebs = [];

  for (let i = 0; i < newYearMMKeysDeb.length; i++) {
    let yyyyMMDeb = debsGroupByYearMM()[newYearMMKeysDeb[i]];
    // let prettyDateShortened = yyyyMMDeb['debitDate'].slice(0,4) + yyyyMMDeb['debitDate'].slice(-4)
    let debitTotalEachYYYYMM = 0;

    for (let ii = 0; ii < yyyyMMDeb.length; ii++) {
      var prettyDateShortened = yyyyMMDeb[ii]['debitDate'].slice(0,4) + yyyyMMDeb[ii]['debitDate'].slice(-4)
        console.log(prettyDateShortened)

      debitTotalEachYYYYMM += parseInt(yyyyMMDeb[ii].debitAmount);
    }
    arrayOfObjectsTotalDebs.push({
      id: newYearMMKeysDeb[i],
      formattedDate: prettyDateShortened,
      debMonthTotal: debitTotalEachYYYYMM
    });
  }

  const compiledDebArray = [];
  arrayOfObjectsTotalDebs.forEach((itm, i) => {
    compiledDebArray.push(Object.assign({}, itm, formattedDebDatesArrObj[i]));
  });

  //CREDIT
  const dateCreditProp = "creditDateYYYYMM";

  const arrayCredits = userData.filter(entry => {
    if (entry["creditProp"]) {
      return entry;
    }
  });

  const credsGroupByYearMM = () => {
    let credGroupedYearMMs = {};
    for (let i = 0; i < arrayCredits.length; i++) {
      let p = arrayCredits[i][dateCreditProp];
      if (!credGroupedYearMMs[p]) {
        credGroupedYearMMs[p] = [];
      }
      credGroupedYearMMs[p].push(arrayCredits[i]);
    }
    return credGroupedYearMMs;
  };

  const yearMMKeysCred = Object.keys(credsGroupByYearMM());
  const newYearMMKeysCred = yearMMKeysCred.reverse();

  const formattedCredDatesArrObj = newYearMMKeysCred.map(each => {
    let slicedYear = parseInt(each.slice(0,4))
    let slicedMonth = parseInt(each.slice(-2))
    console.log(each)
    // function daysInMonth (month, year) { // Use 1 for January, 2 for February, etc.
      const daysInMonthCred = new Date(slicedYear, slicedMonth, 0).getDate();
    
    // let formattedDebDate = moment(fixedDateStrings, "YYYYMMDD").format("MMM YYYY");    
    return {
      id: each,
      daysInMonth: daysInMonthCred
    };
  });


  //   let formattedCredDate = moment(each, "YYYY-MM").format("MMM YYYY");
  //   return {
  //     id: each,
  //     formattedDate: formattedCredDate,
  //     daysInMonth: moment(formattedCredDate).daysInMonth()
  //   };
  // });

  const arrayOfObjectsTotalCreds = [];

  for (var i = 0; i < newYearMMKeysCred.length; i++) {
    let yyyyMMCred = credsGroupByYearMM()[newYearMMKeysCred[i]];
    let creditTotalEachYYYYMM = 0;

    for (let ii = 0; ii < yyyyMMCred.length; ii++) {
      var prettyDateShortened = yyyyMMCred[ii]['creditDate'].slice(0,4) + yyyyMMCred[ii]['creditDate'].slice(-4)
        console.log(prettyDateShortened)
      creditTotalEachYYYYMM += parseInt(yyyyMMCred[ii].creditAmount);
    }

    arrayOfObjectsTotalCreds.push({
      id: newYearMMKeysCred[i],
      formattedDate: prettyDateShortened,
      credMonthTotal: creditTotalEachYYYYMM
    });
  }

  const compiledCredArray = [];
  arrayOfObjectsTotalCreds.forEach((itm, i) => {
    compiledCredArray.push(Object.assign({}, itm, formattedCredDatesArrObj[i]));
  });

  const compiledCredDebArrays = [];
  if (compiledDebArray.length > 0 && compiledCredArray.length === 0) {
    //  compiledCredDebArrays.push(compiledDebArray)
     compiledDebArray.forEach((itm, i) => {
      compiledCredDebArrays.push(Object.assign({}, itm, compiledCredArray[i]));
    });
  } else {
    compiledCredArray.forEach((itm, i) => {
      compiledCredDebArrays.push(Object.assign({}, itm, compiledDebArray[i]));
    });
  }
  

  // END OF BUDGET LOGIC
  // NEED TO ACCOUNT FOR NEITHER BEING CREATED???????!!!!!!!!
  // const mapStateReturnObject = () => {
  //   if (compiledDebArray.length > 0 && compiledCredArray.length === 0) {
  //      { compiledDebArray, compiledCredDebArrays };
  //   }
  //   if (compiledCredArray.length > 0 && compiledDebArray.length === 0) {
  //      { compiledCredArray, compiledCredDebArrays };
  //   } 
  //   if (compiledCredArray.length > 0 && compiledDebArray.length > 0)
  //   {
  //      {  compiledDebArray, compiledCredArray, compiledCredDebArrays };
  //   }
  

  return { compiledCredDebArrays }
  }

export default connect(
  mapStateToProps,
  { usersFetch }
)(CompareMonths);
