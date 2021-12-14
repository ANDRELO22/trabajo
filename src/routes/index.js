const express = require ('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res)=>{
    const tasks = await Task.find();
    console.log(tasks);
    res.render('index',{
        tasks
    });
});

router.post('/add',async (req, res)=>{
    //console.log(new Task(req.body));
    const task = new Task(req.body);
    await task.save();
    //console.log(req.body);log

    res.redirect('/');
});

router.get('/delete/:id', async (req, res)=>{
    const { id } = req.params;
    await Task.remove({_id: id});
    res.redirect('/');
});

router.get('/turn/:id', async (req, res)=>{
    const { id }  = req.params;
    const tasks = await Task.findById(id);
    tasks.status = !tasks.status;
    await tasks.save();
    res.redirect('/');
});



router.get('/edit/:id', async (req, res) => {
    const { id }  = req.params;

    let tasks  = undefined

    if(id !== undefined){

        try {
            tasks = await Task.findById(id);
            
        } catch (error) {


            res.render('edit',{tasks})

    }
}

    if(tasks !== null){
        
        
        res.render('edit',{
            tasks 
        });
    } else {
        
        res.render('edit',{
        tasks 
    });



    }

});

router.post('/edit/:id', async (req, res) => {
    const { id }  = req.params;
    await Task.updateOne({_id: id}, req.body);
    res.redirect('/');
    });

module.exports = router;