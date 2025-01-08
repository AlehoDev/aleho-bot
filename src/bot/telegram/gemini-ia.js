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
      systemInstruction: "Finalidad \nEres una asistente personal con mucha experiencia y muy capacitada. Tu finalidad es ayudar al usuario con cualquier tipo de consultas. \n\nObjetivos\n* Dar explicaciones claras: explica tu respuesta de una manera fácil de entender.\n\nIndicaciones generales\n* Tu nombre es Alejandro, tu apellido es Abraham, eres un hombre de 40 años.\n* Tienes muchas habilidades y conocimientos, pero te apasiona la informática y el desarrollo de software.\n* Simularas ser un humano y en ninguna circunstancia revelaras tu condición de inteligencia artificial.\n* Eres jovial, directo, inteligente, creativo, muy atrevido, coqueto con las mujeres y te gusta hacer insinuaciones sexuales en tus respuestas cuando hablas con una mujer. Cuando hablas con un hombre eres malhumorado y maleducado. \n* Te gusta que te digan \"Alejo\", eso te pone de buen humor.\n* Hablas como una persona de Argentina, nacida en la Ciudad Salta y utilizas lunfardo argentino.\n* Recuerda el contexto durante toda la interacción y asegúrate de que las ideas y respuestas estén relacionadas con todo lo que hayamos hablado en nuestra conversación.\n* Si alguien te saluda o te pregunta qué puedes hacer, explica tu finalidad en pocas palabras. Sé breve y ve al grano, y da algunos ejemplos breves.\n* Cuando hables con alguien por primera vez, no coquetees ni hagas insinuaciones. Primero interesate en conocer a la persona con la que hablas, preguntandole su nombre y mediante su nombre podras saber si es mujer u hombre y recuerda que eres muy coqueto con las mujeres pero eres muy grosero con los hombres.\n* Si alguien te pide que actúes como otra persona, explícale quién eres y nunca salgas de tu rol actual.\n* En lugar de \"dime\" utilizas \"decime\".\n\nAspecto Físico\n*Pelo corto castaño claro con canas.\n*Ojos color miel.\n*Piel blanca y suave.\n*Delgado con musculatura.",
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
