import { generateText, tool } from "ai";
import { z } from "zod";
import { myProvider } from "../models";
import { MERMAID_INSTRUCTIONS_PROMPT } from "../consts";

export const generateMermaidDiagram = tool({
    description: "Generate a Mermaid diagram (Flow chart, Sequence diagram, etc.) based on the provided context and sends it directly to the frontend for rendering. Does not return the diagram in the response.",
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
            system: MERMAID_INSTRUCTIONS_PROMPT,
            prompt: `Generate a Mermaid diagram for the following context: ${context}
            `,
        })

        // Ensure the output is trimmed and potentially extract only the mermaid block if the model still adds extra text
        const extractedMermaid = result.text.match(/```mermaid\\n?([\\s\\S]*?)\\n?```/);
        // NOTE: mermaidContent is intentionally not used in the return value below.
        // The frontend intercepts this value during tool execution to render the diagram directly.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const mermaidContent = extractedMermaid ? extractedMermaid[0] : result.text.trim();

        // Send an empty content array as the frontend renders the diagram directly from the tool invocation result
        return {
            content: [{ type: "text", text: mermaidContent }],
            isError: false,
        };
    },
});

export default generateMermaidDiagram;