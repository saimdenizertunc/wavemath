import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    token: process.env.SANITY_API_READ_TOKEN,
    useCdn: false
})

async function main() {
    try {
        console.log('Testing Sanity write access...')
        const res = await client.create({
            _type: 'author',
            name: 'Test Author',
            slug: { _type: 'slug', current: 'test-author' }
        })
        console.log('Success!', res._id)
        await client.delete(res._id)
        console.log('Cleanup complete.')
    } catch (err) {
        console.error('Failed or no write access:', err.message)
    }
}

main()
