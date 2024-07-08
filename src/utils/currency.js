import axios from 'axios';

//Devuelve un objeto con la cotizacion del dolar y el euro
export const dolar_euroFunction = async () => {
    try {
        const [bluelyticsResponse, dolarApiBlueResponse] = await Promise.all([
            axios.get('https://api.bluelytics.com.ar/v2/latest'),
            axios.get('https://dolarapi.com/v1/dolares/blue'),
        ]);

        if (dolarApiBlueResponse.status === 200) {
            // Reemplazar valores de Bluelytics con los de dolarapi
            bluelyticsResponse.data.blue.value_sell =
                dolarApiBlueResponse.data.venta;
            bluelyticsResponse.data.blue.value_buy =
                dolarApiBlueResponse.data.compra;
        }

        return {
            data: bluelyticsResponse.data,
            status: bluelyticsResponse.status,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                data: null,
                status: error.response?.status || 500,
                error: `Error en la solicitud: ${error.message}`,
            };
        } else {
            return { data: null, status: 500, error: 'Error desconocido' };
        }
    }
};

export const btc_ethFunction = async () => {
    try {
        const url = [
            'https://criptoya.com/api/btc/usd',
            'https://criptoya.com/api/eth/usd',
        ];
        const response0 = await axios.get(url[0]);
        const response1 = await axios.get(url[1]);

        if (response0.status !== 200) {
            return { data: '', status: response0.status };
        }

        if (response1.status !== 200) {
            return { data: '', status: response1.status };
        }

        const data = {
            btc: {
                letsbit: response0.data.letsbit,
                binancep2p: response0.data.binancep2p,
                tiendacrypto: response0.data.tiendacrypto,
                fiwind: response0.data.fiwind,
                bitsoalpha: response0.data.bitsoalpha,
            },
            eth: {
                letsbit: response1.data.letsbit,
                binancep2p: response1.data.binancep2p,
                tiendacrypto: response1.data.tiendacrypto,
                fiwind: response1.data.fiwind,
                bitsoalpha: response1.data.bitsoalpha,
            },
        };

        return { data, status: 200 };
    } catch (error) {
        return { data: '', status: '500', error };
    }
};
