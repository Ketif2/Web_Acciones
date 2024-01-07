const db = require("../config/database");

const controller = {
    getActions: async (req, res) => {
        try {
            const data = await db.collection('dataAcciones').get(); //Acceddemos a la coleccion
            const actions = data.docs.map(doc => {
            const actionData = doc.data();
            const actionid = doc.id;//obtenem,os todos los datos
            if (actionData.saleDate && actionData.saleDate._seconds) {
                actionData.saleDate = actionData.saleDate.seconds;
                const saleDate = new Date(actionData.saleDate * 1000);
                const saleDateFormat = `${saleDate.getDate()}/${saleDate.getMonth() + 1}/${saleDate.getFullYear()}`;
                actionData.formattedSaleDate = saleDateFormat;
            }
            actionData.id = actionid;
            return actionData;
        });
            res.json(actions);
        } catch (error) {
            res.status(600).json({ message: error.message})
        }
    },
    getActionsById: async (req, res) => {
        try {
            const actionID = req.params.id;
            const accion = await db.collection('dataAcciones').doc(actionID).get();
            if (!accion.exists) {
                res.status(404).json({ message: 'La accion no existe'})
            }else{
                res.json({id: accion.id, data: accion.data()});
            }
        } catch (error) {
            res.status(600).json({ message: error.message})
        }
    },
    updateAction: async (req, res) => {
        try {
            const actionID = req.params.id;
            const action = req.body;
            await db.collection('dataAcciones').doc(actionID).update(action);
            if (!actionID) {
                res.status(404).json({ message: 'La accion no existe'})
            }else{
                res.json({ message: 'La accion se actualizo correctamente'})
            }
        } catch (error) {
            res.status(600).json({ message: error.message})
        }
    },
    createAction: async (req, res) => {
        try {
            const action = req.body;
            await db.collection('dataAcciones').doc().create(action);
            res.json({ message: 'La accion se creo correctamente'})
        } catch (error) {
            res.status(600).json({ message: error.message})
        }
    },
    deleteAction: async (req, res) => {
        try {
            const actionID = req.params.id;
            await db.collection('dataAcciones').doc(actionID).delete();
            res.json({ message: 'La accion se elimino correctamente'})
        } catch (error) {
            res.status(600).json({ message: error.message})
        }
    }
};

module.exports = controller;