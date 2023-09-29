// Define the API URL
const apiUrl = 'https://api.llama.fi/summary/fees/lyra?dataType=dailyFees';

// Function to fetch data from the API and create the chart
async function fetchDataAndCreateChart() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const chartData = data.totalDataChart;

        // Extract timestamps and values
        const timestamps = chartData.map(entry => entry[0] * 1000); // Convert to milliseconds
        const values = chartData.map(entry => entry[1]);

        

        // Convert timestamps to human-readable date strings
        const dateLabels = timestamps.map(timestamp => {
            const date = new Date(timestamp);
            return date.toLocaleDateString(); // Adjust format as needed
        });

        // Get canvas element
        const ctx = document.getElementById('myChart').getContext('2d');

        // Create a Chart.js chart
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dateLabels,
                datasets: [{
                    label: 'Values',
                    data: values,
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'time', // Use time scale for x-axis
                        time: {
                            unit: 'day' // Adjust the time unit as needed
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return 'Value: ' + tooltipItem.formattedValue;
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Call the function to fetch data and create the chart
fetchDataAndCreateChart();