import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { Alert, StyleSheet, View, ScrollView, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { FONT_SIZE } from '../../constants'
import { StatusBar } from 'react-native'
import Loader from '../../components/Loader'
import { Button, useTheme } from 'react-native-paper';
import { CustomTextInput } from '../../components/CustomInput'
import { SignupScreenProps } from '../../interface/Screen'
import { loginAction } from '../../store/auth/actions'

enum FormReducerType {
    FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE",
}

enum FormInputEnum {
    email = "email",
    password = "password",
    username = "username",
}
type FormInputType = "email" | "password" | "username";

interface IFormReducerState {
    inputValues: {
        [key in FormInputEnum]: string
    },
    inputValidities: {
        [key in FormInputEnum]: boolean
    },
    formIsValid: boolean
}

interface IFormInputChangeAction {
    type: FormReducerType.FORM_INPUT_UPDATE,
    value: string,
    isValid: boolean,
    inputId: FormInputType
}

type FormAction = IFormInputChangeAction

function formReducer(state: IFormReducerState, action: FormAction): IFormReducerState {
    if (action.type === FormReducerType.FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.inputId]: action.value
        };
        const updateValidities: any = {
            ...state.inputValidities,
            [action.inputId]: action.isValid
        }
        let isFormValid = true;
        for (const key in updateValidities) {
            isFormValid = isFormValid && updateValidities[key];
        }
        return {
            inputValues: updatedValues,
            inputValidities: updateValidities,
            formIsValid: isFormValid
        };

    }
    return state;


}

function Signup(props: SignupScreenProps) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: "",
            password: "",
            username: ""
        },
        inputValidities: {
            email: false,
            password: false,
            username: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert("An error Occurred!",
                error,
                [{ text: "okay", onPress: () => setError(undefined) }]
            )
        }
    }, [error])

    async function authHanlder() {
        if (formState.formIsValid) {
            const { email, password } = formState.inputValues;
            setError(undefined)
            setIsLoading(true);
            try {
                await dispatch(loginAction({ email, password }));
                setIsLoading(false)
            } catch (err: any) {
                setError(err.message)
                setIsLoading(false)
            }
        } else {
            Alert.alert("Form not valid", "Please fill all fields", [{ text: "Okay" }])
        }
    }

    const handleInputChange = useCallback((inputIdentifier: FormInputType, inputValue: string, inputValidity: boolean) => {
        dispatchFormState({
            type: FormReducerType.FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            inputId: inputIdentifier
        });
    }, [dispatchFormState]);
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.grey }]}>
            <StatusBar backgroundColor={theme.colors.grey} barStyle="light-content" />

            <View style={styles.header}></View>
            <View style={[styles.footer, { backgroundColor: theme.colors.background }]}>
                <ScrollView>
                    <View>
                        <View style={styles.heading}>
                            <Text style={[styles.headingText, { color: theme.colors.text }]}>Signup</Text>
                        </View>
                        <CustomTextInput
                            name="username"
                            label="Username"
                            required
                            autoCapitalize="none"
                            errorText="Please enter different username"
                            onInputChange={handleInputChange}
                            inititalValue={formState.inputValues.username}
                            touched
                        />
                        <View style={styles.mt}>
                            <CustomTextInput
                                name="email"
                                label="Email"
                                keyboardType="email-address"
                                required
                                autoCapitalize="none"
                                errorText="Please enter a valid email address"
                                onInputChange={handleInputChange}
                                inititalValue={formState.inputValues.email}
                                touched
                            />
                        </View>
                        <View style={styles.mt}>
                            <CustomTextInput
                                name="password"
                                label="Password"
                                keyboardType="default"
                                secureTextEntry
                                required
                                minLength={5}
                                autoCapitalize="none"
                                errorText="Please enter a valid password"
                                onInputChange={handleInputChange}
                                inititalValue={formState.inputValues.password}
                                password
                                touched
                            />
                        </View>
                        <View style={styles.btnContainer}>
                            <Button
                                style={{ backgroundColor: theme.colors.primary }}
                                onPress={authHanlder} >
                                <Text style={[styles.loginText, { color: theme.colors.background }]}>Submit</Text>
                            </Button>
                        </View>
                    </View>

                    <View style={styles.extraBtnContainer}>
                        <Button
                            style={{ backgroundColor: theme.colors.primary }}
                            onPress={() => props.navigation.navigate("login")}>
                            <Text style={[styles.loginText, { color: theme.colors.background }]}>Login</Text>
                        </Button>
                        <Button
                            style={{ backgroundColor: theme.colors.primary, marginTop: 10 }}
                            onPress={() => props.navigation.navigate("forgotPassword")}>
                            <Text style={[styles.loginText, { color: theme.colors.background }]}>Forgot Password</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
            <Loader loading={isLoading} message={"Signing In..."} />
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
        opacity: 0.2
    },
    footer: {
        marginTop: 200,
        height: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    btnContainer: {
        marginTop: 20
    },
    loginText: {
        flex: 1,
        textAlign: 'center',
        fontSize: FONT_SIZE.MEDIUM,
        fontWeight: "500",
        textTransform: 'none'
    },
    heading: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: 'center',
    },
    headingText: {
        // fontFamily: FONT_FAMILY.BOLD,
        fontSize: FONT_SIZE.EXTRA_LARGE,
        fontWeight: "600"
    },
    mt: {
        marginTop: 10
    },
    extraBtnContainer: {
        marginTop: 40
    }
})