import SizeModel from '../models/SizeModel.js';


class SizeDTO {
    constructor(size) {
        // Validación básica de datos.
        const { id, code, name, description, status } = size;

        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.status = status;


        if ((id === undefined || id === null) || !code || !name) { //Se hace así porque el ID puede ser cero
            throw new Error("Invalid data for SizeDTO");
        }
    }

    static fromModel(sizeModel) {
        return new SizeDTO({
            id: sizeModel.id,
            code: sizeModel.code,
            name: sizeModel.name,
            description: sizeModel.description,
            status: sizeModel.status
        });
    }

    static toModel(sizeDTO) {
        return {
            id: sizeDTO.id,
            code: sizeDTO.code,
            name: sizeDTO.name,
            description: sizeDTO.description,
            status: sizeDTO.status
        };
    }
}

export default SizeDTO;
