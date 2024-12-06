import MaritalStatusService from '../services/MaritalStatusService.js';

const maritalStatusService = new MaritalStatusService();

class MaritalStatusController {
    async createMaritalStatus(req, res) {
        const { code, name, description, status } = req.body;
        try {
            const maritalStatus = await maritalStatusService.createMaritalStatus(code, name, description, status);
            res.status(201).json(maritalStatus);
        } catch (error) {
            console.log(`Error service: ${error}`);
            res.status(500).json({ error: error.message });
        }
    }

    async getAllMaritalStatus(req, res) {
        try {
            const maritalStatus = await maritalStatusService.getAllMaritalStatus();
            res.status(200).json(maritalStatus);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getMaritalStatusById(req, res) {
        const { id } = req.params;
        try {
            const maritalStatus = await maritalStatusService.getMaritalStatusById(id);
            res.status(200).json(maritalStatus);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getMaritalStatusByCode(req, res) {
        const { code } = req.params;
        try {
            const maritalStatus = await maritalStatusService.getMaritalStatusByCode(code);
            res.status(200).json(maritalStatus);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async deleteMaritalStatusById(req, res) {
        const { id } = req.params;
        try {
            const deletedMaritalStatus = await maritalStatusService.deleteMaritalStatusById(id);
            res.status(200).json(deletedMaritalStatus);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateMaritalStatusById(req, res) {
        const { id } = req.params;
        const { codeNew, nameNew, descriptionNew, statusNew } = req.body; 
        try {
            const updatedMaritalStatus = await maritalStatusService.updateMaritalStatusById(id, codeNew, nameNew, descriptionNew, statusNew);
            res.status(200).json(updatedMaritalStatus);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default MaritalStatusController;
