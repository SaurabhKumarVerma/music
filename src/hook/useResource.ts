import { useState, useEffect } from "react";
import * as Font from 'expo-font' 

const useResource = () => {
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        const loadResource =  async () => {
            try {
                await Font.loadAsync({
                    IcoMoon: require('../../assets/icons/icomoon.ttf'),
                }).then((res) => {
                    console.log("this trued loaded", res);
                    
                    setLoaded(true);
                })
                
            } catch (error) {
                setLoaded(false);
            }
        }
        loadResource()
    },[])

    return { loaded };
}

export default useResource;