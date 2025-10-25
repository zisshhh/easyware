const API_BASE_URL = 'http://localhost:8080/api/v1';

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Product API
  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    brand?: string;
    sortBy?: string;
    sortOrder?: string;
    search?: string;
    isFeatured?: boolean;
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/products?${queryParams}`);
    return response.json();
  }

  async getProduct(id: string) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return response.json();
  }

  async getFeaturedProducts() {
    const response = await fetch(`${API_BASE_URL}/products/featured/list`);
    return response.json();
  }

  async createProduct(productData: any) {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    return response.json();
  }

  async updateProduct(id: string, productData: any) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    return response.json();
  }

  async deleteProduct(id: string) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async addProductReview(productId: string, rating: number, comment?: string) {
    const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ rating, comment }),
    });
    return response.json();
  }

  // Cart API
  async getCart() {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async addToCart(productId: string, quantity: number, size?: string, color?: string) {
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ productId, quantity, size, color }),
    });
    return response.json();
  }

  async updateCartItem(productId: string, quantity: number, size?: string, color?: string) {
    const response = await fetch(`${API_BASE_URL}/cart/update`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ productId, quantity, size, color }),
    });
    return response.json();
  }

  async removeFromCart(productId: string, size?: string, color?: string) {
    const response = await fetch(`${API_BASE_URL}/cart/remove`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ productId, size, color }),
    });
    return response.json();
  }

  async clearCart() {
    const response = await fetch(`${API_BASE_URL}/cart/clear`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // Order API
  async createOrder(orderData: {
    shippingAddress: any;
    billingAddress: any;
    paymentMethod: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(orderData),
    });
    return response.json();
  }

  async getMyOrders(params?: { page?: number; limit?: number; status?: string }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/orders/my-orders?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async getOrder(id: string) {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // User API
  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async updateProfile(profileData: any) {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    return response.json();
  }

  // Admin API
  async getAllUsers(params?: { page?: number; limit?: number; role?: string; search?: string }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/user/admin/users?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async getAllOrders(params?: { page?: number; limit?: number; status?: string; paymentStatus?: string }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/orders/admin/all?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async updateOrderStatus(orderId: string, status: string, trackingNumber?: string) {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ status, trackingNumber }),
    });
    return response.json();
  }

  async getUserStats() {
    const response = await fetch(`${API_BASE_URL}/user/admin/stats`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async getOrderStats() {
    const response = await fetch(`${API_BASE_URL}/orders/admin/stats`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }
}

export const apiService = new ApiService();
