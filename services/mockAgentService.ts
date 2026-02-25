import { Message, MendlyJSONOutput, Role } from '../types';

// Mock Agent Logic based on Strategy Book
export const processUserMessage = async (input: string): Promise<Message> => {
    const lowerInput = input.toLowerCase();

    // Default Response Structure
    const baseResponse: Message = {
        id: Date.now().toString(),
        role: 'model' as Role, // Force cast to Role
        text: '',
        timestamp: new Date(),
        action: undefined,
        payload: undefined
    };

    // 1. DESIGN FLOW (Signature)
    if (lowerInput.includes('design') || lowerInput.includes('decor') || lowerInput.includes('style') || lowerInput.includes('modern')) {
        const isImageUpload = lowerInput.includes('image') || lowerInput.includes('photo');

        if (!isImageUpload && !lowerInput.includes('render')) {
            // Step 1: Ask for Photo
            baseResponse.text = "MENDLY ARCHITECT: Request acknowledged.\n\nPROTOCOL: Signature Design.\nSTATUS: Awaiting visual input.\n\nACTION: Upload a sharp photo of the space to trigger the render engine.";
            return baseResponse;
        }

        // Step 2: Simulate Render Generation
        baseResponse.text = "MENDLY ARCHITECT: Visual data received.\n\nANALYSIS: Brutalist/Minimalist parameters identified.\nCOMPUTING: Generating flux-pro-v1 visualization...\n\nSTATUS: Render generated effectively (Latency: <120s).";
        baseResponse.action = 'RENDER_GENERATED';
        baseResponse.payload = {
            id_cliente: "MOCK-USR-001",
            categoria_servicio: "Signature_Design",
            descripcion_problema: input,
            render_trigger: true,
            replicate_model: "flux-pro-v1",
            cotizacion_estimada: 4500.00,
            metadata: {
                latency_goal: "sub_120s",
                raw_prompt: "Interior design, brutalist style, concrete textures"
            }
        };
        return baseResponse;
    }

    // 2. MAINTENANCE FLOW (Certified)
    if (lowerInput.includes('clean') || lowerInput.includes('leak') || lowerInput.includes('repair') || lowerInput.includes('fix')) {
        baseResponse.text = "MENDLY OPS: Issue categorized: MAINTENANCE.\n\nDIAGNOSIS REQUIRED: Is the failure structural (e.g., wall leak) or cosmetic (e.g., dripping faucet)?\n\nINPUT: Define severity level (1-5).";
        baseResponse.payload = {
            categoria_servicio: "Maintenance_Certified",
            urgencia_nivel: 3,
            cotizacion_estimada: 850.00 // Base callout fee
        };
        return baseResponse;
    }

    // Default / Fallback
    baseResponse.text = "MENDLY SYSTEM: Input unclear.\n\nCOMMANDS:\n1. 'Design': Initiate renovation protocol.\n2. 'Maintenance': Report technical failure.\n\nAwaiting directive.";
    return baseResponse;
};
