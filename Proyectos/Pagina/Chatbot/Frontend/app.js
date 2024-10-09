document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-hamburguesa');
    const menu = document.getElementById('menu');

    // Manejo del menú hamburguesa
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('show');
        });
    }

    const sendButton = document.getElementById('send-button');
    const chatOutput = document.getElementById("chat-output");
    const userInput = document.getElementById("user-input");

    // Presentación inicial del bot
    setTimeout(() => {
        displayMessage("Hola, soy Haru, un chatbot creado por Domingo. ¿En qué puedo ayudarte hoy?", 'chatbot');
        displayMessage("Por favor elige una opción: 1) Restaurante 2) Citas 3) Soporte Técnico", 'chatbot');
    }, 500);

    // Manejo del botón de envío
    if (sendButton) {
        sendButton.addEventListener('click', handleUserInput);
    }

    // Manejo del envío con la tecla Enter
    userInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            handleUserInput();
        }
    });

    let state = {
        option: null,
        numPersons: null,
        reservationDate: null,
        reservationTime: null,
        appointmentType: null
    };

    // Función para manejar la entrada del usuario
    function handleUserInput() {
        const input = userInput.value.trim();
        if (input) {
            displayMessage(input, 'user'); // Muestra el mensaje del usuario
            userInput.value = ''; // Limpia el campo de entrada
            getBotResponse(input); // Obtiene la respuesta del bot
        }
    }

    function displayMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
    
        // Creación de la imagen del bot
        const botImage = document.createElement('img');
        botImage.src = '../../../src/images/Logo/Chatbot.png'; // Ruta a la imagen del bot
        botImage.alt = 'Chatbot';
        botImage.className = 'bot-image'; // Clases CSS para ajustar el tamaño
    
        if (type === 'user') {
            const userMessageElement = document.createElement('p');
            userMessageElement.className = 'user-message';
            userMessageElement.textContent = message;
            messageElement.appendChild(userMessageElement);
        } else {
            const botMessageElement = document.createElement('p');
            botMessageElement.className = 'chatbot-message';
            botMessageElement.textContent = message;
    
            // Primero, añade la imagen y luego el mensaje
            messageElement.appendChild(botImage);
            messageElement.appendChild(botMessageElement);
        }
    
        chatOutput.appendChild(messageElement);
        chatOutput.scrollTop = chatOutput.scrollHeight; // Desplazarse hacia abajo
    }

    // Función para obtener la respuesta del bot
    function getBotResponse(userMessage) {
        const normalizedInput = normalizarTexto(userMessage);
        const responses = {
            "hola": "¡Hola! ¿Cómo puedo ayudarte hoy?",
            "¿cuál es tu nombre?": "Soy Haru, un chatbot creado por Domingo.",
            "¿cómo puedo ayudarte?": "Puedes preguntarme sobre mis funciones o cualquier duda que tengas.",
            "adiós": "¡Hasta luego! Espero verte pronto.",
            "gracias": "¡De nada! Estoy aquí para ayudarte.",
            "¿qué puedes hacer?": "Puedo ayudarte con: 1) Reservas en restaurantes 2) Agendar citas 3) Soporte técnico.",
            "¿quién te creó?": "Fui creado por Domingo, un desarrollador de software.",
            // Opciones de servicio
            "restaurante": "Puedo ayudarte a hacer reservas. ¿Para cuántas personas deseas reservar?",
            "citas": "¿Qué tipo de cita deseas agendar? Puedes decirme 'cita médica', 'cita con el dentista', etc.",
            "soporte técnico": "¿Qué problema estás teniendo? Estoy aquí para ayudarte con cualquier problema técnico.",
            // Reservas en restaurante
            "reservar para": "Perfecto, ¿para cuántas personas deseas reservar?",
            "reservar para dos": "Hecho. ¿Qué fecha deseas para la reserva?",
            "reservar para tres": "Entendido. ¿Qué fecha prefieres para la reserva?",
            "reservar para cuatro": "Listo. ¿Para qué fecha deseas reservar?",
            "reservar para cinco": "De acuerdo. ¿Qué fecha prefieres para la reserva?",
            "reservar": "Por favor, indícame para cuántas personas y qué fecha prefieres.",
            "fecha": "Perfecto, ¿qué fecha tienes en mente para la reserva?",
            // Confirmación de reservas
            "confirmar reserva": "Tu reserva ha sido confirmada. ¡Gracias por usar nuestro servicio!",
            // Agendamiento de citas
            "agendar cita": "¿Qué fecha y hora deseas para tu cita?",
            "cita médica": "Entendido, ¿qué día y hora prefieres para tu cita médica?",
            "cita con el dentista": "Perfecto, por favor indícame el día y la hora para tu cita con el dentista.",
            // Soporte técnico
            "soporte": "Por favor, indícame qué problema estás teniendo. Estoy aquí para ayudarte.",
            "no puedo acceder a mi cuenta": "Entiendo, ¿podrías decirme qué error estás viendo?",
            "mi computadora no enciende": "Lo siento por los inconvenientes. ¿Has probado desconectarla y volver a conectarla?",
            // Mensajes de error
            "opción no válida": "Lo siento, no entendí esa opción. Por favor, elige 1) Restaurante 2) Citas 3) Soporte Técnico.",
            // Agrega más respuestas aquí
        };

        // Lógica de manejo de opciones
        if (state.option === null) {
            if (["1", "restaurante"].includes(normalizedInput)) {
                state.option = "restaurante";
                displayMessage(responses["restaurante"], 'chatbot');
            } else if (["2", "citas"].includes(normalizedInput)) {
                state.option = "citas";
                displayMessage(responses["citas"], 'chatbot');
            } else if (["3", "soporte técnico"].includes(normalizedInput)) {
                state.option = "soporte técnico";
                displayMessage(responses["soporte técnico"], 'chatbot');
            } else {
                displayMessage(responses["opción no válida"], 'chatbot');
            }
            return;
        }

        // Manejo de reservas
        if (state.option === "restaurante") {
            if (state.numPersons === null) {
                const numPersonsMatch = normalizedInput.match(/(\d+)/);
                if (numPersonsMatch) {
                    state.numPersons = numPersonsMatch[0];
                    displayMessage(`He entendido que deseas reservar para ${state.numPersons} personas. ¿Qué fecha deseas?`, 'chatbot');
                } else {
                    displayMessage("Por favor, indícame el número de personas para la reserva.", 'chatbot');
                }
            } else if (state.reservationDate === null) {
                state.reservationDate = normalizedInput;
                displayMessage(`Perfecto, has reservado para ${state.numPersons} personas. ¿A qué hora te gustaría hacer la reserva?`, 'chatbot');
            } else if (state.reservationTime === null) {
                state.reservationTime = normalizedInput;
                displayMessage(`Tu reserva ha sido confirmada para ${state.numPersons} personas el ${state.reservationDate} a las ${state.reservationTime}. ¡Gracias por usar nuestro servicio!`, 'chatbot');
                resetState(); // Reiniciar el estado para otra operación
            }
            return;
        }

        // Manejo de agendamiento de citas
        if (state.option === "citas") {
            if (state.appointmentType === null) {
                if (normalizedInput.includes("cita médica")) {
                    state.appointmentType = "cita médica";
                    displayMessage("¿Qué día y hora prefieres para tu cita médica?", 'chatbot');
                } else if (normalizedInput.includes("cita con el dentista")) {
                    state.appointmentType = "cita con el dentista";
                    displayMessage("¿Qué día y hora prefieres para tu cita con el dentista?", 'chatbot');
                } else {
                    displayMessage("Por favor, indícame qué tipo de cita deseas agendar.", 'chatbot');
                }
            } else {
                displayMessage(`Tu ${state.appointmentType} ha sido agendada para ${normalizedInput}. ¡Gracias!`, 'chatbot');
                resetState(); // Reiniciar el estado para otra operación
            }
            return;
        }

        // Comprobaciones de soporte técnico
        if (state.option === "soporte técnico") {
            displayMessage("Por favor, indícame qué problema estás teniendo. Estoy aquí para ayudarte.", 'chatbot');
            return;
        }

        // Si no se reconoce la entrada, usar Levenshtein
        const botMessage = encontrarRespuesta(normalizedInput, responses);
        displayMessage(botMessage, 'chatbot');
    }

    // Función para normalizar texto
    function normalizarTexto(text) {
        return text.toLowerCase().replace(/[^\w\s]/g, '');
    }

    // Función para encontrar respuesta usando Levenshtein
    function encontrarRespuesta(userInput, responses) {
        const closestResponse = Object.keys(responses).reduce((a, b) =>
            (levenshteinDistance(userInput, a) < levenshteinDistance(userInput, b) ? a : b)
        );
        return responses[closestResponse] || "Lo siento, no puedo ayudar con eso.";
    }

    // Implementación de la distancia de Levenshtein
    function levenshteinDistance(a, b) {
        const matrix = [];
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // Sustitución
                        Math.min(matrix[i][j - 1] + 1, // Inserción
                        matrix[i - 1][j] + 1) // Eliminación
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    }

    // Reiniciar el estado para otra operación
    function resetState() {
        state = {
            option: null,
            numPersons: null,
            reservationDate: null,
            reservationTime: null,
            appointmentType: null
        };
    }
});
