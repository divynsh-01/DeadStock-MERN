import React from 'react';
import SideBar from "./SideBar.js";
import "./dashboard.css";
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement // Import ArcElement for Doughnut chart
} from 'chart.js';

// Register the necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement // Register ArcElement
);

const DashBoard = () => {
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["blue"],
                hoverBackgroundColor: ["red"],
                data: [0, 4000],
            }
        ]
    };

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#9db1ea", "#e47e98"],
                hoverBackgroundColor: ["#7c98e8", "#e26182"],
                data: [2, 10]
            }
        ]
    };

    return (
        <div className="dashboard">
            <SideBar />
            <div className="dashboardContainer">
                <Typography component='h1'>Dashboard</Typography>
                <div className="dashboardSummary">
                    <div className='totalAmount'>
                        <p>Total amount <br /> ₹2000</p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to='/admin/products'>
                            <p>Product</p>
                            <p>50</p>
                        </Link>

                        <Link to='/admin/orders'>
                            <p>Orders</p>
                            <p>4</p>
                        </Link>

                        <Link to='/admin/users'>
                            <p>Users</p>
                            <p>4</p>
                        </Link>
                    </div>
                </div>

                <div className="lineChart">
                    <Line
                        data={lineState}
                    />
                </div>

                <div className="donughChart">
                    <Doughnut
                        data={doughnutState}
                    />
                </div>

            </div>
        </div>
    );
}

export default DashBoard;
