import axios from 'axios';

axios.defaults.withCredentials = true;

export function useDashboard() {

    const DASHBOARD_API_URL = process.env.NEXT_PUBLIC_API_DASHBOARD_URL;
    const LOGIN_URL = process.env.NEXT_PUBLIC_CONSOLE_DASHBOARD_URL+'/auth?redirect='+process.env.NEXT_PUBLIC_BASE_URL;

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
            if (error.response?.status === 401) {
                // Redirect to login page if not in a server-side context
                if (typeof window !== 'undefined') {
                    window.location.href = LOGIN_URL;
                }
                // Return a rejected promise to stop further execution
                return Promise.reject(new Error('Authentication required'));
            }
            // Re-throw other errors
            throw error;
        }
    };

    const getOrganizationId = async () => {
        const accessToken = await getAccessToken();
        const { data } = await axios.get(`${DASHBOARD_API_URL}/dashboard/get-organization/`, { headers: { Authorization: `Bearer ${accessToken}` } });

        //Store the created by username
        localStorage.setItem('createdByUsername', data.data[0].created_by.fullname);

        return data.data[0].organization_id;
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