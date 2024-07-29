// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
    // Ensure data is defined and properly structured
    if (!data || Object.keys(data).length === 0) {
        return <div>No data available</div>;
    }

    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'Employees',
                data: Object.values(data),
                backgroundColor: [
                    'rgba(106, 90, 205,0.75)',
                    'rgba(255, 99, 132, 0.75)',
                    'rgba(75, 192, 192, 0.75)',
                        'rgba(255, 159, 64, 0.75)',                        
                        'rgba(153, 102, 255, 0.75)',
                        'rgba(201, 203, 207, 0.75)',
                        'rgba(255, 205, 86, 0.75)',
                        
                ],
                
            },
        ],
    };

    return <Pie className='border rounded-lg p-5 m-5' data={chartData} />;
};

export default PieChart;
