import { publisher as pkgPublisher, name as pkgName, version as pkgVersion } from "../package.json"

const resolvedPublisher = process.env.PKG_PUBLISHER || pkgPublisher
const resolvedName = process.env.PKG_NAME || pkgName
const resolvedVersion = process.env.PKG_VERSION || pkgVersion

// These ENV variables can be defined by ESBuild when building the extension
// in order to override the values in package.json. This allows us to build
// different extension variants with the same package.json file.
// The build process still needs to emit a modified package.json for consumption
// by VSCode, but that build artifact is not used during the transpile step of
// the build, so we still need this override mechanism.
export const Package = {
	publisher: resolvedPublisher,
	name: resolvedName,
	version: resolvedVersion,
	extensionId: process.env.PKG_EXTENSION_ID || `${resolvedPublisher}.${resolvedName}`,
	outputChannel: process.env.PKG_OUTPUT_CHANNEL || resolvedName,
	sha: process.env.PKG_SHA,
} as const
