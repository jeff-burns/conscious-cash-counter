import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, CardSection } from './common';
import moment from 'moment';

class DebitListItem extends Component {
    
    render() {
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
                        <CardSection style={styles.cardsectionStyle}>
                            <Text style={styles.headerStyle}>Details for {this.props.thisMonth}</Text>
                        </CardSection>

                        <CardSection>
                            <Text style={styles.titleStyle}>Total Income</Text>
                        </CardSection>
                        <CardSection>
                            <Text>
                                ${this.props.incomeTotal}
                            </Text>
                        </CardSection>
                        
                        <CardSection>
                            <Text style={styles.titleStyle}>Total Expenses</Text>
                        </CardSection>
                        <CardSection>
                            <Text>
                                ${this.props.expenseTotal}
                            </Text>
                        </CardSection>
                        
                        <CardSection>
                            <Text style={styles.titleStyle}>$ Left for Month</Text>
                        </CardSection>
                        <CardSection>
                            <Text>
                                ${dollarsLeftTotal}
                            </Text>
                        </CardSection>
                        
                        <CardSection>
                            <Text style={styles.titleStyle}>Days Left in Month</Text>
                        </CardSection>
                        <CardSection>
                            <Text>
                                {daysLeft}
                            </Text>
                        </CardSection>
                        
                        <CardSection>
                            <Text  style={styles.titleStyle}>$ Left per Day</Text>
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
    cardsectionStyle: {
        alignSelf: 'center'
    },
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15,
        textAlign: 'center'
    },
    headerStyle: {
        fontSize: 25,
        fontWeight: 'bold'
    }
}

export default DebitListItem;