import React, { useState, useEffect } from 'react';
import { fetchDashboardMetrics, createOrder } from '../services/api';
import StatCard from '../components/StatCard';
import SalesChart from '../components/SalesChart';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const [data, setData] = useState({ recentOrders: [], categoryStats: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Electronics');

    const loadData = async () => {
        try {
            const metrics = await fetchDashboardMetrics();
            setData(metrics);
            setError(null);
        } catch (err) {
            setError('Failed to connect to the live feed.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
        const intervalId = setInterval(() => {
            loadData();
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount) return;

        setIsSubmitting(true);
        try {
            await createOrder({ amount: parseFloat(amount), category });
            setAmount('');
            await loadData();
        } catch (err) {
            alert("Failed to insert order");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <div className={styles.loadingText}>Loading Dashboard...</div>;

    const totalRevenue = data.categoryStats.reduce((sum, item) => sum + Number(item.total), 0);
    const totalOrders = data.categoryStats.reduce((sum, item) => sum + Number(item.count), 0);

    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>Live Metrics Dashboard</h1>

            {error && (
                <div className={styles.errorBanner}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <h3 className={styles.formTitle}>Add Order:</h3>
                <input
                    type="number"
                    placeholder="Amount (e.g. 50)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={styles.inputField}
                    required
                />
                <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    className={styles.inputField}
                >
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                </select>
                <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className={styles.submitBtn}
                >
                    {isSubmitting ? 'Adding...' : 'Insert Data'}
                </button>
            </form>

            <div className={styles.statsWrapper}>
                <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} />
                <StatCard title="Total Orders (All Time)" value={totalOrders} />
            </div>

            {data.recentOrders.length > 0 ? (
                <SalesChart data={data.recentOrders} />
            ) : (
                <p>No order data available yet.</p>
            )}
        </div>
    );
};

export default Dashboard;