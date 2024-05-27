// const mealController = require("../controllers/mealController")
// const express = require('express')
// const multer = require('multer');
// const path = require("path")
// const route = express.Router()


// // const path = require('path');
// const Storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, "..", "uploads"))
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })


// const upload = multer({ storage: Storage });


// route.post('/add-item', upload.single('imageFile'), async (req, res) => {
//     let imageFile;
//     if (!req.file) {
//         return res.status(422).json({ error: 'Image upload is required' });
//     } try {
//         let imageFile = "http://localhost:3000/uploads/" + req.file.filename;
//         let { title, category, description, price, ingrediants, exclude } = req.body
//         let data = await mealController.addNew(title, category, description, price, ingrediants, exclude, imageFile)
//         console.log(imageFile)
//         res.status(201).json({
//             items: data,
//             msg: "ok",
//             status: "success"
//         })
//     } catch (e) {
//         res.status(500).send('server error')
//     }
// })


// route.get('/', (req, res) => {
//     res.send('hello in meals route')
// })

// route.get("/get-all", async (req, res) => {
//     try {
//         let data = await mealController.getAllMeals()
//         if (data) {
//             res.json({
//                 items: data,
//                 msg: "ok"
//             })
//         } else {
//             res.status(403).send("not found")
//         }
//     } catch (e) {
//         res.status(500).send('server error')
//     }
// })


// route.get('/getItemById/:id', async (req, res) => {
//     console.log("route getItemById");
//     const id = req.params.id;
//     // console.log(id);
//     const meal = await mealController.getItemById(id);
//     console.log(meal);
//     if (meal) {
//         res.status(200)
//         res.json({
//             items: meal,
//             msg: "ok"
//         })
//     } else {
//         res.status(404).json({ message: 'Meal not found' });
//     }
// });


// route.delete('/delete-item/:Id', async (req, res) => {
//     console.log("hello")
//     try {
//         let categoryId = req.params.Id
//         console.log(categoryId);
//         let data = await mealController.deleteItem(categoryId)
//         res.send({
//             "massage": "Deleted Succesfully",
//             "status": 200
//         })

//     } catch (e) {
//         res.status(500).send('server error')
//     }
// })

// route.patch('/edit-item/:id', upload.single('imageFile'), async (req, res) => {
//     console.log(req.params.id);
//     console.log(req.body);
//     try {
//         if (req.file && !req.file.empty) { // Check if req.file exists and is not empty
//             let imageFile = "http://localhost:3000/uploads/" + req.file.filename;
//             let { id } = req.params; // Extract id from req.params
//             let { title, category, description, price, ingrediants, } = req.body;
//             let data = await mealController.editItem(id, title, price, category, imageFile, description, ingrediants)
//             res.status(200).json({ items: data, msg: "item was updated" });
//         } else {
//             console.log('File not uploaded');
//             // Handle the case where no file was uploaded
//             res.status(400).json({ error: 'File not uploaded' });
//         }
//     } catch (e) {
//         console.error(e);
//         res.status(500).send('server error');
//     }
// });


// route.post("/filter-by-category", async (req, res) => {
//     try {
//         let { category } = req.body
//         let data = await mealController.filterMealsCat(category)
//         res.send(data)
//     } catch (e) {
//         res.status(500).send('server error')
//     }
// })


// route.post("/filter-by-price", async (req, res) => {
//     try {
//         let { price } = req.body
//         let data = await mealController.filterMealsPri(price)
//         res.send(data);
//     } catch (e) {
//         res.status(500).send('server error')
//     }
// })
// module.exports = route;

const mealController = require("../controllers/mealController")
const express = require('express')
const multer = require('multer');
const path = require("path")
const route = express.Router()


// const path = require('path');
const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "uploads"))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


const upload = multer({ storage: Storage });


route.post('/add-item', upload.single('imageFile'), async (req, res) => {
    let imageFile;
    if (!req.file) {
        return res.status(422).json({ error: 'Image upload is required' });
    } try {
        let imageFile = "http://localhost:3000/uploads/" + req.file.filename;
        let { title, category, description, price, ingrediants, exclude } = req.body
        let data = await mealController.addNew(title, category, description, price, ingrediants, exclude, imageFile)
        console.log(imageFile)
        res.status(201).json({
            items: data,
            msg: "ok",
            status: "success"
        })
    } catch (e) {
        res.status(500).send('server error')
    }
})


route.get('/', (req, res) => {
    res.send('hello in meals route')
})

route.get("/get-all", async (req, res) => {
    try {
        let data = await mealController.getAllMeals()
        if (data) {
            res.json({
                items: data,
                msg: "ok"
            })
        } else {
            res.status(403).send("not found")
        }
    } catch (e) {
        res.status(500).send('server error')
    }
})


route.get('/getItemById/:id',async (req, res) => {
    console.log("route getItemById");
    const id = req.params.id;
    // console.log(id);
    const meal = await mealController.getItemById(id);
    console.log(meal);
    if (meal) {
      res.status(200)
      res.json({
        items:meal,
        msg:"ok"
    })
    } else {
      res.status(404).json({ message: 'Meal not found' });
    }
  });


route.delete('/delete-item/:Id', async (req, res) => {
    console.log("hello")
    try {
        let categoryId = req.params.Id
        console.log(categoryId);
        let data = await mealController.deleteItem(categoryId)
        res.send({
            "massage": "Deleted Succesfully",
            "status": 200
        })

    } catch (e) {
        res.status(500).send('server error')
    }
})

route.patch('/edit-item/:id', upload.single('imageFile'), async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    try {
        let imageFile;
        let { id } = req.params;
        if (req.file) { // Check if req.file exists and is not empty
            imageFile = "http://localhost:3000/uploads/" + req.file.filename;
        }else{
            let item = await mealController.getItemById(id)
            console.log(item.imageFile)
            imageFile = item.imageFile
        }
             // Extract id from req.params
            // let { title, category, description, price, ingrediants, } = req.body;
            let { title, category, price,description} = req.body;

            // let data = await mealController.editItem(id, title, price, category, imageFile, description, ingrediants)
            let data = await mealController.editItem(id, title, category, price,description, imageFile)

            res.status(200).json({ items: data, msg: "item was updated" });
        
    } catch (e) {
        console.error(e);
        res.status(500).send('server error');
    }
});


route.post("/filter-by-category", async (req, res) => {
    try {
        let { category } = req.body
        let data = await mealController.filterMealsCat(category)
        res.send(data)
    } catch (e) {
        res.status(500).send('server error')
    }
})


route.post("/filter-by-price", async (req, res) => {
    try {
        let { price } = req.body
        let data = await mealController.filterMealsPri(price)
        res.send(data);
    } catch (e) {
        res.status(500).send('server error')
    }
})
module.exports = route;