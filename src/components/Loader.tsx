import React from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
    Text
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { FIXED_COLORS } from '../constants';

interface ILoader {
    loading: boolean;
    message?: string;
}
function Loader({ loading, message }: ILoader) {
    const theme = useTheme();
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => { }}>
            <View style={styles.modalBackground}>
                <View style={[styles.activityIndicatorWrapper, { backgroundColor: theme.colors.accent }]}>
                    <ActivityIndicator
                        color={theme.colors.background}
                        animating={loading} />
                    {message && <Text style={{ marginLeft: 20, color: FIXED_COLORS.WHITE }}>{message}</Text>}

                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',

    },
    activityIndicatorWrapper: {
        // height: 100,
        // width: 100,
        padding: 15,
        flexDirection: 'row',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});
export default Loader;