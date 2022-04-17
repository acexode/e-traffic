export const serverBaseUrl = '/api/v1';

export const baseEndpoints = {
    auth: serverBaseUrl + '/auth',
};
export const authEndpoints = {
    login: baseEndpoints.auth + '/login',
    signup: baseEndpoints.auth + '/register',
    activate: baseEndpoints.auth + '/register/activate',
    forgotPasswordInitiate: baseEndpoints.auth + '/forgot-password/initiate',
    forgotPasswordComplete: baseEndpoints.auth + '/forgot-password/complete',
    changePassword: baseEndpoints.auth + '/change-password',
    updateProfile: baseEndpoints.auth + '/update/profile',
    updateProfileImage: baseEndpoints.auth + '/update/profile/image',
};

