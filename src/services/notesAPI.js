import axios from 'axios'

const API_URL = "https://pfrdmxjjuycxrzyxbfrd.supabase.co/rest/v1/notes"
const API_KEY = "sb_publishable_RP6UTQ_xPHysj_z6wkqsqg_6qgkHMW5"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const notesAPI = {
    async fetchNotes() {
        const response = await axios.get(`${API_URL}?select=*`, { headers })
        return response.data
    },

    async createNote(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },

    async deleteNote(id) {
        const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
        return response.data
    }
}