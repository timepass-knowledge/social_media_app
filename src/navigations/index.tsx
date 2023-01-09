import React from "react";
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { themeManager } from "../utils/theme-manager";
import DashboardNavigation from "./dashbaord.navigation";
import { AuthStackNavigationParamList, AuthStackNavigationParamListEnum } from "../interface/Screen";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import Login from "../screens/auth/login";
import Signup from "../screens/auth/signup";
import ForgotPassword from "../screens/auth/forgot-password";
export const navigationRef = React.createRef<any>()

const Stack = createStackNavigator<AuthStackNavigationParamList>();
function Navigations() {
    const navigationOptions: StackNavigationOptions = {
        headerShown: false,
        gestureEnabled: false
    }
    return (
        <PaperProvider theme={themeManager.CustomDefaultTheme}>
            <NavigationContainer
                ref={navigationRef}
                theme={themeManager.CustomDefaultTheme}>

                <Stack.Navigator initialRouteName="login" screenOptions={navigationOptions}>
                    <Stack.Screen
                        component={Login}
                        name={AuthStackNavigationParamListEnum.login} />
                    <Stack.Screen
                        component={Signup}
                        name={AuthStackNavigationParamListEnum.signup} />
                    <Stack.Screen
                        component={ForgotPassword}
                        name={AuthStackNavigationParamListEnum.forgotPassword} />
                    <Stack.Screen
                        component={DashboardNavigation}
                        name={AuthStackNavigationParamListEnum.dashboard} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}

export default Navigations;