import axios from "axios";

export function encodeGoogleMapsURLComponent(str) {
  return str.replace(/ /g, "+");
}

export const getDistance = async (baselineAddress, destinationAddress) => {
  const apiUrl = "https://homecalculatorbackend-ni04.onrender.com/distance";
  const response = await axios.get(apiUrl, {
    params: {
      origins: baselineAddress,
      destinations: destinationAddress,
    },
  });
  
  return response;
};

export async function sendEmail(emailBody) {
  try {
    // PLEASE FIX THIS DENYS
    const apiUrl = `https://homecalculatorbackend.onrender.com/email`;
    // const apiUrl = `http://localhost:3000/email`;

    const response = await axios.post(apiUrl, emailBody);
    // 
    return response;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export const calculateCranePrice = (floorCount) => {
  // Base price for up to the 5th floor
  let basePrice = 400;

  // Price for each additional floor above the 5th floor
  const additionalPricePerFloor = 50;

  // Calculate the total price based on the floor count
  if (floorCount > 5) {
    basePrice += (floorCount - 5) * additionalPricePerFloor;
  }

  // Double the price if there are multiple points
  return basePrice;
};
