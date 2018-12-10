import React from 'react';
import { Text, View, Modal } from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import { CardSection } from './CardSection';
import { Button } from './Button';

const ConfirmNavModal = ({ 
    children, visible, navToDebit, navToCredit, navToBudget, navToAccount }) => {
    const { containerStyle, cardSectionStyle, buttonCardSectionStyle, textStyle } = styles;

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

                <CardSection style={buttonCardSectionStyle}>
                    <AwesomeButtonRick 
                        type="anchor"
                        backgroundColor="#302E3C"
                        // textColor="#CC0000"
                        textColor="#FFFFFF"

                        borderColor="#CC0000"
                        backgroundDarker="#7F0000"
                        backgroundShadow= '#990000'
                        width={360.5}
                        height={65}
                        textSize={19}
                        onPress={navToDebit}
                        // style={{
                        //     flex: 1,
                        //     marginLeft: 0,
                        //     padding: 0,
                        //     // backgroundShadow: '#007aff',
                        //     // textShadowOffset: { width: 0, height: 2},
                        //     // textShadowColor: "#7F0000"
                        // }}
                    >
                        Debit
                    </AwesomeButtonRick>

                    <AwesomeButtonRick 
                        type="anchor"
                        backgroundColor="#302E3C"
                        // colors darken in descending order
                        // textColor="#21EB1A"
                        textColor="#FFFFFF"

                        borderColor="#21EB1A"
                        backgroundDarker="#17A412"
                        backgroundShadow="#0D5E0A"
                        width={360.5}
                        height={65}
                        textSize={19}
                        onPress={navToCredit}
                        // style={{
                        //     flex: 1,
                        //     marginLeft: 0,
                        //     padding: 0,
                        //     // backgroundShadow: '#007aff',
                        //     // textShadowOffset: { width: 0, height: 2},
                        //     // textShadowColor: "#7F0000"
                        // }}
                    >
                        Credit
                    </AwesomeButtonRick>

                    <AwesomeButtonRick 
                        type="anchor"
                        backgroundColor="#302E3C"
                        // colors darken in descending order
                        // textColor="#FAE822"
                        textColor="#FFFFFF"

                        borderColor="#FAE822"
                        backgroundDarker="#E1CF09"
                        backgroundShadow= '#AFA107'
                        width={360.5}
                        height={65}
                        textSize={19}
                        onPress={navToBudget}
                        // style={{
                        //     flex: 1,
                        //     marginLeft: 0,
                        //     padding: 0,
                            // backgroundShadow: '#007aff',
                            // textShadowOffset: { width: 0, height: 2},
                            // textShadowColor: "#7F0000"
                        // }}
                    >
                        Current Budget
                    </AwesomeButtonRick>

                    <AwesomeButtonRick 
                        type="anchor"
                        backgroundColor="#302E3C"
                        // colors darken in descending order
                        // textColor="#C4C6C7"
                        textColor="#FFFFFF"

                        borderColor="#C4C6C7"
                        backgroundDarker="#989A9B"
                        backgroundShadow= '#6D6E6F'
                        width={360.5}
                        height={65}
                        textSize={19}
                        onPress={navToAccount}
                        // style={{
                        //     flex: 1,
                        //     marginLeft: 0,
                        //     padding: 0,
                            // backgroundShadow: '#007aff',
                            // textShadowOffset: { width: 0, height: 2},
                            // textShadowColor: "#7F0000"
                        // }}
                    >
                        My Account
                    </AwesomeButtonRick>
                </CardSection>
            </View>
        </Modal>
    )
};

const styles = {
    cardSectionStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: 50,
        borderRadius: 0
    },
    buttonCardSectionStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderRadius: 0
        // flex: 2
    },
    textStyle: {
        flex: 1,
        fontSize: 24,
        color: '#177BE6',
        textAlign: 'center',
        lineHeight: 30
    },
    containerStyle: {
        display: "flex",
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
}

export { ConfirmNavModal };

                    // <Button onPress={navToDebit}>Debit</Button>
                    // <Button onPress={navToCredit}>Credit</Button>
                    // <Button onPress={navToBudget}>Current Budget</Button>
                    // <Button onPress={navToAccount}>My Account</Button>


