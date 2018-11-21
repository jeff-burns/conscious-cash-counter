import React, { Component } from 'react';
import { Card, CardSection, Input, Button, Confirm } from './common';

class DebitPage extends Component {
    state = { showModal: false };

    onAccept() {
        console.log('debited!')
    }

    onDecline() {
        this.setState({ showModal: false });
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
                <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
                        Debit from Account
                    </Button>
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to Debit this?
                </Confirm>

            </Card>
        );
    }
}

export default DebitPage;