import postService from "../services/postService.js";
import userRepository from "../repositories/userRepository.js";

function normalizePostBody(body) {
    const hashtags = Array.isArray(body.hashtags)
        ? body.hashtags.filter(Boolean)
        : String(body.hashtags || "")
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);

    return {
        title: body.title,
        content: body.content,
        imageUrl: body.imageUrl,
        hashtags,
        user: body.userId,
    };
}

class PostController {
    async create(req, res) {
        try {
            const { userId } = req.body;
            await postService.createPost(userId, normalizePostBody(req.body));
            res.redirect("/posts");
        } catch (error) {
            const [posts, users] = await Promise.all([
                postService.getPosts(),
                userRepository.findAll(),
            ]);
            res.status(400).render("posts", { posts, users, error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const [posts, users] = await Promise.all([
                postService.getPosts(),
                userRepository.findAll(),
            ]);

            res.render("posts", { posts, users });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCreateForm(req, res) {
        try {
            const [posts, users] = await Promise.all([
                postService.getPosts(),
                userRepository.findAll(),
            ]);

            res.render("posts", { posts, users });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getEditForm(req, res) {
        try {
            const { id } = req.params;
            const [post, users] = await Promise.all([
                postService.getPostById(id),
                userRepository.findAll(),
            ]);

            if (!post) {
                return res.status(404).send("Post no encontrado");
            }

            res.render("edit", { post, users });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            await postService.updatePost(id, normalizePostBody(req.body));
            res.redirect("/posts");
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await postService.deletePost(id);
            res.redirect("/posts");
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new PostController();