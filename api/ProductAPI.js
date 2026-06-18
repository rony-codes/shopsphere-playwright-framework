export class ProductAPI {
    constructor(request){
        this.request = request;
        this.baseURL = 'https://dummyjson.com/products';
    }

    async getAllProducts(){
        return await this.request.get(this.baseURL)
    }

    async getProductById(id){
        return await this.request.get(`${this.baseURL}/${id}`)
    }

    async createProduct(data){
        return await this.request.post(`${this.baseURL}/add`, {data})
    }

    async updateProduct(id, data){
        return await this.request.put(`${this.baseURL}/${id}`,{data},)
    }

    async patchProduct(id,data){
        return await this.request.patch(`${this.baseURL}/${id}`, {data},)
    }

    async deleteProdct(id){
        return await this.request.delete(`${this.baseURL}/${id}`)
    }
}