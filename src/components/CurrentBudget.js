import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, CardSection } from './common';

class CurrentBudget extends Component {
    render() {
        return (
            <Card>
                <CardSection>
                    <Text>Details for this Month</Text>
                </CardSection>

                <CardSection>
                    <Text>Total Income</Text>
                </CardSection>
                <CardSection></CardSection>
                
                <CardSection>
                    <Text>Total Expenses</Text>
                </CardSection>
                <CardSection></CardSection>
                
                <CardSection>
                    <Text>$ Left for Month</Text>
                </CardSection>
                <CardSection></CardSection>
                
                <CardSection>
                    <Text>Days Left in Month</Text>
                </CardSection>
                <CardSection></CardSection>
                
                <CardSection>
                    <Text>$ Left per Day</Text>
                </CardSection>
                <CardSection></CardSection>
            </Card>
        );
    }
}

export default CurrentBudget;