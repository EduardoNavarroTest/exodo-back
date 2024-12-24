class EmployeeModel {
    constructor({ typeId, codeId, firstName, middleName, lastName, secondLastName, address, phone, email, mobile, genderId, birthDate, image, description, status, user = '', userUpdate = '' }) {

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
        this.image = image;
        this.birthDate = birthDate;
        this.description = description;
        this.status = status;
        this.user = user;
        this.date = new Date();;
        this.userUpdate = userUpdate;
        this.dateUpdate = new Date();
    }
}

export default EmployeeModel;