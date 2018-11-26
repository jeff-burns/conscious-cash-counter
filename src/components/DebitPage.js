import React, { Component } from "react";
import { Text, Picker } from "react-native";
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

//CREDIT
class DebitPage extends Component {
  state = {
    isDebitOrCredit: 'debit', //CREDIT
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
    const debitProp = this.state.isDebitOrCredit; //CREDIT
    const { debitAmount, debitType, debitNote, debitRepeating } = this.props;
    this.props.userDebitUpdate({ prop: "debitDate", value: this.state.pickedDate })
    this.props.userDebitCreate({
      debitProp, //CREDIT
      debitAmount,
      debitDate: pickedDate || todaysDate,
      debitType: debitType || "Groceries", //CREDIT
      debitNote,
      debitRepeating
    });
    this.setState({ showConfirmDebitModal: false, showNavModal: true });
  }

  onDecline() {
    this.setState({ showConfirmDebitModal: false });
  }

  navToDebit() {
    this.setState({ showNavModal: false }); //CREDIT
  }

  navToCredit() {
    this.setState({ showNavModal: false }); //CREDIT
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
      <Card>
        <CardSection>
          <BudgetInput
            label="Expense Amount" //CREDIT
            placeholder="Round Up - 54.32 is 55"
            keyboardType="numeric"
            value={this.props.debitAmount}
            onChangeText={value =>
              this.props.userDebitUpdate({ prop: "debitAmount", value })
            }
          />
        </CardSection>

        <CardSection>
          <DatePicker
            style={{ width: 350 }}
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
        
        <CardSection style={{ flexDirection: "column" }}>
          <Text style={styles.pickerLabelStyle}>Expense Type</Text> 
          <Picker
            selectedValue={this.props.debitType}
            onValueChange={value =>
              this.props.userDebitUpdate({ prop: "debitType", value })
            }
          >
            <Picker.Item label="Groceries" value="Groceries" />
            <Picker.Item label="Phone" value="Phone" />
            <Picker.Item label="Rent/Mortgage" value="Rent/Mortgage" />
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

        <CardSection>
          <BudgetInput
            label="Notes on Expense"
            placeholder="Trader Joe's" //CREDIT
            value={this.props.debitNote}
            onChangeText={value =>
              this.props.userDebitUpdate({ prop: "debitNote", value })
            }
          />
        </CardSection>

        <CardSection>
          <Button
            onPress={() =>
              this.setState({
                showConfirmDebitModal: !this.state.showConfirmDebitModal
              })
            }
          >
            Debit from Account
          </Button>
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
    );
  }
}

const styles = {
  pickerLabelStyle: {
    fontSize: 19,
    alignSelf: 'center'
  }
};

const mapStateToProps = state => {
  console.log(state);
  const { debitProp, debitAmount, debitDate, debitType, debitNote, debitRepeating } = state.userForm; //CREDIT

  return { debitProp, debitAmount, debitDate, debitType, debitNote, debitRepeating }; //CREDIT
};
export default connect(
  mapStateToProps,
  {
    userDebitUpdate,
    usersFetch,
    userDebitCreate
  }
)(DebitPage); //CREDIT

// <Input
//     label="Date"
//     placeholder="Redo this with a Date Picker"
//     value={this.props.date}
//     onChangeText={value => this.props.userDebitUpdate({ prop: 'date', value })}
// >
// </Input>

//     <Input
//     label="Save as a Repeating Expense"
//     placeholder="Check Box Here"
//     value={this.props.repeating}
//     onChangeText={value => this.props.userDebitUpdate({ prop: 'repeating', value })}
// >
// </Input>

//     <CardSection>

//     <CheckBox
//         style={styles.checkboxContainer}
//         checked={this.state.checked}
//         // () => this.setState({checked: !this.state.checked})
//         onPress={value => this.props.userDebitUpdate({ prop: 'repeating', value })}
//         // color='#009688'
//     />

//     <CheckBox />
// </CardSection>
