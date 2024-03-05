const db = require("../config/database");
const API_KEY = 'QR52EVYY0QPOAJKS';
const axios = require('axios');

async function getStockPrice(stockSymbol) {
    try {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${API_KEY}`;
        const response = await axios.get(url);
        //console.log(response.data); 
        const timeSeries = response.data['Time Series (Daily)'];
        if (timeSeries) {
            const lastDate = Object.keys(timeSeries)[0];
            const lastClosePrice = timeSeries[lastDate]['4. close'];
            return parseFloat(lastClosePrice);
        }else {
            console.log('No se encontraron datos para la serie diaria');
            return null; // Asegúrate de manejar este caso en tu código
        }
    } catch (error) {
        console.error('Error al obtener el precio de la acción:', error.message);
        return null;
    }
}

const controller = {
    getActions: async (req, res) => {
        try {
          const data = await db.collection('dataAcciones').get();
          const actions = await Promise.all(data.docs.map(async (doc) => {
            const actionData = doc.data();
            const actionid = doc.id;
    
            // Formatear saleDate
            if (actionData.saleDate && actionData.saleDate._seconds) {
              actionData.saleDate = actionData.saleDate._seconds;
              const saleDate = new Date(actionData.saleDate * 1000);
              const saleDateFormat = `${saleDate.getDate()}/${saleDate.getMonth() + 1}/${saleDate.getFullYear()}`;
              actionData.formattedSaleDate = saleDateFormat;
            }

            const currentPrice = await getStockPrice(actionData.name); 
            const purchasePrice = actionData.price; 
            const quantity = actionData.cantidad; 

            actionData.change = ((currentPrice - purchasePrice) / purchasePrice) * 100;
            actionData.gainLoss = (currentPrice - purchasePrice) * quantity;
            //console.log(actionData.change)
    
            actionData.id = actionid;
            //console.log('Datos enviados al front: ', actionData);
            return actionData;
          }));
    
          res.json(actions);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: error.message });
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
    },
    
};
//console.log(controller.getActions());
//console.log(getStockPrice('AMZN'));

module.exports = controller;