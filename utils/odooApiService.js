export default class OdooApiService {
    constructor(baseURL, dbName) {
        this.baseURL=baseURL, this.dbName=dbName, this.cookies=""
    }

    async login(username, password) {
        const payload = {
          jsonrpc: "2.0",
          method: "call",
          params: {
            db: this.dbName,
            login: username,
            password: password,
          },
          id: new Date().getTime(),
        };
    
        try {
          const response = await fetch(`${this.baseURL}/angkort/api/v1/custom_login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          console.log(response);
          if(!response.ok) throw new Error("Failed to log in");
          console.log(response.headers.get('set-cookie'));
          const result = response.result;
          if (result.error) throw result.error;
    
          // Store cookies for future authenticated requests
          console.log(response.headers);
          this.cookies = response.headers.get("set-cookie");
          console.log(result.result);
          return result.result;
        } catch (error) {
          console.error("Odoo login error:", error);
          throw error;
        }
      }

    async call(model, method, args = [], kwargs = {}) {
        console.log(this.cookies);
        const payload = {
          jsonrpc: "2.0",
          method: "call",
          params: {
            model,
            method,
            args,
            kwargs,
            db: this.dbName,
          },
          id: new Date().getTime(),
        };
    
        try {
          const response = await fetch(`${this.baseURL}/api/web/dataset/call_kw`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: this.cookies, // Include the session cookie for authentication
              },
            body: JSON.stringify(payload),
          });
          const result = await response.json();
          if (result.error) throw result.error;
          return result.result;
        } catch (error) {
          console.error("Odoo API error:", error);
          throw error;
        }
      }
}