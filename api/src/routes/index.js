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
            }             
        } else {
            res.send(dogs)
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
            const dog = dogId.find(e => e.id.toString() === id.toString());
            if(dog) res.status(200).send(dog)
            else res.status(404).json('No hay perros con ese ID')
        }
    } catch (error){
        next(error)
    }
});

router.post('/dogs', async(req, res, next)=>{
    try {
        const {name, minheight, maxheight, minweight, maxweight, minlife_span, maxlife_span, image, temperament} = req.body
        console.log(req.body)
        let id = Math.floor(Math.random()*12345)
        if(name && minheight && maxheight && minweight && maxweight && maxlife_span && minlife_span && temperament && image  ){
        const dogCreated = await Dog.create({
            id,
            name,
            image,
            height: maxheight - minheight,
            weight: maxweight - minweight,
            lifeSpan: maxlife_span - minlife_span,
            createInDb: true,
        })
        if(dogCreated){
            temperament.forEach(async (e) => {
            const tempCreate = await Temperament.findOne({
                    where: {
                        name: e
                    }
                })
                if(tempCreate){
                    await dogCreated.addTemperament(tempCreate)
                }
            });
        return res.status(200).send('Perro creado con exito')
        } else return res.status(400).send('No se creo el perro')
    }
      else {
         return res.status(400).send('Faltan Datos')
        }
    } catch (error) {
        next(error)
    }
});

router.get('/temperaments', async (req, res, next) =>{
    const typeTemps = ["Loyal", "Curious", "Playful", "Adventurous", "Active", "Fun-loving", "Independent",
    "Happy", "Wild", "Intelligent", "Friendly", "Brave", "Gentle"];
    try {
        typeTemps.forEach(temp =>{
            Temperament.findOrCreate({
                where: {
                    name: temp
                }
            })
        })
        const temps1 = await Temperament.findAll()
        res.status(200).send(temps1)
    } catch (error) {
        next(error)
    }

});


module.exports = router;
