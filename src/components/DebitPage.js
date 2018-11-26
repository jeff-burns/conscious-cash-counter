import React, { Component } from "react";
import { Text, Picker } from "react-native";
import { connect } from "react-redux";
import { userUpdate, usersFetch, userCreate } from "../actions";
import { Actions } from "react-native-router-flux";
import DatePicker from "react-native-datepicker";
import {
  Card,
  CardSection,
  Input,
  BudgetInput,
  Button,
  Confirm,
  ConfirmNavModal
} from "./common";
import moment from "moment";

class DebitPage extends Component {
    
  state = {
    showConfirmDebitModal: false,
    showNavModal: false,
    pickedDate: ''
  };

  componentWillMount() {
    this.props.usersFetch();
  }

//   datePick() {
//               this.props.userUpdate({ prop: "date", value: this.state.pickedDate })
//   }

  onAccept() {
    const todaysDate = moment().format("YYYY-MM-DD");
    const pickedDate = this.state.pickedDate;
    const { amount, type, note, repeating } = this.props;
    this.props.userUpdate({ prop: "date", value: this.state.pickedDate })
    this.props.userCreate({
      amount,
      date: pickedDate || todaysDate,
      type: type || "Groceries",
      note,
      repeating
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
      <Card>
        <CardSection>
          <BudgetInput
            label="Expense Amount"
            placeholder="Round Up - 54.32 is 55"
            keyboardType="numeric"
            value={this.props.amount}
            onChangeText={value =>
              this.props.userUpdate({ prop: "amount", value })
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
            // (date) => {this.setState({date: date})}
            // value={this.props.date}
          />
        </CardSection>

        <CardSection style={{ flexDirection: "column" }}>
          <Text style={styles.pickerLabelStyle}>Expense Type</Text>
          <Picker
            // style={{ height: 50, width: 100 }}
            selectedValue={this.props.type}
            onValueChange={value =>
              this.props.userUpdate({ prop: "type", value })
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
            placeholder="Trader Joe's"
            value={this.props.note}
            onChangeText={value =>
              this.props.userUpdate({ prop: "note", value })
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
  const { amount, date, type, note, repeating } = state.userForm;

  return { amount, date, type, note, repeating };
};
export default connect(
  mapStateToProps,
  {
    userUpdate,
    usersFetch,
    userCreate
  }
)(DebitPage);

// <Input
//     label="Date"
//     placeholder="Redo this with a Date Picker"
//     value={this.props.date}
//     onChangeText={value => this.props.userUpdate({ prop: 'date', value })}
// >
// </Input>

//     <Input
//     label="Save as a Repeating Expense"
//     placeholder="Check Box Here"
//     value={this.props.repeating}
//     onChangeText={value => this.props.userUpdate({ prop: 'repeating', value })}
// >
// </Input>

//     <CardSection>

//     <CheckBox
//         style={styles.checkboxContainer}
//         checked={this.state.checked}
//         // () => this.setState({checked: !this.state.checked})
//         onPress={value => this.props.userUpdate({ prop: 'repeating', value })}
//         // color='#009688'
//     />

//     <CheckBox />
// </CardSection>
