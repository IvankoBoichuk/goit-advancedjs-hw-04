import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";

export const fetchImages = async (query, page = "1") => {
    const API_KEY = "49625718-2fc374da92b01abb8788a4564";
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: 15,
    });
    const url = `?${params.toString()}`;
    const response = await axios.get(url);
    return response.data;
};