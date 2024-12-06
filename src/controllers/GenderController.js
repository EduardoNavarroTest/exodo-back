import GenderService from '../services/GenderService.js';

const genderService = new GenderService();

class GenderController {
    async createGender(req, res) {
        const { code, name, description, status } = req.body;
        try {
            const gender = await genderService.createGender(code, name, description, status);
            res.status(201).json(gender);
        } catch (error) {
            console.log(`Error service: ${error}`);
            res.status(500).json({ error: error.message });
        }
    }

    async getAllGenders(req, res) {
        try {
            const genders = await genderService.getAllGenders();
            res.status(200).json(genders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getGenderById(req, res) {
        const { id } = req.params;
        try {
            const gender = await genderService.getGenderById(id);
            res.status(200).json(gender);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getGenderByCode(req, res) {
        const { code } = req.params;
        try {
            const gender = await genderService.getGenderByCode(code);
            res.status(200).json(gender);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async deleteGenderById(req, res) {
        const { id } = req.params;
        try {
            const deletedGender = await genderService.deleteGenderById(id);
            res.status(200).json(deletedGender);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateGenderById(req, res) {
        const { id } = req.params;
        const { codeNew, nameNew, descriptionNew, statusNew } = req.body; 
        try {
            const updatedGender = await genderService.updateGenderById(id, codeNew, nameNew, descriptionNew, statusNew);
            res.status(200).json(updatedGender);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default GenderController;
