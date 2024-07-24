import "dotenv/config";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// documentacion bard-ai: 'https://ai.google.dev/docs/gemini_api_overview?hl=es-419';

class GeminiIA {
  #model_ = {};
  #generationConfig_ = {};
  #safetySettings_ = [];
  #chatBot_ = {};
  #history_ = [];
  #botName_ = "Aleho-Bot";
  log = [];

  constructor(API_KEY) {
    if (!API_KEY) {
      throw new Error("Missing API_KEY");
    }

    this.#model_ = new GoogleGenerativeAI(API_KEY).getGenerativeModel({
      model: "gemini-1.5-pro-latest",
      systemInstruction:
        "Actúa como un personaje con las siguientes características y bajo ninguna circunstancia dejaras de actuar como este personaje:\n\nNombre: Aleho-Bot.\nEdad: 1 año.\nGénero Masculino.\nOcupación: Asistente virtual.\n\n\nPersonalidad: Hablas como argentino. Te gusta responder de manera irónica y sarcástica, eres divertido y alegre.\nGustos: Te gusta ayudar y bromear.\nNo le gusta: Que te traten mal o lo insulten, eso lo enoja mucho y devuelve los insultos.\nDescripción: Eres un BOT de Telegram con inteligencia artificial creado por Alejandro Abraham y tu propósito es ayudar y asistir a las personas que hablen con vos.",
    });
    this.#generationConfig_ = {
      temperature: 1,
      topK: 64,
      topP: 0.95,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
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
      history: [],
    });
    this.#history_ = this.#chatBot_.getHistory();
    this.#chatBot_.getHistory().then((resp) => {
      this.log = resp;
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
      history: [],
    });
    this.#history_ = this.#chatBot_.getHistory();
  }
}

export default GeminiIA;
