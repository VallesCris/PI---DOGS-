const { Router } = require('express');
const {Dog, Temperament} = require('../db')
const { getAllInfo } = require('../controllers/ApiData')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", async(req, res, next)=>{
    try{
        const { name } = req.query
        const dogs = await getAllInfo();
        if(name){
            const nameQuery = dogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            if(nameQuery.length > 0){
                res.status(200).json(nameQuery)
            } else {
                res.send(dogs)
            }
        }
    } catch(error){
        console.log(error)
    }
});

router.get("/dogs/:id", async(req, res, next)=>{
    try {
        const {id} = req.params
        const dogId = await getAllInfo();
        if(id){
            const dogsId = dogId.filter(e => e.id.toString() === id.toString());
            if(dogsId.length > 0) res.status(200).send(id)
            else res.status(404).json('No hay perros con ese ID')
        }
    } catch (error){
        next(error)
    }
});

router.get('/temperament', async (req, res) =>{
    const temperamentsApi = await axios.get('https://api.thedogapi.com/v1/breeds/search?q={raza_perro}')
    const temperaments = temperamentsApi.data.map(e => e.temperament)
    const tempEach = temperaments.map(e=> {
        for (let i = 0; i < e.length; i++) return e[i]
    })
    tempEach.forEach(el => {
        Temperament.findOrCreate({
            where: { name: el}
        })
    })
    const allTemps = await Temperament.findAll();
    res.send(allTemps)
});

router.post('/dogs', async(req, res, next)=>{
    try {
        const {name, height, weight, years, image, temperament} = req.body
        let id = Math.floor(Math.random()*12345)
        const dogCreated = await Dog.create({
            id,
            name,
            height,
            weight,
            lifeSpan,
            temperament,
            image
        })
        const dogsA = await Temperament.findAll({
            where:{
                name: temperament
            }
        })
        await dogCreated.addTemperament(dogsA)
        res.status(200).send('Perro creado con exito')
    } catch (error) {
        next(error)
    }
});









/*router.get("/temperament", async (req, res) => {
    let getDBInfo = await Temperament.findAll();
    if (getDBInfo.length > 0) {
      res.json(getDBInfo);
    } else {
      let filterTemps = await getTemp();
      filterTemps
        ? res.status(200).json(filterTemps)
        : res.status(404).json({ error: "NO ESTAN LLEGANDO LOS TEMPERAMENTOS" });
    }
  });*/

module.exports = router;
