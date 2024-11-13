import SizeRepository from '../repository/SizeRepository.js';
import SizeModel from '../models/SizeModel.js';
import SizeDTO from '../dto/SizeDTO.js';


class SizeService {
    constructor() {
        this.sizeRepository = new SizeRepository();
    }

    async createSize(code, name, description, status) {

        const existingSize = await this.sizeRepository.findByCode(code);
        if (existingSize) {
            throw new Error('Size already exists with the same code');
        }

        const size = await new SizeModel({ code, name, description, status });
        const savedSize = await this.sizeRepository.save(size);
        return await SizeDTO.fromModel(savedSize);
    }

    async getAllSizes() {
        const sizes = await this.sizeRepository.findAll();
        if (!sizes) {
            throw new Error('Sizes not found');
        }
        return sizes.map(size => SizeDTO.fromModel(size));
    }

    async getSizeById(id) {
        const size = await this.sizeRepository.findById(id);
        if (!size) {
            throw new Error('Size not found with the given id');
        }
        return SizeDTO.fromModel(size);
    }

    async getSizeByCode(code) {
        const size = await this.sizeRepository.findByCode(code);
        if (!size) {
            throw new Error('Size not found with the given code');
        }
        return SizeDTO.fromModel(size);
    }

    async deleteSizeById(id) {
        const existingSize = await this.sizeRepository.findById(id);
        if (!existingSize) {
            throw new Error('Size not found');
        }
        const deletedSize = await this.sizeRepository.deleteSizeById(id);
        return SizeDTO.fromModel(deletedSize);
    }

    async updateSizeById(id, newCode, newName, newDescription, newStatus) {
        const size = await this.sizeRepository.findById(id);
        if (!size) {
            throw new Error('Size not found');
        }

        const existingSize = await this.sizeRepository.findByCode(newCode);
        if (existingSize && newCode !== size.code) {
            throw new Error('Size already exists with the same code');
        }

        const updatedSize = await this.sizeRepository.updateSizeById(id, newCode, newName, newDescription, newStatus);
        return SizeDTO.fromModel(updatedSize);
    }

}

export default SizeService;
