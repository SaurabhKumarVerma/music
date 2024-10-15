import { deleteAppToken, getAppToken, saveAppToken } from "@music/service/token/token";



const tokenCache = {
    async getToken(key: string) {
        try {
            const item = await getAppToken(key);
            if (item) {
                console.log(`${key} was used 🔐 \n`);
            } else {
                console.log("No values stored under key: " + key);
            }
            return item;
        } catch (error) {
            console.error("SecureStore get item error: ", error);
            await deleteAppToken(key);
            return null;
        }
    },
    async saveToken(key: string, value: string) {
        try {
            return saveAppToken(key, value);
        } catch (err) {
            return;
        }
    },
};

export default tokenCache;