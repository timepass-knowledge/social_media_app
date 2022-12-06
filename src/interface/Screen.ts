import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum AuthStackNavigationParamListEnum {
    login = "login",
    forgotPassword = "forgotPassword",
    signup = "signup"
};

export type AuthStackNavigationParamList = {
    login: undefined;
    forgotPassword: undefined,
    signup: undefined;
};

type LoginScreenRouteProp = RouteProp<AuthStackNavigationParamList, "login">;
type LoginScreenNavigationProp = StackNavigationProp<AuthStackNavigationParamList, "login">;

export type LoginScreenProps = {
    route: LoginScreenRouteProp,
    navigation: LoginScreenNavigationProp
};

type SignupScreenRouteProp = RouteProp<AuthStackNavigationParamList, "signup">;
type SignupScreenNavigationProp = StackNavigationProp<AuthStackNavigationParamList, "signup">;

export type SignupScreenProps = {
    route: SignupScreenRouteProp,
    navigation: SignupScreenNavigationProp
};

type ForgotPasswordScreenRouteProp = RouteProp<AuthStackNavigationParamList, AuthStackNavigationParamListEnum.forgotPassword>;
type ForgotPasswordScreenNavigationProp = StackNavigationProp<AuthStackNavigationParamList, AuthStackNavigationParamListEnum.forgotPassword>;

export type ForgotPasswordScreenProps = {
    route: ForgotPasswordScreenRouteProp,
    navigation: ForgotPasswordScreenNavigationProp
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