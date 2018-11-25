import React, { Component } from 'react';
import { Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { userUpdate, usersFetch, userCreate } from '../actions';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import { 
    Card, 
    CardSection, 
    Input,
    BudgetInput, 
    Button, 
    Confirm, 
    ConfirmNavModal 
} from './common';

class DebitPage extends Component {
    state = { 
        showConfirmDebitModal: false,
        showNavModal: false 
    };

    componentWillMount() {
        this.props.usersFetch();
    }

    onAccept() {
        const { amount, date, type, note, repeating } = this.props;
        this.props.userCreate({ amount, date, type: type || 'Groceries', note, repeating })
        this.setState({ showConfirmDebitModal: false, showNavModal: true })
    }

    onDecline() {
        this.setState({ showConfirmDebitModal: false });
    }

    navToDebit() {
        this.setState({ showNavModal: false });
        Actions.debitPage();
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
                        onChangeText={value => this.props.userUpdate({ prop: 'amount', value })}
                    >
                    </BudgetInput>
                </CardSection>

                <CardSection>
                    <Input
                        label="Date"
                        placeholder="Redo this with a Date Picker"
                        value={this.props.date}
                        onChangeText={value => this.props.userUpdate({ prop: 'date', value })}
                    >
                    </Input>
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2018-01-01"
                        // maxDate="2016-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={value => this.props.userUpdate({ prop: 'date', value })}
                        // (date) => {this.setState({date: date})}
                    />
                </CardSection>

                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={styles.pickerLabelStyle}>Expense Type</Text>
                    <Picker
                        selectedValue={this.props.type}
                        onValueChange={value => this.props.userUpdate({ prop: 'type', value })}
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
                        onChangeText={value => this.props.userUpdate({ prop: 'note', value })}
                    >
                    </BudgetInput>
                </CardSection>

                <CardSection>
                    <Input
                        label="Save as a Repeating Expense"
                        placeholder="Check Box Here"
                        value={this.props.repeating}
                        onChangeText={value => this.props.userUpdate({ prop: 'repeating', value })}
                    >
                    </Input>
                </CardSection>

                <CardSection>
                <Button onPress={ 
                    () => this.setState({ showConfirmDebitModal: !this.state.showConfirmDebitModal })
                }>
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
        fontSize: 18,
        paddingLeft: 20
    }
};

const mapStateToProps = (state) => {
    console.log(state)
    const { amount, date, type, note, repeating } = state.userForm;
    
    return { amount, date, type, note, repeating };
    }
export default connect(mapStateToProps, {  
    userUpdate, 
    usersFetch, 
    userCreate 
})(DebitPage);