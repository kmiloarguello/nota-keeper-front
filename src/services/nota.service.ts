import axios from "axios";

import { NotaTypeRequest, NotaTypeResponse, VersionTypeResponse } from "@types";

class NotaService {
  baseUrl: string;

  constructor() {
    this.baseUrl =
      `${process.env.REACT_APP_API_URL}/notes` || "http://localhost:8000/notes";
  }

  // Create a new nota
  async create(data: NotaTypeRequest): Promise<NotaTypeResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}`, data);
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error creating nota:", error);
      throw error;
    }
  }

  // Read (get) a single nota by ID
  async getById(id: string): Promise<NotaTypeResponse> {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error fetching nota:", error);
      throw error;
    }
  }

  // Read (get) all versions of a single nota by ID
  async getVersionsFromNota(id: string): Promise<VersionTypeResponse[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}/versions`);
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error fetching nota:", error);
      throw error;
    }
  }

  // Read (get) a single nota by ID
  async getVersion(version_id: string): Promise<VersionTypeResponse> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/versions/${version_id}`
      );
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error fetching nota:", error);
      throw error;
    }
  }

  // Select a version of a nota -> version becomes the current nota
  async selectVersion(
    nota_id: string,
    version_id: string
  ): Promise<NotaTypeResponse> {
    try {
      const response = await axios.put(`${this.baseUrl}/${nota_id}/select`, {
        version_id,
      });
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error selecting version:", error);
      throw error;
    }
  }

  // Read (get) all notas
  async getAll(): Promise<NotaTypeResponse[]> {
    try {
      const response = await axios.get(`${this.baseUrl}`);
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error fetching notas:", error);
      throw error;
    }
  }

  // Update a nota by ID
  async update(id: string, data: NotaTypeRequest): Promise<NotaTypeResponse> {
    try {
      const response = await axios.put(`${this.baseUrl}/${id}`, data);
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error updating nota:", error);
      throw error;
    }
  }

  // Delete a nota by ID
  async delete(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error deleting nota:", error);
      throw error;
    }
  }
}

export default NotaService;
