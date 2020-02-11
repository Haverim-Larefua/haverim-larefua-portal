const Configuration = {
    URLS: {
        BACKEND_URL: process.env.REACT_APP_BACKEND_URL || "http://localhost:3001",
        LOGIN: '/auth/admin',
        PARCELS: '/parcels',
        USERS: '/users',
        CITIES_ENDPOINT: 'https://data.gov.il/api/action/datastore_search?resource_id=5f75cd96-d670-43b0-bf6d-583436c5d054&limit=1300'
    }
};

export default Configuration;
