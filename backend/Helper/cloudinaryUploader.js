const cloudinary = require('cloudinary').v2

cloudinary.config({
    api_key: process.env.apiKey,
    cloud_name: process.env.cloudName,
    api_secret: process.env.apiSecret,
    secure: true,
    private_cdn: false,
    secure_distribution: null
})

const cloudOption = {
    use_filename: true,
    unique_filename: true,
    folder: 'Pictures'
}

const cloudUpload = async (path) => {
    const result = await cloudinary.uploader.upload(path, cloudOption)
    return result
}

module.exports = cloudUpload