import postService from "../services/postService.js";
import userService from "../services/userService.js";

class WebController {
    async home(req, res) {
        const users = await userService.getAllUsers();
        const posts = await postService.getAllPosts();

        res.render("index", {
            title: "Mongo Node",
            users,
            posts,
        });
    }
}

export default new WebController();