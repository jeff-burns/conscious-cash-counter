import React, { Component } from "react";
import {
  Text,
  Picker,
  ImageBackground,
  View,
  KeyboardAvoidingView
} from "react-native";
import AwesomeButtonCartman from "react-native-really-awesome-button/src/themes/cartman";
import { connect } from "react-redux";
import { userCreditUpdate, usersFetch, userCreditCreate } from "../actions";
import { Actions } from "react-native-router-flux";
import DatePicker from "react-native-datepicker";
import {
  Card,
  CardSection,
  BudgetInput,
  Button,
  Confirm,
  ConfirmNavModal
} from "./common";
import moment from "moment";

class CreditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDebitOrCredit: "credit",
      showConfirmDebitModal: false,
      showNavModal: false,
      pickedDate: ""
      // isAmount: true
    };
  }

  // For use when autofill is available
  componentWillMount() {
    this.props.usersFetch();
  }

  onAccept() {
    // todaysDate is useless, just using YYYY-MM as the format until it is reformatted for display later
    if (!this.state.amountEntered) {
      this.setState({
        isAmount: false,
        showConfirmDebitModal: !this.state.showConfirmDebitModal,
        showNavModal: false
      });
    }
    if (isNaN(this.state.amountEntered)) {
      this.setState({
        amountEntered: null,
        isAmount: false,
        showConfirmDebitModal: !this.state.showConfirmDebitModal,
        showNavModal: false
      });
    } else {
      const todaysDate = moment().format("MMM DD YYYY");
      const todaysYYYYMM = moment().format("YYYYMMDD").slice(0, 6);
      const prettyPickedDate = this.state.reformattedPickedDate
      const pickedDate = this.state.pickedDate;
      const creditProp = this.state.isDebitOrCredit;
      console.log(todaysYYYYMM);
      const {
        creditAmount,
        creditType,
        creditNote,
        creditRepeating
      } = this.props;
      this.props.userCreditUpdate({
        prop: "creditDate",
        value: this.state.pickedDate
      });
      this.props.userCreditCreate({
        creditProp,
        creditAmount,
        creditDate: prettyPickedDate || todaysDate,
        creditDateYYYYMM: pickedDate || todaysYYYYMM,
        creditType: creditType || "Basic Income",
        creditNote,
        creditRepeating
      });
      this.setState({
        showConfirmDebitModal: false,
        pickedDate: "",
        reformattedPickedDate: "",
        showNavModal: true,
        isAmount: null
      });
    }
  }

  onDecline() {
    this.setState({ showConfirmDebitModal: false });
  }

  navToDebit() {
    this.setState({ showNavModal: false, amountEntered: null });
    Actions.debitPage();
  }

  navToCredit() {
    this.setState({ showNavModal: false, amountEntered: null });
  }

  navToBudget() {
    this.setState({ showNavModal: false });
    Actions.currentBudget();
  }

  navToAccount() {
    this.setState({ showNavModal: false });
    Actions.myAccount();
  }

  renderError() {
    if (this.state.isAmount === false) {
      return (
        <View style={{ backgroundColor: "white" }}>
          <Text style={styles.errorTextStyle}>
            "Must enter a Number Amount"
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <ImageBackground
        source={require("../images/gradientsilverbackground.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <Card>
          <CardSection style={styles.cardSectionStyle}>
            <BudgetInput
              label="Income Amount"
              placeholder="Round Down - 54.72 is 54"
              autoFocus={true}
              // NUMERIC DIDN'T BRING UP THE NUMBERS KEYBOARD SO MAYBE UNCOMMENT THIS THEN TOO
              keyboardType={"number-pad"}
              value={this.state.amountEntered}
              onChangeText={value => {
                console.log(value);
                console.log(isNaN(value));
                if (isNaN(value)) {
                  console.log("error needs a number");
                  this.setState({ isAmount: false, amountEntered: "" });
                } else {
                  // console.log(parsedValue)
                  console.log(value);
                  this.setState({ isAmount: true, amountEntered: value });
                  this.props.userCreditUpdate({ prop: "creditAmount", value });
                }

                // this.setState({ amountEntered: value});
                // if(isNaN(this.state.amountEntered)) {
                //   this.setState({ isAmount: false });
                //   // this.props.userCreditUpdate({ prop: "creditAmount", value: null })
                // }
                // this.props.userCreditUpdate({ prop: "creditAmount", value })
              }}
            />
          </CardSection>
          {this.renderError()}
          <CardSection style={styles.pickerCardSectionStyle}>
            <Text style={styles.textLabelStyle}>Date</Text>
            <DatePicker
              style={{ width: 325 }}
              // date={moment().format('MMMM DD YYYY')}
              mode="date"
              placeholder={
                this.state.reformattedPickedDate
                  ? this.state.reformattedPickedDate
                  : "Select Date"
              }
              format="YYYYMMDD"
              minDate="2018-01-01"
              maxDate="2050-12-31"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={value => {
                const pickedDate = value.slice(0, 6);
                const reformattedPickedDate = moment(value, "YYYYMMDD").format(
                  "MMM DD YYYY"
                );
                this.setState({ pickedDate, reformattedPickedDate });
              }}
            />
          </CardSection>

          <CardSection style={styles.pickerCardSectionStyle}>
            <Text style={styles.textLabelStyle}>Income Type</Text>
            <Picker
              selectedValue={this.props.creditType}
              onValueChange={value =>
                this.props.userCreditUpdate({ prop: "creditType", value })
              }
            >
              <Picker.Item label="Basic Income" value="Basic Income" />
              <Picker.Item label="Cash" value="Cash" />
              <Picker.Item label="Side Job" value="Side Job" />
              <Picker.Item
                label="Investment Income"
                value="Investment Income"
              />
              <Picker.Item
                label="Leftover From Last Month"
                value="Leftover From Last Month"
              />
            </Picker>
          </CardSection>

          <KeyboardAvoidingView
            behavior="position"
            enabled
            style={styles.cardsectionReplacementStyle}
            keyboardVerticalOffset={64}
          >
            <CardSection style={styles.cardSectionStyle}>
              <BudgetInput
                label="Notes on Income"
                placeholder="Weekly Pay"
                value={this.props.creditNote}
                onChangeText={value =>
                  this.props.userCreditUpdate({ prop: "creditNote", value })
                }
              />
            </CardSection>
          </KeyboardAvoidingView>

          <CardSection style={styles.buttonCardSectionStyle}>
            <AwesomeButtonCartman
              type="anchor"
              textColor="#21EB1A"
              borderColor="#21EB1A"
              backgroundDarker="#17A412"
              backgroundShadow="#0D5E0A"
              width={360.5}
              height={65}
              textSize={22}
              onPress={() => {
                this.setState({
                  showConfirmDebitModal: !this.state.showConfirmDebitModal
                });
              }}
              style={{
                flex: 1,
                marginLeft: 0,
                padding: 0
                // backgroundShadow: '#007aff',
                // textShadowOffset: { width: 0, height: 2},
                // textShadowColor: "#7F0000"
              }}
            >
              Credit to Account
            </AwesomeButtonCartman>
          </CardSection>

          <Confirm
            visible={this.state.showConfirmDebitModal}
            onAccept={this.onAccept.bind(this)}
            onDecline={this.onDecline.bind(this)}
          >
            Are you sure you want to Credit this?
          </Confirm>

          <ConfirmNavModal
            visible={this.state.showNavModal}
            navToDebit={this.navToDebit.bind(this)}
            navToCredit={this.navToCredit.bind(this)}
            navToBudget={this.navToBudget.bind(this)}
            navToAccount={this.navToAccount.bind(this)}
          >
            Where To?
          </ConfirmNavModal>
        </Card>
      </ImageBackground>
    );
  }
}
const styles = {
  textLabelStyle: {
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "bold"
  },
  cardSectionStyle: {
    margin: 2,
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 2,
    position: "relative"
  },
  cardsectionReplacementStyle: {
    margin: 0,
    borderWidth: 0,
    paddingTop: 0,
    paddingBottom: -1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 2,
    position: "relative"
  },
  pickerCardSectionStyle: {
    margin: 2,
    borderWidth: 0,
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 2,
    position: "relative",
    flexDirection: "column"
  },
  buttonCardSectionStyle: {
    margin: 2,
    borderWidth: 1,
    padding: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 2,
    position: "relative"
  },
  buttonTextStyle: {
    justifyContent: "center",
    alignSelf: "center",
    color: "white",
    fontSize: 19,
    fontWeight: "800",
    paddingTop: 10,
    paddingBottom: 10
  },
  creditButtonStyle: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: "#4ebc05",
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "#409649",
    margin: 0,
    height: 65
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  }
};

const mapStateToProps = state => {
  console.log(state);
  const {
    creditProp,
    creditAmount,
    creditDate,
    creditDateYYYYMM,
    creditType,
    creditNote,
    creditRepeating
  } = state.userForm;

  return {
    creditProp,
    creditAmount,
    creditDate,
    creditDateYYYYMM,
    creditType,
    creditNote,
    creditRepeating
  };
};
export default connect(
  mapStateToProps,
  {
    userCreditUpdate,
    usersFetch,
    userCreditCreate
  }
)(CreditPage);

// <TouchableOpacity
//             style={styles.creditButtonStyle}
//             onPress={() =>
//                 this.setState({
//                 showConfirmDebitModal: !this.state.showConfirmDebitModal
//                 })
//           }>
//             <Text style={styles.buttonTextStyle}>
//                 Credit to Account
//             </Text>
//           </TouchableOpacity>

// import React, { Component } from 'react';
// import { Actions } from 'react-native-router-flux';
// import {
//     Card,
//     CardSection,
//     BudgetInput,
//     Input,
//     Button,
//     Confirm,
//     ConfirmNavModal
// } from './common';

// class CreditPage extends Component {
//     state = {
//         showConfirmCreditModal: false,
//         showNavModal: false
//     };

//     onAccept() {
//         console.log('credited!')
//         this.setState({ showConfirmCreditModal: false, showNavModal: true })
//     }

//     onDecline() {
//         this.setState({ showConfirmCreditModal: false });
//     }

//     navToDebit() {
//         this.setState({ showNavModal: false });
//         Actions.debitPage();
//     }

//     navToCredit() {
//         this.setState({ showNavModal: false });
//     }

//     navToBudget() {
//         this.setState({ showNavModal: false });
//         Actions.currentBudget();
//     }

//     navToAccount() {
//         this.setState({ showNavModal: false });
//         Actions.myAccount();
//     }

//     render() {
//         return (
//             <Card>
//                 <CardSection>
//                     <BudgetInput
//                         label="Income Amount"
//                         placeholder="Round Down - 54.72 is 54"
//                     >
//                     </BudgetInput>
//                 </CardSection>

//                 <CardSection>
//                     <Input
//                         label="Date"
//                         placeholder="Redo with a Date Picker"
//                     >
//                     </Input>
//                 </CardSection>

//                 <CardSection>
//                     <Input
//                         label="Income Type"
//                         placeholder="This will be a Picker"
//                     >
//                     </Input>
//                 </CardSection>

//                 <CardSection>
//                     <BudgetInput
//                         label="Notes on Income"
//                         placeholder="sold couch on craigslist"
//                     >
//                     </BudgetInput>
//                 </CardSection>

//                 <CardSection>
//                     <Button onPress={() => this.setState({ showConfirmCreditModal: !this.state.showConfirmCreditModal })}>
//                         Credit to Account
//                     </Button>
//                 </CardSection>

//                 <Confirm
//                     visible={this.state.showConfirmCreditModal}
//                     onAccept={this.onAccept.bind(this)}
//                     onDecline={this.onDecline.bind(this)}
//                 >
//                     Are you sure you want to Debit this?
//                 </Confirm>

//                 <ConfirmNavModal
//                     visible={this.state.showNavModal}
//                     navToDebit={this.navToDebit.bind(this)}
//                     navToCredit={this.navToCredit.bind(this)}
//                     navToBudget={this.navToBudget.bind(this)}
//                     navToAccount={this.navToAccount.bind(this)}
//                 >
//                     Where To?
//                 </ConfirmNavModal>

//             </Card>
//         );
//     }
// }

// export default CreditPage;
