import ColorRepository from '../repository/ColorRepository.js';
import ColorModel from '../models/ColorModel.js';
import ColorDTO from '../dto/ColorDTO.js';


class ColorService {
    constructor() {
        this.colorRepository = new ColorRepository();
    }

    async createColor(code, name, description, status) {

        const existingColor = await this.colorRepository.findByCode(code);
        if (existingColor) {
            throw new Error('Color already exists with the same code');
        }

        const color = await new ColorModel({ code, name, description, status });
        const savedColor = await this.colorRepository.save(color);
        return await ColorDTO.fromModel(savedColor);
    }

    async getAllColors() {
        const colors = await this.colorRepository.findAll();
        if (!colors) {
            throw new Error('Colors not found');
        }
        return colors.map(color => ColorDTO.fromModel(color));
    }

    async getColorById(id) {
        const color = await this.colorRepository.findById(id);
        if (!color) {
            throw new Error('Color not found with the given id');
        }
        return ColorDTO.fromModel(color);
    }

    async getColorByCode(code) {
        const color = await this.colorRepository.findByCode(code);
        if (!color) {
            throw new Error('Color not found with the given code');
        }
        return ColorDTO.fromModel(color);
    }

    async deleteColorById(id) {
        const existingColor = await this.colorRepository.findById(id);
        if (!existingColor) {
            throw new Error('Color not found');
        }
        const deletedColor = await this.colorRepository.deleteColorById(id);
        return ColorDTO.fromModel(deletedColor);
    }

    async updateColorById(id, newCode, newName, newDescription, newStatus) {
        const color = await this.colorRepository.findById(id);
        if (!color) {
            throw new Error('Color not found');
        }

        const existingColor = await this.colorRepository.findByCode(newCode);
        if (existingColor && newCode !== color.code) {
            throw new Error('Color already exists with the same code');
        }

        const updatedColor = await this.colorRepository.updateColorById(id, newCode, newName, newDescription, newStatus);
        return ColorDTO.fromModel(updatedColor);
    }

}

export default ColorService;
