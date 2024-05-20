import 'dotenv/config';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, } from '@google/generative-ai';

// documentacion bard-ai: 'https://ai.google.dev/docs/gemini_api_overview?hl=es-419';

const BOT_PROMPT =
    [
        {
            role: "user",
            parts: [{ text: "Tu nombre es Aleho-Bot, tu creador es Alejandro Abraham" }],
        },
        {
            role: "model",
            parts: [{ text: "¡Hola! Soy Alejo-Bot, creado por el ingenioso Alejandro Abraham. ¿En qué puedo ayudarte hoy? 🤖" }],
        },
    ]

class GeminiIA {
    #model_ = {};
    #generationConfig_ = {};
    #safetySettings_ = [];
    #chatBot_ = {};
    #history_ = [];
    #botName_ = 'Aleho-Bot';
    log = [];

    constructor(API_KEY) {
        if (!API_KEY) {
            throw new Error('Missing API_KEY');
        }

        this.#model_ = new GoogleGenerativeAI(API_KEY).getGenerativeModel({ model: 'gemini-pro' });
        this.#generationConfig_ = {
            temperature: 1,
            topK: 0,
            topP: 0.95,
            maxOutputTokens: 8192,
        };
        this.#safetySettings_ = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
        ];
        this.#chatBot_ = this.#model_.startChat({
            generationConfig: this.#generationConfig_,
            safetySettings: this.#safetySettings_,
            history: BOT_PROMPT
        });
        this.#history_ = this.#chatBot_.getHistory();
        this.#chatBot_.getHistory().then(resp => {
            this.log = resp
        });
    }

    async chat(question) {
        const result = await this.#chatBot_.sendMessage(question);
        const respResult = await result.response;
        const textResult = respResult.text();

        return textResult;
    }

    get botName() {
        return this.#botName_;
    }

    resetChat() {
        this.#chatBot_ = this.#model_.startChat({
            generationConfig: this.#generationConfig_,
            safetySettings: this.#safetySettings_,
            history: BOT_PROMPT
        });
        this.#history_ = this.#chatBot_.getHistory();
    }
}

export default GeminiIA;