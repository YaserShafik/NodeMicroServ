const Consult = require('../models/Consult');
const openai = require('../middlewares/openai_api');

exports.createConsult = async (req, res) => {
    try {
        const { userId, consultText } = req.body;

        // Llamada a la API de OpenAI
        const response = await req.openai.Completions.create({
            model: "text-davinci-003", // Modelo que deseas usar
            prompt: consultText, // Texto de la consulta
            max_tokens: 150, // Número máximo de tokens en la respuesta
        });

        // Guardar la consulta y la respuesta en la base de datos
        const newConsult = new Consult({
            userId,
            consultText,
            responseText: response.choices[0].text, // Respuesta de la API
        });

        await newConsult.save();

        res.status(201).json(newConsult);
    } catch (error) {
        console.error("Error creating consult:", error);
        res.status(500).send("Internal Server Error");
    }
};