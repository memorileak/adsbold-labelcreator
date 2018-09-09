## Tạo và in nhãn vận đơn cho Adsbold.

### Cài đặt: 
    npm install adsbold-labelcreator

### Sử dụng:


```
const adsboldLabelcreator = require('adsbold-labelcreator');

const label = adsboldLabelcreator.createLabelWithPrintButton({
    provider_name: 'FRANK_MARTIN',
    transport_order_code: 'VT12345678',

    from_province: 'Hồ Chí Minh',
    from_district: 'Quận Thủ Đức',
    from_ward: 'Phường Bình Thọ',
    from_address: '333',
    from_name: 'Tung Nguyen',
    from_phone: '01657789900',

    weight: 1000,
    quantity: 5,
    cod: 26000,
    content: 'KHÔNG CHO XEM HÀNG',
    product_value: 5000,

    to_province: 'Hà Nội',
    to_district: 'quận Cầu Giấy',
    to_ward: 'phường Dịch Vọng Hậu',
    to_address: '144 Xuân Thủy',
    to_name: 'A Nguyen',
    to_phone: '0166765456',

    custom_logo: {
        FRANK_MARTIN: '/images/frank-martin.png',
        SLOW_DELIVER: '/images/slow-deliver.png'
    }
});
```
Phương thức `createLabelWithPrintButton` trả về một html string.\
Các trường của object truyền vào hàm phải đúng tên.\
Trường custom_logo là một object với key là tên nhà vận chuyển (`provider_name`), value là link tới logo của nhà vận chuyển.

### Migrate:
Từ phiên bản 1.1.0 trở đi, logo của các nhà vận chuyển VIETTEL, SHIPCHUNG, GHN, GHTK đã được tích hợp sẵn. Khi đặt `provider_name` là tên của một trong những nhà vận chuyển này, bạn không cần thêm `custom_logo` nữa.\
Từ phiên bản 1.2.0 trở đi, bỏ trường `service_type`.
