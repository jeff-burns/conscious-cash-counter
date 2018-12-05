import React from 'react';
import { TextInput, View, Text } from 'react-native';

const BudgetInput = ({ label, value, onChangeText, placeholder, secureTextEntry, onChange, onSubmitEditing }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput 
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                onChange={onChange}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
            />
        </View>
    )
};

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5, 
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
        width: '80%',
        alignSelf: 'center'
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
        fontWeight: 'bold'
    }, 
    containerStyle: {
        height: 60,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    }
}

export { BudgetInput };