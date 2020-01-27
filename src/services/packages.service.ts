import Configuration from "../configuration/Configuration";

class PackageService {
    private API_PREFIX: string = '/packages';
    config: Configuration;

    constructor() {
        this.config = new Configuration();
    }
    async retrievePackages() {
        return fetch(`${this.config.BACKEND_URL+this.API_PREFIX}`)
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response);
                }
                return response.json();
            })
            .then(json => {
                console.log(`${'Retrieved Items: ' + json}`);
            })
            .catch(error => {
                this.handleError(error);
              });
    }

    handleResponseError(response: Response) {
        throw new Error("HTTP error, status = " + response.status);
    }
    handleError(error: any) {
        console.log(error.message);
    }
}

export default PackageService;