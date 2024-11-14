import SubcategoryRepository from '../repository/SubcategoryRepository.js';
import SubcategoryModel from '../models/SubcategoryModel.js';
import SubcategoryDTO from '../dto/SubcategoryDTO.js';


class SubcategoryService {
    constructor() {
        this.subcategoryRepository = new SubcategoryRepository();
    }

    async createSubcategory(code, name, description, status) {

        const existingSubcategory = await this.subcategoryRepository.findByCode(code);
        if (existingSubcategory) {
            throw new Error('Subcategory already exists with the same code');
        }

        const subcategory = await new SubcategoryModel({ code, name, description, status });
        const savedSubcategory = await this.subcategoryRepository.save(subcategory);
        return await SubcategoryDTO.fromModel(savedSubcategory);
    }

    async getAllSubcategories() {
        const subcategories = await this.subcategoryRepository.findAll();
        if (!subcategories) {
            throw new Error('Subcategories not found');
        }
        return subcategories.map(subcategory => SubcategoryDTO.fromModel(subcategory));
    }

    async getSubcategoryById(id) {
        const subcategory = await this.subcategoryRepository.findById(id);
        if (!subcategory) {
            throw new Error('Subcategory not found with the given id');
        }
        return SubcategoryDTO.fromModel(subcategory);
    }

    async getSubcategoryByCode(code) {
        const subcategory = await this.subcategoryRepository.findByCode(code);
        if (!subcategory) {
            throw new Error('Subcategory not found with the given code');
        }
        return SubcategoryDTO.fromModel(subcategory);
    }

    async deleteSubcategoryById(id) {
        const existingSubcategory = await this.subcategoryRepository.findById(id);
        if (!existingSubcategory) {
            throw new Error('Subcategory not found');
        }
        const deletedSubcategory = await this.subcategoryRepository.deleteSubcategoryById(id);
        return SubcategoryDTO.fromModel(deletedSubcategory);
    }

    async updateSubcategoryById(id, newCode, newName, newDescription, newStatus) {
        const subcategory = await this.subcategoryRepository.findById(id);
        if (!subcategory) {
            throw new Error('Subcategory not found');
        }

        const existingSubcategory = await this.subcategoryRepository.findByCode(newCode);
        if (existingSubcategory && newCode !== subcategory.code) {
            throw new Error('Subcategory already exists with the same code');
        }

        const updatedSubcategory = await this.subcategoryRepository.updateSubcategoryById(id, newCode, newName, newDescription, newStatus);
        return SubcategoryDTO.fromModel(updatedSubcategory);
    }

}

export default SubcategoryService;
