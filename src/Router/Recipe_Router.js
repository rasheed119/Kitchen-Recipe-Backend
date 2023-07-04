import express from 'express';
import { Recipe_model } from '../models/Recipe.js';
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.get("/",async(req,res)=>{
    try {
        const get_recipes = await Recipe_model.find({});
        res.json({ data : get_recipes });
    } catch (error) {
        console.log(error);
    }
})

router.post("/",async(req,res)=>{
 
    try {
        const response = new Recipe_model(req.body);
        const data = await response.save();
        res.json({ data });
    } catch (error) {
        console.log(error.message);
    }

})

router.put("/",async(req,res)=>{
 
    try {
        const recipe = await Recipe_model.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.SavedRecipes.push(recipe);
        await user.save();
        res.json({ data : user });
    } catch (error) {
        console.log(error.message);
    }
    
})

router.get("/savedrecipes/ids/:userID",async(req,res)=>{

    try {
        const user  = await UserModel.findById(req.params.userID);
        res.json({ SavedRecipes : user?.SavedRecipes });
    } catch (error) {
        res.json({ Error : error.message })
    }
})

router.get("/savedrecipes",async(req,res)=>{

    try {
        const user  = await UserModel.findById(req.body.userID);
        const recipe = await Recipe_model.find({
            _id : { $in : user.SavedRecipes }
        })
        res.json({ recipe });
    } catch (error) {
        res.json({ Error : error.message })
    }
})

export { router as Recipe_Router };