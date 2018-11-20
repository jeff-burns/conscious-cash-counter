import React, { Component } from 'react';
import { Card, CardSection, Button } from './common';
import { Actions } from 'react-native-router-flux';


class MyAccount extends Component {
    render() {
        return (
            <Card>
                <CardSection>
                    <Button onPress={() => Actions.currentBudget()}>
                        View Current Budget
                    </Button>
                </CardSection>

                <CardSection>
                    <Button>
                        Compare Months
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={() => Actions.debitPage()}>
                        Debit Page
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={() => Actions.creditPage()}>
                        Credit Page
                    </Button>
                </CardSection>

                <CardSection>
                    <Button>
                        Logout
                    </Button>
                </CardSection>

                <CardSection>
                    <Button>
                        Delete Account
                    </Button>
                </CardSection>
            </Card>
        );
    }
}
export default MyAccount;