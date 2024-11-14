import CategoryModel from '../models/CategoryModel.js';


class CategoryDTO {
    constructor(category) {
        // Validación básica de datos.
        const { id, code, name, description, status } = category;

        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.status = status;


        if ((id === undefined || id === null) || !code || !name) { //Se hace así porque el ID puede ser cero
            throw new Error("Invalid data for CategoryDTO");
        }
    }

    static fromModel(categoryModel) {
        return new CategoryDTO({
            id: categoryModel.id,
            code: categoryModel.code,
            name: categoryModel.name,
            description: categoryModel.description,
            status: categoryModel.status
        });
    }

    static toModel(categoryDTO) {
        return {
            id: categoryDTO.id,
            code: categoryDTO.code,
            name: categoryDTO.name,
            description: categoryDTO.description,
            status: categoryDTO.status
        };
    }
}

export default CategoryDTO;
