import client from './client';

export const fetchDashboardMetrics = async () => {
    try {
        const response = await client.get('/metrics');
        return response.data;
    } catch (error) {
        console.error("API Error fetching metrics:", error);
        throw error;
    }
};


export const createOrder = async (orderData) => {
    try {
        const response = await client.post('/metrics/order', orderData);
        return response.data;
    } catch (error) {
        console.error("API Error creating order:", error);
        throw error;
    }
};