import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

interface Ward {
    Name: string;
    Id: string;
    // Add other properties if needed
}

interface District {
    Name: string;
    Id: string;
    Wards: Ward[];
    // Add other properties if needed
}

interface City {
    Name: string;
    Id: string;
    Districts: District[];
    // Add other properties if needed
}


interface City {
    Name: string;
    Id: string;
  }
  
  export async function costCalcu(
    senderCity: string,
    receiverCity: string,
    totalWeight: number
  ): Promise<{ totalFee: number; estimatedTime: number }> {
    try {
      const apiUrl = 'https://api.npoint.io/78054097cc581e7db9eb';
      const data = await fetch(apiUrl).then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch the file. Status: ${res.status}`);
        }
        return res.json();
      });
  
      if (senderCity !== '' && receiverCity !== '') {
        let feeData;
        if (String(senderCity) === String(receiverCity)) {
          feeData = data['01'];
        } else {
 
          if (senderCity && receiverCity) {
            if (
              (senderCity < '38' && receiverCity < '38') ||
              (senderCity > '68' && receiverCity > '68') ||
              ((senderCity >= '38' && senderCity <= '68') &&
                (receiverCity >= '38' && receiverCity <= '68'))
            ) {
              feeData = data['02'];
            } else {
              feeData = data['03'];
            }
          }
        }
  
        const { updatedEstimatedTime, updatedTotalFee } = fee(feeData, totalWeight);
  
        console.log('After Fetch: updatedTotalFee and updatedEstimatedTime', updatedTotalFee, updatedEstimatedTime);
        return { totalFee: updatedTotalFee, estimatedTime: updatedEstimatedTime };
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
    return { totalFee: 0, estimatedTime: 0 }; // Default values in case of error
  }
  
  const fee = (data: any, totalWeight: number) => {
    let updatedEstimatedTime = data['estimate-time'];
    let updatedTotalFee = 0;
    if (totalWeight < 50 && totalWeight > 0) {
      updatedTotalFee = data.pricing[0];
    } else if (totalWeight < 100) {
      updatedTotalFee = data.pricing[1];
    } else if (totalWeight < 250) {
      updatedTotalFee = data.pricing[2];
    } else if (totalWeight < 500) {
      updatedTotalFee = data.pricing[3];
    } else if (totalWeight < 1000) {
      updatedTotalFee = data.pricing[4];
    } else if (totalWeight < 1500) {
      updatedTotalFee = data.pricing[5];
    } else if (totalWeight < 2000) {
      updatedTotalFee = data.pricing[6];
    } else {
      let fee = data.pricing[6];
      let weight = totalWeight - 2000;
      let count = Math.ceil(weight / 500.0);
      fee += data.pricing[7] * count;
      updatedTotalFee = fee;
    }
  
    return { updatedEstimatedTime, updatedTotalFee };
  };