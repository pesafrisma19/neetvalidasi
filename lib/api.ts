import axios from "axios";

const API_BASE_URL = "https://rfpdev.site";

export const api = axios.create({
    baseURL: API_BASE_URL,
});

export interface BankCheckResponse {
    status: boolean;
    message: string;
    data: {
        customer_name: string;
        account_number: string;
        bank_name: string;
        bank_code: string;
    };
}

export interface EWalletCheckResponse {
    status: boolean;
    message: string;
    data: {
        phone_number: string;
        ewallet_code: string;
        account_name: string;
    };
}

export const checkBank = async (account_number: string, bank_code: string) => {
    const formData = new FormData();
    formData.append('account_number', account_number);
    formData.append('bank_code', bank_code);
    const response = await api.post<BankCheckResponse>("/api/check-rekening", formData);
    return response.data;
};

export const checkEWallet = async (phone_number: string, ewallet_code: string) => {
    const formData = new FormData();
    formData.append('phone_number', phone_number);
    formData.append('ewallet_code', ewallet_code);
    const response = await api.post<EWalletCheckResponse>("/api/check-ewallet", formData);
    return response.data;
};

export const ocrKtp = async (base64Image: string) => {
    const formData = new FormData();
    formData.append('image', base64Image);
    const response = await api.post("/api/ktp-ocr", formData);
    return response.data;
};
