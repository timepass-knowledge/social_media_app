import React, { useReducer, useEffect, useState, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInputProps
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { emailValidator } from "../utils/common";
import { FONT_FAMILY, FONT_SIZE, isTablet } from "../constants";
import { TextInput, useTheme } from "react-native-paper";

interface ICustomTextInput extends TextInputProps {
    name: string;
    label?: string;
    errorText: string;
    inititalValue?: string;
    inititallyValid?: boolean;
    required?: boolean;
    email?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    onInputChange: any;
    password?: boolean;
    disabled?: boolean;
    touched?: boolean;
    resetInput?: boolean;
}

interface IInputReducer {
    value: string | undefined;
    isValid: boolean | undefined;
    touched: boolean;
}

enum InputEnum {
    INPUT_CHANGE = "INPUT_CHANGE",
    INPUT_BLUR = "INPUT_BLUR",
    RESET_INPUT = "RESET_INPUT"
}

interface IInputChangeAction {
    type: InputEnum.INPUT_CHANGE;
    value: string;
    isValid: boolean;
}

interface IInputBlurAction {
    type: InputEnum.INPUT_BLUR;
}

interface IResetInputAction {
    type: InputEnum.RESET_INPUT;
}

type InputAction = IInputChangeAction | IInputBlurAction | IResetInputAction;

const inputReducer = (state: IInputReducer, action: InputAction): IInputReducer => {
    switch (action.type) {
        case InputEnum.INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case InputEnum.INPUT_BLUR:
            return {
                ...state,
                touched: true
            }
        case InputEnum.RESET_INPUT:
            return {
                value: "",
                isValid: true,
                touched: false,
            }
        default:
            return state
    }
}

export function CustomTextInput(props: ICustomTextInput) {
    const theme = useTheme();
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.inititalValue,
        isValid: props.inititallyValid,
        touched: false
    })
    const [icon, setIcon] = useState<"md-eye" | "md-eye-off">("md-eye-off");
    const [hidePassword, setHidePassword] = useState(true)

    const { onInputChange, name } = props;

    useEffect(() => {
        if (inputState.touched || props.touched) {
            props.onInputChange(name, inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange, name])

    useEffect(() => {
        if (props.resetInput !== undefined) {
            dispatch({ type: InputEnum.RESET_INPUT })
        }
    }, [props.resetInput])

    function handleInputChange(text: string) {
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailValidator(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min !== null && props.min !== undefined && +text < props.min) {
            isValid = false;
        }
        if (props.max !== null && props.max !== undefined && text.length > props.max) {
            // console.log("Max:- ", props.max, text);
            isValid = false;
            return;
        }
        if (props.minLength !== null && props.minLength !== undefined && text.length < props.minLength) {
            isValid = false;
        }
        dispatch({ type: InputEnum.INPUT_CHANGE, value: text, isValid: isValid })
    }

    function handleFocus() {
        dispatch({ type: InputEnum.INPUT_BLUR })
    }

    const changeIcon = useCallback(() => {
        if (icon === "md-eye-off") {
            setIcon("md-eye");
            setHidePassword(false);
        } else {
            setIcon("md-eye-off");
            setHidePassword(true);
        }
    }, [props.password, hidePassword, icon])

    return (
        <View style={styles.formControl}>
            {/* <Text style={[styles.label, { color: theme.colors.text }]}>{props.label}</Text> */}
            <View style={styles.passwordViewContainer}>
                <TextInput
                    {...props as any}
                    mode="outlined"
                    dense={isTablet() ? false : true}
                    style={[styles.input]}
                    value={inputState.value}
                    onChangeText={handleInputChange}
                    onBlur={handleFocus}
                    secureTextEntry={props.password && hidePassword}
                    error={!inputState.isValid && inputState.touched}
                />
                {
                    props.password &&
                    <Ionicons
                        style={styles.icon}
                        color={theme.colors.primary}
                        name={icon}
                        size={28}
                        onPress={() => changeIcon()} />
                }
            </View>
            {
                !inputState.isValid && inputState.touched && (
                    <View style={styles.errorContainer}>
                        <Text style={[styles.errorText, { color: theme.colors.error }]}>{props.errorText}</Text>
                    </View>
                )
            }
        </View>
    )

}

const styles = StyleSheet.create({
    formControl: {
        width: "100%"
    },
    input: {
        // fontFamily: FONT_FAMILY.REGULAR,
        fontWeight: "500",
        fontSize: FONT_SIZE.EXTRA_SMALL,
        width: "100%",
    },
    label: {
        // fontFamily: FONT_FAMILY.BOLD,
        fontSize: FONT_SIZE.SMALL
    },
    errorContainer: {
        marginVertical: 5,
        marginLeft: 5
    },
    errorText: {
        // fontFamily: FONT_FAMILY.REGULAR,
        fontSize: FONT_SIZE.EXTRA_SMALL
    },
    passwordViewContainer: {
        flexDirection: 'row',
    },
    icon: {
        position: 'absolute',
        top: isTablet() ? 25 : 12,
        right: 10,
        elevation: 5
    }
})