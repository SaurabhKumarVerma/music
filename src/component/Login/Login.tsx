import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { CodeChallengeMethod, useAuthRequest } from 'expo-auth-session';
const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };

const Login = () => {
    // const [request, response, promptAsync] = useAuthRequest(
    //     {
    //       clientId: '52460fe035aa452385f9d53b7f769e09',
    //       scopes: ['user-read-email', 'playlist-modify-public'],
    //       // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
    //       // this must be set to false
    //       usePKCE: false,
    //       // redirectUri: "exp://localhost:19002/--/spotify-auth-callback"
    //       // redirectUrl:"exp://localhost:19002/--/spotify-auth-callback"
    //       redirectUri: 'com.anonymous.music://',
    //       codeChallenge: CodeChallengeMethod.S256
    //     },
    //     discovery
    // );

    // useEffect(() => {
    //     console.log("this is respinse", response)
    //     if (response?.type === 'success') {
    //       const { code } = response.params;
    //     }
    //   }, [response]);


  return (
    <View>
      <Text>Login</Text>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})