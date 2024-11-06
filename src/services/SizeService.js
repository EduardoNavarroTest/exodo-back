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
            throw new Error('Size already exists');
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

    async getSizeByCode(code) {
        const size = await this.sizeRepository.findByCode(code);
        if (!size) {
            throw new Error('Size not found');
        }
        return SizeDTO.fromModel(size);
    }

    async deleteSizeByCode(code) {
        const existingSize = await this.sizeRepository.findByCode(code);
        if (!existingSize) {
            throw new Error('Size not found');
        }
        const deletedSize = await this.sizeRepository.deleteSizeByCode(code);
        return SizeDTO.fromModel(deletedSize);
    }

    async updateSizeByCode(code, newCode, newName, newDescription, newStatus) {
        const size = await this.sizeRepository.findByCode(code);
        if (!size) {
            throw new Error('Size not found');
        }

        const existingSize = await this.sizeRepository.findByCode(newCode);
        console.log(existingSize);
        if (existingSize && code !== newCode) {
            throw new Error('Size already exists');
        }

        const updatedSize = await this.sizeRepository.updateSizeByCode(code, newCode, newName, newDescription, newStatus);
        return SizeDTO.fromModel(updatedSize);
    }



}

export default SizeService;
