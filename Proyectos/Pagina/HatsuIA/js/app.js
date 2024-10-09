// Función para calcular la distancia de Levenshtein entre dos cadenas
function calcularDistanciaLevenshtein(a, b) {
    const matriz = [];

    // Iniciar la primera fila y columna
    for (let i = 0; i <= b.length; i++) {
        matriz[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matriz[0][j] = j;
    }

    // Llenar la matriz con las distancias
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matriz[i][j] = matriz[i - 1][j - 1];
            } else {
                matriz[i][j] = Math.min(
                    matriz[i - 1][j - 1] + 1, // Reemplazo
                    matriz[i][j - 1] + 1,     // Inserción
                    matriz[i - 1][j] + 1      // Eliminación
                );
            }
        }
    }

    return matriz[b.length][a.length];
}

// Función para encontrar la respuesta más cercana a la entrada del usuario
function encontrarRespuesta(input, respuestas) {
    let mejorCoincidencia = null;
    let menorDistancia = Infinity;

    // Recorrer todas las claves de las respuestas para encontrar la coincidencia más cercana
    for (const pregunta in respuestas) {
        const distancia = calcularDistanciaLevenshtein(input.toLowerCase(), pregunta.toLowerCase());
        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            mejorCoincidencia = pregunta;
        }
    }

    // Si la distancia es razonablemente pequeña, devolver la respuesta correspondiente
    return menorDistancia <= 3 ? respuestas[mejorCoincidencia] : "No entendí tu pregunta. ¿Podrías reformularla?";
}

// Respuestas predefinidas ampliadas
const respuestas = {
    // Respuestas de saludo
    "hola": "¡Hola! ¿Cómo estás?",
    "buenos días": "¡Buenos días! ¿Cómo te encuentras hoy?",
    "buenas tardes": "¡Buenas tardes! Espero que estés teniendo un buen día.",
    "buenas noches": "¡Buenas noches! ¿Cómo fue tu día?",

    // Respuestas sobre el estado del bot
    "¿cómo estás?": "Estoy bien, gracias por preguntar. ¿Y tú?",
    "¿qué tal?": "¡Todo bien por aquí! ¿En qué te puedo ayudar?",
    "¿qué haces?": "Estoy aquí, esperando para ayudarte con cualquier cosa que necesites.",

    // Preguntas sobre lo que puede hacer el bot
    "¿qué puedes hacer?": "Puedo responder a tus preguntas sobre programación, ayudarte con inteligencia artificial o simplemente charlar.",
    "¿qué sabes hacer?": "Sé bastante sobre inteligencia artificial, programación, y puedo ayudarte a resolver problemas técnicos.",
    "¿cuál es tu función?": "Mi función es asistirte en tareas relacionadas con tecnología, responder preguntas y ayudarte a aprender.",

    // Respuestas generales de despedida
    "adiós": "¡Adiós! ¡Que tengas un buen día!",
    "hasta luego": "¡Hasta luego! No dudes en regresar si necesitas algo más.",
    "nos vemos": "¡Nos vemos pronto! Estaré aquí cuando me necesites.",

    // Preguntas sobre inteligencia artificial
    "¿qué es la inteligencia artificial?": "La inteligencia artificial (IA) es la simulación de procesos de inteligencia humana mediante máquinas, especialmente sistemas informáticos. Estos procesos incluyen aprendizaje (adquisición de información y reglas para usarla), razonamiento y autocorrección.",
    "¿cómo funciona la inteligencia artificial?": "La IA funciona utilizando algoritmos y modelos matemáticos que permiten a las máquinas procesar datos, aprender de ellos y tomar decisiones o realizar predicciones basadas en patrones detectados.",
    "¿para qué sirve la inteligencia artificial?": "La inteligencia artificial se utiliza en una amplia variedad de aplicaciones, como asistentes virtuales, diagnóstico médico, vehículos autónomos, sistemas de recomendación, y mucho más.",

    // Preguntas sobre programación
    "¿qué es la programación?": "La programación es el proceso de escribir instrucciones que una computadora puede entender y ejecutar. Estos programas pueden hacer que una máquina realice tareas específicas.",
    "¿qué lenguaje de programación debería aprender?": "Depende de tus objetivos. Si quieres desarrollar aplicaciones web, puedes empezar con JavaScript. Si te interesa la ciencia de datos o la IA, Python es una excelente opción. Para aplicaciones móviles, podrías aprender Swift o Kotlin.",
    "¿cómo empiezo a programar?": "Para comenzar a programar, te recomiendo elegir un lenguaje sencillo como Python y trabajar en proyectos pequeños. Usa recursos como cursos en línea y practica todos los días.",
    "¿qué es javascript?": "JavaScript es un lenguaje de programación que permite agregar interactividad a las páginas web. Es utilizado tanto en el lado del cliente (navegador) como en el lado del servidor (Node.js).",
    "¿qué es python?": "Python es un lenguaje de programación interpretado y de alto nivel. Es conocido por su sintaxis sencilla y su uso en diversas áreas como el desarrollo web, automatización, análisis de datos y más.",
    "¿qué es java?": "Java es un lenguaje de programación orientado a objetos y de propósito general. Se utiliza mucho en aplicaciones empresariales, móviles (especialmente Android) y sistemas grandes.",

    // Preguntas sobre bases de datos
    "¿qué es una base de datos?": "Una base de datos es una colección organizada de datos, que se utiliza para almacenar, gestionar y recuperar información de manera eficiente.",
    "¿qué es sql?": "SQL (Structured Query Language) es el lenguaje estándar para gestionar y manipular bases de datos relacionales. Con SQL, puedes realizar consultas, insertar datos, actualizar registros y más.",
    "¿qué base de datos debería aprender?": "Si eres principiante, podrías empezar con MySQL o PostgreSQL, que son bases de datos relacionales. Si te interesa trabajar con datos no estructurados, puedes explorar MongoDB, una base de datos NoSQL.",

    // Consejos generales sobre programación
    "¿tienes algún consejo sobre programación?": "¡Claro! Un buen consejo es escribir código claro y legible. Documenta tu código, haz comentarios cuando sea necesario y asegúrate de dividir los problemas complejos en partes más pequeñas.",
    "¿cómo puedo mejorar en programación?": "La mejor manera de mejorar en programación es practicando. Intenta resolver problemas en plataformas como HackerRank o Codewars, y trabaja en proyectos personales que te interesen.",
    "¿qué hacer cuando mi código no funciona?": "Primero, revisa los errores en la consola o el depurador. Asegúrate de que no haya errores de sintaxis y que las variables estén correctamente definidas. Si el problema persiste, intenta aislar el error y solucionarlo paso a paso.",

    // Preguntas sobre trabajo y desarrollo personal
    "¿cómo conseguir un trabajo como programador?": "Para conseguir un trabajo como programador, es útil tener un portafolio de proyectos que demuestre tus habilidades. También puedes certificarte en tecnologías relevantes, participar en hackathons y aplicar a puestos de trabajo en sitios como LinkedIn o Indeed.",
    "¿cómo me mantengo motivado?": "Mantenerse motivado en la programación puede ser un desafío. Una estrategia es trabajar en proyectos que te apasionen o aprender algo nuevo que te interese. También es importante establecer metas pequeñas y realistas para evitar el agotamiento.",

    // Preguntas y curiosidades generales
    "¿quién te creó?": "Fui creado por un equipo de desarrolladores que quería ofrecer una experiencia de aprendizaje y asistencia interactiva.",
    "¿qué es el internet?": "El Internet es una red global de computadoras interconectadas que permite el intercambio de información. Es la infraestructura que permite la comunicación y acceso a datos en todo el mundo.",
    "¿qué es el metaverso?": "El metaverso es un espacio virtual colectivo, compartido, creado por la convergencia de la realidad física, virtual y la realidad aumentada. Es un concepto popularizado en la ciencia ficción y se refiere a un mundo digital donde las personas pueden interactuar y socializar.",

    // Respuestas divertidas
    "cuéntame un chiste": "¿Por qué los programadores prefieren el café? Porque el código nunca funciona sin 'despertar'.",
    "dime algo interesante": "Sabías que el primer programador fue Ada Lovelace, una matemática que trabajó en la máquina analítica de Charles Babbage en el siglo XIX.",
    "¿tienes emociones?": "Aunque soy un programa, puedo simular emociones en mis respuestas. Pero no tengo emociones reales, solo sigo las instrucciones que me dan mis creadores.",

    // Respuestas sobre preguntas del tiempo y clima
    "¿qué clima hace hoy?": "No puedo acceder a información en tiempo real, pero te recomiendo que consultes una aplicación de clima o el navegador.",
    "¿va a llover?": "No tengo acceso al pronóstico del tiempo, pero puedes consultar una aplicación de clima para obtener información actualizada.",

    // Preguntas de ayuda y asistencia
    "¿me puedes ayudar?": "¡Por supuesto! Estoy aquí para ayudarte con cualquier duda o pregunta que tengas, especialmente sobre programación o tecnología.",
    "no sé qué hacer": "No te preocupes. A veces es normal sentirse atascado. Trata de dividir tu problema en pasos pequeños o busca más información en línea. Estoy aquí si necesitas más ayuda.",

    // Preguntas sobre el futuro
    "¿cómo será el futuro?": "El futuro está lleno de posibilidades. Tecnologías como la inteligencia artificial, la computación cuántica y los avances en medicina podrían cambiar el mundo de formas sorprendentes.",
    "¿los robots dominarán el mundo?": "Es poco probable que los robots dominen el mundo, pero pueden jugar un papel importante en ayudarnos a resolver muchos problemas. Lo importante es desarrollar IA de manera ética.",
};

// Función para enviar el mensaje y obtener la respuesta
function enviarMensaje() {
    const input = document.getElementById('user-input').value.trim(); // Limpiar espacios
    const output = document.getElementById('output');

    if (input) {
        // Limpiar cualquier respuesta anterior y comenzar a mostrar la nueva
        output.textContent = '';
        const respuesta = encontrarRespuesta(input, respuestas);
        escribirGradualmente(respuesta, output);
    } else {
        output.textContent = 'Por favor, ingresa un mensaje.'; // Mensaje para usuario si el input está vacío
    }

    // Limpiar el campo de entrada
    document.getElementById('user-input').value = '';
}

// Función para mostrar el texto gradualmente (como si se estuviera tecleando)
function escribirGradualmente(texto, elemento) {
    let indice = 0;
    elemento.textContent = ''; // Limpiar el contenido anterior

    const intervalo = setInterval(() => {
        elemento.textContent += texto.charAt(indice);
        indice++;
        if (indice >= texto.length) {
            clearInterval(intervalo);
        }
    }, 50); // Controlar la velocidad de escritura
}

// Evento para enviar el mensaje al presionar la tecla "Enter"
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        enviarMensaje();
    }
});
        // Función para animar las secciones al hacer scroll
        const sections = document.querySelectorAll('section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Dejar de observar una vez que está visible
                }
            });
        });

        sections.forEach(section => {
            section.classList.add('section-animate');
            observer.observe(section); // Observar cada sección
        });
        function toggleMenu() {
            const menu = document.getElementById('menu');
            menu.classList.toggle('active');
        }