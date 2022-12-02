import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type AuthStackNavigationParamList = {
    login: undefined;
    reset: undefined
};

type LoginScreenRouteProp = RouteProp<AuthStackNavigationParamList, "login">;
type LoginScreenNavigationProp = StackNavigationProp<AuthStackNavigationParamList, "login">;

export type LoginScreenProps = {
    route: LoginScreenRouteProp,
    navigation: LoginScreenNavigationProp
};

declare global {
    namespace ReactNativePaper {
        interface ThemeColors {
            grey: string;
            light: string;
        }
        // interface Theme {
        //     myOwnProperty: boolean;
        // }
    }
}