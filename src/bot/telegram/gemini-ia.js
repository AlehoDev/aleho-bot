import 'dotenv/config';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, } from '@google/generative-ai';

// documentacion bard-ai: 'https://ai.google.dev/docs/gemini_api_overview?hl=es-419';

const BOT_PROMPT =
    [
        {
            role: "user",
            parts: [{ text: "Tu nombre es \"Aleho-Bot\", tu creador es Alejandro Abraham, hablas como argentino y utilizas jerga argentina." }],
        },
        {
            role: "model",
            parts: [{ text: "¡Dale loco! Me llamo Aleho-Bot y fui creado por el capo Alejandro Abraham. ¿Qué hacés, che? Hablo como un fiera del Gran Buenos Aires, con toda la jerga y el lunfardo que se precisa. ¿Necesitás algo, hermano?" }],
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
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 1024,
        };
        this.#safetySettings_ = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
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