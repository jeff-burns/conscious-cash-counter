import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children } ) => {
    const { buttonStyle, textStyle } = styles;
    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
        
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 19,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#cccccc',
        borderRadius: 5,
        borderWidth: 4,
        borderColor: '#007aff',
        margin: 0,
        padding: 0
    }
}

export { Button };