export class Authapi {
  constructor(request) {
    this.request = request;
    this.baseURL = "https://dummyjson.com/auth";
  }

  async login(username, password) {
    return await this.request.post(`${this.baseURL}/login`, {
      data: {
        username,
        password,
      },
    });
  }

  async getAuthenticatedUser(token) {
    return await this.request.get(`${this.baseURL}/me`,{
        Headers:{
            Authorization: `Bearer ${token}`,
        }
    })
  }
}
