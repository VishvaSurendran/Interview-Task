import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import styles from './SalesChart.module.css';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;

        return (
            <div className={styles.tooltip}>
                <p className={styles.tooltipTitle}>
                    Time Window: {label}:00 - {label + 2}:00
                </p>
                <p className={styles.tooltipOrders}>
                    Total Orders: {data.count}
                </p>
                <p className={styles.tooltipRevenue}>
                    Total Revenue: ${data.amount.toFixed(2)}
                </p>

                {data.count > 0 && (
                    <>
                        <p className={styles.categoryHeader}>Category Breakdown:</p>
                        {Object.entries(data.categories).map(([cat, amt]) => (
                            <div key={cat} className={styles.categoryRow}>
                                <span>{cat}:</span>
                                <span>${amt.toFixed(2)}</span>
                            </div>
                        ))}
                    </>
                )}
            </div>
        );
    }
    return null;
};

const SalesChart = ({ data }) => {
    const chartData = useMemo(() => {
        const buckets = {};
        for (let i = 0; i <= 24; i += 2) {
            buckets[i] = { time: i, amount: 0, count: 0, categories: {} };
        }

        data.forEach(order => {
            const orderHour = Number(order.hour);
            const bucketHour = orderHour % 2 === 0 ? orderHour : orderHour - 1;

            if (buckets[bucketHour]) {
                buckets[bucketHour].amount += Number(order.amount);
                buckets[bucketHour].count += 1;

                if (!buckets[bucketHour].categories[order.category]) {
                    buckets[bucketHour].categories[order.category] = 0;
                }
                buckets[bucketHour].categories[order.category] += Number(order.amount);
            }
        });

        return Object.values(buckets);
    }, [data]);

    return (
        <div className={styles.chartContainer}>
            <h3 className={styles.chartTitle}>Daily Order Volume (24-Hour Timeline)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="time"
                        type="number"
                        domain={[0, 24]}
                        ticks={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]}
                        tickFormatter={(tick) => `${tick}:00`}
                    />
                    <YAxis allowDecimals={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#82ca9d" strokeWidth={3} name="Total Orders" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesChart;