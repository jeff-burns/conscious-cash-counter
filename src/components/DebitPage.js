import React, { Component } from 'react';
import { Card, CardSection, Input, Button } from './common';

class DebitPage extends Component {
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
                    <Button>
                        Debit from Account
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

export default DebitPage;