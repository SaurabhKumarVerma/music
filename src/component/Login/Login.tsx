import { Button, View, StyleSheet } from "react-native"
import { useWarmUpBrowser } from "@music/hook/useWarmUpBrowser"
import * as WebBrowser from "expo-web-browser"

import LoginBackgroundImage from "./LoginBackgroundImage"
import LoginBody from "./LoginBody"
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "@music/constant/constant"
import LoginHeaderImage from "./LoginHeaderImage"
import { useSafeAreaInsets } from "react-native-safe-area-context"

WebBrowser.maybeCompleteAuthSession()



const Login = () => {
    useWarmUpBrowser()
    // const insets = useSafeAreaInsets()
    

    return (
        <View >
            {/* <Button title="Sign in with apple" /> */}
            <View>
                <LoginBackgroundImage />
            </View>

            <View style={styles.img}>
                <LoginHeaderImage />
            </View>

            <View style={styles.body}>
                <LoginBody />
            </View>
        </View>
    )
}
export default Login

const styles = StyleSheet.create({
    body: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 10
    },
    img: {
        position: 'absolute',
        alignSelf: "flex-end",
    }
})
