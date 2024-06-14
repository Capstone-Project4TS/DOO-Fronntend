import React, { useEffect, useRef } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import UserName from '../components/UserName';
import SideBar from '../components/SideBar';
import ReportHead from '../components/ReportHead';

import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables, ChartType } from 'chart.js';

Chart.register(...registerables);

const sampleData = {
  activeUsers: [
    { month: '2024-01', count: 5 },
    { month: '2024-02', count: 8 },
    { month: '2024-03', count: 7 },
    { month: '2024-04', count: 6 },
    { month: '2024-05', count: 9 },
    { month: '2024-06', count: 12 }
  ],
  documentCreation: [
    { month: '2024-01', count: 15 },
    { month: '2024-02', count: 20 },
    { month: '2024-03', count: 25 },
    { month: '2024-04', count: 22 },
    { month: '2024-05', count: 27 },
    { month: '2024-06', count: 30 }
  ],
  workflowInitiation: [
    { template: 'Loan Application', count: 10 },
    { template: 'Account Opening', count: 15 },
    { template: 'Insurance Claim', count: 8 },
    { template: 'Investment Plan', count: 12 }
  ]
};

interface GraphData {
  month?: string;
  template?: string;
  count: number;
}

interface ChartColors {
  borderColor: string;
  backgroundColor: string | string[];
  hoverBackgroundColor?: string;
}

interface BarGraphProps {
  data: GraphData[];
  label: string;
  colors: ChartColors;
}

interface PieGraphProps {
  data: GraphData[];
  label: string;
  colors: ChartColors;
}

const BarGraph: React.FC<BarGraphProps> = ({ data, label, colors }) => {
  const chartRef = useRef<Chart.Chart | null>(null);

  useEffect(() => {
    if (data.length > 0 && chartRef.current) {
      const ctx = chartRef.current.ctx;
      if (ctx) {
        const chartData = {
          labels: data.map(d => new Date(d.month ?? '').toLocaleString('default', { month: 'short' }) || d.template),
          datasets: [
            {
              label: label,
              data: data.map(d => d.count),
              borderColor: colors.borderColor,
              backgroundColor: colors.backgroundColor,
              borderWidth: 1,
              borderRadius: 10, // Round bars
              hoverBackgroundColor: colors.hoverBackgroundColor,
            }
          ]
        };
        const options = {
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(200, 200, 200, 0.3)'
              }
            },
            x: {
              grid: {
                color: 'rgba(200, 200, 200, 0.3)'
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                color: colors.borderColor,
                font: {
                  size: 14
                }
              }
            }
          }
        };
        new Chart(ctx, {
          type: 'bar' as ChartType,
          data: chartData,
          options: options,
        });
      }
    }
  }, [data, label, colors]);

  return <Bar ref={chartRef} />;
};

const PieGraph: React.FC<PieGraphProps> = ({ data, label, colors }) => {
  const chartRef = useRef<Chart.Chart | null>(null);

  useEffect(() => {
    if (data.length > 0 && chartRef.current) {
      const ctx = chartRef.current.ctx;
      if (ctx) {
        const chartData = {
          labels: data.map(d => d.template),
          datasets: [
            {
              label: label,
              data: data.map(d => d.count),
              borderColor: colors.borderColor,
              backgroundColor: colors.backgroundColor,
              borderWidth: 1,
            }
          ]
        };
        const options = {
          plugins: {
            legend: {
              display: true,
              position: 'right',
              labels: {
                color: colors.borderColor,
                font: {
                  size: 14
                }
              }
            }
          }
        };
        new Chart(ctx, {
          type: 'pie' as ChartType,
          data: chartData,
          options: options,
        });
      }
    }
  }, [data, label, colors]);

  return <Pie ref={chartRef} />;
};

export const Route = createLazyFileRoute('/report')({
  component: () => (
    <div>
      <div className='flex gap-10'>
        <div className='fixed top-0 left-0'> <SideBar/></div>
        <div className=''><UserName /></div>
        <div className='className=" ml-44 mr-2" '>
          <div className='mt-28'>
            <ReportHead/>
            <ReportMiddle sampleData={sampleData} />
          </div>
        </div>
      </div>
    </div>
  )
});
