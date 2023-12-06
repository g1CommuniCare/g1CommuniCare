import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { useEffect, useState } from 'react';

Chart.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ data }) => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  
  useEffect(() => {
    // Set the data for the pie chart
    setChartData({
      datasets: [
        {
          data: data,
          backgroundColor: ['#22f200', '#ff9f2e', '#ff6363'],
          borderWidth: 6,
        }
      ],
    });
  }, [data]);

  return (
    <div className="p-2">
      <div className="w-48 h-48"> {/* Adjust width and height classes as needed */}
        <Pie data={chartData} />
      </div>
    </div>
  );
};

PieChartComponent.propTypes = {
  data: PropTypes.array.isRequired, // Validate that 'data' prop is an array and is required
};

export default PieChartComponent;
