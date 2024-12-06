import ColorService from '../services/ColorService.js';

const colorService = new ColorService();

class ColorController {
    async createColor(req, res) {
        const { code, name, description, status } = req.body;
        try {
            const color = await colorService.createColor(code, name, description, status);
            res.status(201).json(color);
        } catch (error) {
            console.log(`Error service: ${error}`);
            res.status(500).json({ error: error.message });
        }
    }

    async getAllColors(req, res) {
        try {
            const colors = await colorService.getAllColors();
            res.status(200).json(colors);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getColorById(req, res) {
        const { id } = req.params;
        try {
            const color = await colorService.getColorById(id);
            res.status(200).json(color);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getColorByCode(req, res) {
        const { code } = req.params;
        try {
            const color = await colorService.getColorByCode(code);
            res.status(200).json(color);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async deleteColorById(req, res) {
        const { id } = req.params;
        try {
            const deletedColor = await colorService.deleteColorById(id);
            res.status(200).json(deletedColor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateColorById(req, res) {
        const { id } = req.params;
        const { codeNew, nameNew, descriptionNew, statusNew } = req.body; 
        try {
            const updatedColor = await colorService.updateColorById(id, codeNew, nameNew, descriptionNew, statusNew);
            res.status(200).json(updatedColor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default ColorController;
