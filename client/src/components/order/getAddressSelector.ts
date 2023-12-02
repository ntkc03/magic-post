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


export function useAddressSelector() {
    const fetching = ({ city, district, ward }: AddressSelectorProps) => {
        const fetchData = async () => {
            try {
                const response = await axios.get<City[]>("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
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