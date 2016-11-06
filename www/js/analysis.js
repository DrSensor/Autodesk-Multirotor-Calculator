var weightChart;
var flightChart;

function initCalc() {
  var weightCtx = $("#weightChart");
  var flightCtx = $("#flightChart");

  weightChart = new Chart(weightCtx, {
    type: 'doughnut',
    scaleOverride:true,
    options: {
        elements: {
            center: {
                // the longest text that could appear in the center
                fontColor: '#FF6684',
                fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                fontStyle: 'normal',
                // fontSize: 12,
                // if a fontSize is NOT specified, we will scale (within the below limits) maxText to take up the maximum space in the center
                // if these are not specified either, we default to 1 and 256
                minFontSize: 1,
                maxFontSize: 256,
            }
        }
    },
    data: {
      labels: [
        "motor",
        "esc",
        "battery",
        "frame",
        "wiring",
        "payload",
        "propeller"
      ],
      datasets: [
        {
          data: [20, 8.1, 42.2, 20.5, 3.8, 4, 1.5],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#993399",
            "#3399ff",
            "#ff66ff",
            "#33cc33"

          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#993399",
            "#3399ff",
            "#ff66ff",
            "#33cc33"
          ]
        }]
      }
    });

    var flightChart = new Chart(flightCtx, {
      type: 'line',
      scaleOverride:true,
      data: {
        // labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [{
              x: -10,
              y: 0
            }, {
              x: 0,
              y: 10
            }, {
              x: 10,
              y: 5
            }],
            spanGaps: false
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom'
          }]
        }
      }
    });

}

function updateWeightData(object) {
  // switch (object) {
    // case "Motors":
      weightChart.data.datasets[0].data[0] = object.motor;
      // break;
    // case "ESCs":
      weightChart.data.datasets[0].data[1] = object.esc;
      // break;
    // case "Batteries":
      weightChart.data.datasets[0].data[2] = object.battery;
      // break;
    // case "Structural":
      weightChart.data.datasets[0].data[3] = object.structure;
      // break;
    // case "Wiring":
      weightChart.data.datasets[0].data[4] = object.wiring;
      // break;
    // case "Avionics":
      weightChart.data.datasets[0].data[5] = object.avionics;
      // break;
    // case "Propellers":
      weightChart.data.datasets[0].data[6] = object.propeller;
      // break;
    // default:
  // }
  var total = 0;
  for (var i = 0; i < weightChart.data.datasets[0].data.length; i++) {
    total += weightChart.data.datasets[0].data[i];
  }
  weightChart.options.elements.center.text = (total).toFixed(2) + " gr";
  $('#totalweight').text(total);
  weightChart.update();
}

var fligthIdx = 0;
function insertFlightData(time, load) {
  flightChart.data.datasets[0].data[fligthIdx].x = load;
  flightChart.data.datasets[0].data[fligthIdx].y = time;
  flightChart.update();
  fligthIdx += 1;
}

function clearFlightData() {
  flightChart.data.datasets[0].data = [{
    x: 0,
    y: 0
  }];
}

function respondCanvas() {
  c.attr('width', jQuery("#weightChart").width());
  c.attr('height', jQuery("#weightChart").height());
  weightChart.update();

  c.attr('width', jQuery("#flightChart").width());
  c.attr('height', jQuery("#flightChart").height());
  flightChart.update();
}

$(document).ready(function () {
    initCalc();
    $(window).resize(respondCanvas);
});
