import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import DebitPage from './components/DebitPage';
import CreditPage from './components/CreditPage';
import MyAccount from './components/MyAccount';
import CurrentBudget from './components/CurrentBudget';
import CompareMonths from './components/CompareMonths';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene key="login" component={LoginForm} title="Please Login" initial />
                </Scene>

                <Scene key="main">
                    <Scene 
                        rightTitle="My Account"
                        onRight={() => Actions.myAccount()}
                        key="debitPage" 
                        component={DebitPage} 
                        title="Debit from Budget" 
                    />
                    <Scene 
                        rightTitle="My Account"
                        onRight={() => Actions.myAccount()}
                        key="creditPage" 
                        component={CreditPage} 
                        title="Credit to Budget" 
                    />
                    <Scene 
                        rightTitle="My Account"
                        onRight={() => Actions.myAccount()}
                        key="currentBudget" 
                        component={CurrentBudget} 
                        title="Current Budget" 
                    />
                    <Scene 
                        rightTitle="My Account"
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

export default RouterComponent;