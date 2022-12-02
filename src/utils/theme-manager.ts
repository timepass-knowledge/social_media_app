import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme, configureFonts } from 'react-native-paper';
import { COLORS } from "../constants";

const themeManager = {
    CustomDefaultTheme: {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,

        // myOwnProperty: true,
        colors: {
            ...NavigationDefaultTheme.colors,
            ...PaperDefaultTheme.colors,
            background: COLORS.LIGHT.WHITE,
            text: COLORS.LIGHT.BLACK,
            primary: COLORS.LIGHT.PRIMARY,
            accent: COLORS.LIGHT.SECONDARY,
            grey: COLORS.LIGHT.GREY,
            light: COLORS.LIGHT.LIGHT
        }
    },
    CustomDarkTheme: {
        ...NavigationDarkTheme,
        ...PaperDarkTheme,
        // myOwnProperty: true,
        colors: {
            ...NavigationDarkTheme.colors,
            ...PaperDarkTheme.colors,
            background: COLORS.DARK.WHITE,
            text: COLORS.DARK.BLACK,
            primary: COLORS.DARK.PRIMARY,
            accent: COLORS.LIGHT.SECONDARY,
            grey: COLORS.DARK.GREY,
            light: COLORS.DARK.LIGHT
        }
    }
}

export {
    themeManager
}