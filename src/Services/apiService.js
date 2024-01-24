import axios from "axios";
import { allViews } from "../Mock/view";
import { allWorkBooks } from "../Mock/workbooks";


export const Endpoint = {
  LOGIN: "/auth/login/",
  ALL_CAMERA: "/camera/all/",
  UPDATE_CAMERA_STATUS:"/camera/",
};

class ApiService {
  constructor() {
    if (new.target === ApiService) {
      throw new Error("Cannot instantiate abstract class");
    }
  }

  async login(user, pwd) {}

  async get(endpoint, payload) {}

  async modifyInput(payload) {}
}

class Backend extends ApiService {
  #host;
  constructor() {
    super();
    this.#host = "https://m3njvkrhfl.execute-api.us-east-1.amazonaws.com";
  }

  async login(user, pwd, headers) {
    try {
      const res = await axios.post(
        `${this.#host}${Endpoint.LOGIN}`,
        { user: user, pwd: pwd },
        {
            withCredentials:true
        },
      );
      return res;
    } catch (e) {
      return { status: e.status, data: e.response.data.detail };
    }
  }

  async logout(){
    document.cookie ="session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    return true
  }

  async get(endpoint) {
    try {
      const res = await axios.get(`${this.#host}${endpoint}`,{
        withCredentials:true,
      });
      return res;
    } catch (e) {
      console.error(e);
    }
  }
  

}

class Mock extends ApiService {

  async login(user, pwd) {
    await new Promise((r) => setTimeout(r, 3e3));
    return {
      status: 200,
    };
  }

  async logout(){
    // document.cookie ="session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    return true
  }

  async get(endpoint, payload) {
    try {
      // console.log(endpoint);
      if (/^\/tableau\/views\/$/.test(endpoint)) {
        await new Promise((r) => setTimeout(r, 3e3));
        return { res: allViews.data, status: 200 };
      } else if (/^\/tableau\/workbooks\/$/.test(endpoint)) {
        await new Promise((r) => setTimeout(r, 3e3));
        return { res: allWorkBooks.data, status: 200 };
      } else if (/^\/tableau\/views\/[^\/]+/.test(endpoint)) {
        await new Promise((r) => setTimeout(r, 3e3));
        const id = endpoint.split('tableau/views/')[1];
        console.log(id);
        const filteredData = allViews.data.views.filter((item) => item.id === id);
        console.log(filteredData);
        return { data: filteredData, status: 200 };
      }
    } catch (e) {
      console.error(e);
    }
  }

}

export const apiService = new Backend();
