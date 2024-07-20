import axios from 'axios';

class ApiService {
  baseUrl: string;

  constructor() {
    this.baseUrl = "http://example.com/api/resource";
  }

  // Create a new resource
  async create(data: any): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}`, data);
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error creating resource:", error);
      throw error;
    }
  }

  // Read (get) a single resource by ID
  async getById(id: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error fetching resource:", error);
      throw error;
    }
  }

  // Read (get) all resources
  async getAll(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUrl}`);
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error fetching resources:", error);
      throw error;
    }
  }

  // Update a resource by ID
  async update(id: string, data: any): Promise<any> {
    try {
      const response = await axios.put(`${this.baseUrl}/${id}`, data);
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error updating resource:", error);
      throw error;
    }
  }

  // Delete a resource by ID
  async delete(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error deleting resource:", error);
      throw error;
    }
  }
}

export default ApiService;
