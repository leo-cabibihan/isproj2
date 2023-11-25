"use client"
import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface TotalInKindTransactionProps {
    InKindData: Array<{ name: string; totalInKindTransactions: number}>;
}

function TotalInKindTransactionsChart({ InKindData }: TotalInKindTransactionProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart
                data = {InKindData}
                margin = {{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name) => {
                if (name === "totalInKindTransactions") return value
                else return value.toLocaleString()
                }}/>
                <Legend />
                <Area type="monotone" dataKey="totalInKindTransactions" name="Total In-Kind Transactions" stroke="#ff6600" fill="#ff6600" activeDot={{ r: 6.5 }} />
            </AreaChart>
        </ResponsiveContainer>
    )
} 

export default TotalInKindTransactionsChart;