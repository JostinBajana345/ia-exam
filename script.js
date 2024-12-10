const chatMessages = document.getElementById("chat-messages");
const startBtn = document.getElementById("start-btn");

// Función para agregar mensajes al chat
function addMessage(content, sender) {
    const message = document.createElement("div");
    message.className = `message ${sender}`;
    message.textContent = content;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazarse hacia abajo automáticamente
}

// Inicializar la API de reconocimiento de voz
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "es-ES"; // Configurar el idioma a español

// Respuestas predefinidas con contextos específicos
const responses = {
    general: {
        "hola": "¡Hola! Bienvenido a nuestra tienda de licores. ¿En qué puedo ayudarte hoy?",
        "gracias": "¡De nada! ¿Hay algo más en lo que pueda ayudarte?",
        "adiós": "¡Gracias por tu visita! Espero verte pronto. ¡Que tengas un excelente día!"
    },
    cervezas: {
        "qué cervezas tienes": "Contamos con cervezas populares como Pilsener, Brahma, y Club Verde. También tenemos cervezas artesanales si buscas algo especial. ¿Te interesa alguna en particular?",
        "recomiéndame una cerveza": "Si buscas algo tradicional, te recomiendo una Pilsener o una Brahma. Si quieres algo más fuerte, prueba una Club Verde. ¿Cuál prefieres?",
        "tienes cervezas artesanales": "Sí, contamos con una selección de cervezas artesanales como IPA, Porter y Stout. ¿Te gustaría probar alguna de estas?",
    },
    puro: {
        "qué es el puro de balsapamba": "El puro de Balsapamba es un aguardiente típico de la región, conocido por su sabor fuerte y auténtico. Es ideal para compartir en reuniones o celebraciones especiales. ¿Te gustaría probarlo?",
        "recomiéndame un puro": "Sin duda, el puro de Balsapamba es una excelente elección. Tiene un sabor intenso y es perfecto para quienes disfrutan de bebidas tradicionales. ¿Te interesa?",
        "es bueno el puro de balsapamba": "Es muy bueno si te gustan los sabores fuertes y auténticos. Eso sí, ¡tómalo con moderación! Es una bebida para disfrutar despacio.",
    },
    vinos: {
        "qué vinos tienes": "Tenemos una selección de vinos económicos como el famoso Vino del Tuti, y otros más sofisticados como Merlot y Malbec. ¿Te interesa alguno en particular?",
        "recomiéndame un vino económico": "Si buscas algo económico y popular, el Vino del Tuti es una excelente opción. Ideal para reuniones o comidas casuales.",
        "recomiéndame un vino tinto": "Te recomiendo un Malbec de Argentina para sabores intensos, o un Merlot si prefieres algo más suave. ¿Te interesa alguno?",
    }
};

// Variable para manejar el contexto
let context = null;

// Función para obtener una respuesta basada en el contexto
function getResponse(userInput) {
    const normalizedInput = userInput.toLowerCase();

    // Buscar respuesta en el contexto actual
    if (context && responses[context][normalizedInput]) {
        return responses[context][normalizedInput];
    }

    // Cambiar el contexto basado en la entrada del usuario
    if (normalizedInput.includes("cerveza")) {
        context = "cervezas";
        return responses.cervezas["qué cervezas tienes"];
    }
    if (normalizedInput.includes("puro") || normalizedInput.includes("balsapamba")) {
        context = "puro";
        return responses.puro["qué es el puro de balsapamba"];
    }
    if (normalizedInput.includes("vino")) {
        context = "vinos";
        return responses.vinos["qué vinos tienes"];
    }

    // Respuesta general
    if (responses.general[normalizedInput]) {
        context = null; // Reiniciar el contexto si es una respuesta general
        return responses.general[normalizedInput];
    }

    return "Lo siento, no entiendo tu pregunta. ¿Puedes intentar de otra forma?";
}

// Manejar el reconocimiento de voz
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript; // Texto reconocido
    addMessage(`Tú: ${transcript}`, "user"); // Mostrar el mensaje del usuario

    const botResponse = getResponse(transcript); // Obtener la respuesta basada en el contexto
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
