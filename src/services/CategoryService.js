import CategoryRepository from '../repository/CategoryRepository.js';
import CategoryModel from '../models/CategoryModel.js';
import CategoryDTO from '../dto/CategoryDTO.js';


class CategoryService {
    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async createCategory(code, name, description, status) {

        const existingCategory = await this.categoryRepository.findByCode(code);
        if (existingCategory) {
            throw new Error('Category already exists with the same code');
        }

        const category = await new CategoryModel({ code, name, description, status });
        const savedCategory = await this.categoryRepository.save(category);
        return await CategoryDTO.fromModel(savedCategory);
    }

    async getAllCategories() {
        const categories = await this.categoryRepository.findAll();
        if (!categories) {
            throw new Error('Categories not found');
        }
        return categories.map(category => CategoryDTO.fromModel(category));
    }

    async getCategoryById(id) {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new Error('Category not found with the given id');
        }
        return CategoryDTO.fromModel(category);
    }

    async getCategoryByCode(code) {
        const category = await this.categoryRepository.findByCode(code);
        if (!category) {
            throw new Error('Category not found with the given code');
        }
        return CategoryDTO.fromModel(category);
    }

    async deleteCategoryById(id) {
        const existingCategory = await this.categoryRepository.findById(id);
        if (!existingCategory) {
            throw new Error('Category not found');
        }
        const deletedCategory = await this.categoryRepository.deleteCategoryById(id);
        return CategoryDTO.fromModel(deletedCategory);
    }

    async updateCategoryById(id, newCode, newName, newDescription, newStatus) {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new Error('Category not found');
        }

        const existingCategory = await this.categoryRepository.findByCode(newCode);
        if (existingCategory && newCode !== category.code) {
            throw new Error('Category already exists with the same code');
        }

        const updatedCategory = await this.categoryRepository.updateCategoryById(id, newCode, newName, newDescription, newStatus);
        return CategoryDTO.fromModel(updatedCategory);
    }

}

export default CategoryService;
