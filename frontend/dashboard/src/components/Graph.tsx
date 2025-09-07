
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
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
  BarElement,
  ArcElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

interface graphData{
    month: string,
    year: string,
    viewer: number
}

//const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const Graph = (props: { data: graphData[] }) => {
    const lab: string[] = [];
    const value: number[] = [];

    for(let i of props.data){
      lab.push(i.month);
      value.push(i.viewer)
    }

    const data = {
        lab,
      datasets: [
        {
          label: 'Dataset 1',
          data: value,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.1
        },

      ],
    };
    return (
      <Line options={options} data={data} />
    )
  }

export default Graph