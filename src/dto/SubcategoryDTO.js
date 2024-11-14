import SubcategoryModel from '../models/SubcategoryModel.js';


class SubcategoryDTO {
    constructor(subcategory) {
        // Validación básica de datos.
        const { id, code, name, description, status } = subcategory;

        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.status = status;


        if ((id === undefined || id === null) || !code || !name) { //Se hace así porque el ID puede ser cero
            throw new Error("Invalid data for SubcategoryDTO");
        }
    }

    static fromModel(subcategoryModel) {
        return new SubcategoryDTO({
            id: subcategoryModel.id,
            code: subcategoryModel.code,
            name: subcategoryModel.name,
            description: subcategoryModel.description,
            status: subcategoryModel.status
        });
    }

    static toModel(subcategoryDTO) {
        return {
            id: subcategoryDTO.id,
            code: subcategoryDTO.code,
            name: subcategoryDTO.name,
            description: subcategoryDTO.description,
            status: subcategoryDTO.status
        };
    }
}

export default SubcategoryDTO;
