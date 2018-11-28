import _ from 'lodash';
import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { usersFetch } from '../actions';
import moment from 'moment';

const numColumns = 4;

const thisMonth = moment().format('MMMM');
const lastMonth = moment().subtract(1, 'months').format('MMMM');
const twoMonthsAgo = moment().subtract(2, 'months').format('MMMM');
const thisMonthShort = moment().format('MMM');
const lastMonthShort = moment().subtract(1, 'months').format('MMM');
const twoMonthsAgoShort = moment().subtract(2, 'months').format('MMM');
const thisYear = moment().format('YYYY');
const lastYear = moment().subtract(1, 'years').format('YYYY');
const thisMonthNumbers = moment().format('YYYY-MM')
const lastMonthNumbers = moment().subtract(2, 'months').format('YYYY-MM')
const twoMonthsAgoNumbers = moment().subtract(1, 'months').format('YYYY-MM')
const daysThisMonth = moment(thisMonthNumbers).daysInMonth()
const daysLastMonth = moment(lastMonthNumbers).daysInMonth()
const days2MonthsAgo = moment(twoMonthsAgoNumbers).daysInMonth()


class CompareMonths extends Component {

    componentDidMount() {
        this.props.usersFetch();
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.itemText}>
                    {item.key}
                </Text>
            </View>
        );
    }

    render() {
        console.log(this.props)
        const { creditTotalThisYearThisMonth, creditTotalThisYearLastMonth, creditTotalThisYear2MonthsAgo, debitTotalThisYearThisMonth, debitTotalThisYearLastMonth, debitTotalThisYear2MonthsAgo } = this.props;

        const creditDayThisMonth = Math.floor(creditTotalThisYearThisMonth / daysThisMonth)
        const creditDayLastMonth = Math.floor(creditTotalThisYearLastMonth / daysLastMonth)
        const creditDay2MonthsAgo = Math.floor(creditTotalThisYear2MonthsAgo / days2MonthsAgo)

        const debitDayThisMonth = Math.floor(debitTotalThisYearThisMonth / daysThisMonth)
        const debitDayLastMonth = Math.floor(debitTotalThisYearLastMonth / daysLastMonth)
        const debitDay2MonthsAgo = Math.floor(debitTotalThisYear2MonthsAgo / days2MonthsAgo)

        const gridData = [
            { key: ''}, { key: thisMonthShort}, { key: lastMonthShort}, { key: twoMonthsAgoShort}, { key: 'Total Credit'}, { key: '$'+ creditTotalThisYearThisMonth}, { key: '$'+ creditTotalThisYearLastMonth}, { key: '$'+ creditTotalThisYear2MonthsAgo}, { key: 'Total Debit'}, { key: '$'+ debitTotalThisYearThisMonth}, { key: '$'+ debitTotalThisYearLastMonth}, { key: '$'+ debitTotalThisYear2MonthsAgo}, { key: 'Credit /Day'}, { key: '$'+ creditDayThisMonth}, { key: '$'+ creditDayLastMonth}, { key: '$'+ creditDay2MonthsAgo}, { key: 'Debit /Day'}, { key: '$'+ debitDayThisMonth}, { key: '$'+ debitDayLastMonth}, { key: '$'+ debitDay2MonthsAgo}
        ];

        return (
            <FlatList 
                data={gridData}
                style={styles.container}
                renderItem={this.renderItem}
                numColumns={numColumns}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 20,
    },
    item: {
      backgroundColor: '#4D243D',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 1,
      height: Dimensions.get('window').width / numColumns, // approximate a square
    },
    itemInvisible: {
      backgroundColor: 'transparent',
    },
    itemText: {
      color: '#fff',
    },
  });


  const mapStateToProps = (state) => {
    console.log(state)
    const userObjects = state.users;

    const userData = _.map(userObjects, (val) => { 
        return { ...val };
    });
    

    console.log(userData, thisMonth, thisYear, lastMonth, twoMonthsAgo, lastYear)

        const arrayCredits = 
            userData.filter(entry => {
                if (entry['creditProp']) {
                return entry
                }
        })

        const arrayDebits = 
            userData.filter(entry => {
                if (entry['debitProp']) {
                return entry
                }
        })

        const arrayCreditsThisYear = []
        const arrayCreditsLastYear = []
            arrayCredits.filter(entry => {
                if (entry['creditDate'].slice(-4) == thisYear) {
                    return arrayCreditsThisYear.push(entry)
                } else if (entry['creditDate'].slice(-4) == lastYear) {
                    return arrayCreditsLastYear.push(entry)
                }
        })

        const arrayDebitsThisYear = [];
        const arrayDebitsLastYear = [];
            arrayDebits.filter(entry => {
                if (entry['debitDate'].slice(-4) == thisYear) {
                    return arrayDebitsThisYear.push(entry)
                } else if (entry['debitDate'].slice(-4) == lastYear) {
                    return arrayDebitsLastYear.push(entry)
                }
        })

        const arrayCreditsThisYearThisMonth = [];
        const arrayCreditsThisYearLastMonth = [];
        const arrayCreditsThisYear2MonthsAgo = [];
            arrayCreditsThisYear.filter(entry => {
                if (entry['creditDate'].slice(0, thisMonth.length) === thisMonth) {
                    return arrayCreditsThisYearThisMonth.push(entry)
                } else if (entry['creditDate'].slice(0, lastMonth.length) === lastMonth) {
                    return arrayCreditsThisYearLastMonth.push(entry)
                } else if (entry['creditDate'].slice(0, twoMonthsAgo.length) === twoMonthsAgo) {
                    return arrayCreditsThisYear2MonthsAgo.push(entry)
                }
        })

        const arrayDebitsThisYearThisMonth = [];
        const arrayDebitsThisYearLastMonth = [];
        const arrayDebitsThisYear2MonthsAgo = [];

            arrayDebitsThisYear.filter(entry => {
                if (entry['debitDate'].slice(0, thisMonth.length) === thisMonth) {
                    return arrayDebitsThisYearThisMonth.push(entry)
                } else if (entry['debitDate'].slice(0, lastMonth.length) === lastMonth) {
                    return arrayDebitsThisYearLastMonth.push(entry)
                } else if (entry['debitDate'].slice(0, twoMonthsAgo.length) === twoMonthsAgo) {
                    return arrayDebitsThisYear2MonthsAgo.push(entry)
                }     
        })

        const creditAmountsArrayThisYearThisMonth = [];
        const creditAmountsArrayThisYearLastMonth = [];
        const creditAmountsArrayThisYear2MonthsAgo = [];

        arrayCreditsThisYearThisMonth.filter(object => {
             console.log(object)
             const amount = object['creditAmount'];
             console.log(amount)
             return creditAmountsArrayThisYearThisMonth.push(parseInt(amount))
        })
        arrayCreditsThisYearLastMonth.filter(object => {
            console.log(object)
            const amount = object['creditAmount'];
            console.log(amount)
            return creditAmountsArrayThisYearLastMonth.push(parseInt(amount))
        })
        arrayCreditsThisYear2MonthsAgo.filter(object => {
            console.log(object)
            const amount = object['creditAmount'];
            console.log(amount)
            return creditAmountsArrayThisYear2MonthsAgo.push(parseInt(amount))
        })

        const debitAmountsArrayThisYearThisMonth = [];
        const debitAmountsArrayThisYearLastMonth = [];
        const debitAmountsArrayThisYear2MonthsAgo = [];

        arrayDebitsThisYearThisMonth.filter(object => {
             console.log(object)
             const amount = object['debitAmount'];
             console.log(amount)
             return debitAmountsArrayThisYearThisMonth.push(parseInt(amount))
        })
        arrayDebitsThisYearLastMonth.filter(object => {
            console.log(object)
            const amount = object['debitAmount'];
            console.log(amount)
            return debitAmountsArrayThisYearLastMonth.push(parseInt(amount))
        })
        arrayDebitsThisYear2MonthsAgo.filter(object => {
            console.log(object)
            const amount = object['debitAmount'];
            console.log(amount)
            return debitAmountsArrayThisYear2MonthsAgo.push(parseInt(amount))
        })

        const creditTotalThisYearThisMonth =        
            creditAmountsArrayThisYearThisMonth.reduce(function(result, number) {
                result += number;
                return result;
             }, 0);

        const creditTotalThisYearLastMonth =        
            creditAmountsArrayThisYearLastMonth.reduce(function(result, number) {
                result += number;
                return result;
            }, 0);

        const creditTotalThisYear2MonthsAgo =        
            creditAmountsArrayThisYear2MonthsAgo.reduce(function(result, number) {
                result += number;
                return result;
            }, 0);


        const debitTotalThisYearThisMonth =        
            debitAmountsArrayThisYearThisMonth.reduce(function(result, number) {
                result += number;
                return result;
            }, 0);

        const debitTotalThisYearLastMonth =        
            debitAmountsArrayThisYearLastMonth.reduce(function(result, number) {
                result += number;
                return result;
            }, 0);

        const debitTotalThisYear2MonthsAgo =        
            debitAmountsArrayThisYear2MonthsAgo.reduce(function(result, number) {
                result += number;
                return result;
            }, 0);
    
    console.log(creditTotalThisYearThisMonth, creditTotalThisYearLastMonth, creditTotalThisYear2MonthsAgo, debitTotalThisYearThisMonth, debitTotalThisYearLastMonth, debitTotalThisYear2MonthsAgo)

    return { creditTotalThisYearThisMonth, creditTotalThisYearLastMonth, creditTotalThisYear2MonthsAgo, debitTotalThisYearThisMonth, debitTotalThisYearLastMonth, debitTotalThisYear2MonthsAgo }
}

export default connect(mapStateToProps, { usersFetch })(CompareMonths);