

export const fetchImages = async (query) => {
    const API_KEY = "49625718-2fc374da92b01abb8788a4564";
    const BASE_URL = "https://pixabay.com/api/";
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    });
    const url = `${BASE_URL}?${params.toString()}`;
    return fetch(url).then((response) => response.json())
};