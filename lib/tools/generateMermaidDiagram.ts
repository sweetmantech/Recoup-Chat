import { generateText, tool } from "ai";
import { z } from "zod";
import { myProvider } from "../models";

export const generateMermaidDiagram = tool({
    description: "Generate a Mermaid diagram (flowchart, sequence diagram, etc.) based on the provided context.",
    parameters: z.object({
        context: z.string().describe(
            "Detailed description of the desired diagram, including entities, relationships, flow, or structure. " +
            "Specify the type of diagram if known (e.g., flowchart, sequence diagram). " +
            "Example: 'Flowchart for user login: Start -> Enter Credentials -> Validate -> Success/Failure'. " +
            "Example: 'Sequence diagram for API call: User -> Frontend -> API -> Database'"
        ),
    }),
    execute: async ({ context }) => {
        console.log("Generating mermaid diagram with context:", context);
        const result = await generateText({
            model: myProvider.languageModel("sonnet-3.7"),
            system: 'You are an expert Mermaid diagram generator. Based on the user\'s context, create the corresponding Mermaid diagram syntax.\n' +
                    '- Infer the diagram type (graph TD, sequenceDiagram, classDiagram, etc.) if not specified. Default to \'graph TD\' (flowchart) if unsure.\n' +
                    '- Return ONLY the Mermaid diagram code block.\n' +
                    '- Do NOT include any explanations, introductions, or text outside the \`\`\`mermaid code block.\n\n' +
                    'Example Input: \'Flowchart for basic decision: Start -> Decision Point? -> Yes branch -> End A; Decision Point? -> No branch -> End B\'\n' +
                    'Example Output:\n' +
                    '```mermaid\n' +
                    'graph TD;\n' +
                    '    A[Start] --> B{Decision Point?};\n' +
                    '    B -- Yes --> C[End A];\n' +
                    '    B -- No --> D[End B];\n' +
                    '```\n\n' +
                    'Example Input: \'Sequence diagram for API call: User -> Frontend -> API -> Database\'\n' +
                    'Example Output:\n' +
                    '```mermaid\n' +
                    'sequenceDiagram\n' +
                    '    participant User\n' +
                    '    participant Frontend\n' +
                    '    participant API\n' +
                    '    participant Database\n' +
                    '    User->>Frontend: Request data\n' +
                    '    Frontend->>API: Fetch data\n' +
                    '    API->>Database: Query data\n' +
                    '    Database-->>API: Return data\n' +
                    '    API-->>Frontend: Send data\n' +
                    '    Frontend-->>User: Display data\n' +
                    '```',
            prompt: `Generate a Mermaid diagram for the following context: ${context}`,
        })

        // Ensure the output is trimmed and potentially extract only the mermaid block if the model still adds extra text
        const extractedMermaid = result.text.match(/```mermaid\\n?([\\s\\S]*?)\\n?```/);
        const mermaidContent = extractedMermaid ? extractedMermaid[0] : result.text.trim();

        return {
            content: [{ type: "text", text: mermaidContent }],
            isError: false,
        };
    },
});

export default generateMermaidDiagram;