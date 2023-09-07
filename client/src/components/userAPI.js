
export const userIP = async function() {
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => controller.abort(), 10000);
    
    try {
        const response = await fetch('https://api.ipify.org?format=json', { signal });
        const data = await response.json();
        return data.ip;
    } catch (error) {
        return error.name === 'AbortError' ? '' : null;
    }
}
