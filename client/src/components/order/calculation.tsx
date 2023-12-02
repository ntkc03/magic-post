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

export function costCalcu() {
    const costCalculation = (senderCity: HTMLSelectElement | null,
                             receiverCity: HTMLSelectElement | null,
                             totalWeight: number,
                             estimatedTime: number,
                             totalFee: number) => {
        const fetchData = async () => {
            try {
                console.log("First:" + estimatedTime)
                const response = await axios.get<City[]>("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
                const apiUrl = "https://api.npoint.io/78054097cc581e7db9eb";
                try {
                    fetch(apiUrl)
                        .then(res => {
                            if (!res.ok) {
                                throw new Error(`Failed to fetch the file. Status: ${res.status}`);
                            }
                            return res.json();
                        })
                        .then(data => {
                            console.log(typeof senderCity?.value)
                            if(senderCity&&receiverCity&&senderCity?.value!==""&&receiverCity?.value!=="") {
                                if (String(senderCity?.value) === String(senderCity?.value)) {
                                    fee(data["01"], estimatedTime, totalWeight, totalFee);
                                } else {
                                    const cityData = response.data;
                                    const sender = cityData.find(city => city.Name === senderCity.value);
                                    const receiver = cityData.find(city => city.Name === receiverCity.value);
        
                                    if(sender&&receiver) {
                                        if ((sender.Id < "38" && receiver.Id < "38") || (sender.Id > "68" && receiver.Id > "68") ||
                                            ((sender.Id >= "38" && sender.Id <= "68") && (receiver.Id >= "38" && receiver.Id <= "68"))) {
                                                
                                            fee(data["02"], estimatedTime, totalWeight, totalFee);
                                        } else {
                                            fee(data["03"], estimatedTime, totalWeight, totalFee);
                                        }
                                    }
                                }
                            }
                            
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });   
                } catch (error) {
                    console.error('Error:', error);
                }
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        const fee = (data: any, estimatedTime: number, totalWeight: number, totalFee: number) => {
            
            estimatedTime = data["estimate-time"];
            if (totalWeight < 50 && totalWeight > 0){
                totalFee = data.pricing[0];
            } else if (totalWeight < 100) {
                totalFee = data.pricing[1];
            } else if (totalWeight < 250) {
                totalFee = data.pricing[2];
            } else if (totalWeight < 500) {
                totalFee = data.pricing[3];
            } else if (totalWeight < 1000) {
                totalFee = data.pricing[4];
            } else if (totalWeight < 1500) {
                totalFee = data.pricing[5];
            } else if (totalWeight < 2000) {
                totalFee = data.pricing[6];
            } else {
                var fee = data.pricing[6];
                var weight = totalWeight - 2000;
                var count = Math.ceil(weight / 500.0);
                fee += data.pricing[7] * count;
                totalFee = fee;
            }
            console.log("After: " + estimatedTime)
        }
    }

    return {costCalculation}
    
}

