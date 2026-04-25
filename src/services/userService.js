import userRepository from "../repositories/userRepository.js";

class UserService {
    async getAllUsers() {
        return await userRepository.findAll();
    }

    async getAllUsersWithEmail(email) {
        return await userRepository.findByEmail(email);
    }
}

export default new UserService();