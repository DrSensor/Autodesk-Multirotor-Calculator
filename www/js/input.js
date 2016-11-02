$( function() {
  var mMotor = {
    num: 4,
    Kv: 920,
    Amax: 30
  };
  var mPropeller = {
    radius: 9/2.0,
    pitch: 4,
    blade: 2,
    material: "plastic"
  };
  var mBattery = {
    num: 1,
    mAh: 5000,
    cell: 4
  };

  function updateChart() {
    var mWeight = vehicleWeightDistribution(mMotor, mPropeller, mBattery);
    updateWeightData(mWeight);
  };

  $( "#num_motor" ).spinner({
    min: 2,
    step: 1,
    change: function(event, ui) {
      mMotor.quantity = $(this).val();
      updateChart();
    }
  });
  $( "#kv_motor" ).spinner({
    min: 0,
    step: 1,
    change: function(event, ui) {
      mMotor.Kv = $(this).val();
      updateChart();
    }
  });
  $( "#Amax_esc" ).spinner({
    min: 0,
    step: 1,
    change: function(event, ui) {
      mMotor.Amax = $(this).val();
      updateChart();
    }
  });


  $( "#diameter_prop" ).spinner({
    min: 0,
    step: 0.1,
    numberFormat: "n",
    change: function(event, ui) {
      mPropeller.radius = $(this).val()/2.0;
      updateChart();
    }
  });
  $( "#pitch_prop" ).spinner({
    min: 0,
    step: 0.1,
    numberFormat: "n",
    change: function(event, ui) {
      mPropeller.pitch = $(this).val();
      updateChart();
    }
  });
  $( "#blade_prop").spinner({
    min: 2,
    step: 1,
    change: function(event, ui) {
      mPropeller.blade = $(this).val();
      updateChart();
    }
  });
  // $( "#material_prop" ).spinner({
  //   min: 2,
  //   step: 1,
  //   change: function(event, ui) {
  //     mPropeller.material = $(this).val();
  //     updateChart();
  //   }
  // });


  $( "#num_battery" ).spinner({
    min: 0,
    step: 1,
    change: function(event, ui) {
      mBattery.quantity = $(this).val();
      updateChart();

    }
  });
  $( "#mAh_battery" ).spinner({
    min: 0,
    step: 1,
    change: function(event, ui) {
      mBattery.mAh = $(this).val();
      updateChart();
    }
  });
  $( "#cell_battery" ).spinner({
    min: 1,
    step: 1,
    change: function(event, ui) {
      mBattery.cell = $(this).val();
      updateChart();
    }
  });
} );
