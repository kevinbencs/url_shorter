
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Click/month',
    },
  },
};

interface graphData {
  date: string,
  viewer: number
}

//const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const Graph = (props: { data: graphData[] }) => {
  const lab: string[] = [];
  const value: number[] = [];

  for(let i of props.data){
    lab.push(i.date);
    value.push(i.viewer)
  }


  const data = {
    labels:lab,
    datasets: [
      {
        label: 'Click/month',
        data: value,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1
      },

    ],
  };
  return (
    <Line options={options} data={data} className="mb-2"/>
  )
}

export default Graph