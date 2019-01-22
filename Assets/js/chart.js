new Chart(document.getElementById("summaryChart"), {
    type: 'line',
    data: {
      labels: ['00:00', '06:00', '12:00', '18:00', '23:00'],
      datasets: [{ 
          data: [1, 3, 8, 5, 2],
          yAxisID: 'temperature',
          label: "Température",
          borderColor: "#980000",
          fill: true
        }, { 
          data: [0, 2, 5, 10, 3],
          yAxisID: 'rain',
          label: "Précipitation",
          borderColor: "#030340",
          fill: true
        }
      ]
    },
    options: {
        legend:{
            display: false
        },
        title: {
            display: false,
            text: 'World population per region (in millions)'
        },
        scales: {
            yAxes: [{
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: 'left',
                id: 'temperature',
            }, {
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: 'right',
                id: 'rain',
                ticks: {
                    min: 0,
                    max: 100
                },

                // grid line settings
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            }],
        }
    }
  });
  