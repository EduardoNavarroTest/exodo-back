import IdTypesService from '../services/IdTypesService.js';

const idTypesService = new IdTypesService();

class IdTypeController {
    async createIdTypes(req, res) {
        const { code, name, description, status } = req.body;
        try {
            const idType = await idTypesService.createIdType(code, name, description, status);
            res.status(201).json(idType);
        } catch (error) {
            console.log(`Error service: ${error}`);
            res.status(500).json({ error: error.message });
        }
    }

    async getAllIdTypes(req, res) {
        try {
            const idTypess = await idTypesService.getAllIdTypes();
            res.status(200).json(idTypess);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getIdTypesById(req, res) {
        const { id } = req.params;
        try {
            const idType = await idTypesService.getIdTypeById(id);
            res.status(200).json(idType);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getIdTypesByCode(req, res) {
        const { code } = req.params;
        try {
            const idType = await idTypesService.getIdTypeByCode(code);
            res.status(200).json(idType);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async deleteIdTypesById(req, res) {
        const { id } = req.params;
        try {
            const deletedIdType = await idTypesService.deleteIdTypeById(id);
            res.status(200).json(deletedIdType);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateIdTypesById(req, res) {
        const { id } = req.params;
        const { codeNew, nameNew, descriptionNew, statusNew } = req.body; 
        try {
            const updatedIdType = await idTypesService.updateIdTypeById(id, codeNew, nameNew, descriptionNew, statusNew);
            res.status(200).json(updatedIdType);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default IdTypeController;
