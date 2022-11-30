// client.js
import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'kw8g5ssx', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  apiVersion: '2022-11-29',
  useCdn: true // `false` if you want to ensure fresh data
})