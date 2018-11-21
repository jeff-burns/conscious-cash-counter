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

class CreditPage extends Component {
    state = { 
        showConfirmCreditModal: false,
        showNavModal: false 
    };

    onAccept() {
        console.log('credited!')
        this.setState({ showConfirmCreditModal: false, showNavModal: true })
    }

    onDecline() {
        this.setState({ showConfirmCreditModal: false });
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
                        label="Income Amount"
                        placeholder="Round Down - 54.72 is 54"
                    >
                    </Input>
                </CardSection>

                <CardSection>
                    <Input
                        label="Date"
                        placeholder="Redo with a Date Picker"
                    >
                    </Input>
                </CardSection>

                <CardSection>
                    <Input
                        label="Income Type"
                        placeholder="This will be a Picker"
                    >
                    </Input>
                </CardSection>

                <CardSection>
                    <Input
                        label="Notes on Income"
                        placeholder="website for sister"
                    >
                    </Input>
                </CardSection>

                <CardSection>
                    <Input
                        label="Save as a Repeating Income"
                        placeholder="Check Box Here"
                    >
                    </Input>
                </CardSection>

                <CardSection>
                    <Button onPress={() => this.setState({ showConfirmCreditModal: !this.state.showConfirmCreditModal })}>               
                        Credit to Account
                    </Button>
                </CardSection>

                <Confirm
                    visible={this.state.showConfirmCreditModal}
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

export default CreditPage;