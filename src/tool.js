import fetch from "node-fetch";

async function downloadImage(image_url) {
    const response = await fetch(image_url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer.toString('base64');
}

module.exports = {downloadImage};