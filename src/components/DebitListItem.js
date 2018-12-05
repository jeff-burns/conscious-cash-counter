import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, CardSection } from './common';
import moment from 'moment';

class DebitListItem extends Component {
    
    render() {
        console.log(this.props)
        const neededArray = this.props.arrayOfAllInfo[0]
        const todayNumber = moment().format('DD')
        const thisMonth = moment().format('MMMM')
        const daysLeft = neededArray.daysInMonth - todayNumber
        const incomeTotal = neededArray.credMonthTotal
        const expenseTotal = neededArray.debMonthTotal
        const dollarsLeftTotal = neededArray.credMonthTotal - neededArray.debMonthTotal
        const dollarsPerDayLeft = Math.floor(dollarsLeftTotal / daysLeft)
        console.log(todayNumber, daysLeft, neededArray.daysInMonth)

        return (
            <Card style={{ backgroundColor: 'rgba(255,255,255,0.01)' }}>    
                <Card>
                    <CardSection style={styles.headerCardsectionStyle}>
                        <Text style={styles.headerStyle}>Details for {thisMonth}</Text>
                    </CardSection>
                </Card>

                <Card style={{ flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.01)', justifyContent: 'center',
                alignItems: 'space-between' }}>
                    <Card style={styles.cardStyle}>
                        <CardSection style={styles.topCardsectionStyle}>
                            <Text style={styles.titleStyle}>Total Income</Text>
                        </CardSection>
                        <CardSection style={styles.bottomCardsectionStyle}>
                            <Text style={styles.textStyle}>
                                ${incomeTotal}
                            </Text>
                        </CardSection>
                    </Card>
                    <Card style={styles.cardStyle}>    
                        <CardSection style={styles.topCardsectionStyle}>
                            <Text style={styles.titleStyle}>Total Expenses</Text>
                        </CardSection>
                        <CardSection style={styles.bottomCardsectionStyle}>
                            <Text style={styles.textStyle}>
                                ${expenseTotal}
                            </Text>
                        </CardSection>
                    </Card>
                </Card>

                <Card style={styles.cardCenteredStyle}>        
                    <CardSection style={styles.topCardsectionStyle}>
                        <Text style={styles.titleStyle}>$ Left for Month</Text>
                    </CardSection>
                    <CardSection style={styles.bottomCardsectionStyle}>
                        <Text style={styles.textStyle}>
                            ${dollarsLeftTotal}
                        </Text>
                    </CardSection>
                </Card>

                <Card style={styles.cardCenteredStyle}>    
                    <CardSection style={styles.topCardsectionStyle}>
                        <Text style={styles.titleStyle}>Days Left in Month</Text>
                    </CardSection>
                    <CardSection style={styles.bottomCardsectionStyle}>
                        <Text style={styles.textStyle}>
                            {(daysLeft == 0) ? 0 : daysLeft}
                        </Text>
                    </CardSection>
                </Card>

                <Card style={styles.cardCenteredStyle}>    
                    <CardSection style={styles.topCardsectionStyle}>
                        <Text  style={styles.titleStyle}>$ Left per Day</Text>
                    </CardSection>
                    <CardSection style={styles.bottomCardsectionStyle}>
                        <Text style={styles.textStyle}>
                            ${(daysLeft == 0) ? dollarsLeftTotal : (dollarsLeftTotal == 0) ? 0 : dollarsPerDayLeft }
                        </Text>
                    </CardSection>
                </Card>
            </Card>
        );
    }
}

const styles = {
    cardStyle: {
        display: 'flex', 
        flexDirection: 'column',
        width: '48%',
        borderWidth: 0,
        borderRadius: 0,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.01)',
        elevation: 1,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 10
    },
    cardCenteredStyle: {
        display: 'flex', 
        flexDirection: 'column',
        width: '55%',
        borderWidth: 0,
        borderRadius: 0,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.01)',
        elevation: 1,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 10,
        alignSelf: 'center'
    },
    topCardsectionStyle: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        backgroundColor: 'rgba(164,202,242,0.5)',
        marginBottom: 1,
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
        position: 'relative'
    },
    bottomCardsectionStyle: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        marginTop: 0,
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
        position: 'relative'
    },
    titleStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        fontSize: 18,
        paddingLeft: 0,
        fontWeight: 'bold'
        
    },
    headerCardsectionStyle: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(164,202,242,0.05)',
        marginBottom: 1,
        borderWidth: 1,
        borderRadius: 0,
        paddingTop: 10,
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
        position: 'relative'
    },
    headerStyle: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    // textStyle: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     // alignSelf: 'center'
    //     // justifyContent: 'center'

    // }
}

export default DebitListItem;