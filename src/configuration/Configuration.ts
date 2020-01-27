class Configuration {
    // API_URL = "http://localhost:4202/api";
    BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";
    // private pushServerUrl = `https://push-notification-demo-server.herokuapp.com/subscription`;

    PUSH_SUBSCRIBE_POSTFIX = '/push/subscribe';
    PUSH_NOTIFY_POSTFIX = '/push/notify';

    PACKAGES_POSTFIX = '/parcels';

}

export default Configuration;