import connectDB from "./src/db/database.js";
import postRepository from "./src/repositories/postRepository.js";
import userRepository from "./src/repositories/userRepository.js";

await connectDB();

try {
	const userData = {
		email: "rafel.chuco@tecsup.edu.pe",
		name: "Rafael",
		lastName: "Chuco"
	};

	const user = await userRepository.findByEmail(userData.email) ?? await userRepository.create(userData);

	console.log("Usuario creado: ", user);

	await postRepository.create({
		title: "Hola Mundo",
		content: "Adios Mundo",
		user: user._id
	});

	const users = await userRepository.findAll();
	console.log("Usuarios actuales: ", users);

	const posts = await postRepository.findAll();
	console.log("Posts registrados: ", posts);
} catch (error) {
	console.log("Error: ", error);
}
