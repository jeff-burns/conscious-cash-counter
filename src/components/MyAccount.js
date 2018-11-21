import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import { logoutUser } from '../actions';
import { Card, CardSection, Button } from './common';


class MyAccount extends Component {

    onLogoutPress() {
        this.props.logoutUser();
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Button onPress={() => Actions.currentBudget()}>
                        View Current Budget
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={() => Actions.compareMonths()}>
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
                    <Button onPress={this.onLogoutPress.bind(this)}>
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
export default connect(null, { logoutUser })(MyAccount);