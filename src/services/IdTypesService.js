import IdTypesRepository from '../repository/IdTypesRepository.js';
import IdTypesModel from '../models/IdTypesModel.js';
import IdTypesDTO from '../dto/IdTypesDTO.js';


class IdTypesService {
    constructor() {
        this.idTypesRepository = new IdTypesRepository();
    }

    async createIdType(code, name, description, status) {

        const existingIdTypes = await this.idTypesRepository.findByCode(code);
        if (existingIdTypes) {
            throw new Error('IdTypes already exists with the same code');
        }

        const idType = await new IdTypesModel({ code, name, description, status });
        const savedIdTypes = await this.idTypesRepository.save(idType);
        return await IdTypesDTO.fromModel(savedIdTypes);
    }

    async getAllIdTypes() {
        const idTypes = await this.idTypesRepository.findAll();
        if (!idTypes) {
            throw new Error('IdTypess not found');
        }
        return idTypes.map(idType => IdTypesDTO.fromModel(idType));
    }

    async getIdTypeById(id) {
        const idType = await this.idTypesRepository.findById(id);
        if (!idType) {
            throw new Error('IdTypes not found with the given id');
        }
        return IdTypesDTO.fromModel(idType);
    }

    async getIdTypeByCode(code) {
        const idType = await this.idTypesRepository.findByCode(code);
        if (!idType) {
            throw new Error('IdTypes not found with the given code');
        }
        return IdTypesDTO.fromModel(idType);
    }

    async deleteIdTypeById(id) {
        const existingIdTypes = await this.idTypesRepository.findById(id);
        if (!existingIdTypes) {
            throw new Error('IdTypes not found');
        }
        const deletedIdTypes = await this.idTypesRepository.deleteIdTypesById(id);
        return IdTypesDTO.fromModel(deletedIdTypes);
    }

    async updateIdTypeById(id, newCode, newName, newDescription, newStatus) {
        const idType = await this.idTypesRepository.findById(id);
        if (!idType) {
            throw new Error('IdTypes not found');
        }

        const existingIdTypes = await this.idTypesRepository.findByCode(newCode);
        if (existingIdTypes && newCode !== idType.code) {
            throw new Error('IdTypes already exists with the same code');
        }

        const updatedIdTypes = await this.idTypesRepository.updateIdTypesById(id, newCode, newName, newDescription, newStatus);
        return IdTypesDTO.fromModel(updatedIdTypes);
    }

}

export default IdTypesService;
