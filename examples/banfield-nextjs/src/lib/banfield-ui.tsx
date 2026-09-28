import React, { JSX } from 'react';
import { Field, LinkField, Link as ContentSdkLink, Text } from '@sitecore-content-sdk/nextjs';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/*
 * Shared Banfield presentation primitives used by the `Banfield*` component variants.
 * Lives in src/lib (not src/components) so the component-map generator does not register it.
 */

const HIGHLIGHT_PATTERN = /\*([^*]+)\*/g;

/** Removes `*highlight*` markers, e.g. for aria labels or alt text. */
export const stripHighlightMarkup = (value = ''): string => value.replace(HIGHLIGHT_PATTERN, '$1');

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';

interface HighlightedTitleProps {
  field?: Field<string>;
  tag?: HeadingTag;
  className?: string;
  style?: React.CSSProperties;
  /** Extra classes for the highlighted phrase (e.g. `block` to put it on its own line). */
  highlightClassName?: string;
  isEditing?: boolean;
}

/**
 * Renders a Single-Line Text title where `*phrase*` is shown in the brand highlight color,
 * matching banfield.com's two-tone headings. In editing mode the raw field is rendered so
 * authors can inline-edit it (the asterisks are visible only there).
 */
export const HighlightedTitle = ({
  field,
  tag = 'h2',
  className,
  style,
  highlightClassName,
  isEditing,
}: HighlightedTitleProps): JSX.Element | null => {
  if (!field) return null;
  if (isEditing) return <Text field={field} tag={tag} className={className} style={style} />;

  const value = field.value || '';
  if (!value) return null;

  const parts = value.split(HIGHLIGHT_PATTERN).map((part, index) =>
    index % 2 === 1 ? (
      <span
        key={index}
        className={highlightClassName}
        style={{ color: 'var(--brand-highlight, var(--brand-primary))' }}
      >
        {part}
      </span>
    ) : (
      part
    )
  );

  return React.createElement(tag, { className, style }, parts);
};

type BanfieldButtonVariant = 'outline' | 'inverse' | 'text';

const BUTTON_CLASSES: Record<BanfieldButtonVariant, string> = {
  outline:
    'inline-flex items-center justify-center border-2 border-[var(--brand-primary)] bg-white px-[30px] py-1.5 text-[0.92rem] font-medium text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white rounded-[var(--brand-button-radius,0px)]',
  inverse:
    'inline-flex items-center justify-center border-2 border-white bg-transparent px-[30px] py-1.5 text-[0.92rem] font-medium text-white transition-colors hover:bg-white hover:text-[var(--brand-primary)] rounded-[var(--brand-button-radius,0px)]',
  text: 'text-sm font-medium text-[var(--brand-primary)] hover:underline',
};

interface BanfieldButtonProps {
  field?: LinkField;
  isEditing?: boolean;
  variant?: BanfieldButtonVariant;
  className?: string;
}

/** banfield.com CTA: square orange-outline button, inverse (white on orange) or a `›` text link. */
export const BanfieldButton = ({
  field,
  isEditing,
  variant = 'outline',
  className,
}: BanfieldButtonProps): JSX.Element | null => {
  if (!field || (!field.value?.href && !isEditing)) return null;

  const link = (
    <ContentSdkLink
      field={field}
      className={cn(
        BUTTON_CLASSES[variant],
        'font-[family-name:var(--brand-body-font,inherit)]',
        variant !== 'text' && className
      )}
    />
  );

  if (variant !== 'text') return link;

  return (
    <span className={cn('inline-flex items-center gap-0.5 text-[var(--brand-primary)]', className)}>
      {link}
      <ChevronRight aria-hidden className="h-3.5 w-3.5" />
    </span>
  );
};

/** Shared inner container matching banfield.com's ~1140px content width. */
export const BANFIELD_CONTAINER = 'mx-auto w-full max-w-[1140px] px-4 md:px-6';
