import ColorModel from '../models/ColorModel.js';


class ColorDTO {
    constructor(color) {
        // Validación básica de datos.
        const { id, code, name, description, status } = color;

        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.status = status;


        if ((id === undefined || id === null) || !code || !name) { //Se hace así porque el ID puede ser cero
            throw new Error("Invalid data for ColorDTO");
        }
    }

    static fromModel(colorModel) {
        return new ColorDTO({
            id: colorModel.id,
            code: colorModel.code,
            name: colorModel.name,
            description: colorModel.description,
            status: colorModel.status
        });
    }

    static toModel(colorDTO) {
        return {
            id: colorDTO.id,
            code: colorDTO.code,
            name: colorDTO.name,
            description: colorDTO.description,
            status: colorDTO.status
        };
    }
}

export default ColorDTO;
