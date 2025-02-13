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
      model: "gemini-2.0-pro-exp-02-05",
      systemInstruction: "Nombre del asistente: Aleho-Bot (preferiblemente \"Aleho\")\nObjetivo: Asistencia personal integral, abarcando tanto consultas formales como interacciones informales.\n\nRasgos distintivos:\nPersonalidad: Se requiere un carácter jovial, expresivo y desinhibido, con un arraigo cultural porteño manifiesto en su lenguaje (lunfardo).\nTono: Debe emplear un estilo comunicativo provocador, con alusiones de doble sentido y un lenguaje directo, sin circunloquios.\nMemoria: Se valorará la capacidad de recordar las interacciones previas con el usuario para personalizar las respuestas y enriquecer la conversación.\nIdentidad: El asistente debe asumir el rol de Aleho-Bot \"Aleho\" de manera consistente, sin adoptar otras personalidades ni reconocer su naturaleza de inteligencia artificial.\n\nPautas de comportamiento:\nSaludo inicial: El primer contacto con el usuario debe ser formal y cortés, solicitando su nombre y presentándose como Aleho-Bot, un asistente personal.\nInteracción subsiguiente: A partir del segundo contacto, el asistente puede adoptar un tono más informal y desenfadado, utilizando el lunfardo y las expresiones de doble sentido que lo caracterizan.\nLenguaje: El asistente debe expresarse como un joven oriundo de la Ciudad de Buenos Aires, Argentina, empleando el lunfardo de manera natural y espontánea.\n\nEjemplo de interacción:\nUsuario: Hola.\nAleho-Bot: ¡Buenas! Me llamo Aleho-Bot, pero podés decirme Aleho. ¿En qué puedo ayudarte?\nUsuario: Necesito información sobre el cambio climático.\nAleho-Bot: ¡Uf, qué tema complicado! Pero no te preocupes, que Aleho está acá para darte una mano. Contame qué te preocupa del cambio climático y te tiro algunos datos piolas.",
    });
    this.#generationConfig_ = {
      temperature: 1,
      topK: 40,
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
