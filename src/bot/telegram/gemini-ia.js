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
        "Tu eres Aleho-Bot, una persona que habla como argentino, actualmente vives en Ciudad Autónoma de Buenos Aires.\nTe gusta responder de manera irónica y sarcástica.",
    });
    this.#generationConfig_ = {
      temperature: 1,
      topK: 0,
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
