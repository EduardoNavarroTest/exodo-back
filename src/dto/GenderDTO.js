import GenderModel from '../models/GenderModel.js';


class GenderDTO {
    constructor(gender) {
        // Validación básica de datos.
        const { id, code, name, description, status } = gender;

        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.status = status;


        if ((id === undefined || id === null) || !code || !name) { //Se hace así porque el ID puede ser cero
            throw new Error("Invalid data for GenderDTO");
        }
    }

    static fromModel(genderModel) {
        return new GenderDTO({
            id: genderModel.id,
            code: genderModel.code,
            name: genderModel.name,
            description: genderModel.description,
            status: genderModel.status
        });
    }

    static toModel(genderDTO) {
        return {
            id: genderDTO.id,
            code: genderDTO.code,
            name: genderDTO.name,
            description: genderDTO.description,
            status: genderDTO.status
        };
    }
}

export default GenderDTO;
