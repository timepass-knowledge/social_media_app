import React from "react";
import AuthNavigation from "./auth.navigation";
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { themeManager } from "../utils/theme-manager";

export const navigationRef = React.createRef<any>()
function Navigations() {
    return (
        <PaperProvider theme={themeManager.CustomDefaultTheme}>
            <NavigationContainer ref={navigationRef} theme={themeManager.CustomDefaultTheme}>
                <AuthNavigation />
            </NavigationContainer>
        </PaperProvider>
    )
}

export default Navigations;