import axios from 'axios';

const API_KEY = '21ce46dc5f0bfbbb2b40cc681ae09c28'; 
const BASE_URL = 'https://api.themoviedb.org/3'; 

export const fetchLatestDrama = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/on_the_air`, {
      params: {
        api_key: API_KEY,
        language: 'id-ID',
      },
    });
    console.log("Response from API:", response.data); 
    return response.data.results.slice(0, 5); 
  } catch (error) {
    console.error('Error fetching latest drama:', error);
    return []; 
  }
};

export const fetchUpcomingDramas = async () => {
  try {
    const today = new Date().toISOString().split('T')[0]; 
    const response = await axios.get(`${BASE_URL}/discover/tv`, {
      params: {
        api_key: API_KEY,
        language: 'id-ID',
        sort_by: 'first_air_date.asc',
        'first_air_date.gte': today, 
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching upcoming dramas:', error);
    return [];
  }
};

export const fetchPopularDramas = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/popular`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular dramas:", error);
    return [];
  }
};

export const fetchDramaDetails = async (dramaId) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${dramaId}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching drama details:", error);
    return null;
  }
};
