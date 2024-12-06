import MaritalStatusRepository from '../repository/maritalStatusRepository.js';
import MaritalStatusModel from '../models/maritalStatusModel.js';
import MaritalStatusDTO from '../dto/maritalStatusDTO.js';


class MaritalStatusService {
    constructor() {
        this.maritalStatusRepository = new MaritalStatusRepository();
    }

    async createMaritalStatus(code, name, description, status) {

        const existingMaritalStatus = await this.maritalStatusRepository.findByCode(code);
        if (existingMaritalStatus) {
            throw new Error('maritalStatus already exists with the same code');
        }

        const maritalStatus = await new MaritalStatusModel({ code, name, description, status });
        const savedMaritalStatus = await this.maritalStatusRepository.save(maritalStatus);
        return await MaritalStatusDTO.fromModel(savedMaritalStatus);
    }

    async getAllMaritalStatus() {
        const maritalsStatus = await this.maritalStatusRepository.findAll();
        if (!maritalsStatus) {
            throw new Error('MaritalStatus not found');
        }
        return maritalsStatus.map(maritalStatus => MaritalStatusDTO.fromModel(maritalStatus));
    }

    async getMaritalStatusById(id) {
        const maritalStatus = await this.maritalStatusRepository.findById(id);
        if (!maritalStatus) {
            throw new Error('MaritalStatus not found with the given id');
        }
        return MaritalStatusDTO.fromModel(maritalStatus);
    }

    async getMaritalStatusByCode(code) {
        const maritalStatus = await this.maritalStatusRepository.findByCode(code);
        if (!maritalStatus) {
            throw new Error('maritalStatus not found with the given code');
        }
        return MaritalStatusDTO.fromModel(maritalStatus);
    }

    async deleteMaritalStatusById(id) {
        const existingMaritalStatus = await this.maritalStatusRepository.findById(id);
        if (!existingMaritalStatus) {
            throw new Error('maritalStatus not found');
        }
        const deletedMaritalStatus = await this.maritalStatusRepository.deleteMaritalStatusById(id);
        return MaritalStatusDTO.fromModel(deletedMaritalStatus);
    }

    async updateMaritalStatusById(id, newCode, newName, newDescription, newStatus) {
        const maritalStatus = await this.maritalStatusRepository.findById(id);
        if (!maritalStatus) {
            throw new Error('maritalStatus not found');
        }

        const existingMaritalStatus = await this.maritalStatusRepository.findByCode(newCode);
        if (existingMaritalStatus && newCode !== maritalStatus.code) {
            throw new Error('maritalStatus already exists with the same code');
        }

        const updatedMaritalStatus = await this.maritalStatusRepository.updateMaritalStatusById(id, newCode, newName, newDescription, newStatus);
        return MaritalStatusDTO.fromModel(updatedMaritalStatus);
    }

}

export default MaritalStatusService;
