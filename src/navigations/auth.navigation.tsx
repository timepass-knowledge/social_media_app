import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { AuthStackNavigationParamList } from '../interface/Screen';
import Login from '../screens/auth/login';

const Stack = createStackNavigator<AuthStackNavigationParamList>();

export default function AuthStackNavigation() {
    const navigationOptions: StackNavigationOptions = {
        headerShown: false,
        gestureEnabled: false
    }
    return (
        <Stack.Navigator initialRouteName="login" screenOptions={navigationOptions}>
            <Stack.Screen component={Login} name="login" />
        </Stack.Navigator>
    )
}