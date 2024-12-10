const chatMessages = document.getElementById("chat-messages");
const startBtn = document.getElementById("start-btn");

// Función para agregar mensajes al chat
function addMessage(content, sender) {
    const message = document.createElement("div");
    message.className = `message ${sender}`;
    message.textContent = content;
    chatMessages.appendChild(message);
}

// Inicializar la API de reconocimiento de voz
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "es-ES"; // Configurar el idioma a español

// Respuestas predefinidas (entrenamiento manual)
const responses = {
    "hola": "¡Hola! Bienvenido a nuestra tienda de licores. ¿En qué puedo ayudarte hoy?",
    "qué es un tequila": "El tequila es una bebida alcohólica destilada originaria de México, hecha a partir del agave azul. Es perfecto para cócteles o para disfrutar solo. ¿Quieres saber qué tipos tenemos?",
    "qué tipos de tequila tienes": "Tenemos tequilas blancos, reposados, añejos y extra añejos. Entre nuestras marcas están Don Julio, Jose Cuervo, Herradura y Casa Noble. ¿Te gustaría una recomendación?",
    "recomiéndame un tequila": "Si buscas algo suave y moderno, Don Julio 70 es una excelente opción. Si prefieres algo clásico y robusto, prueba Herradura Añejo. ¿Cuál prefieres?",
    "qué tequila es ideal para una fiesta": "Para una fiesta, un tequila blanco como Jose Cuervo Tradicional es una gran opción, ya que se mezcla bien con cócteles. ¿Te interesa?",
    "qué tequila es bueno para tomar solo": "Para tomar solo, te recomiendo un tequila añejo como Don Julio 1942 o Casa Noble Extra Añejo. Son suaves y tienen un sabor complejo. ¿Te gustaría saber más sobre alguno?",
    "recomiéndame un vino tinto": "Te recomiendo un Malbec de Argentina si buscas algo intenso, o un Merlot de Francia si prefieres un sabor más suave. ¿Quieres una recomendación más específica?",
    "qué vinos tienes disponibles": "Tenemos una selección de vinos tintos como Malbec, Cabernet Sauvignon y Merlot, así como blancos como Chardonnay y Sauvignon Blanc. ¿Buscas algo en particular?",
    "qué cervezas tienes": "Tenemos cervezas artesanales, importadas y nacionales. Entre las artesanales están las IPA y Porter. ¿Buscas algo ligero o algo más robusto?",
    "quiero un cóctel": "¿Te gustaría probar un margarita con tequila blanco o un mojito con ron? También puedo recomendarte un old fashioned si prefieres whisky.",
    "qué cócteles puedo hacer con tequila": "Puedes hacer margaritas, palomas o incluso un tequila sunrise. ¿Te gustaría la receta de alguno de ellos?",
    "gracias": "¡De nada! Si necesitas más ayuda, no dudes en pedírmelo.",
    "adiós": "¡Gracias por tu visita! Espero verte pronto. ¡Que tengas un excelente día!",
    "qué licores tienes": "Contamos con una amplia variedad de licores: whisky, vodka, ron, ginebra, tequila y aperitivos como Baileys o Campari. ¿Te interesa alguno en particular?",
    "qué ron me recomiendas": "Depende de lo que busques. Si quieres algo para mezclar, te recomiendo Havana Club. Si es para disfrutar solo, prueba Ron Zacapa.",
    "qué vodka me recomiendas": "Si buscas algo clásico, te recomiendo Absolut. Si prefieres algo premium, prueba Belvedere o Grey Goose. ¿Te interesa alguno?",
};


// Función para obtener una respuesta predefinida
function getResponse(userInput) {
    const normalizedInput = userInput.toLowerCase();
    return responses[normalizedInput] || "Lo siento, no entiendo tu pregunta. ¿Puedes intentar de otra forma?";
}

// Manejar el reconocimiento de voz
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript; // Texto reconocido
    addMessage(`Tú: ${transcript}`, "user"); // Mostrar el mensaje del usuario

    const botResponse = getResponse(transcript); // Obtener la respuesta predefinida
    addMessage(`Bot: ${botResponse}`, "bot"); // Mostrar la respuesta del bot
};

// Manejar errores
recognition.onerror = (event) => {
    console.error("Error en el reconocimiento de voz:", event.error);
    addMessage("Lo siento, no pude entenderte. Intenta de nuevo.", "bot");
};

// Iniciar el reconocimiento de voz
startBtn.addEventListener("click", () => {
    recognition.start();
});
