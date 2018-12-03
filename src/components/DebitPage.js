import React, { Component } from "react";
import { Text, Picker, ImageBackground } from "react-native";
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import { connect } from "react-redux";
import { userDebitUpdate, usersFetch, userDebitCreate } from "../actions";
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


class DebitPage extends Component {
  state = {
    isDebitOrCredit: 'debit', 
    showConfirmDebitModal: false,
    showNavModal: false,
    pickedDate: ''
  };

  // For use when autofill is available
  componentWillMount() {
    this.props.usersFetch();
  }

  onAccept() {
    const todaysDate = moment().format("MMMM DD YYYY");
    const pickedDate = this.state.pickedDate;
    const momentYYYYMM = moment(pickedDate, "MMMM DD YYYY").format("YYYYMM")
    const debitProp = this.state.isDebitOrCredit; 
    const { debitAmount, debitType, debitNote, debitRepeating } = this.props;
    this.props.userDebitUpdate({ prop: "debitDate", value: this.state.pickedDate })
    this.props.userDebitCreate({
      debitProp, 
      debitAmount,
      debitDate: pickedDate || todaysDate,
      debitDateYYYYMM: momentYYYYMM,
      debitType: debitType || "Groceries", 
      debitNote,
      debitRepeating
    });
    this.setState({ showConfirmDebitModal: false, showNavModal: true });
  }

  onDecline() {
    this.setState({ showConfirmDebitModal: false });
  }

  navToDebit() {
    this.setState({ showNavModal: false }); 
  }

  navToCredit() {
    this.setState({ showNavModal: false }); 
    Actions.creditPage();
  }

  navToBudget() {
    this.setState({ showNavModal: false });
    Actions.currentBudget();
  }

  navToAccount() {
    this.setState({ showNavModal: false });
    Actions.myAccount();
  }

  render() {
    return (
        <ImageBackground source={require('../images/gradientsilverbackground.png')} style={{width: '100%', height: '100%'}}>
      <Card>
        <CardSection style={styles.cardSectionStyle}>
          <BudgetInput
            label="Expense Amount" 
            placeholder="Round Up - 54.32 is 55"
            keyboardType="numeric"
            value={this.props.debitAmount}
            onChangeText={value =>
              this.props.userDebitUpdate({ prop: "debitAmount", value })
            }
          />
        </CardSection>

        <CardSection style={styles.pickerCardSectionStyle}>
            <Text style={styles.textLabelStyle}>Date</Text>
          <DatePicker
            style={{ width: 325 }}
            // date={moment().format('MMMM DD YYYY')}
            mode="date"
            placeholder={this.state.pickedDate ? this.state.pickedDate : "Select Date"}
            format="MMMM DD YYYY"
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
            onDateChange={(value) => {this.setState({ pickedDate: value })}
            }
          />
        </CardSection>
        
        <CardSection style={styles.pickerCardSectionStyle}>
          <Text style={styles.textLabelStyle}>Expense Type</Text> 
          <Picker
            pickerStyleType={{ padding: 1, margin: 1 }}
            selectedValue={this.props.debitType}
            onValueChange={value =>
              this.props.userDebitUpdate({ prop: "debitType", value })
            }
          >
            <Picker.Item label="Groceries" value="Groceries" />
            <Picker.Item label="Phone" value="Phone" />
            <Picker.Item label="Rent/Mortgage" value="Rent/Mortgage" />
            <Picker.Item label="Car Payment" value="Car Payment" />
            <Picker.Item label="Gasoline" value="Gasoline" />
            <Picker.Item label="Energy Bill" value="Energy Bill" />
            <Picker.Item label="Internet" value="Internet" />
            <Picker.Item label="Insurance" value="Insurance" />
            <Picker.Item label="Toiletries" value="Toiletries" />
            <Picker.Item label="Medicine" value="Medicine" />
            <Picker.Item label="Medical Payments" value="Medical Payments" />
            <Picker.Item label="Car Maintenance" value="Car Maintenance" />
            <Picker.Item label="Miscellaneous" value="Miscellaneous" />
          </Picker>
        </CardSection>

        <CardSection style={styles.cardSectionStyle}>
          <BudgetInput
            label="Notes on Expense"
            placeholder="Trader Joe's" 
            value={this.props.debitNote}
            onChangeText={value =>
              this.props.userDebitUpdate({ prop: "debitNote", value })
            }
          />
        </CardSection>

        <CardSection style={styles.buttonCardSectionStyle}>

            <AwesomeButtonCartman 
                type="anchor"
                textColor="#CC0000"
                borderColor="#CC0000"
                backgroundDarker="#7F0000"
                backgroundShadow= '#990000'
                width={360.5}
                height={65}
                textSize={22}
                onPress={() => this.setState({showConfirmDebitModal: !this.state.showConfirmDebitModal})}
                style={{
                    flex: 1,
                    marginLeft: 0,
                    padding: 0,
                    // backgroundShadow: '#007aff',
                    // textShadowOffset: { width: 0, height: 2},
                    // textShadowColor: "#7F0000"
                }}
                >
                    Debit from Account
                </AwesomeButtonCartman>

          
        </CardSection>

        <Confirm
          visible={this.state.showConfirmDebitModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to Debit this?
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
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  cardSectionStyle: {
    margin: 2,
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 2,
    position: 'relative'
  },
  pickerCardSectionStyle: {
    margin: 2,
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 2,
    position: 'relative',
    flexDirection: "column"
  },
  buttonCardSectionStyle: {
    margin: 2,
    borderWidth: 1,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 2,
    position: 'relative'
  },
  buttonTextStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'white',
    fontSize: 19,
    fontWeight: '800',
    paddingTop: 10,
    paddingBottom: 10
  },
  debitButtonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#f90207',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#a80d10',
    margin: 0,
    height: 65
}
};

const mapStateToProps = state => {
  console.log(state);
  const { debitProp, debitAmount, debitDate, debitDateYYYYMM, debitType, debitNote, debitRepeating } = state.userForm; 

  return { debitProp, debitAmount, debitDate, debitDateYYYYMM, debitType, debitNote, debitRepeating }; 
};
export default connect(
  mapStateToProps,
  {
    userDebitUpdate,
    usersFetch,
    userDebitCreate
  }
)(DebitPage); 


// <TouchableOpacity 
//             style={styles.debitButtonStyle}
//             onPress={() =>
//                 this.setState({
//                 showConfirmDebitModal: !this.state.showConfirmDebitModal
//                 })
//           }>
//             <Text style={styles.buttonTextStyle}>
//                 Debit from Account
//             </Text>
//           </TouchableOpacity>