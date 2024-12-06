import GenderRepository from '../repository/GenderRepository.js';
import GenderModel from '../models/GenderModel.js';
import GenderDTO from '../dto/GenderDTO.js';


class GenderService {
    constructor() {
        this.genderRepository = new GenderRepository();
    }

    async createGender(code, name, description, status) {

        const existingGender = await this.genderRepository.findByCode(code);
        if (existingGender) {
            throw new Error('Gender already exists with the same code');
        }

        const gender = await new GenderModel({ code, name, description, status });
        const savedGender = await this.genderRepository.save(gender);
        return await GenderDTO.fromModel(savedGender);
    }

    async getAllGenders() {
        const genders = await this.genderRepository.findAll();
        if (!genders) {
            throw new Error('Genders not found');
        }
        return genders.map(gender => GenderDTO.fromModel(gender));
    }

    async getGenderById(id) {
        const gender = await this.genderRepository.findById(id);
        if (!gender) {
            throw new Error('Gender not found with the given id');
        }
        return GenderDTO.fromModel(gender);
    }

    async getGenderByCode(code) {
        const gender = await this.genderRepository.findByCode(code);
        if (!gender) {
            throw new Error('Gender not found with the given code');
        }
        return GenderDTO.fromModel(gender);
    }

    async deleteGenderById(id) {
        const existingGender = await this.genderRepository.findById(id);
        if (!existingGender) {
            throw new Error('Gender not found');
        }
        const deletedGender = await this.genderRepository.deleteGenderById(id);
        return GenderDTO.fromModel(deletedGender);
    }

    async updateGenderById(id, newCode, newName, newDescription, newStatus) {
        const gender = await this.genderRepository.findById(id);
        if (!gender) {
            throw new Error('Gender not found');
        }

        const existingGender = await this.genderRepository.findByCode(newCode);
        if (existingGender && newCode !== gender.code) {
            throw new Error('Gender already exists with the same code');
        }

        const updatedGender = await this.genderRepository.updateGenderById(id, newCode, newName, newDescription, newStatus);
        return GenderDTO.fromModel(updatedGender);
    }

}

export default GenderService;
