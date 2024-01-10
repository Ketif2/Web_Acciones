const { getActions } = require('./controller');
const db = require('../config/database');

// Mock para la función collection
db.collection = jest.fn(() => ({
    get: jest.fn(() => ({
        docs: [
            {
                id: '1',
                data: () => ({
                    // datos simulados
                    saleDate: {
                        _seconds: 1631949600, // Timestamp en segundos para el 19 de septiembre de 2021
                    },
                    // otros datos...
                }),
            },
            // Puedes agregar más documentos simulados según sea necesario
        ],
    })),
}));

describe('Controller Tests', () => {
    test('getActions devuelve datos formateados correctamente', async () => {
        const req = {};
        const res = {
            json: jest.fn(),
            status: jest.fn(),
        };

        await getActions(req, res);

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).toHaveBeenCalled();

        const actions = res.json.mock.calls[0][0];

        expect(actions).toHaveLength(1);

        const action = actions[0];

        // Verifica que los datos se hayan formateado correctamente
        expect(action.id).toEqual('1');
        expect(action.formattedSaleDate).toEqual('19/9/2021');
    });

    // Puedes agregar más pruebas según sea necesario para otras funcionalidades del controlador
});
