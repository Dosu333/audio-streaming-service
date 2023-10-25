require('dotenv/config')

const imageUrl = async (dest, filename) => {
    let url = `${process.env.CLIENT_URL}/${dest.substring(2)}/${filename}`
    return url
}

module.exports = imageUrl