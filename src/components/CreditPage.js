import React, { Component } from 'react';
import { Card, CardSection, Input, Button } from './common';

class CreditPage extends Component {
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
                    <Button>
                        Credit to Account
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

export default CreditPage;