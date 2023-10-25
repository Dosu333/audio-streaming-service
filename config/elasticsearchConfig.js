const { Client } = require('@elastic/elasticsearch');
require('dotenv/config');

const client = new Client({
    node: process.env.ELASTIC_ENDPOINT,
    auth: {
      username: process.env.ELASTIC_USERNAME,
      password: process.env.ELASTIC_PASSWORD,
    }
  })

  const testDbConnection  = async () => {
    const clientInfo = await client.info()
    if (clientInfo) {
        console.log('client---------------', clientInfo);
    } else{
        console.log('client----------DB not connected')
    }
  }

module.exports = { els: client, testDbConnection }