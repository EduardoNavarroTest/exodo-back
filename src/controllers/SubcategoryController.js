import SubcategoryService from '../services/SubcategoryService.js';

const subcategoryService = new SubcategoryService();

class SubcategoryController {
    async createSubcategory(req, res) {
        const { code, name, description, status } = req.body;
        try {
            const subcategory = await subcategoryService.createSubcategory(code, name, description, status);
            res.status(201).json(subcategory);
        } catch (error) {
            console.log(`Error service: ${error}`);
            res.status(500).json({ error: error.message });
        }
    }

    async getAllSubcategories(req, res) {
        try {
            const subcategories = await subcategoryService.getAllSubcategories();
            res.status(200).json(subcategories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getSubcategoryById(req, res) {
        const { id } = req.params;
        try {
            const subcategory = await subcategoryService.getSubcategoryById(id);
            res.status(200).json(subcategory);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getSubcategoryByCode(req, res) {
        const { code } = req.params;
        try {
            const subcategory = await subcategoryService.getSubcategoryByCode(code);
            res.status(200).json(subcategory);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async deleteSubcategoryById(req, res) {
        const { id } = req.params;
        try {
            const deletedSubcategory = await subcategoryService.deleteSubcategoryById(id);
            res.status(200).json(deletedSubcategory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateSubcategoryById(req, res) {
        const { id } = req.params;
        const { codeNew, nameNew, descriptionNew, statusNew } = req.body; 
        try {
            const updatedSubcategory = await subcategoryService.updateSubcategoryById(id, codeNew, nameNew, descriptionNew, statusNew);
            res.status(200).json(updatedSubcategory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default SubcategoryController;
