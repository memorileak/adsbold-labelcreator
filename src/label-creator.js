const qrcode = require('yaqrcode');
const Canvas = require('canvas');
const jsbarcode = require('jsbarcode');
const logo = require('./logo.json');
/**
 * @param OrderData: contains all data passing into function to create the label
 * The OrderData including:
 *  - provider_name
 *  - transport_order_code
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
                const canvas = new Canvas();
                jsbarcode(canvas, OrderData.transport_order_code, {
                    format: 'CODE128',
                    width: 260,
                    height: 190,
                    displayValue: false
                });
                const barcodeStr = canvas.toDataURL("image/png");
                return (`
                    <html>
                    <head>
                        <title>Order label</title>
                        <link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
                        <style type="text/css">
                            .print-button {
                                color: white;
                                background-color: #18a689;
                                border-color: #18a689;
                                border-radius: 4px;
                            }
                    
                            body {
                                font-family: Roboto, Helvetica, Verdana, Arial, sans-serif;
                                font-size: 14px;
                                color: #58666e;
                                background-color: transparent;
                                -webkit-font-smoothing: antialiased;
                                line-height: 1.42857143;
                            }
                    
                            @page {
                                size: A5 portrait;
                            }
                    
                            .pleft {
                                float: left;
                            }
                    
                            .pright {
                                float: right;
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
                    
                            .logo_cod_new {
                                height: 60px;
                                max-width: 200px;
                                position: absolute;
                                right: 0;
                                top: 0;
                            }
                    
                            body {
                                font-size: 13px;
                                background-color: #FFF;
                            }
                    
                            .watermark {
                                position: relative;
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
                                    font-family: Arial, Helvetica, sans-serif;
                                }
                            }
                    
                            * {
                                box-sizing: border-box;
                                font-family: Arial, Helvetica, sans-serif;
                                font-weight: 100;
                    
                            }
                    
                            body {
                                margin: 0 auto;
                                padding: 0;
                                box-sizing: border-box;
                                font-family: Arial, Helvetica, sans-serif;
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
                                /* padding: 5px 0; */
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
                            }
                    
                            .tb-header1 .col:nth-child(1) span {
                                font-size: 20px;
                                font-weight: bold;
                                padding-top: 5px;
                            }
                    
                            /* .tb-header1 .col + .col {
                            padding-top: 10px;
                            } */
                            .dochvu {
                                padding-top: 7px
                            }
                    
                            .tb-header1 .col + .col span {
                                font-weight: bold;
                                font-size: 20px;
                                /* padding: 7px 0; */
                                border-right: 2px solid #000;
                            }
                    
                            .tb-header1 .col:last-child span {
                                border: none;
                            }
                    
                            .tb-header2 {
                                border-bottom: 1px solid #000;
                            }
                    
                            .tb-header2 .left {
                                position: relative;
                                letter-spacing: -1px;
                                min-width: 50px;
                                float: left;
                                padding-left: 3px;
                            }
                    
                            .tb-header2 .left span {
                                font-size: 20px;
                                font-weight: bold;
                                padding-left: 10px;
                            }
                    
                            .tb-header2 .right {
                                min-width: 50px;
                                float: right;
                                text-align: right;
                                padding-right: 30px;
                                /*padding-top: 3px;*/
                            }
                    
                            .tb-header3 {
                                border-bottom: 1px solid #000;
                                padding-top: 3px;
                            }
                    
                            .tb-header3 .pic {
                                text-align: center;
                                /* padding-bottom: 10px;
                                width: 80%;*/
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
                    
                            /*.tb-header4 {
                            margin-top: 2px;
                            }*/
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
                    
                            .col-65 {
                                min-height: 37px;
                                padding-top: 10px !important;
                            }
                    
                            .col-35 {
                                min-height: 48px;
                                padding-top: 10px !important;
                            }
                    
                            .price {
                                margin-bottom: 10px;
                            }
                    
                            .dress {
                                padding-top: 10px;
                            }
                    
                            .tb-header3 .pic {
                                margin: 5px 10px 1px 10px !important;
                            }
                    
                            .tb-header3 .pic img {
                                width: 350px !important;
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
                    
                            .tb-body {
                                border: 3px solid #000;
                                border-radius: 5px;
                                /*margin: 0 1px;*/
                                padding: 5px 5px 0px 6px;
                                min-height: 120px;
                            }
                    
                            .tb-body dl * {
                                display: inline-block;
                                vertical-align: middle;
                            }
                    
                            .tb-body dl:nth-child(1) {
                                font-size: 14px;
                                font-weight: bold;
                            }
                    
                            .tb-body dl:nth-child(1) dd {
                                font-size: 24px;
                    
                            }
                    
                            .tb-body dl:nth-child(2) {
                                margin-top: 0px;
                            }
                    
                            .tb-body dl:nth-child(3) dd {
                                font-size: 14px;
                            }
                    
                            .tracking_code {
                                font-size: 19px;
                            }
                    
                            /*			.dress {
                                margin: 3px;
                                }*/
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
                                margin-top: 10px !important;
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
                    
                            .tb-footer {
                                /* margin-top: 5px;*/
                                border-top: 1px solid #000;
                                text-align: center;
                                padding-top: 3px;
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
                                                    <div class="dochvu">Dịch vụ</div>
                                                    <span style="font-size: 14px;">
                                                        </span>Chuyển phát nhanh
                                                </div>
                                                <div class="col">
                                                    <div class="dochvu">Tỉnh phát</div>
                                                    <span>${OrderData.to_province}</span></div>
                                            </div>
                                            <div class="tb-header2 clearfix">
                                                <div class="left">T. lượng (Gr)<span> ${OrderData.weight}</span></div>
                                                <div class="right">Ngày gửi: ....../ ....../ ${(new Date()).getFullYear()}</div>
                                            </div>
                                            <div class="tb-header3" style="text-align: center;">
                                                <p class="pic" style="margin: 0 0 0px">
                                                    <img style="width: 260px;height: 33px;" src="${barcodeStr}"/>
                                                </p>
                                                <span class="tracking_code" style="font-weight: bold;">${OrderData.transport_order_code}</span>
                                            </div>
                                            <div class="tb-header4 clearfix">
                                                <div class="col-65">
                                                    <dl class="clearfix">
                                                        <dt style="font-weight: bold;">NGƯỜI GỬI:&nbsp;${OrderData.from_name}</dt>
                                                    </dl>
                                                    <dl>
                                                        <dt><span style="font-weight: bold;">ĐIỆN THOẠI:</span>&nbsp;
                                                            <span style="font-weight: bold;">${OrderData.from_phone}</span>
                                                        </dt>
                                                    </dl>
                                                </div>
                                                <div class="col-35">
                                                    <dl class="clearfix">
                                                        <dt>
                                                            <img style="width: 100px;height:34px" src="${logoURL}">
                                                        </dt>
                                                    </dl>
                                                </div>
                                                <div class="price" style="padding-left:5px;">
                                                    <dt>ĐỊA CHỈ:&nbsp; ${OrderData.from_address} ,${OrderData.from_ward},
                                                        ${OrderData.from_district}, ${OrderData.from_province}
                                                    </dt>
                                                </div>
                                            </div>
                                            <div class="tb-body">
                                                <dl class="clearfix">
                                                    <dt style="font-weight: bold;">Tiền thu hộ:</dt>
                                                    <dd> ${OrderData.cod}</dd>
                                                    <dt style="font-weight: bold;">&nbsp;&nbsp;Số lượng:</dt>
                                                    <dd> ${OrderData.quantity}</dd>
                                                </dl>
                                                <dl class="clearfix">
                                                    <dt style="font-weight: bold;margin-top: -6px;">NỘI DUNG:&nbsp;
                                                        <span style="font-weight: bold;">${OrderData.content}</span>
                                                    </dt>
                                                    <!-- <dd></dd> -->
                                                </dl>
                                                <dl class="clearfix" style="line-height: 0px;">
                                                    <dt style="font-weight: bold;">Giá trị
                                                        hàng:&nbsp;<strong>${OrderData.product_value}đ</strong></dt>
                                                    <!-- <dd>đ</dd> -->
                                                </dl>
                                            </div>
                                            <div class="dress">
                                                <div class="col" style="width: 79%;float:left;min-height:98px">
                                                    <dl class="clearfix">
                                                        <dt style="font-weight: bold;">NGƯỜI NHẬN:&nbsp;${OrderData.to_name}</dt>
                                                        <dt style="font-weight: bold;width: 100%;">ĐỊA CHỈ:&nbsp;${OrderData.to_address},
                                                            ${OrderData.to_ward}, ${OrderData.to_district}, ${OrderData.to_province}
                                                        </dt>
                                                        <!-- <dt style="font-weight: bold;width: 100%;white-space: nowrap;">Huyên Yên Lạc,Vĩnh Phúc</dt> -->
                                                        <dt><span style="font-weight: bold;">ĐIỆN THOẠI:</span> &nbsp;<span
                                                                style="font-size: 20px;font-weight: bold;">${OrderData.to_phone}</span></dt>
                                                        <!-- <dd></dd> -->
                                                    </dl>
                                                </div>
                                                <div style="width:20%;float:left;min-height:98px">
                                                    <img style="width: 100%; padding: 10px" src="${qrcodeStr}"/>
                                                </div>
                                                <br>
                                                <div class="tb-header1 clearfix ">
                                                    <div class="col chuky" style="border-top: 1px solid #000;margin-top: -6px;">
                                                        <div class="">Chử ký bưu tá (BC)</div>
                                                    </div>
                                                    <div class="col chuky" style="border-top: 1px solid #000;margin-top: -6px;">
                                                        <div class="">Chử ký người nhận</div>
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
