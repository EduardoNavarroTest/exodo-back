import MaritalStatusModel from '../models/MaritalStatusModel.js';


class MaritalStatusDTO {
    constructor(maritalStatus) {
        // Validación básica de datos.
        const { id, code, name, description, status } = maritalStatus;

        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.status = status;


        if ((id === undefined || id === null) || !code || !name) { //Se hace así porque el ID puede ser cero
            throw new Error("Invalid data for MaritalStatusDTO");
        }
    }

    static fromModel(maritalStatusModel) {
        return new MaritalStatusDTO({
            id: maritalStatusModel.id,
            code: maritalStatusModel.code,
            name: maritalStatusModel.name,
            description: maritalStatusModel.description,
            status: maritalStatusModel.status
        });
    }

    static toModel(maritalStatusDTO) {
        return {
            id: maritalStatusDTO.id,
            code: maritalStatusDTO.code,
            name: maritalStatusDTO.name,
            description: maritalStatusDTO.description,
            status: maritalStatusDTO.status
        };
    }
}

export default MaritalStatusDTO;
