function motorWeight(Kv) {
  if (Kv <= 500) {
    return Math.pow(10, 4.0499) * Math.pow(Kv, -0.5329);
  } else {
    return Math.pow(10, 4.4482) * Math.pow(Kv, -0.5242);
  }
}

function escWeight(Amax) {
  return 0.8421 * Amax;
}

function wiringWeight(vehicleMass) {
  return 0.05 * vehicleMass;
}


function batteryWeight(mAh, cell) {
  return (0.026373*cell + 2.0499e-05) * mAh;
}

function propellerWeight(radius, material, pitch) {
  switch (material) {
    case "wooden":
      return 0.08884*Math.pow(2*radius, 2) + pitch;
      break;
    case "plastic":
      return 0.05555*Math.pow(2*radius, 2) + 0.2216*2*radius + pitch;
      break;
    case "nylon":
      return 0.1178*Math.pow(2*radius, 2) - 0.3887*2*radius + pitch;
      break;
    case "carbon":
      return 0.1207*Math.pow(2*radius, 2) - 0.5122*2*radius + pitch;
      break;
    default:
      return 0.05555*Math.pow(2*radius, 2) + 0.2216*2*radius + pitch;
  }
}

function structuralWeight(vehicleMass) {
  return 0.19*vehicleMass;
}

function vehicleWeightDistribution(m, p, b) {
  totalMotor = m.num*motorWeight(m.Kv);
  totalPropeller = m.num*p.blade*propellerWeight(p.radius, p.material, p.pitch);
  totalESC = m.num*escWeight(m.Amax);
  totalBattery = b.num*batteryWeight(b.mAh, b.cell);
  frameWeight = (19.0/76.0) * (totalMotor+totalPropeller+totalESC+totalBattery);
  wireWeight = (5.0/19.0) * frameWeight;
  return {
    GTOW: totalMotor+totalPropeller+totalESC+totalBattery+frameWeight,
    propeller: totalPropeller,
    battery: totalBattery,
    structure: frameWeight,
    wiring: wireWeight,
    motor: totalMotor,
    esc: totalESC,
    avionics: 0
  }
}
