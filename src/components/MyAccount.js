import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import { logoutUser } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class MyAccount extends Component {
    state = { showModal: false };

    onAccept() {
        this.props.logoutUser();
    }

    onDecline() {
        this.setState({ showModal: false });
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
                    <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
                        Logout
                    </Button>
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to Logout?
                </Confirm>

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