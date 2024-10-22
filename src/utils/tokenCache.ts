import { deleteAppToken, getAppToken, saveAppToken } from "@music/service/token/token"

const tokenCache = {
  async getToken(keys: string): Promise<string | undefined> {
    try {
      const item = await getAppToken(keys)
      return item as string
    } catch (error) {
      console.error("SecureStore get item error: ", error)
      return undefined
    }
  },
  async saveToken(key: string, value: string) {
    try {
      saveAppToken(key, value)
    } catch (err) {
      return undefined
    }
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
