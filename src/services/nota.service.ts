import axios from 'axios';

import { NotaTypeRequest, NotaTypeResponse } from '@/@types';

class NotaService {
  baseUrl: string;

  constructor() {
    this.baseUrl =
      `${process.env.REACT_APP_API_URL}/notes` || "http://localhost:8000/notes";
  }

  // Create a new resource
  async create(data: NotaTypeRequest): Promise<NotaTypeResponse> {
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
  async getById(id: string): Promise<NotaTypeResponse> {
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
  async getAll(): Promise<NotaTypeResponse[]> {
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
  async update(id: string, data: NotaTypeRequest): Promise<NotaTypeResponse> {
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

export default NotaService;
