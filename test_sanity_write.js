import fs from 'fs'
import { createClient } from '@sanity/client'

const envStr = fs.readFileSync('.env.local', 'utf-8')
const getEnv = (key) => {
    const match = envStr.match(new RegExp(`${key}=(.*)`))
    return match ? match[1].trim() : ''
}

const client = createClient({
    projectId: getEnv('NEXT_PUBLIC_SANITY_PROJECT_ID'),
    dataset: getEnv('NEXT_PUBLIC_SANITY_DATASET'),
    apiVersion: getEnv('NEXT_PUBLIC_SANITY_API_VERSION') || '2023-01-01',
    token: getEnv('SANITY_API_READ_TOKEN'),
    useCdn: false
})

async function main() {
    try {
        console.log('Testing Sanity write access with pure script...')
        const res = await client.create({
            _type: 'author',
            name: 'Ada Lovelace Test',
            slug: { _type: 'slug', current: 'ada-lovelace-test' }
        })
        console.log('Success!', res._id)
        await client.delete(res._id)
        console.log('Cleanup complete.')
    } catch (err) {
        console.error('Failed or no write access:', err.message)
    }
}

main()
