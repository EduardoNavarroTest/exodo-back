class UserDTO {
    constructor(user) {
        const { id, username, password, description, employeeId, status } = user;

        this.id = id;
        this.username = username;
        this.password = password;
        this.description = description;
        this.employeeId = employeeId;
        this.status = status;


        if ((id === undefined || id === null) || !username || !password) { 
            throw new Error("Invalid data for UserDTO");
        }
    }

    static fromModel(userModel) {
        return new UserDTO({
            id: userModel.id,
            username: userModel.username,
            password: userModel.password,
            description: userModel.description,
            employeeId: userModel.employeeId,
            status: userModel.status
        });
    }

    static toModel(userDTO) {
        return {
            id: userDTO.id,
            username: userDTO.username,
            password: userDTO.password,
            description: userDTO.description,
            employeeId: userDTO.employeeId,
            status: userDTO.status
        };
    }
}

export default UserDTO;
