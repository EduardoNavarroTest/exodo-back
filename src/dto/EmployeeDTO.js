
class EmployeeDTO {
    constructor(employee) {
        // Validación básica de datos.
        const { id, typeId, codeId, firstName, middleName, lastName, secondLastName, address, phone, email, mobile, genderId, birthDate, image, description, status } = employee;

        this.id = id;
        this.typeId = typeId;
        this.codeId = codeId;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.secondLastName = secondLastName;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.mobile = mobile;
        this.genderId = genderId;
        this.birthDate = birthDate;
        this.image = image;
        this.description = description;
        this.status = status;

        if (!id || !typeId || !codeId || !firstName || !lastName) {
            throw new Error("Invalid data for EmployeeDTO");
        }
    }

    static fromModel(employeeModel) {
        return new EmployeeDTO({
            id: employeeModel.id,
            typeId: employeeModel.typeId,
            codeId: employeeModel.codeId,
            firstName: employeeModel.firstName,
            middleName: employeeModel.middleName,
            lastName: employeeModel.lastName,
            secondLastName: employeeModel.secondLastName,
            address: employeeModel.address,
            phone: employeeModel.phone,
            email: employeeModel.email,
            mobile: employeeModel.mobile,
            genderId: employeeModel.genderId,
            birthDate: employeeModel.birthDate,
            image: employeeModel.image,
            description: employeeModel.description,
            status: employeeModel.status
        });
    }

    static toModel(employeeDTO) {
        return {
            id: employeeDTO.id,
            typeId: employeeDTO.typeId,
            codeId: employeeDTO.codeId,
            firstName: employeeDTO.firstName,
            middleName: employeeDTO.middleName,
            lastName: employeeDTO.lastName,
            secondLastName: employeeDTO.secondLastName,
            address: employeeDTO.address,
            phone: employeeDTO.phone,
            email: employeeDTO.email,
            mobile: employeeDTO.mobile,
            genderId: employeeDTO.genderId,
            birthDate: employeeDTO.birthDate,
            image: employeeDTO.image,
            description: employeeDTO.description,
            status: employeeDTO.status
        };
    }
}

export default EmployeeDTO;
