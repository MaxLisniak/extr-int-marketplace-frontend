import { Line } from "react-chartjs-2";
import { Price } from "../../../features/types"
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PricesChart = (props: { prices: Price[] }) => {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
    },
  };
  const data = {
    labels: props.prices.map(price =>
      new Date(price.date).toDateString().split(" ").slice(1).join(" ")),
    datasets: [{
      backgroundColor: '#766ED3',
      borderColor: '#766ED3',
      data: props.prices.map(price => price.price),
    }]
  };

  return (
    <Line options={options} data={data} />
  )
}

export default PricesChart;