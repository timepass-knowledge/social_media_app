import { Dimensions, PixelRatio, Platform } from "react-native";

const COLORS = {
    LIGHT: {
        PRIMARY: "#0979A7",
        // "#76A54F",
        SECONDARY: "#26516F",
        DANGER: "#AA0000",
        GREY: "#263238",
        BLACK: '#263238',
        WHITE: '#FFFFFF',
        // LIGHT: "#F8F4F4",
        LIGHT: "#F3F5F7",
        MEDIUM: "#6e6969",
    },
    DARK: {
        PRIMARY: "#0979A7",
        SECONDARY: "#26516F",
        BLACK: "#FFFFFF",
        WHITE: "#263238",
        GREY: "#263238",
        // LIGHT: "#F8F4F41A",
        LIGHT: "#F3F5F71A",
    }
}

const FIXED_COLORS = {
    BLACK: '#263238',
    WHITE: '#FFFFFF',
}
function scaledSize(size: number) {
    const {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    } = Dimensions.get('window');
    const scale = SCREEN_WIDTH / 260;
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}
enum FONT_SIZE {
    ULTRA_EXTRA_SMALL = scaledSize(7),
    EXTRA_SMALL = scaledSize(9),
    SMALL = scaledSize(11),
    MEDIUM = scaledSize(14),
    LARGE = scaledSize(16),
    EXTRA_LARGE = scaledSize(20),
}

enum FONT_FAMILY {
    // REGULAR = "open-sans",
    // BOLD = "open-sans-bold"
    REGULAR = "main",
    BOLD = "main-bold"
}

const BASE_PATH = ""
const API_ROUTE = {
    USER: {
        REFRESH_TOKEN: "",
        LOGIN: "",
        LOGOUT: ""
    }
}

function isTablet() {
    const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");
    let pixelDensity = PixelRatio.get();
    const adjustedWidth = screenWidth * pixelDensity;
    const adjustedHeight = screenHeight * pixelDensity;
    if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
        return true;
    } else {
        return (
            pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
        );
    }
};

const CONSTANTS = {
    ONE_DAY_TIMESTAMP_MS: 60 * 60 * 24 * 1000
}
export {
    COLORS,
    FONT_SIZE,
    FONT_FAMILY,
    API_ROUTE,
    BASE_PATH,
    FIXED_COLORS,
    isTablet,
    CONSTANTS
}