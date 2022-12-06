import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { AuthStackNavigationParamList, AuthStackNavigationParamListEnum } from '../interface/Screen';
import ForgotPassword from '../screens/auth/forgot-password';
import Login from '../screens/auth/login';
import Signup from '../screens/auth/signup';

const Stack = createStackNavigator<AuthStackNavigationParamList>();

export default function AuthStackNavigation() {
    const navigationOptions: StackNavigationOptions = {
        headerShown: false,
        gestureEnabled: false
    }
    return (
        <Stack.Navigator initialRouteName="login" screenOptions={navigationOptions}>
            <Stack.Screen component={Login} name="login" />
            <Stack.Screen component={Signup} name="signup" />
            <Stack.Screen component={ForgotPassword} name={AuthStackNavigationParamListEnum.forgotPassword} />
        </Stack.Navigator>
    )
}