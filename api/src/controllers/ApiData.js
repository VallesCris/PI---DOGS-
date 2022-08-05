const {Dog, Temperament} = require('../db')
const axios = require('axios')
const { API_KEY } = process.env

async function getApi (){
    try{
        const infoApi = await axios(`https://api.thedogapi.com/v1/breeds?apiKey=${YOUR_API_KEY}`)
        const apiData = infoApi.data?.results.map((e)=>{
            return{
                id: e.id,
                name: e.name,
                temperament: e.temperament? e.temperament : 'Perro sin temperamento',
                weight: e.weight,
                height: e.height,
                years: e.life_span,
                image : el.image.url,
            }
        })
        return apiData
    } catch(err){
        console.log(err)
    }
}

const getDbInfo = async()=>{
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ["name"],
            through:{
                attributes: []
            }
        }
    })
}

const getAllInfo = async()=>{
    const apiInfo = await getApi();
    const dbInfo = await getDbInfo();
    const allInfo = await apiInfo.concat(dbInfo);

    return allInfo;
}

module.exports = {
    getApi,
    getAllInfo
}

