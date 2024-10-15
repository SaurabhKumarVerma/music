import * as SecureStore from "expo-secure-store";

export const getAppToken = async (tokenKey: string): Promise<string | null | undefined> => {
    try {
        const itemKey = await SecureStore.getItemAsync(tokenKey);
        if (itemKey) {
            return itemKey;
        }
    } catch (error) {
        return null;
    }
};

export const saveAppToken = async (tokenKey: string, value: string): Promise<void> => {
    try {
        await SecureStore.setItemAsync(tokenKey, value)
    } catch (error) {
        return
    }
};

export const deleteAppToken = async (tokenKey: string): Promise<void | null> => {
    try {
        await SecureStore.deleteItemAsync(tokenKey)
        console.info('SecureStore get item deleted: ', tokenKey)
    } catch (error) {
        return null
    }
}


