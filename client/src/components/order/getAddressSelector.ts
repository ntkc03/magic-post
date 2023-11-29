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

interface AddressSelectorProps {
    city: HTMLSelectElement | null ;
    district: HTMLSelectElement | null ;
    ward: HTMLSelectElement | null;
}

export function costCalcu() {
    const costCalculation = (senderCity: HTMLSelectElement | null,
                             receiverCity: HTMLSelectElement | null,
                             totalWeight: HTMLElement | null,
                             estimatedTime: HTMLElement | null,
                             totalFee: HTMLElement | null) => {
        const fetchData = async () => {
            try {
                const response = await axios.get<City[]>("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
                const apiUrl = "./public/data/pricing.json";
                fetch(apiUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        if(senderCity&&receiverCity&&totalWeight&&estimatedTime&&totalFee) {
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
                        console.log('There was a problem with the fetch operation:', error.message);
                    });
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        const fee = (data: any, estimatedTime: HTMLElement | null, totalWeight: HTMLElement | null, totalFee: HTMLElement | null) => {
            if (estimatedTime&&totalWeight&&totalFee) {
                estimatedTime.innerText = data["estimate-time"];
                if (parseInt(totalWeight?.innerText, 10) < 50){
                    totalFee.innerText = data.pricing[0];
                } else if (parseInt(totalWeight?.innerText, 10) < 100) {
                    totalFee.innerText = data.pricing[1];
                } else if (parseInt(totalWeight?.innerText, 10) < 250) {
                    totalFee.innerText = data.pricing[2];
                } else if (parseInt(totalWeight?.innerText, 10) < 500) {
                    totalFee.innerText = data.pricing[3];
                } else if (parseInt(totalWeight?.innerText, 10) < 1000) {
                    totalFee.innerText = data.pricing[4];
                } else if (parseInt(totalWeight?.innerText, 10) < 1500) {
                    totalFee.innerText = data.pricing[5];
                } else if (parseInt(totalWeight?.innerText, 10) < 2000) {
                    totalFee.innerText = data.pricing[6];
                } else {
                    
                }
            }
        }
    }
    
}
export function useAddressSelector() {
    const fetching = ({ city, district, ward }: AddressSelectorProps) => {
        const fetchData = async () => {
            try {
                const response = await axios.get<City[]>("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
                console.log(response.data)
                renderCity(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        const renderCity = (data: City[]) => {
            clearOptions(city);
            clearOptions(district);
            clearOptions(ward);
            addCityOptions(data);
            addCityChangeListener(data);
        };
    
        const clearOptions = (selectElement: HTMLSelectElement | null) => {
            if (selectElement) {
                selectElement.length = 1; // Setting length to 1 removes all options except the default one
            }
        };
    
        const addCityOptions = (data: City[]) => {
            if (city) {
                for (const x of data) {
                    city.options[city.options.length] = new Option(x.Name, x.Id);
                }
            }
            
        };
    
        const addCityChangeListener = (data: City[]) => {
            if (city){
                city.onchange = function (this: HTMLSelectElement) {
                    clearOptions(district);
                    clearOptions(ward);
                    if (this.value !== "") {
                        const selectedCity = data.find(city => city.Id === this.value);
                        if (selectedCity) {
                            addDistrictOptions(selectedCity.Districts);
                        }
                    }
                }.bind(city);
            }
        };
    
        const addDistrictOptions = (districts: District[]) => {
            if(district){
                for (const d of districts) {
                    district.options[district.options.length] = new Option(d.Name, d.Id);
                }
                district.onchange = function (this: HTMLSelectElement) {
                    clearOptions(ward);
                    const selectedDistrict = districts.find(d => d.Id === this.value);
                    if (selectedDistrict) {
                        addWardOptions(selectedDistrict.Wards);
                        
                    }
                }.bind(district);
            }
        };
    
        const addWardOptions = (wardsData: Ward[]) => {
            if (ward) 
            for (const w of wardsData) {
                ward.options[ward.options.length] = new Option(w.Name, w.Id);
            }
        };
    } 

    return {fetching}
}