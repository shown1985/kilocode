/**
 * Minimal, webview-safe重写，避免引入VS Code或Node FS API，保证React bundle符合CSP。
 */

import { type ModeConfig, type CustomModePrompts, type PromptComponent, DEFAULT_MODES } from "@roo-code/types"

export type Mode = string

export const modes = DEFAULT_MODES

export const defaultModeSlug = "code"

export function getModeBySlug(slug: string, customModes?: ModeConfig[]): ModeConfig | undefined {
	const customMode = customModes?.find((mode) => mode.slug === slug)
	if (customMode) {
		return customMode
	}

	return modes.find((mode) => mode.slug === slug)
}

export function findModeBySlug(slug: string, modeList: readonly ModeConfig[] | undefined): ModeConfig | undefined {
	return modeList?.find((mode) => mode.slug === slug)
}

export function getAllModes(customModes?: ModeConfig[]): ModeConfig[] {
	if (!customModes?.length) {
		return [...modes]
	}

	const combined = [...modes]
	for (const customMode of customModes) {
		const index = combined.findIndex((mode) => mode.slug === customMode.slug)
		if (index !== -1) {
			combined[index] = customMode
		} else {
			combined.push(customMode)
		}
	}

	return combined
}

export function getModeSelection(modeSlug: string, promptComponent?: PromptComponent, customModes?: ModeConfig[]) {
	const customMode = findModeBySlug(modeSlug, customModes)
	const builtInMode = findModeBySlug(modeSlug, modes) || modes[0]

	if (customMode) {
		return {
			roleDefinition: customMode.roleDefinition || "",
			baseInstructions: customMode.customInstructions || "",
			description: customMode.description || "",
		}
	}

	return {
		roleDefinition: promptComponent?.roleDefinition || builtInMode.roleDefinition || "",
		baseInstructions: promptComponent?.customInstructions || builtInMode.customInstructions || "",
		description: builtInMode.description || "",
	}
}

export const defaultPrompts: Readonly<CustomModePrompts> = Object.freeze(
	Object.fromEntries(
		modes.map((mode) => [
			mode.slug,
			{
				roleDefinition: mode.roleDefinition,
				whenToUse: mode.whenToUse,
				customInstructions: mode.customInstructions,
				description: mode.description,
			},
		]),
	),
)

export function getRoleDefinition(modeSlug: string, customModes?: ModeConfig[]): string {
	return getModeBySlug(modeSlug, customModes)?.roleDefinition ?? ""
}

export function getDescription(modeSlug: string, customModes?: ModeConfig[]): string {
	return getModeBySlug(modeSlug, customModes)?.description ?? ""
}

export function getWhenToUse(modeSlug: string, customModes?: ModeConfig[]): string {
	return getModeBySlug(modeSlug, customModes)?.whenToUse ?? ""
}

export function getCustomInstructions(modeSlug: string, customModes?: ModeConfig[]): string {
	return getModeBySlug(modeSlug, customModes)?.customInstructions ?? ""
}
