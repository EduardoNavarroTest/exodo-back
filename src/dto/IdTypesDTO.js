import IdTypesModel from '../models/IdTypesModel.js';


class IdTypesDTO {
    constructor(idTypes) {
        // Validación básica de datos.
        const { id, code, name, description, status } = idTypes;

        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.status = status;


        if ((id === undefined || id === null) || !code || !name) { //Se hace así porque el ID puede ser cero
            throw new Error("Invalid data for IdTypesDTO");
        }
    }

    static fromModel(idTypesModel) {
        return new IdTypesDTO({
            id: idTypesModel.id,
            code: idTypesModel.code,
            name: idTypesModel.name,
            description: idTypesModel.description,
            status: idTypesModel.status
        });
    }

    static toModel(idTypesDTO) {
        return {
            id: idTypesDTO.id,
            code: idTypesDTO.code,
            name: idTypesDTO.name,
            description: idTypesDTO.description,
            status: idTypesDTO.status
        };
    }
}

export default IdTypesDTO;
