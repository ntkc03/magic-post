import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

//************************************
// Description: Phần bộ tải options cho selector của địa chỉ theo tỉnh/thành phố, quận/huyện, phường/xã.
// Bước 1: Lấy dữ liệu từ api và lưu vào một mảng City[]
// Bước 2: Thêm options cho city
// Bước 3: Dựa vào city, thêm options cho district
// Bước 4: Dựa vào district, thêm options cho wards.
//************************************

interface Ward {
    Name: string;
    Id: string;
}

interface District {
    Name: string;
    Id: string;
    Wards: Ward[];
}

interface City {
    Name: string;
    Id: string;
    Districts: District[];
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
                    city.options[city.options.length] = new Option(x.Name, x.Name);
                }
            }
            
        };
    
        const addCityChangeListener = (data: City[]) => {
            if (city){
                city.onchange = function (this: HTMLSelectElement) {
                    clearOptions(district);
                    clearOptions(ward);
                    if (this.value !== "") {
                        const selectedCity = data.find(city => city.Name === this.value);
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
                    district.options[district.options.length] = new Option(d.Name, d.Name);
                }
                district.onchange = function (this: HTMLSelectElement) {
                    clearOptions(ward);
                    const selectedDistrict = districts.find(d => d.Name === this.value);
                    if (selectedDistrict) {
                        addWardOptions(selectedDistrict.Wards);
                        
                    }
                }.bind(district);
            }
        };
    
        const addWardOptions = (wardsData: Ward[]) => {
            if (ward) 
            for (const w of wardsData) {
                ward.options[ward.options.length] = new Option(w.Name, w.Name);
            }
        };
    } 

    return {fetching}
}