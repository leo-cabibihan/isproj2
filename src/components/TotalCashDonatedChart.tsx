"use client"
import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface TotalCashDonatedDataProps {
  CashDonatedData: Array<{ name: string; totalCashDonated: number }>;
}

function TotalCashDonatedChart({ CashDonatedData }: TotalCashDonatedDataProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={CashDonatedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value, name) => {
          if (name === "totalCashDonated") return value
          else return value.toLocaleString()
        }}/>
        <Legend />
        <Area type="monotone" dataKey="totalCashDonated" name="Total Cash Donated (PHP)" stroke="#11aa11" fill="#11aa11" activeDot={{ r: 6.5 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
 
export default  TotalCashDonatedChart;