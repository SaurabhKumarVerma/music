import { deleteAppToken, getAppToken, saveAppToken } from "@music/service/token/token"

const tokenCache = {
  async getToken(key: string): Promise<string | null> {
    try {
      const item = await getAppToken(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log("No values stored under key: " + key)
      }
      return item as string
    } catch (error) {
      console.error("SecureStore get item error: ", error)
      return null
    }
  },
  async saveToken(key: string, value: string): Promise<void> {
    try {
      saveAppToken(key, value)
    } catch (err) {}
  },

  async deleteSaveToken(key: string): Promise<void> {
    try {
      await deleteAppToken(key)
    } catch (error) {
      console.error("SecureStore deleting error: ", error)
    }
  },
}

export default tokenCache
