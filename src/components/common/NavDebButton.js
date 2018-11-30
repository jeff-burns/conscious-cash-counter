import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const NavDebButton = ({ onPress, children } ) => {
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
        color: '#f90207',
        fontSize: 19,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#535452',
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#f90207',
        margin: 0
    }
}

export { NavDebButton };