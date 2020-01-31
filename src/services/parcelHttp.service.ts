import httpService from "../services/http";
import Configuration from "../configuration/Configuration";
import Parcel from "../contexts/interfaces/parcels.interface";

class ParcelHttpService {
  private config: Configuration;

  constructor() {
    this.config = new Configuration();
  }

  async getParcels() {
    try {
      const response = await httpService.get(`${this.config.PARCELS_POSTFIX}`);
      return response.data;
    } catch (error) {
      console.error(
        "[HttpService] getParcels: could not retrieve parcels",
        error
      );
    }
  }

  async createParcel(aParcel: Parcel) {
    const response = await httpService.create(
      `${this.config.PARCELS_POSTFIX}`,
      aParcel
    );
    return response.data;
  }

  async addParcels(parcels: Parcel[]) {
    const response = await httpService.add(
      `${this.config.PARCELS_POSTFIX}`,
      parcels
    );
    return response;
  }

  async updateParcel(aParcel: Parcel) {
    const response = await httpService.update(
      this.config.PARCELS_POSTFIX,
      aParcel.id,
      aParcel
    );
    return response.data;
  }

  async deleteParcel(aParcel: Parcel) {
    const response = await httpService.delete(
      this.config.PARCELS_POSTFIX,
      aParcel.id
    );
    return response.data;
  }

  // TODO: this should be a query in DB
  async searchParcels(statusFilterTerm: string, cityFilterTerm: string, nameSearchTerm: string ) {
    let parcels = await this.getParcels();

    if ( parcels && parcels.length > 0 && nameSearchTerm && nameSearchTerm !== "") {
      const searchTerm = nameSearchTerm.trim().toLowerCase();
      parcels = parcels.filter(
        (item: Parcel) =>
          item.customerName && item.customerName.toLowerCase().indexOf(searchTerm) !== -1
      );
    }

    if ( parcels && parcels.length > 0 && cityFilterTerm && cityFilterTerm !== "" ) {
      const searchTerm = cityFilterTerm.trim().toLowerCase();
      parcels = parcels.filter((item: Parcel) => item.city === searchTerm);
    }

    if ( parcels && parcels.length > 0 && statusFilterTerm &&  statusFilterTerm !== "") {
      const searchTerm = statusFilterTerm.trim().toLowerCase();
      parcels = parcels.filter((item: Parcel) => item.status === searchTerm);
    }

    return parcels;
  }
}

const parcelHttpService = new ParcelHttpService();

export default parcelHttpService;
