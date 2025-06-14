import axios from 'axios';

axios.defaults.withCredentials = true;

export function useDashboard() {

    const DASHBOARD_API_URL = process.env.NEXT_PUBLIC_API_DASHBOARD_URL;

    const getAccessToken = async () => {
        try {
            const response = await axios.post(`${DASHBOARD_API_URL}/accounts/refresh/token/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.data;
            return data.data.access;
        } catch (error: any) {
            throw error;
        }
    };

    const getOrganizationId = async () => {
        let organizationId = null;

        const accessToken = await getAccessToken();
        const { data } = await axios.get(`${DASHBOARD_API_URL}/dashboard/get-organization/`, { headers: { Authorization: `Bearer ${accessToken}` } });
     
        if(data.data.length === 0){
            organizationId = await createOrganization(accessToken);
            localStorage.setItem('createdByUsername', generateRandomString(6));
        } else {
            organizationId = data.data[0].organization_id;
            localStorage.setItem('createdByUsername', data.data[0].created_by.fullname);
        }
        //Store the created by username
        return organizationId;
    };

    const generateRandomString = (length: number) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    const createOrganization = async (accessToken: string) => {
        const { data } = await axios.post(`${DASHBOARD_API_URL}/dashboard/create-organization/`, {
            name: generateRandomString(6)
        }, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return data.data.organization_id;
    };

    const createAPIKey = async (organizationId: string) => {
        const accessToken = await getAccessToken();
        const { data } = await axios.post(
            `${DASHBOARD_API_URL}/dashboard/create-api-key/`,
            { organization_id: organizationId },
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return data.data.SecretKey;
    };

    const getAPIKey = async () => {
        const accessToken = await getAccessToken();
        const organizationId = await getOrganizationId();
        const { data } = await axios.get(
            `${DASHBOARD_API_URL}/dashboard/get-api-key/${organizationId}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        if (data.data.length === 0) {
            return await createAPIKey(organizationId);
        }
        return data.data[0].SecretKey;
    };
    return { getAPIKey };
}