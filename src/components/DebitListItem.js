import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, CardSection } from './common';
import moment from 'moment';

class DebitListItem extends Component {
    
    render() {
        // const { debitAmount  } = this.props.user[0];
        console.log(this.props.expenseTotal)
        const today = moment().format('YYYY-MM')
        const todayNumber = moment().format('D')
        const daysThisMonth = moment(today).daysInMonth()
        const daysLeft = daysThisMonth - todayNumber
        console.log(todayNumber, daysThisMonth, daysLeft)

        const dollarsLeftTotal = this.props.incomeTotal - this.props.expenseTotal

        const dollarsPerDayLeft = dollarsLeftTotal / daysLeft

        return (
                
                    <Card>
                        <CardSection>
                            <Text>Details for this Month</Text>
                        </CardSection>

                        <CardSection>
                            <Text>Total Income</Text>
                        </CardSection>
                        <CardSection>
                            <Text>
                                ${this.props.incomeTotal}
                            </Text>
                        </CardSection>
                        
                        <CardSection>
                            <Text>Total Expenses</Text>
                        </CardSection>
                        <CardSection>
                            <Text>
                                ${this.props.expenseTotal}
                            </Text>
                        </CardSection>
                        
                        <CardSection>
                            <Text>$ Left for Month</Text>
                        </CardSection>
                        <CardSection>
                            <Text>
                                ${dollarsLeftTotal}
                            </Text>
                        </CardSection>
                        
                        <CardSection>
                            <Text>Days Left in Month</Text>
                        </CardSection>
                        <CardSection>
                            <Text>
                                {daysLeft}
                            </Text>
                        </CardSection>
                        
                        <CardSection>
                            <Text>$ Left per Day</Text>
                        </CardSection>
                        <CardSection>
                            <Text>
                                ${dollarsPerDayLeft}
                            </Text>
                        </CardSection>
                    </Card>
                
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
}

export default DebitListItem;