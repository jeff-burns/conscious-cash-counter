import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={[styles.containerStyle, props.style]}>
            {props.children}
        </View>
    )
};

const styles = {
    containerStyle: {
        borderBottomWidth: 0,
        padding: 5,
        // backgroundColor: 'white',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 8,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        // borderColor: '#DDD',
        position: 'relative'
    }
}

export { CardSection };