const Configuration = {
    URLS: {
        BACKEND_URL: process.env.REACT_APP_BACKEND_URL || "http://localhost:3001",
        LOGIN: '/auth/admin',
        ADMIN: '/admins',
        PARCELS: '/parcels',
        USERS: '/users',
        PUSH: '/push-token',
        CITIES_ENDPOINT: 'https://data.gov.il/api/action/datastore_search?resource_id=ec172c08-27fe-4d97-960d-dabf741c077f&limit=1300'
        // taken from https://data.gov.il/he/dataset/citiesandsettelments
    }
};

export default Configuration;
