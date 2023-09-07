
export const userIP= async function(){
    try{
    return await fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => data.ip);
    }
    catch(error){
        return null
    }
    
}