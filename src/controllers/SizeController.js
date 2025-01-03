import SizeService from '../services/SizeService.js';

const sizeService = new SizeService();

class SizeController {
    async createSize(req, res) {
        const { code, name, description, status } = req.body;
        try {
            const size = await sizeService.createSize(code, name, description, status);
            res.status(201).json(size);
        } catch (error) {
            console.log(`Error service: ${error}`);
            res.status(500).json({ error: error.message });
        }
    }

    async getAllSizes(req, res) {
        try {
            const sizes = await sizeService.getAllSizes();
            res.status(200).json(sizes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getSizeById(req, res) {
        const { id } = req.params;
        try {
            const size = await sizeService.getSizeById(id);
            res.status(200).json(size);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getSizeByCode(req, res) {
        const { code } = req.params;
        try {
            const size = await sizeService.getSizeByCode(code);
            res.status(200).json(size);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async deleteSizeById(req, res) {
        const { id } = req.params;
        try {
            const deletedSize = await sizeService.deleteSizeById(id);
            res.status(200).json(deletedSize);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateSizeById(req, res) {
        const { id } = req.params;
        const { codeNew, nameNew, descriptionNew, statusNew } = req.body; 
        try {
            const updatedSize = await sizeService.updateSizeById(id, codeNew, nameNew, descriptionNew, statusNew);
            res.status(200).json(updatedSize);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default SizeController;
