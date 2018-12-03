import _ from "lodash";
import React, { Component } from "react";
import { View, ImageBackground } from "react-native";
import { connect } from "react-redux";
import { usersFetch } from "../actions";
import DebitListItem from "./DebitListItem";
// import { Card, CardSection } from './common';
import moment from "moment";

class CurrentBudget extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        // this.debsGroupByYearMM = this.debsGroupByYearMM.bind(this);
        // this.credsGroupByYearMM = this.credsGroupByYearMM.bind(this);
    }
  componentDidMount() {
    this.props.usersFetch();
  }

  render() {
    console.log(this.props.compiledCredDebArrays);
    // const { compiledCredArray, compiledDebArray, compiledCredDebArrays } = this.props;

    
  const arrayOfAllInfo = this.props.compiledCredDebArrays



    const currentBudget = () => {
    //   console.log(this.props.debitsTotal);
      return (
        <DebitListItem
            arrayOfAllInfo={arrayOfAllInfo}
        //   incomeTotal={this.props.creditsTotal}
        //   expenseTotal={this.props.debitsTotal}
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
  if (entry["debitProp"]) {
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
      // this added a length of the array of objects to the main object
      // const arrayOfKeys = Object.keys(debGroupedYearMMs)
      // // console.log(arrayOfKeys)
      // debGroupedYearMMs['length'] = arrayOfKeys.length + 1

      // WHAT I'LL DO IN THE APP
          // return this.setState({ debGroupedYearMMs: debGroupedYearMMs })
      // not the below return
      return debGroupedYearMMs
  }
  console.log(debsGroupByYearMM())
  // const stateObjectOfDebYears = this.state.debGroupedYearMMs
      // console.log(stateObjectOfDebYears)
  const yearMMKeysDeb = Object.keys(debsGroupByYearMM())
      // console.log(yearMMKeysDeb)
  const newYearMMKeysDeb = yearMMKeysDeb.reverse()
      // console.log(newYearMMKeysDeb)

  // !!!!! worked in currentbudget logs
  const formattedDebDatesArrObj = newYearMMKeysDeb.map(each => {
      let formattedDebDate = moment(each, "YYYYMM").format("MMM YY")
          return {
                  id: each, 
                  formattedDate: formattedDebDate, 
                  daysInMonth: moment(formattedDebDate).daysInMonth()
                 };
  })
  //ABOVE IS TO REPLACE BELOW FOR THE ACTUAL APP
  // const formattedDebDatesArrObj = [
  //     {daysInMonth: 31,
  //     formattedDate: "Dec 18",
  //     id: '201812'
  //     },
  //     {daysInMonth: 30,
  //     formattedDate: "Nov 18",
  //     id: '201811'
  //     },
  //     {daysInMonth: 31,
  //     formattedDate: "Dec 17",
  //     id: '201712'
  //     },
  //     {daysInMonth: 30,
  //     formattedDate: "Nov 17",
  //     id: '201711'
  //     }
  // ]
  // console.log(formattedDebDatesArrObj)


  const arrayOfObjectsTotalDebs = []

  for (let i=0; i<newYearMMKeysDeb.length; i++) {
  let yyyyMMDeb = debsGroupByYearMM()[newYearMMKeysDeb[i]]
  let debitTotalEachYYYYMM = 0

  for (let ii=0; ii<yyyyMMDeb.length; ii++) {
      // console.log(yyyyMM[ii].debitAmount)
      debitTotalEachYYYYMM += parseInt(yyyyMMDeb[ii].debitAmount)
  }
  arrayOfObjectsTotalDebs.push(
      {id: newYearMMKeysDeb[i], debMonthTotal: debitTotalEachYYYYMM}
      )
  }
  // console.log(arrayOfObjectsTotalDebs)
  //////////

  let compiledDebArray = [];
  arrayOfObjectsTotalDebs.forEach((itm, i) => {
  compiledDebArray.push(Object.assign({}, itm, formattedDebDatesArrObj[i]));
  });

  console.log(compiledDebArray);
  // console.log(compiledDebArray[0]['daysInMonth']);



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
      // WHAT I'LL DO IN THE APP
          // return this.setState({ credGroupedYearMMs: credGroupedYearMMs })
      // not the below return
      return credGroupedYearMMs
  }
  // credsGroupByYearMM()
  // const stateObjectOfCredYears = credState.credGroupedYearMMs
      // console.log(stateObjectOfCredYears)
  const yearMMKeysCred = Object.keys(credsGroupByYearMM())
      // console.log(yearMMKeysCred)
  const newYearMMKeysCred = yearMMKeysCred.reverse()
      // console.log(newYearMMKeysCred)

  // !!!!! worked in currentbudget logs
  const formattedCredDatesArrObj = newYearMMKeysCred.map(each => {
      let formattedCredDate = moment(each, "YYYYMM").format("MMM YY")
          return {
                  id: each, 
                  formattedDate: formattedCredDate, 
                  daysInMonth: moment(formattedCredDate).daysInMonth()
                 };
  })
  //ABOVE IS TO REPLACE BELOW FOR THE ACTUAL APP
  // const formattedCredDatesArrObj = [
  //     {daysInMonth: 31,
  //     formattedDate: "Dec 18",
  //     id: '201812'
  //     },
  //     {daysInMonth: 30,
  //     formattedDate: "Nov 18",
  //     id: '201811'
  //     },
  //     {daysInMonth: 31,
  //     formattedDate: "Dec 17",
  //     id: '201712'
  //     },
  //     {daysInMonth: 30,
  //     formattedDate: "Nov 17",
  //     id: '201711'
  //     }
  // ]
  // console.log(formattedCredDatesArrObj)



  const arrayOfObjectsTotalCreds = []

  for (var i=0; i<newYearMMKeysCred.length; i++) {

  let yyyyMM = credsGroupByYearMM()[newYearMMKeysCred[i]]
  let creditTotalEachYYYYMM = 0

  for (let ii=0; ii<yyyyMM.length; ii++) {
      // console.log(yyyyMM[ii].creditAmount)
      creditTotalEachYYYYMM += parseInt(yyyyMM[ii].creditAmount)
  }
  // arrayOfObjectsTotalCreds.push({[newYearMMKeysCred[i]]: creditTotalEachYYYYMM})

  arrayOfObjectsTotalCreds.push(
      {id: newYearMMKeysCred[i], credMonthTotal: creditTotalEachYYYYMM}
      )

  }
  // console.log(arrayOfObjectsTotalCreds)

  let compiledCredArray = [];
  arrayOfObjectsTotalCreds.forEach((itm, i) => {
  compiledCredArray.push(Object.assign({}, itm, formattedCredDatesArrObj[i]));
  });

  console.log(compiledCredArray);
  // console.log(compiledCredArray[0]['daysInMonth']);

  // const { compiledCredArray, compiledDebArray, compiledCredDebArrays } = this.props;


  let compiledCredDebArrays = [];
  compiledCredArray.forEach((itm, i) => {
  compiledCredDebArrays.push(Object.assign({}, itm, compiledDebArray[i]));
  });
  console.log(compiledCredArray, compiledDebArray, compiledCredDebArrays);

  // END OF BUDGET LOGIC


  return { compiledCredArray, compiledDebArray, compiledCredDebArrays };
};

export default connect(
  mapStateToProps,
  { usersFetch }
)(CurrentBudget);

  // these are for checking console.logs
// 
// const datePicked = "November 25 2018"
//   const momentYYYYMM = moment(datePicked, "MMMM DD YYYY").format("YYYYMM")
//   const newYearMMKeysDebTest = [ '201812', '201811', '201712', '201711' ]
//     const formattedDebDatesArrObj = newYearMMKeysDebTest.map(each => {
//         let formattedDebDate = moment(each, "YYYYMM").format("MMM YY")
//             return  {
//                     id: each, 
//                     formattedDate: formattedDebDate, 
//                     daysInMonth: moment(formattedDebDate).daysInMonth()
//                     };
//     })


//   const momentMonth = moment().format("MMMM");
//   const momentYear = moment().format("YYYY");
//   console.log(userData, momentMonth, momentYear, momentYYYYMM, formattedDebDatesArrObj);

//   const arrayCredits = userData.filter(entry => {
//     if (entry["creditProp"]) {
//       return entry;
//     }
//   });

//   const arrayDebits = userData.filter(entry => {
//     if (entry["debitProp"]) {
//       return entry;
//     }
//   });

//   const arrayCreditsByYear = arrayCredits.filter(entry => {
//     if (entry["creditDate"].slice(-4) == momentYear) {
//       return entry;
//     }
//   });

//   const arrayDebitsByYear = arrayDebits.filter(entry => {
//     if (entry["debitDate"].slice(-4) == momentYear) {
//       return entry;
//     }
//   });

//   const arrayCreditsByYearMonth = arrayCreditsByYear.filter(entry => {
//     if (entry["creditDate"].slice(0, momentMonth.length) === momentMonth) {
//       // const extractedPropsArray = entry.splice(0, 1)
//       return entry;
//     }
//   });

//   const arrayDebitsByYearMonth = arrayDebitsByYear.filter(entry => {
//     if (entry["debitDate"].slice(0, momentMonth.length) === momentMonth) {
//       // const extractedPropsArray = entry.splice(0, 1)
//       return entry;
//     }
//   });

//   const creditAmountsArray = [];
//   const creditAmounts = arrayCreditsByYearMonth.filter(object => {
//     console.log(object);
//     const amount = object["creditAmount"];
//     console.log(amount);
//     return creditAmountsArray.push(parseInt(amount));
//   });

//   const debitAmountsArray = [];
//   const debitAmounts = arrayDebitsByYearMonth.filter(object => {
//     console.log(object);
//     const amount = object["debitAmount"];
//     console.log(amount);
//     return debitAmountsArray.push(parseInt(amount));
//   });

//   const creditsTotal = creditAmountsArray.reduce(function(result, number) {
//     result += number;
//     return result;
//   }, 0);

//   const debitsTotal = debitAmountsArray.reduce(function(result, number) {
//     result += number;
//     return result;
//   }, 0);

//   console.log(debitAmountsArray, creditsTotal, debitsTotal);