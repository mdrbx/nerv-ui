"use client";

import { forwardRef, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

export type TitleScreenTemplate = "stacked" | "episode" | "finale" | "freeform";
export type TitleScreenAppearance = "plain" | "glow";
export type TitleScreenReveal = "none" | "minimal";
export type TitleScreenAnchor =
  | "top-left"
  | "top-center"
  | "top-right"
  | "middle-left"
  | "center"
  | "middle-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
export type TitleScreenRole =
  | "masthead"
  | "lead"
  | "hero"
  | "label"
  | "quote"
  | "support"
  | "footer";
export type TitleScreenWidth = "content" | "narrow" | "medium" | "wide" | "full";
export type TitleScreenFont = "title" | "display" | "mono";
export type TitleScreenTone = "primary" | "secondary" | "muted";
export type TitleScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "display";

export interface TitleScreenBlock {
  id?: string;
  text: string | string[];
  role: TitleScreenRole;
  anchor?: TitleScreenAnchor;
  offsetX?: string;
  offsetY?: string;
  align?: "left" | "center" | "right";
  width?: TitleScreenWidth;
  font?: TitleScreenFont;
  tone?: TitleScreenTone;
  size?: TitleScreenSize;
  italic?: boolean;
  uppercase?: boolean;
}

export interface TitleScreenProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "className"> {
  /** Title-card composition preset */
  template?: TitleScreenTemplate;
  /** Ordered blocks rendered on the title-card stage */
  blocks: TitleScreenBlock[];
  /** Optional overall treatment */
  appearance?: TitleScreenAppearance;
  /** Motion intensity */
  reveal?: TitleScreenReveal;
  /** Optional className */
  className?: string;
}

interface PlacementConfig {
  anchor: TitleScreenAnchor;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  width?: TitleScreenWidth;
  align?: "left" | "center" | "right";
  transform?: string;
}

interface ResolvedBlockConfig {
  anchor: TitleScreenAnchor;
  align: "left" | "center" | "right";
  width: TitleScreenWidth;
  font: TitleScreenFont;
  tone: TitleScreenTone;
  size: TitleScreenSize;
  italic: boolean;
  uppercase: boolean;
  style: CSSProperties;
}

const widthMap: Record<TitleScreenWidth, string> = {
  content: "auto",
  narrow: "24%",
  medium: "38%",
  wide: "62%",
  full: "88%",
};

const fontMap: Record<TitleScreenFont, string> = {
  title: "var(--font-nerv-title)",
  display: "var(--font-nerv-display)",
  mono: "var(--font-nerv-mono)",
};

const toneMap: Record<TitleScreenTone, string> = {
  primary: "#f2ece2",
  secondary: "rgba(242,236,226,0.86)",
  muted: "rgba(242,236,226,0.58)",
};

const sizeMap: Record<TitleScreenSize, string> = {
  xs: "1.8cqw",
  sm: "2.6cqw",
  md: "3.6cqw",
  lg: "6.2cqw",
  xl: "9.8cqw",
  display: "16cqw",
};

const roleDefaults: Record<
  TitleScreenRole,
  Omit<ResolvedBlockConfig, "anchor" | "style">
> = {
  masthead: {
    align: "left",
    width: "medium",
    font: "title",
    tone: "primary",
    size: "xl",
    italic: false,
    uppercase: false,
  },
  lead: {
    align: "left",
    width: "medium",
    font: "title",
    tone: "primary",
    size: "xl",
    italic: false,
    uppercase: false,
  },
  hero: {
    align: "left",
    width: "full",
    font: "title",
    tone: "primary",
    size: "display",
    italic: false,
    uppercase: false,
  },
  label: {
    align: "left",
    width: "content",
    font: "display",
    tone: "primary",
    size: "md",
    italic: false,
    uppercase: false,
  },
  quote: {
    align: "right",
    width: "wide",
    font: "title",
    tone: "primary",
    size: "xl",
    italic: false,
    uppercase: false,
  },
  support: {
    align: "center",
    width: "wide",
    font: "title",
    tone: "secondary",
    size: "lg",
    italic: false,
    uppercase: false,
  },
  footer: {
    align: "left",
    width: "medium",
    font: "display",
    tone: "secondary",
    size: "md",
    italic: false,
    uppercase: false,
  },
};

const anchorPlacements: Record<TitleScreenAnchor, PlacementConfig> = {
  "top-left": { anchor: "top-left", top: "8%", left: "6%", align: "left" },
  "top-center": {
    anchor: "top-center",
    top: "8%",
    left: "50%",
    align: "center",
    transform: "translateX(-50%)",
  },
  "top-right": { anchor: "top-right", top: "8%", right: "6%", align: "right" },
  "middle-left": {
    anchor: "middle-left",
    top: "50%",
    left: "6%",
    align: "left",
    transform: "translateY(-50%)",
  },
  center: {
    anchor: "center",
    top: "50%",
    left: "50%",
    align: "center",
    transform: "translate(-50%, -50%)",
  },
  "middle-right": {
    anchor: "middle-right",
    top: "50%",
    right: "6%",
    align: "right",
    transform: "translateY(-50%)",
  },
  "bottom-left": { anchor: "bottom-left", bottom: "10%", left: "6%", align: "left" },
  "bottom-center": {
    anchor: "bottom-center",
    bottom: "10%",
    left: "50%",
    align: "center",
    transform: "translateX(-50%)",
  },
  "bottom-right": {
    anchor: "bottom-right",
    bottom: "10%",
    right: "6%",
    align: "right",
  },
};

const templatePlacements: Record<
  Exclude<TitleScreenTemplate, "freeform">,
  Partial<Record<TitleScreenRole, PlacementConfig>>
> = {
  stacked: {
    masthead: { anchor: "top-left", top: "7%", left: "5.5%", width: "narrow" },
    lead: { anchor: "top-left", top: "22%", left: "5.5%", width: "medium" },
    hero: { anchor: "middle-left", top: "52%", left: "5%", width: "full" },
    label: { anchor: "bottom-left", bottom: "24%", left: "5.5%", width: "content" },
    quote: {
      anchor: "bottom-right",
      bottom: "11%",
      right: "6.5%",
      width: "full",
      align: "right",
    },
    support: {
      anchor: "bottom-center",
      bottom: "9%",
      left: "50%",
      width: "wide",
      align: "center",
      transform: "translateX(-50%)",
    },
    footer: { anchor: "bottom-left", bottom: "8.5%", left: "5.5%", width: "medium" },
  },
  episode: {
    masthead: { anchor: "top-left", top: "8%", left: "6%", width: "narrow" },
    label: { anchor: "top-left", top: "10%", left: "6%", width: "content" },
    lead: { anchor: "top-left", top: "20%", left: "6%", width: "medium" },
    hero: {
      anchor: "bottom-right",
      bottom: "10%",
      right: "6%",
      width: "wide",
      align: "right",
    },
    support: { anchor: "middle-left", top: "45%", left: "6%", width: "medium" },
    quote: {
      anchor: "bottom-right",
      bottom: "10%",
      right: "6%",
      width: "wide",
      align: "right",
    },
    footer: { anchor: "bottom-left", bottom: "8%", left: "6%", width: "medium" },
  },
  finale: {
    masthead: { anchor: "top-left", top: "7%", left: "5.5%", width: "narrow" },
    lead: { anchor: "top-left", top: "20%", left: "5.5%", width: "medium" },
    hero: { anchor: "middle-left", top: "48%", left: "0.5%", width: "full" },
    label: { anchor: "bottom-left", bottom: "24%", left: "5.5%", width: "content" },
    quote: {
      anchor: "bottom-right",
      bottom: "10%",
      right: "6.5%",
      width: "full",
      align: "right",
    },
    support: {
      anchor: "bottom-center",
      bottom: "9%",
      left: "50%",
      width: "wide",
      align: "center",
      transform: "translateX(-50%)",
    },
    footer: { anchor: "bottom-left", bottom: "8.5%", left: "5.5%", width: "medium" },
  },
};

const roleFallbackAnchors: Record<TitleScreenRole, TitleScreenAnchor> = {
  masthead: "top-left",
  lead: "top-left",
  hero: "middle-left",
  label: "bottom-left",
  quote: "bottom-right",
  support: "bottom-center",
  footer: "bottom-left",
};

const motionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

function normalizeLines(text: string | string[]) {
  if (Array.isArray(text)) {
    return text;
  }

  return text.split("\n");
}

function getPlacement(block: TitleScreenBlock, template: TitleScreenTemplate) {
  if (template === "freeform") {
    return anchorPlacements[block.anchor ?? roleFallbackAnchors[block.role]];
  }

  return (
    templatePlacements[template][block.role] ??
    anchorPlacements[block.anchor ?? roleFallbackAnchors[block.role]]
  );
}

function getLetterSpacing(font: TitleScreenFont, size: TitleScreenSize) {
  if (font === "mono") {
    return "0.12em";
  }

  if (font === "display") {
    return size === "sm" || size === "xs" ? "0.14em" : "0.09em";
  }

  return size === "display" ? "-0.065em" : "-0.05em";
}

function getLineHeight(font: TitleScreenFont, size: TitleScreenSize) {
  if (font === "mono") {
    return 1.1;
  }

  if (font === "display") {
    return size === "xs" || size === "sm" ? 0.98 : 0.94;
  }

  return size === "display" ? 0.84 : 0.88;
}

function getGlowShadow(tone: TitleScreenTone) {
  if (tone === "muted") {
    return "0 0 6px rgba(255, 221, 177, 0.16)";
  }

  if (tone === "secondary") {
    return "0 0 8px rgba(255, 231, 194, 0.34), 0 0 20px rgba(255, 176, 90, 0.18)";
  }

  return "0 0 8px rgba(255, 244, 219, 0.52), 0 0 24px rgba(255, 186, 91, 0.24)";
}

function composeTransform(baseTransform?: string, offsetX?: string, offsetY?: string) {
  const hasOffset = Boolean(offsetX || offsetY);

  if (!hasOffset) {
    return baseTransform;
  }

  const offsetTransform = `translate(${offsetX ?? "0px"}, ${offsetY ?? "0px"})`;
  return baseTransform ? `${baseTransform} ${offsetTransform}` : offsetTransform;
}

function resolveBlockConfig(
  block: TitleScreenBlock,
  template: TitleScreenTemplate,
  appearance: TitleScreenAppearance
): ResolvedBlockConfig {
  const placement = getPlacement(block, template);
  const defaults = roleDefaults[block.role];
  const font = block.font ?? defaults.font;
  const tone = block.tone ?? defaults.tone;
  const size = block.size ?? defaults.size;
  const align = block.align ?? placement.align ?? defaults.align;
  const width = block.width ?? placement.width ?? defaults.width;
  const anchor = placement.anchor ?? block.anchor ?? roleFallbackAnchors[block.role];
  const italic = block.italic ?? defaults.italic;
  const uppercase = block.uppercase ?? defaults.uppercase;

  return {
    anchor,
    align,
    width,
    font,
    tone,
    size,
    italic,
    uppercase,
    style: {
      position: "absolute",
      top: placement.top,
      right: placement.right,
      bottom: placement.bottom,
      left: placement.left,
      transform: composeTransform(placement.transform, block.offsetX, block.offsetY),
      width: widthMap[width],
      textAlign: align,
      color: toneMap[tone],
      fontFamily: fontMap[font],
      fontSize: sizeMap[size],
      fontStyle: italic ? "italic" : "normal",
      fontWeight: font === "mono" ? 500 : 700,
      lineHeight: getLineHeight(font, size),
      letterSpacing: getLetterSpacing(font, size),
      textTransform: uppercase ? "uppercase" : "none",
      textShadow: appearance === "glow" ? getGlowShadow(tone) : undefined,
    },
  };
}

function getBlockTag(isHeading: boolean) {
  return isHeading ? "h1" : "div";
}

export const TitleScreen = forwardRef<HTMLDivElement, TitleScreenProps>(
  function TitleScreen(
    {
      template = "stacked",
      blocks,
      appearance = "plain",
      reveal = "minimal",
      className = "",
      ...rest
    },
    ref
  ) {
    const prefersReducedMotion = useReducedMotion();
    const resolvedReveal = prefersReducedMotion ? "none" : reveal;
    let headingClaimed = false;

    return (
      <div
        ref={ref}
        data-title-screen=""
        data-template={template}
        data-appearance={appearance}
        data-reveal={resolvedReveal}
        className={`relative flex h-screen min-h-screen w-full items-center justify-center overflow-hidden bg-black px-4 py-4 text-[#f2ece2] select-none sm:px-6 sm:py-6 ${className}`}
        {...rest}
      >
        <div
          data-title-screen-stage=""
          className="relative h-full w-auto max-w-full aspect-[4/3] overflow-hidden"
          style={{ containerType: "size" }}
        >
          {blocks.map((block, index) => {
            const lines = normalizeLines(block.text);
            const config = resolveBlockConfig(block, template, appearance);
            const isHeroHeading = block.role === "hero" && !headingClaimed;
            const Tag = getBlockTag(isHeroHeading);

            if (isHeroHeading) {
              headingClaimed = true;
            }

            const blockContent = (
              <Tag
                data-role={block.role}
                data-anchor={config.anchor}
                data-align={config.align}
                data-width={config.width}
                className="m-0"
                style={config.style}
              >
                {lines.map((line, lineIndex) => (
                  <span
                    key={`${block.id ?? block.role}-${lineIndex}`}
                    data-title-screen-line=""
                    className="block whitespace-nowrap"
                  >
                    {line}
                  </span>
                ))}
              </Tag>
            );

            if (resolvedReveal === "none") {
              return (
                <div key={block.id ?? `${block.role}-${index}`} data-block-frame="">
                  {blockContent}
                </div>
              );
            }

            return (
              <motion.div
                key={block.id ?? `${block.role}-${index}`}
                data-block-frame=""
                data-motion="minimal"
                initial="hidden"
                animate="visible"
                variants={motionVariants}
                transition={{ duration: 0.26, ease: "easeOut", delay: index * 0.07 }}
              >
                {blockContent}
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }
);

TitleScreen.displayName = "TitleScreen";
