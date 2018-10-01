const qrcode = require('yaqrcode');
const logo = require('./logo.json');
const ioBarcode = require('io-barcode');
/**
 * @param OrderData: contains all data passing into function to create the label
 * The OrderData including:
 *  - provider_name
 *  - transport_order_code
 *  - service_type
 *
 *  - from_province
 *  - from_district
 *  - from_ward
 *  - from_address
 *  - from_name
 *  - from_phone
 *
 *  - weight
 *  - quantity
 *  - cod
 *  - content
 *  - product_value
 *
 *  - to_province
 *  - to_district
 *  - to_ward
 *  - to_address
 *  - to_name
 *  - to_phone
 *  
 *  - custom_logo (is an object which contains provider_name as keys and the correspond values is a link to proivder logo)
 */
module.exports = (function () {
    return (
        {
            createLabelWithPrintButton: function (OrderData) {
                const customLogoURL = OrderData.custom_logo && OrderData.custom_logo[OrderData.provider_name]
                    ? OrderData.custom_logo[OrderData.provider_name]
                    : '#';
                const logoURL = logo && logo[OrderData.provider_name]
                    ? logo[OrderData.provider_name]
                    : customLogoURL;
                const qrcodeStr = qrcode(OrderData.transport_order_code);
                const canvas = ioBarcode.CODE128B(OrderData.transport_order_code, {
                    width: 2,
                    height: 10
                });
                const barcodeStr = canvas.toDataURL("image/png");
                return (`
                    <html>
                    <head>
                        <title>Order label</title>
                        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" type="text/css">
                        <style type="text/css">
                            .font-bold {
                                font-weight: bold;
                            }
                            .from-info {
                                padding: 10px 5px;
                            }
                            .to-info {
                                padding: 10px 5px;
                            }
                            .pack-info-grid {
                                display: grid;
                                grid-template-columns: auto 100px;
                                grid-template-rows: auto;
                                border-top: 1px solid black;
                                border-bottom: 1px solid black;
                                min-height: 120px;
                            }
                            .pack-info-grid .item1{
                                padding: 10px 0px 10px 5px;
                            }
                            .pack-info-grid .item2{
                                
                            }
                            .service-grid {
                                display: grid;
                                grid-template-columns: 263px auto;
                                grid-template-rows: 55px;
                                border-bottom: 1px solid black;
                            }
                            .service-grid .item1 {
                                display: flex;
                                align-items: center;
                                padding-left: 5px;
                            }
                            .service-grid .item2 {
                                display: flex;
                                align-items: center;
                            }
                            body {
                                font-family: "open sans", Helvetica, Verdana, Arial, sans-serif;
                                font-size: 14px;
                                color: #58666e;
                                background-color: transparent;
                                -webkit-font-smoothing: antialiased;
                                line-height: 1.42857143;
                            }
                    
                            @page {
                                size: A5 portrait;
                            }
                    
                            .mainPrints {
                                max-height: 20cm;
                                margin: 0 10px;
                                background: white;
                            }
                    
                            .page {
                                width: 14.8cm;
                                height: 20.0cm;
                                margin: 0 auto;
                                background-color: #FFF;
                                color: #000;
                            }
                    
                            @page {
                                margin: 0;
                            }
                    
                            body {
                                font-size: 13px;
                                background-color: #FFF;
                            }
                            
                            .mainPrints {
                    
                                width: 120mm !important;
                                height: 195mm;
                                margin: 0;
                                padding: 0;
                                margin-top: 15px;
                                max-height: 535px;
                            }
                    
                            @media print {
                                body {
                                    font-family: "open sans", Helvetica, Verdana, Arial, sans-serif;
                                }
                            }
                    
                            * {
                                box-sizing: border-box;
                                font-family: "open sans", Helvetica, Verdana, Arial, sans-serif;
                            }
                    
                            body {
                                margin: 0 auto;
                                padding: 0;
                                box-sizing: border-box;
                                font-family: "open sans", Helvetica, Verdana, Arial, sans-serif;
                                -webkit-font-smoothing: antialiased;
                            }
                    
                            .clearfix:after {
                                content: "";
                                clear: both;
                                display: table;
                            }
                    
                            #table-box {
                    
                                width: 100% !important;
                                border: 1px solid #000;
                            }
                    
                            .tb-header1 {
                                border-bottom: 1px solid #000;
                            }
                    
                            .tb-header1 .col {
                                width: 50%;
                                float: left;
                                text-align: center;
                                min-height: 50px;
                            }
                    
                            .tb-header1 .col span {
                                display: block;
                            }
                    
                            .tb-header1 .col:nth-child(1) {
                                border-right: 2px solid #000;
                                padding: 10px 50px;
                            }
                    
                            .tb-header1 .col:nth-child(1) span {
                                font-size: 20px;
                                font-weight: bold;
                                padding-top: 5px;
                                padding-bottom: 5px;
                            }
                    
                            .dichvu {
                                padding-top: 7px
                            }
                    
                            .tb-header1 .col + .col span {
                                font-weight: bold;
                                font-size: 20px;
                                border-right: 2px solid #000;
                            }
                    
                            .tb-header1 .col:last-child span {
                                border: none;
                            }
                    
                            .tb-header3 {
                                border-bottom: 1px solid #000;
                                padding-top: 3px;
                            }
                    
                            .tb-header3 .pic {
                                text-align: center;
                                height: auto;
                            }
                    
                            .tb-header3 .pic img {
                                width: 100%;
                            }
                    
                            .tb-header3 .price {
                                font-weight: bold;
                                font-size: 18px;
                                text-align: center;
                                position: relative;
                            }
                    
                            .tb-header3 .price span {
                                font-size: 14px;
                                position: absolute;
                                bottom: 0;
                                left: 4px;
                            }
                            
                            .tb-header4 .col {
                                width: 50%;
                                padding: 0px 0 0px 5px;
                                border-left: 2px solid #000;
                                float: left;
                            }
                    
                            .tb-header4 .col dl dt {
                                min-width: 50px;
                                float: left;
                            }
                    
                            .tb-header4 .col dl dd {
                                min-width: 50px;
                                float: left;
                            }
                    
                            .tb-header4 .col:nth-child(1) {
                    
                                border: none;
                                font-size: 13px;
                                margin-bottom: 0;
                            }
                    
                            .tb-header3 .pic {
                                margin: 5px 10px 1px 10px !important;
                            }
                    
                            .tb-header3 .pic img {
                                width: 432px !important;
                                height: 50px !important;
                            }
                    
                            .tb-header4 .col-65 {
                                width: 68%;
                                padding: 0px 0 0px 5px;
                                border-left: 2px solid #000;
                                float: left;
                            }
                    
                            .tb-header4 .col-65 dl dt {
                                min-width: 50px;
                                float: left;
                            }
                    
                            .tb-header4 .col-65 dl dd {
                                min-width: 50px;
                                float: left;
                            }
                    
                            .tb-header4 .col-65:nth-child(1) {
                    
                                border: none;
                                font-size: 13px;
                                margin-bottom: 0;
                            }
                    
                            .tb-header4 .col-65:nth-child(1) dl {
                                font-size: 13px;
                            }
                    
                            .tb-header4 .col-65:nth-child(1) dl dd {
                                font-weight: bold;
                            }
                    
                            .tb-header4 .col-35 {
                                width: 32%;
                                padding: 0px 10px 0px 10px;
                                border-left: 2px solid #000;
                                float: left;
                            }
                    
                            .tb-header4 .col-35 dl dt {
                                min-width: 50px;
                                float: left;
                            }
                    
                            .tb-header4 .col-35 dl dd {
                                min-width: 50px;
                                float: left;
                            }
                    
                            .tb-header4 .col-35:nth-child(1) {
                    
                                border: none;
                                font-size: 13px;
                                margin-bottom: 0;
                            }
                    
                            .tb-header4 .col-35:nth-child(1) dl {
                                font-size: 13px;
                            }
                    
                            .tb-header4 .col-35:nth-child(1) dl dd {
                                font-weight: bold;
                            }
                    
                            .tracking_code {
                                font-size: 19px;
                            }
                    
                            .dress dl * {
                                display: inline-block;
                                vertical-align: middle;
                                padding-left: 3px;
                                white-space: inherit !important;
                            }
                    
                            .dress dl dd {
                                font-size: 14px;
                                padding-left: 5px;
                                font-weight: bold;
                            }
                    
                            .code {
                                margin-top: 10px;
                                margin-bottom: 10px;
                            }
                    
                            .chuky {
                                padding-top: 5px !important;
                                height: 75px;
                            }
                    
                            .code .left {
                                width: 50%;
                                float: left;
                                padding: 0px 0 0 20px;
                            }
                    
                            .code .left .title {
                                font-size: 24px;
                                font-weight: bold;
                                /*margin-bottom: 5px;*/
                            }
                    
                            .code .right {
                                text-align: center;
                                width: 50%;
                                float: left;
                                /* margin-top: 10px;*/
                            }
                    
                            .code .right .pic {
                                width: 80px;
                                margin: auto;
                                height: auto;
                            }
                    
                            .code .right .pic img {
                                width: 100%;
                            }
                    
                            .code .right .number {
                                font-size: 12px;
                                letter-spacing: 1px;
                            }
                    
                            dl {
                                margin-bottom: 0 !important;
                                margin: 0 !important;
                                /* line-height: 25px; */
                                display: initial;
                            }
                    
                            dl * {
                                display: initial;
                            }
                    
                            p {
                                margin: 0 0 10px;
                            }
                    
                            dd {
                                margin-left: 0;
                            }
                    
                            dt, dd {
                                line-height: 1.42857143;
                            }
                    
                            @media print {
                                .print_td2, .print_td, .print_td3, .print_dichvu {
                                    font-size: 12px;
                                }
                    
                                body {
                                    font-size: 12px;
                                }
                    
                                .page {
                                    margin: 15px;
                                    border: initial;
                                    border-radius: initial;
                                    width: initial;
                                    min-height: initial;
                                    box-shadow: initial;
                                    background: initial;
                    
                                }
                    
                                .settings {
                                    display: none !important;
                                }
                    
                                #livechat-compact-container {
                                    display: none !important;
                                }
                    
                                .page_break {
                                    page-break-after: always !important;
                                }
                            }
                    
                            .settings {
                                z-index: 1050;
                                position: fixed;
                                top: 40px;
                                right: 40px;
                                width: 240px;
                                -webkit-transition: right .2s;
                                transition: right .2s;
                            }
                    
                            .panel-default {
                                border-color: #dee5e7;
                            }
                    
                            .panel {
                                border-radius: 2px;
                            }
                    
                            .bg-primary {
                                color: white;
                                background-color: #18a689;
                                border-color: #18a689;
                            }
                    
                            .btn {
                                font-weight: 500;
                                border-radius: 4px;
                            }
                    
                            .btn, :focus {
                                outline: 0 !important;
                            }
                    
                            .btn {
                                padding: 6px 12px;
                                margin-bottom: 0;
                                font-size: 14px;
                                line-height: 1.42857143;
                                text-align: center;
                                white-space: nowrap;
                                cursor: pointer;
                                -webkit-user-select: none;
                                -moz-user-select: none;
                                -ms-user-select: none;
                                user-select: none;
                                border: 1px solid transparent;
                                border-right-width: 1px;
                                border-top-color: transparent;
                                border-right-color: transparent;
                                border-bottom-color: transparent;
                                border-left-color: transparent;
                            }
                    
                            .btn, .checkbox-inline, .radio-inline {
                                display: inline-block;
                                vertical-align: middle;
                            }
                    
                            .settings > .btn_print {
                                top: -1px;
                            }
                    
                            .settings > .btn_print, .settings > .btn_type {
                                border-right-width: 0;
                                position: absolute;
                                padding: 10px 15px;
                                border-color: #dee5e7;
                            }
                        </style>
                        <meta http-equiv="Content-type" content="text/html; charset=utf-8">
                    </head>
                    <body>
                        <div class="page">
                            <div class="mainPrints" style="max-width:95%;float:left;margin-left:35px;    margin-top: 40px;">
                                <div>
                                    <div>
                                        <div id="table-box">
                                            <div class="tb-header1 clearfix">
                                                <div class="col">
                                                    <img style="width: 100%;height:34px" src="${logoURL}">
                                                </div>
                                                <div class="col">
                                                    <div class="dichvu">Tỉnh phát</div>
                                                    <span>${OrderData.to_province}</span></div>
                                            </div>
                                            <div class="service-grid">
                                                <div class="item1">
                                                    <div>
                                                        ${
                                                            OrderData.service_type 
                                                            ? `<div>Dịch vụ:<span style="font-size: 14px" class="font-bold"> ${OrderData.service_type}</span></div>`
                                                            : ``
                                                        }
                                                        <div>Khối lượng (Gram):<span style="font-size: 17px" class="font-bold"> ${OrderData.weight}</span></div>
                                                    </div>
                                                </div>
                                                <div class="item2">Ngày gửi: ....../ ....../ ${(new Date()).getFullYear()}</div>
                                            </div>
                                            <div class="tb-header3" style="text-align: center;">
                                                <p class="pic" style="margin: 0 0 0px">
                                                    <img src="${barcodeStr}"/>
                                                </p>
                                                <span class="tracking_code" style="font-weight: bold;">${OrderData.transport_order_code}</span>
                                            </div>
                                            <div class="from-info">
                                                <div>
                                                    NGƯỜI GỬI: <span style="font-size: 15px;" class="font-bold">${OrderData.from_name}</span>
                                                </div>
                                                <div>
                                                    ĐỊA CHỈ: <span style="font-size: 15px;" class="font-bold">${OrderData.from_address} ,${OrderData.from_ward}, ${OrderData.from_district}, ${OrderData.from_province}</span>
                                                </div>
                                                <div>
                                                    ĐIỆN THOẠI:&nbsp;&nbsp;<span style="font-size: 20px;" class="font-bold">${OrderData.from_phone}</span>
                                                </div>
                                            </div>
                                            <div class="pack-info-grid">
                                                <div class="item1">
                                                    <div>
                                                        SỐ LƯỢNG: <span style="font-size: 19px" class="font-bold">${OrderData.quantity}</span>
                                                    </div>
                                                    <div>
                                                        NỘI DUNG: <span style="font-size: 14px" class="font-bold">${OrderData.content}</span>
                                                    </div>
                                                    <div>
                                                        GIÁ TRỊ HÀNG: <span style="font-size: 16px" class="font-bold">${OrderData.product_value} đ</span>
                                                    </div>
                                                    <div>
                                                        TIỀN THU HỘ: <span style="font-size: 24px" class="font-bold">${OrderData.cod} đ</span>
                                                    </div>
                                                </div>
                                                <div class="item2">
                                                    <img style="width: 100%; padding: 10px" src="${qrcodeStr}"/>
                                                </div>
                                            </div>
                                            <div class="to-info">
                                                <div>
                                                    NGƯỜI NHẬN:&nbsp;&nbsp;<span style="font-size: 15px;" class="font-bold">${OrderData.to_name}</span>
                                                </div>
                                                <div>
                                                    ĐỊA CHỈ:&nbsp;<span style="font-size: 15px;" class="font-bold">${OrderData.to_address}, ${OrderData.to_ward}, ${OrderData.to_district}, ${OrderData.to_province}</span>
                                                </div>
                                                <div>
                                                    ĐIỆN THOẠI:&nbsp;&nbsp;<span style="font-size: 20px;" class="font-bold">${OrderData.to_phone}</span>
                                                </div>
                                            </div>
                                            <div class="tb-header1 clearfix ">
                                                <div class="col chuky" style="border-top: 1px solid #000;">
                                                    <div class="">Chữ ký bưu tá (BC)</div>
                                                </div>
                                                <div class="col chuky" style="border-top: 1px solid #000;">
                                                    <div class="">Chữ ký người nhận</div>
                                                </div>
                                            </div>
                                            <div class="code clearfix">
                                                <div class="left">
                                                    <p class="title" style="margin-bottom: 0px;">PHIẾU GỬI</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="settings panel panel-default">
                            <button class="btn bg-primary btn_print no-shadow pos-abt hidden-print" onclick="window.print();"><i class="fa fa-print"></i> In vận đơn</button>
                        </div>
                    </body>
                    </html>	
                `);
            }
        }
    );
})();
