import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { 
    Card, 
    CardSection, 
    Input, 
    Button, 
    Confirm, 
    ConfirmNavModal 
} from './common';

class DebitPage extends Component {
    state = { 
        showConfirmDebitModal: false,
        showNavModal: false 
    };

    onAccept() {
        console.log('debited!')
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
                    <Input
                        label="Expense Amount"
                        placeholder="Round Up - 54.32 is 55"
                    >
                    </Input>
                </CardSection>

                <CardSection>
                    <Input
                        label="Date"
                        placeholder="Redo this with a Date Picker"
                    >
                    </Input>
                </CardSection>

                <CardSection>
                    <Input
                        label="Expense Type"
                        placeholder="This will be a Picker"
                    >
                    </Input>
                </CardSection>

                <CardSection>
                    <Input
                        label="Notes on Expense"
                        placeholder="Trader Joe's"
                    >
                    </Input>
                </CardSection>

                <CardSection>
                    <Input
                        label="Save as a Repeating Expense"
                        placeholder="Check Box Here"
                    >
                    </Input>
                </CardSection>

                <CardSection>
                <Button onPress={() => this.setState({ showConfirmDebitModal: !this.state.showConfirmDebitModal })}>
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

export default DebitPage;