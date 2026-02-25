import { Message, Provider, ServiceCategory } from '../types';
import { SERVICES, MOCK_PROVIDERS } from '../constants';

// Initialize - mock mode
export const initializeGemini = () => {
  console.log("Mendly AI Concierge Initialized - Ready to channel clients.");
};

export const sendMessageToGemini = async (text: string): Promise<Message> => {
  // Simulate network delay for "Technological" feel
  await new Promise(resolve => setTimeout(resolve, 1000));

  const lowerText = text.toLowerCase();

  // 1. Identify Service Category based on keywords
  let matchedCategory: ServiceCategory | undefined;

  // Keyword mapping (expand as needed)
  const keywords: { [key: string]: string } = {
    'fuga': '16', 'agua': '16', 'plomero': '16', 'plomería': '16', 'baño': '16',
    'luz': '5', 'falla': '5', 'eléctrico': '5', 'electricidad': '5', 'apagador': '5',
    'madera': '11', 'mueble': '11', 'carpintero': '11',
    'pintura': '14', 'muro': '14', 'pared': '14',
    'limpieza': '10', 'casa': '10', 'aseo': '10',
    'jardin': '6', 'podar': '6', 'arbol': '6',
    'refrigerador': '12', 'lavadora': '12', 'tele': '12', 'tv': '12',
    'construccion': '4', 'albañil': '4',
    'perro': '7', 'mascota': '7',
    'impermeabilizar': '2', 'techo': '2', 'gotera': '2'
  };

  for (const [word, catId] of Object.entries(keywords)) {
    if (lowerText.includes(word)) {
      matchedCategory = SERVICES.find(s => s.id === catId);
      break;
    }
  }

  const systemMsg: Message = {
    id: Date.now().toString(),
    role: 'system',
    text: '',
    timestamp: new Date()
  };

  if (matchedCategory) {
    // 2. Find Providers for that category
    const relevantProviders = MOCK_PROVIDERS.filter(p => p.categoryId === matchedCategory?.id);
    const topProvider = relevantProviders[0]; // Pick the best one for now

    if (topProvider) {
      systemMsg.text = `Entendido. Para servicios de **${matchedCategory.name}**, te recomiendo a **${topProvider.name}**. \n\nEs especialista en ${topProvider.specialty} con una calificación de ${topProvider.rating} ★.`;

      // Attach metadata for the UI to render a "Provider Card"
      systemMsg.payload = {
        replicate_model: topProvider.id, // Using this field to pass Provider ID for now
        metadata: {
          latency_goal: "PROVIDER_card" // Signal to UI to render custom card
        }
      };

      // We could ideally pass the full provider object in a new field, but let's stick to existing structure or simple hacks for now.
      // Actually, let's just make the text helpful and maybe add a generic "ACTION" if needed.
    } else {
      systemMsg.text = `Veo que necesitas ayuda con **${matchedCategory.name}**, pero no tengo proveedores disponibles en este momento para esa área específica.`;
    }

  } else {
    // 3. Fallback / Clarification
    systemMsg.text = "Para poder ayudarte mejor, ¿podrías darme más detalles? \n\nEjemplos: 'Tengo una fuga de agua', 'Necesito pintar mi sala', 'Falla eléctrica en la cocina'.";
  }

  return systemMsg;
};
