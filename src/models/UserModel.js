class UserModel {
    constructor({ username, password, description, employeeId, status, user = '', userUpdate = '' }) {
        this.username = username;
        this.password = password;
        this.description = description;
        this.employeeId = employeeId;
        this.status = status;
        this.user = user;
        this.date = new Date();;
        this.userUpdate = userUpdate;
        this.dateUpdate = new Date();
    }
}

export default UserModel;