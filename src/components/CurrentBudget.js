import _ from "lodash";
import React, { Component } from "react";
import { View, ImageBackground } from "react-native";
import { connect } from "react-redux";
import { usersFetch } from "../actions";
import DebitListItem from "./DebitListItem";
import moment from "moment";

class CurrentBudget extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
  componentDidMount() {
    this.props.usersFetch();
  }

  render() {
    console.log(this.props.compiledCredDebArrays);
 
    const arrayOfAllInfo = this.props.compiledCredDebArrays

    const currentBudget = () => {
      return (
        <DebitListItem
            arrayOfAllInfo={arrayOfAllInfo}
        />
      );
    };

    return (
      <ImageBackground
        source={require("../images/gradientsilverbackground.png")}
        style={styles.viewStyle}
      >
        <View>{currentBudget()}</View>
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

const mapStateToProps = reduxState => {
  console.log(reduxState);
  const userObjects = reduxState.users;

  const userData = _.map(userObjects, val => {
    return { ...val };
  });

    // BEGINNING OF BUDGET LOGIC
  //DEBIT

  const dateDebitProp = "debitDateYYYYMM"

  const arrayDebits = userData.filter(entry => {
    console.log(userData)
    if (entry[dateDebitProp]) {
      return entry;
    }
  });

  const debsGroupByYearMM = () => {
      let debGroupedYearMMs = {};
      for (var i=0; i<arrayDebits.length; i++) {
          var p = arrayDebits[i][dateDebitProp];
          if (!debGroupedYearMMs[p]) { debGroupedYearMMs[p] = []; }
          debGroupedYearMMs[p].push(arrayDebits[i]);
      }
      return debGroupedYearMMs
  }

  const yearMMKeysDeb = Object.keys(debsGroupByYearMM())
  const newYearMMKeysDeb = yearMMKeysDeb.reverse()
   
  const formattedDebDatesArrObj = newYearMMKeysDeb.map(each => {
      let formattedDebDate = moment(each, "YYYYMM").format("MMM YY")
          return {
                  id: each, 
                  formattedDate: formattedDebDate, 
                  daysInMonth: moment(formattedDebDate).daysInMonth()
                 };
  })
  
  const arrayOfObjectsTotalDebs = []

  for (let i=0; i<newYearMMKeysDeb.length; i++) {
    let yyyyMMDeb = debsGroupByYearMM()[newYearMMKeysDeb[i]]
    let debitTotalEachYYYYMM = 0

    for (let ii=0; ii<yyyyMMDeb.length; ii++) {
        debitTotalEachYYYYMM += parseInt(yyyyMMDeb[ii].debitAmount)
    }
    arrayOfObjectsTotalDebs.push(
        {id: newYearMMKeysDeb[i], debMonthTotal: debitTotalEachYYYYMM}
        )
  }

  let compiledDebArray = [];
  arrayOfObjectsTotalDebs.forEach((itm, i) => {
    compiledDebArray.push(Object.assign({}, itm, formattedDebDatesArrObj[i]));
  });

  //CREDIT
  const dateCreditProp = "creditDateYYYYMM"

  const arrayCredits = userData.filter(entry => {
    if (entry["creditProp"]) {
        return entry;
    }
  });

  const credsGroupByYearMM = () => {
      let credGroupedYearMMs = {};
      for (let i=0; i<arrayCredits.length; i++) {
          let p = arrayCredits[i][dateCreditProp];
          if (!credGroupedYearMMs[p]) { credGroupedYearMMs[p] = []; }
          credGroupedYearMMs[p].push(arrayCredits[i]);
      }
      return credGroupedYearMMs
  }

  const yearMMKeysCred = Object.keys(credsGroupByYearMM())
  const newYearMMKeysCred = yearMMKeysCred.reverse()
   
  const formattedCredDatesArrObj = newYearMMKeysCred.map(each => {
      let formattedCredDate = moment(each, "YYYYMM").format("MMM YY")
          return {
                  id: each, 
                  formattedDate: formattedCredDate, 
                  daysInMonth: moment(formattedCredDate).daysInMonth()
                 };
  })

  const arrayOfObjectsTotalCreds = []

  for (var i=0; i<newYearMMKeysCred.length; i++) {

    let yyyyMM = credsGroupByYearMM()[newYearMMKeysCred[i]]
    let creditTotalEachYYYYMM = 0

    for (let ii=0; ii<yyyyMM.length; ii++) {
        creditTotalEachYYYYMM += parseInt(yyyyMM[ii].creditAmount)
    }

    arrayOfObjectsTotalCreds.push(
        {id: newYearMMKeysCred[i], credMonthTotal: creditTotalEachYYYYMM}
    )

  }

  let compiledCredArray = [];
  arrayOfObjectsTotalCreds.forEach((itm, i) => {
    compiledCredArray.push(Object.assign({}, itm, formattedCredDatesArrObj[i]));
  });
  
  let compiledCredDebArrays = [];
  compiledCredArray.forEach((itm, i) => {
    compiledCredDebArrays.push(Object.assign({}, itm, compiledDebArray[i]));
  });

  // END OF BUDGET LOGIC


  return { compiledCredArray, compiledDebArray, compiledCredDebArrays };
};

export default connect(
  mapStateToProps,
  { usersFetch }
)(CurrentBudget);

 