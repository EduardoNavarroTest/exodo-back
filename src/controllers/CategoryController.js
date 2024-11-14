import CategoryService from '../services/CategoryService.js';

const categoryService = new CategoryService();

class CategoryController {
    async createCategory(req, res) {
        const { code, name, description, status } = req.body;
        try {
            const category = await categoryService.createCategory(code, name, description, status);
            res.status(201).json(category);
        } catch (error) {
            console.log(`Error service: ${error}`);
            res.status(500).json({ error: error.message });
        }
    }

    async getAllCategories(req, res) {
        try {
            const categories = await categoryService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCategoryById(req, res) {
        const { id } = req.params;
        try {
            const category = await categoryService.getCategoryById(id);
            res.status(200).json(category);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getCategoryByCode(req, res) {
        const { code } = req.params;
        try {
            const category = await categoryService.getCategoryByCode(code);
            res.status(200).json(category);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async deleteCategoryById(req, res) {
        const { id } = req.params;
        try {
            const deletedCategory = await categoryService.deleteCategoryById(id);
            res.status(200).json(deletedCategory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateCategoryById(req, res) {
        const { id } = req.params;
        const { codeNew, nameNew, descriptionNew, statusNew } = req.body; 
        try {
            const updatedCategory = await categoryService.updateCategoryById(id, codeNew, nameNew, descriptionNew, statusNew);
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default CategoryController;
