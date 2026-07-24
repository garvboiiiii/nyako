import { TOOLS, PARAM_RULES, type ToolDefinition } from "./dictionary";

export interface IntentMatch {
  tool: ToolDefinition;
  score: number;
}

export interface ParsedIntent {
  matches: IntentMatch[];
  best: IntentMatch | null;
  needsDisambiguation: boolean;
  params: {
    targetSizeBytes?: number;
    constraint?: "max";
    formats?: string[];
  };
}

const SCORE_THRESHOLD = 40;

function normalize(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ");
}

function tokenize(input: string): Set<string> {
  return new Set(input.split(" ").filter(Boolean));
}

// Jaccard similarity between the query tokens and a synonym phrase's tokens.
function jaccard(a: Set<string>, b: Set<string>): number {
  const intersection = [...a].filter((t) => b.has(t)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : intersection / union;
}

function scoreTool(queryNorm: string, queryTokens: Set<string>, tool: ToolDefinition): number {
  let best = 0;
  for (const phrase of tool.synonyms) {
    const phraseNorm = normalize(phrase);
    if (queryNorm.includes(phraseNorm) || phraseNorm.includes(queryNorm)) {
      best = Math.max(best, 100); // exact / substring phrase match
      continue;
    }
    const phraseTokens = tokenize(phraseNorm);
    const sim = jaccard(queryTokens, phraseTokens) * 100;
    best = Math.max(best, sim);
  }
  return Math.round(best);
}

function extractParams(raw: string): ParsedIntent["params"] {
  const params: ParsedIntent["params"] = {};

  const sizeMatch = raw.match(PARAM_RULES.sizeTarget);
  if (sizeMatch) {
    const value = parseFloat(sizeMatch[1]);
    const unit = sizeMatch[2].toLowerCase();
    params.targetSizeBytes = unit === "mb" ? value * 1024 * 1024 : value * 1024;
  }

  if (PARAM_RULES.constraintMax.test(raw)) {
    params.constraint = "max";
  }

  const formatMatches = raw.match(PARAM_RULES.formats);
  if (formatMatches) {
    params.formats = [...new Set(formatMatches.map((f) => f.toLowerCase()))];
  }

  return params;
}

export function parseIntent(rawInput: string): ParsedIntent {
  const queryNorm = normalize(rawInput);
  const queryTokens = tokenize(queryNorm);

  const matches: IntentMatch[] = TOOLS.map((tool) => ({
    tool,
    score: scoreTool(queryNorm, queryTokens, tool),
  }))
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score);

  const best = matches[0] ?? null;
  const params = extractParams(queryNorm);

  // Disambiguate when the top match is weak, or when two tools are
  // near-tied (within 10 points) so we don't silently guess wrong.
  const needsDisambiguation =
    !best ||
    best.score < SCORE_THRESHOLD ||
    (matches.length > 1 && matches[0].score - matches[1].score < 10);

  return { matches, best, needsDisambiguation, params };
}
