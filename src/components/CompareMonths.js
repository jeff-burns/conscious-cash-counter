import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';

const data = [
    { key: 'A'}, { key: 'B'}, { key: 'C'}, { key: 'D'}, { key: 'E'}, { key: 'F'}, { key: 'G'}, { key: 'H'}, { key: 'I'}, { key: 'J'}, { key: 'K'}, { key: 'L'}
];

const numColumns = 3;

class CompareMonths extends Component {

    renderItem = ({ item }) => {
        return (
            <View>
                <Text>
                    {item.key}
                </Text>
            </View>
        );
    }

    render() {
        return (
            <FlatList 
                data={data}
                renderItem={this.renderItem}
                numColumns={numColumns}
            />
        );
    }
}

export default CompareMonths;