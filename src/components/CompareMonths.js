import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet, Dimensions } from 'react-native';

const data = [
    { key: ''}, { key: 'Nov'}, { key: 'Oct'}, { key: 'Sept'}, { key: 'Total Credit'}, { key: 'F'}, { key: 'G'}, { key: 'H'}, { key: 'Total Debit'}, { key: 'J'}, { key: 'K'}, { key: 'L'}, { key: 'Credit /Day'}, { key: 'N'}, { key: 'O'}, { key: 'P'}, { key: 'Debit /Day'}, { key: 'R'}, { key: 'S'}, { key: 'T'}
];

const numColumns = 4;

class CompareMonths extends Component {

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
        return (
            <FlatList 
                data={data}
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

export default CompareMonths;