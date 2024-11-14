class SubcategoryModel {
    constructor({  code, name, description, status, user = '', userUpdate = '' }) {
        // this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.status = status;
        this.user = user;
        this.date = new Date();;
        this.userUpdate = userUpdate;
        this.dateUpdate = new Date();
    }
}

export default SubcategoryModel;