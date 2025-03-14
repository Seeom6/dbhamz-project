import axios from "axios";
import {EnvVar} from "../../../config/env/env-var.js";
import ApiError from "../../../lib/ApiError.js";

const NotificationOptions = {
    link: "LNK",
    all: "ALL",
    sms: "SMS",
    email: "EML"
}

export async function getMyFatooraLink(totalPrice ,user){
    try {
        const url = `${EnvVar.myFatoora_base_url}/v2/SendPayment`
        const body = {
            NotificationOption: NotificationOptions.link,
            CustomerName: user.name,
            InvoiceValue: totalPrice,
            // CallBackUrl: EnvVar.myFatoora_call_backu_rl,
            // ErrorUrl: EnvVar.myFatoora_error_url,
            // Language: 'ar',
            // DisplayCurrencyIso: 'KWD',
            // MobileCountryCode: '+965',
            // CustomerMobile: '12345678',
            // CustomerEmail: 'xx@yy.com',
            // CustomerReference: 'ref 1',
            // CustomerCivilId: 12345678,
            // UserDefinedField: 'Custom field',
            // ExpireDate: '',
            // CustomerAddress: {
            //         Block: '',
            //         Street: '',
            //         HouseBuildingNo: '',
            //         Address: '',
            //         AddressInstructions: ''
            //     },
            // InvoiceItems: [
            //     { ItemName: 'Product 01', Quantity: 1, UnitPrice: 100 }
            // ]
        }
        const headers = {
            Accept: 'application/json',
            Authorization: 'Bearer '+ EnvVar.myFatoora_api_key,
            'Content-Type': 'application/json'
        }
        const response = await axios.post(url,body,headers)
        return response.data;
    }catch (e) {
        console.log(e.message)
        throw new ApiError("myFatoora payment error please try again ", 400)
    }

}

export const MyFatooraService = {
    getMyFatooraLink,
}