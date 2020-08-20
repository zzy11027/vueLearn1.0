function env(params) {
    let envBase = '';
    if (process.env.NODE_ENV === 'development') {
        envBase = '/api/';
    } else {
        envBase = '';
    }
    return envBase;
}
export default env();
