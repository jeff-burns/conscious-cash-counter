import _ from 'lodash';
import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { usersFetch } from '../actions';
import moment from 'moment';

const numColumns = 5;

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
        console.log(this.props.compiledCredDebArrays);
        const { compiledCredArray, compiledDebArray, compiledCredDebArrays } = this.props;

        const gridData = [{ key: 'Month /Year'}, { key: 'Total Credit'}, { key: 'Total Debit'}, { key: 'Credit /Day'}, { key: 'Debit /Day'}]

        compiledCredDebArrays.forEach(each => {
        const credDay = Math.floor(each.credMonthTotal / each.daysInMonth);
        const debDay = Math.round(each.debMonthTotal / each.daysInMonth);

        gridData.push(
            { key: each.formattedDate }, { key: '$'+ each.credMonthTotal}, { key: '$'+ each.debMonthTotal }, { key: '$'+ credDay }, { key: '$'+ debDay }
        )
        })
        console.log(gridData) 

        return (
            <ImageBackground source={require('../images/gradientsilverbackground.png')} style={{width: '100%', height: '100%'}}>
            <FlatList 
                data={gridData}
                style={styles.container}
                renderItem={this.renderItem}
                numColumns={numColumns}
            />
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 20,
    },
    item: {
      backgroundColor: 'gray',
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

    // BEGINNING OF BUDGET LOGIC
    //DEBIT
    const dateDebitProp = "debitDateYYYYMM"

    const arrayDebits = userData.filter(entry => {
        if (entry["debitProp"]) {
            return entry;
        }
    });

    const debsGroupByYearMM = () => {
        let debGroupedYearMMs = {};
        for (var i=0; i<arrayDebits.length; i++) {
            var p = arrayDebits[i][dateDebitProp];
            if (!debGroupedYearMMs[p]) { debGroupedYearMMs[p] = []; }
            debGroupedYearMMs[p].push(arrayDebits[i]);
        }
        return debGroupedYearMMs
    }

    const yearMMKeysDeb = Object.keys(debsGroupByYearMM())
    const newYearMMKeysDeb = yearMMKeysDeb.reverse()

    const formattedDebDatesArrObj = newYearMMKeysDeb.map(each => {
        let formattedDebDate = moment(each, "YYYYMM").format("MMM YY")
            return {
                    id: each, 
                    formattedDate: formattedDebDate, 
                    daysInMonth: moment(formattedDebDate).daysInMonth()
                    };
    })
    
    const arrayOfObjectsTotalDebs = []

    for (let i=0; i<newYearMMKeysDeb.length; i++) {
    let yyyyMMDeb = debsGroupByYearMM()[newYearMMKeysDeb[i]]
    let debitTotalEachYYYYMM = 0

    for (let ii=0; ii<yyyyMMDeb.length; ii++) {
        debitTotalEachYYYYMM += parseInt(yyyyMMDeb[ii].debitAmount)
    }
    arrayOfObjectsTotalDebs.push(
        {id: newYearMMKeysDeb[i], debMonthTotal: debitTotalEachYYYYMM}
        )
    }
    
    let compiledDebArray = [];
    arrayOfObjectsTotalDebs.forEach((itm, i) => {
        compiledDebArray.push(Object.assign({}, itm, formattedDebDatesArrObj[i]));
    });
    
    //CREDIT
    const dateCreditProp = "creditDateYYYYMM"

    const arrayCredits = userData.filter(entry => {
        if (entry["creditProp"]) {
            return entry;
        }
    });

    const credsGroupByYearMM = () => {
        let credGroupedYearMMs = {};
        for (let i=0; i<arrayCredits.length; i++) {
            let p = arrayCredits[i][dateCreditProp];
            if (!credGroupedYearMMs[p]) { credGroupedYearMMs[p] = []; }
            credGroupedYearMMs[p].push(arrayCredits[i]);
        }
        return credGroupedYearMMs
    }

    const yearMMKeysCred = Object.keys(credsGroupByYearMM())
    const newYearMMKeysCred = yearMMKeysCred.reverse()

    const formattedCredDatesArrObj = newYearMMKeysCred.map(each => {
        let formattedCredDate = moment(each, "YYYYMM").format("MMM YY")
            return {
                    id: each, 
                    formattedDate: formattedCredDate, 
                    daysInMonth: moment(formattedCredDate).daysInMonth()
                    };
    })
    
    const arrayOfObjectsTotalCreds = []

    for (var i=0; i<newYearMMKeysCred.length; i++) {

        let yyyyMM = credsGroupByYearMM()[newYearMMKeysCred[i]]
        let creditTotalEachYYYYMM = 0

        for (let ii=0; ii<yyyyMM.length; ii++) {
            creditTotalEachYYYYMM += parseInt(yyyyMM[ii].creditAmount)
        }

        arrayOfObjectsTotalCreds.push(
            {id: newYearMMKeysCred[i], credMonthTotal: creditTotalEachYYYYMM})

    }

    let compiledCredArray = [];
    arrayOfObjectsTotalCreds.forEach((itm, i) => {
        compiledCredArray.push(Object.assign({}, itm, formattedCredDatesArrObj[i]));
    });

    let compiledCredDebArrays = [];
        compiledCredArray.forEach((itm, i) => {
    compiledCredDebArrays.push(Object.assign({}, itm, compiledDebArray[i]));
    });

    // END OF BUDGET LOGIC
    
    

    console.log(compiledCredArray, compiledDebArray, compiledCredDebArrays)

        

    return { compiledCredArray, compiledDebArray, compiledCredDebArrays };
}

export default connect(mapStateToProps, { usersFetch })(CompareMonths);


