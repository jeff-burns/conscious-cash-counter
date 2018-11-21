import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const ConfirmCompareModal = ({ children, visible, onAccept, onDecline }) => {
    const { containerStyle, cardSectionStyle, textStyle } = styles;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            // onRequestClose just in case it's used in android- required
            onRequestClose={() => {}}
        >
            <View style={containerStyle}>
                <CardSection style={cardSectionStyle}>
                    <Text style={textStyle}>
                        {children}
                    </Text>
                </CardSection>

                <CardSection>
                <Button onPress>By Month</Button>
                <Button onPress>By Quarter</Button>
                <Button onPress>By Year</Button>
                <Button onPress={() => Actions.myAccount()}>Back to My Account</Button>
                </CardSection>
            </View>
        </Modal>
    )
};

const styles = {
    cardSectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
}

export { ConfirmCompareModal };
