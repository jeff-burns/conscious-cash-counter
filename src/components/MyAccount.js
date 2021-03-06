import _ from "lodash";
import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import { usersFetch, logoutUser, deleteUser } from '../actions';
import { Card, CardSection, Button, NavDebButton, Confirm, ConfirmDelete } from './common';

class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        showModal: false,
        showDeleteModal: false
        };
    console.log(this.props);
  }

  componentWillMount() {
    this.props.usersFetch();

  }

    onAccept() {
        this.props.logoutUser();
    }

    onAcceptDelete() {
        this.setState({ showDeleteModal: false });
        this.props.deleteUser();
        
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    onPressWithNoData() {
        alert('Must Enter Debit and Credit First')
    }

    render() {
        console.log(this.props)
        const user = this.props.userData 
        console.log(this.state)

        return (
            <ImageBackground source={require('../images/gradientsilverbackground.png')} style={{width: '100%', height: '100%'}}>
            <Card style={styles.cardStyle}>
                <CardSection style={styles.buttonCardSectionStyle}>
                    
                    <AwesomeButtonRick 
                        type="anchor"
                        backgroundColor="#302E3C"
                        // colors darken in descending order FFFFFF
                        // textColor="#FAE822"
                        textColor="#FFFFFF"

                        borderColor="#FAE822"
                        backgroundDarker="#E1CF09"
                        backgroundShadow= '#AFA107'
                        width={360.5}
                        height={65}
                        textSize={19}
                        // onPress={() => Actions.currentBudget()}
                        onPress={(user.length == 0) ? this.onPressWithNoData.bind(this) : () => Actions.currentBudget()}
                        style={{
                            flex: 1,
                            marginLeft: 0,
                            padding: 0,
                        }}
                    >
                        View Current Budget
                    </AwesomeButtonRick>
                </CardSection>

                <CardSection style={styles.buttonCardSectionStyle}>
                    
                    <AwesomeButtonRick 
                        type="anchor"
                        backgroundColor="#302E3C"
                        // colors darken in descending order
                        // textColor="#AC37FB"
                        textColor="#FFFFFF"

                        borderColor="#AC37FB"
                        backgroundDarker="#8804E1"
                        backgroundShadow= '#6A03AF'
                        width={360.5}
                        height={65}
                        textSize={19}
                        onPress={(user.length == 0) ? this.onPressWithNoData.bind(this) : () => Actions.compareMonths()}
                        style={{
                            flex: 1,
                            marginLeft: 0,
                            padding: 0,
                        }}
                    >
                        Compare Months
                    </AwesomeButtonRick>
                </CardSection>

                <CardSection style={styles.buttonCardSectionStyle}>
                    
                    <AwesomeButtonRick 
                        type="anchor"
                        backgroundColor="#302E3C"
                        // colors darken in descending order
                        // textColor="#CC0000"
                        textColor="#FFFFFF"

                        borderColor="#CC0000"
                        backgroundDarker="#7F0000"
                        backgroundShadow= '#990000'
                        width={360.5}
                        height={65}
                        textSize={19}
                        onPress={() => Actions.debitPage()}
                        style={{
                            flex: 1,
                            marginLeft: 0,
                            padding: 0,
                        }}
                    >
                        Debit Page
                    </AwesomeButtonRick>
                </CardSection>

                <CardSection style={styles.buttonCardSectionStyle}>
                    
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
                        onPress={() => Actions.creditPage()}
                        style={{
                            flex: 1,
                            marginLeft: 0,
                            padding: 0,
                        }}
                    >
                        Credit Page
                    </AwesomeButtonRick>
                </CardSection>

                <CardSection style={styles.buttonCardSectionStyle}>
                    
                    <AwesomeButtonRick 
                        type="anchor"
                        backgroundColor="#302E3C"
                        // colors darken in descending order
                        // textColor="#2649F6"
                        textColor="#FFFFFF"

                        borderColor="#2649F6"
                        backgroundDarker="#0C2FDC"
                        backgroundShadow= "#1736D3"
                        width={360.5}
                        height={65}
                        textSize={19}
                        onPress={() => this.setState({ showModal: !this.state.showModal })}
                        style={{
                            flex: 1,
                            marginLeft: 0,
                            padding: 0,
                        }}
                    >
                        Logout
                    </AwesomeButtonRick>
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to Logout?
                </Confirm>

                <CardSection style={styles.buttonCardSectionStyle}>
                    <AwesomeButtonRick 
                        type="anchor"
                        backgroundColor="#302E3C"
                        // textColor="#FA720A"
                        textColor="#FFFFFF"

                        borderColor="#FA720A"
                        backgroundDarker="#E16609"
                        backgroundShadow="#964406"
                        width={360.5}
                        height={65}
                        textSize={19}
                        onPress={() => this.setState({ showDeleteModal: !this.state.showDeleteModal })}
                        style={{
                            flex: 1,
                            marginLeft: 0,
                            padding: 0,
                            // backgroundShadow: '#007aff',
                            // textShadowOffset: { width: 0, height: 2},
                            // textShadowColor: "#7F0000"
                        }}
                    >
                        Delete Account
                    </AwesomeButtonRick>
                </CardSection>

                <ConfirmDelete
                    visible={this.state.showDeleteModal}
                    onAcceptDelete={this.onAcceptDelete.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to Delete Account?
                </ConfirmDelete>

            </Card>
            </ImageBackground>
        );
    }
}

const styles = {
    cardStyle: {
        flex: 1,
        flexDirection: 'column',
        // height: 300,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        padding: 0
    },
    buttonCardSectionStyle: {
        marginLeft: 8,
        marginRight: 5,
        justifyContent: 'center',
        borderWidth: 0,
        borderRadius: 0,
        backgroundColor: 'rgba(250,250,250,0.01)',
        padding: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
        position: 'relative'
      }
}

const mapStateToProps = state => {
    console.log(state.users);
    const userObjects = state.users
    const userData = _.map(userObjects, val => {
        return { ...val };
      });
      console.log(userData);

    // if (this.props.users) {
    //     this.setState({ userData: true })
    // } else {
    //     this.setState({ userData: false })
    // }

    // const {
    //   debitProp,
    //   debitAmount,
    //   debitDate,
    //   debitDateYYYYMM,
    //   debitType,
    //   debitNote,
    //   debitRepeating
    // } = state.userForm;
  
    // return {
    //   debitProp,
    //   debitAmount,
    //   debitDate,
    //   debitDateYYYYMM,
    //   debitType,
    //   debitNote,
    //   debitRepeating
    // };
    return { userData }
  };
export default connect(mapStateToProps, { usersFetch, logoutUser, deleteUser })(MyAccount);



// onPress={(userData) ? () => Actions.currentBudget() : this.onDecline.bind(this)}


// <Button onPress={() => Actions.creditPage()}>
//                         Credit Page
//                     </Button>
// <NavDebButton onPress={() => Actions.debitPage()}>
// Debit Page
// </NavDebButton>

// <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
//                         Logout
//                     </Button>

// <Button onPress={() => Actions.currentBudget()}>
//                         View Current Budget
//                     </Button>

// <Button onPress={() => Actions.compareMonths()}>
//                         Compare Months #AC37FB
//                     </Button>