import React from 'react';
import {ImageBackground} from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import DebitPage from './components/DebitPage';
import CreditPage from './components/CreditPage';
import MyAccount from './components/MyAccount';
import CurrentBudget from './components/CurrentBudget';
import CompareMonths from './components/CompareMonths';



const RouterComponent = () => {
    
    return (
        
        <Router 
            navigationBarStyle={styles.navHeaderStyle}
            titleStyle={styles.navTitleStyle}
        >
        
            <Scene key="root" hideNavBar>
            
                <Scene key="auth">
                    <Scene key="login" component={LoginForm} title="Please Login" initial />
                </Scene>

                <Scene key="main">
                    <Scene 
                        // rightTitle="My Account"
                        rightButtonImage={require('./images/accountICON.png')}
                        rightButtonStyle={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 0, marginRight: 0 }}
                        onRight={() => Actions.myAccount()}
                        key="debitPage" 
                        component={DebitPage} 
                        title="Debits" 
                    />
                    <Scene 
                        // rightTitle="My Account"
                        rightButtonImage={require('./images/accountICON.png')}
                        rightButtonStyle={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 0, marginRight: 0 }}
                        onRight={() => Actions.myAccount()}
                        key="creditPage" 
                        component={CreditPage} 
                        title="Credits" 
                    />
                    <Scene 
                        // rightTitle="My Account"
                        rightButtonImage={require('./images/accountICON.png')}
                        rightButtonStyle={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 0, marginRight: 0 }}
                        onRight={() => Actions.myAccount()}
                        key="currentBudget" 
                        component={CurrentBudget} 
                        title="Current Budget" 
                    />
                    <Scene 
                        // rightTitle="My Account"
                        rightButtonImage={require('./images/accountICON.png')}
                        rightButtonStyle={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 0, marginRight: 0 }}
                        onRight={() => Actions.myAccount()}
                        key="compareMonths" 
                        component={CompareMonths} 
                        title="Compare Budgets" 
                    />
                    <Scene 
                        key="myAccount"
                        component={MyAccount}
                        title="My Account"
                    />
                </Scene>
            </Scene>
            
        </Router>
    );
};

const styles = {
    navHeaderStyle: {
        backgroundColor: '#3C3C3E', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.75,
        elevation: 2
        
    },
    navTitleStyle: { 
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 24, 
    },
    // {
    //     flexDirection: 'row',
    //     justifyContent: 'space-around'
    // }
}

export default RouterComponent;