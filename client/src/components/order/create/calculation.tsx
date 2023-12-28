//************************************
// Description: Hàm tính toán chi phí và thời gian dự kiến dựa trên tỉnh/thành phố gửi/nhân và khối lượng của hàng hóa.
// Input: Hai chuỗi chứa tỉnh/thành phố gửi/nhận và một biến number chứa khối lượng của hàng hóa cần gửi
// Output: Chi phí và thời gian dự kiến vận chuyển.
//************************************

  export async function costCalcu(
    senderCity: string,
    receiverCity: string,
    totalWeight: number
  ): Promise<{ totalFee: number; estimatedTime: number }> {
    try {
      // Bước 1: Lấy dữ liệu về giá cước và thời gian vận chuyển dự kiến theo từng loại khu vực 
      // (nội tỉnh, nội miền, liên miền) vận chuyển trên api và lưu vào data.
      const apiUrl = 'https://api.npoint.io/78054097cc581e7db9eb';
      const data = await fetch(apiUrl).then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch the file. Status: ${res.status}`);
        }
        return res.json();
      });
  
      // Bước 2: Bộ tính toán.
      if (senderCity !== '' && receiverCity !== '') {
        let feeData;
        // Nếu cùng tỉnh/thành phố (nội tỉnh)
        if (String(senderCity) === String(receiverCity)) {
          feeData = data['01'];
        } else {
          if (senderCity && receiverCity) {
            // Nội tỉnh
            // Nếu cùng miền Bắc (id cùng nhỏ hơn 38)
            // Nếu cùng miền Nam (id lớn hơn 68)
            // Nếu cùng miền cùng (id cùng trong khoảng 38 - 68)
            if (
              (senderCity < '38' && receiverCity < '38') ||
              (senderCity > '68' && receiverCity > '68') ||
              ((senderCity >= '38' && senderCity <= '68') &&
                (receiverCity >= '38' && receiverCity <= '68'))
            ) {
              feeData = data['02'];
              // Còn lại là loại hình liên miền
            } else {
              feeData = data['03'];
            }
          }
        }

        // Gọi hàm tính toán 
        const { updatedEstimatedTime, updatedTotalFee } = fee(feeData, totalWeight);
        return { totalFee: updatedTotalFee, estimatedTime: updatedEstimatedTime };
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
    return { totalFee: 0, estimatedTime: 0 }; // Đặt giá trị mặc định
  }
  
  // Hàm tính toán chi phí và thời gian dự kiến dựa trên loại hình khu vực và khối lượng của hàng hóa.
  const fee = (data: any, totalWeight: number) => {
    let updatedEstimatedTime = data['estimate-time'];
    let updatedTotalFee = 0;

    // Tương ứng với từng khoảng khối lượng, lấy giá tiền theo chúng.
    if (totalWeight <= 50 && totalWeight > 0) {
      updatedTotalFee = data.pricing[0];
    } else if (totalWeight <= 100) {
      updatedTotalFee = data.pricing[1];
    } else if (totalWeight <= 250) {
      updatedTotalFee = data.pricing[2];
    } else if (totalWeight <= 500) {
      updatedTotalFee = data.pricing[3];
    } else if (totalWeight <= 1000) {
      updatedTotalFee = data.pricing[4];
    } else if (totalWeight <= 1500) {
      updatedTotalFee = data.pricing[5];
    } else if (totalWeight <= 2000) {
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