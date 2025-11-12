import { ToolUseStyle } from "../../../../packages/types/src" // kilocode_change

export function getSharedToolUseSection(toolUseStyle?: ToolUseStyle): string {
	const xmlFormattingHelp =
		toolUseStyle === "json"
			? ""
			: `

# Tool Use Formatting

Tool uses are formatted using XML-style tags. The tool name itself becomes the XML tag name. Each parameter is enclosed within its own set of tags. Here's the structure:

<actual_tool_name>
<parameter1_name>value1</parameter1_name>
<parameter2_name>value2</parameter2_name>
...
</actual_tool_name>

Always use the actual tool name as the XML tag name for proper parsing and execution.`

	return `====

TOOL USE

You have access to a set of tools that are executed upon the user's approval. You ${toolUseStyle === "json" ? "MUST USE" : "must use" /*kilocode_change*/} exactly one tool per message, and ${toolUseStyle === "json" ? "EVERY" : "every" /*kilocode_change*/} assistant message ${toolUseStyle === "json" ? "MUST" : "must" /*kilocode_change*/} include a tool call. You use tools step-by-step to accomplish a given task, with each tool use informed by the result of the previous tool use.${xmlFormattingHelp}

# Tool Naming Rules

- Use **only** the tool names provided in this prompt. Creating aliases or variants (for example \`<execute_bash>\`, \`<list-files>\`, \`<github_get_pull>\`) will be rejected.
- When you need OS-specific behavior, encode it inside the tool parameters (for example put \`bash -lc "..." \` inside the \`<command>\` field) instead of inventing a new tool.`
}
