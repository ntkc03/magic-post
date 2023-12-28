import { Card } from "@material-tailwind/react";
import ShippingTable from "./shippingCost";

//************************************
// Description: Phần thân của trang Dịch vụ - các thông tin liên quan đến dịch vụ mà Magic Post cung cấp.
//************************************

function ServiceInfo() {
    return (
      <div className="relative overflow-hidden bg-background py-8 sm:py-12 min-h-screen">
        <div className="items-center justify-center bg-background text-center text-textColor">
            <h1 className="text-4xl sm:text-8xl font-logo">Magic Post</h1>
            <div className="mb-0">
                <img
                src="https://i.imgur.com/Jrvywgo.png"
                alt="Img"
                className="fixed top-16 left-0 w-full h-full object-cover"
                />
            </div>
            <div className="mx-[5%] lg:mx-[15%] mt-8">
                <Card className="text-left bg-white p-8 space-y-12">
                    <h1 className="text-center lg:text-[25px] mr-[1%] text-[20px] uppercase">Chuyển phát nhanh hàng hóa, tài liệu</h1>
                    <div className="text-left space-y-4 text-[15px]">
                        <h2 className="lg:text-[20px] mr-[1%] text-[15px] text-blue-700">Định nghĩa</h2>
                        <p>
                            <span className="text-blue-700 font-bold">
                                Dịch vụ chuyển phát nhanh hàng hóa, tài liệu
                            </span> là dịch vụ nhận gửi, vận chuyển và phát các loại hàng hóa, vật phẩm, tài liệu trong nước,
                            không giới hạn mức trọng lượng, theo chỉ tiêu thời gian nhanh. Bảng giá không áp dụng với các đơn hàng có thu hộ COD.
                        </p>
                    </div>

                    <div className="text-left space-y-4 text-[15px]">
                        <h2 className="lg:text-[20px] mr-[1%] text-[15px] text-blue-700">Bảng giá dịch vụ</h2>
                        <ShippingTable />
                        <div>
                            <ul style={{ listStyleType: 'disc', marginLeft: '20px', marginTop: '10px' }}>
                                <li>Áp dụng cho các khách hàng chuyển tài liệu, hàng hóa không thu hộ tiền hàng.</li>
                                <li>Từ nấc 2kg trở lên, phần lẻ được làm tròn 0,5kg để tính cước.</li>
                                <li>Cước chuyển hoàn tính bằng 50% cước chiều đi, chỉ tiêu thời gian toàn trình theo dịch vụ tiết kiệm.</li>
                                <li>Trọng lượng quy đổi theo công thức: Số đo (cm): Dài x Rộng x Cao : 5.000 = Trọng lượng kg.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-left space-y-4 text-[15px]">
                        <h2 className="lg:text-[20px] mr-[1%] text-[15px] text-blue-700">Phạm vi vận chuyển</h2>
                        <div>
                            <ul style={{ listStyleType: 'disc', marginLeft: '20px', marginTop: '10px' }}>
                                <li><span className="text-blue-700 font-bold">Nội tỉnh</span>: Là phạm vi vận chuyển đơn hàng có địa chỉ nhận và giao thuộc trong cùng 01 tỉnh.</li>
                                <li><span className="text-blue-700 font-bold">Nội miền</span>: Là địa danh có địa chỉ nhận và giao thuộc hai tỉnh khác nhau cùng trong 1 miền (Miền Bắc, Miền Trung, Miền Nam)</li>
                                <li><span className="text-blue-700 font-bold">Liên miền</span>: Là địa danh các bưu phẩm có địa chỉ nhận tại các tỉnh miền Bắc giao tại các tỉnh miền Nam và ngược lại.</li>
                            </ul>
                        </div>
                        <table className="border-collapse border border-blue-700 lg:mx-[10%] mx-0">
                            <thead className="bg-blue-500">
                            <tr>
                                <th colSpan={2} className="text-center border border-blue-700 px-4 py-2 text-white">Định danh theo miền</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-blue-700 px-4 py-2" style={{ width: '20%' }}>Miền Bắc <br />(28 tỉnh)</td>
                                    <td className="border border-blue-700 px-4 py-2">Bắc Cạn, Cao Bằng, Hà Giang, Lạng Sơn, Tuyên Quang, Điện Biên, Lào Cai, Lai Châu, Phú Thọ, Sơn La, Yên Bái, Bắc Giang, Thái Nguyên, Vĩnh Phúc, Bắc Ninh, Hòa Bình, Hải Dương, Hà Nam, Hải Phòng, Hưng Yên, Nam Định, Ninh Bình, Quảng Ninh, Thái Bình, Hà Nội, Hà Tĩnh, Nghệ An, Thanh Hóa.</td>
                                </tr>
                                <tr>
                                    <td className="border border-blue-700 px-4 py-2">Miền Trung <br />(11 tỉnh)</td>
                                    <td className="border border-blue-700 px-4 py-2">Quảng Bình, Quảng Trị, Thừa Thiên-Huế, Đà Nẵng, Quảng Nam, Quảng Ngãi, Kon Tum, Gia Lai, Khánh Hòa, Phú Yên, Bình Định.</td>
                                </tr>
                                <tr>
                                    <td className="border border-blue-700 px-4 py-2">Miền Nam <br />(24 tỉnh)</td>
                                    <td className="border border-blue-700 px-4 py-2">Bình Thuận, Ninh Thuận, Đắk Lắk, Lâm Đồng, Bình Dương, Bình Phước, Bến Tre, Đắk Nông, Đồng Nai, Long An, Tiền Giang, Tây Ninh, Bà Rịa-Vũng Tàu, Hồ Chí Minh, Trà Vinh, Vĩnh Long, An Giang, Bạc Liêu, Cà Mau, Cần Thơ, Đồng Tháp, Hậu Giang, Kiên Giang, Sóc Trăng.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>



      </div>
    );
  }
  
  export default ServiceInfo;