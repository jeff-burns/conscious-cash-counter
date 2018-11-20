import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import DebitPage from './components/DebitPage';
import CreditPage from './components/CreditPage';
import MyAccount from './components/MyAccount';

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