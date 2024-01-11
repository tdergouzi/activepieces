import { access } from 'node:fs/promises'

type ErrorWithCode = {
    code?: string
} & Error

export const fileExists = async (path: string): Promise<boolean> => {
    try {
        await access(path)
        return true
    }
    catch (error) {
        const errorWithCode = error as ErrorWithCode
        if (errorWithCode instanceof Error && 'code' in errorWithCode && errorWithCode.code === 'ENOENT') {
            return false
        }

        throw error
    }
}
