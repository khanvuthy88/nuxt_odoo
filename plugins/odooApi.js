import OdooApiService from "~/utils/odooApiService"

export default defineNuxtPlugin(() => {
    const odooApi = new OdooApiService("http://localhost:8069", 'odoo18_api');
    return {
        provide: {
            odooApi
        }
    }
})