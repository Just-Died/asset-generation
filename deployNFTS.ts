require('dotenv').config();
import { NFTStorage, File } from 'nft.storage';

const apiKey = process.env.NFT_STORAGE_API_KEY;
const client = new NFTStorage({ token: apiKey })

const Main = async () => {
    const metadata = await client.store({
      name: 'Pinpie',
      description: 'Pin is not delicious beef!',
      image: new File([require('./generated/images/1.png')], 'pinpie.png', { type: 'image/png' })
    })
    console.log(metadata.url)
}


Main();
