import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    const { inputStyle, viewLabelStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <View style={viewLabelStyle}>
                <Text style={labelStyle}>{label}</Text>
            </View>
            <TextInput 
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    inputStyle: {
        width: '80%',
        height: '100%',
        paddingRight: 5, 
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    viewLabelStyle: {
        width: '20%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 2,
        borderRightColor: 'black',
        paddingLeft: 20,
        flex: 1
    },
    labelStyle: {
        borderRightWidth: 2,
        // borderRightColor: '#CFD0D1',
        fontSize: 18,
    }, 
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

    }
})

export { Input };