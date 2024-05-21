async function downloadImage(image_url) {
    const fetchModule = await import('node-fetch');
    const fetch = fetchModule.default;

    const response = await fetch(image_url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer.toString('base64');
}

exports.downloadImage = downloadImage;