import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Link as ContentSdkLink,
  RichText as ContentSdkRichText,
  Text,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { cn } from '@/lib/utils';
import { SmartMedia } from '@/components/uiim/media/SmartMedia';

interface CTABannerFields {
  Title: Field<string>;
  Description: Field<string>;
  PrimaryLink: LinkField;
  SecondaryLink: LinkField;
  BackgroundImage: ImageField;
}

type CTABannerProps = ComponentProps & {
  fields: CTABannerFields;
};

const CTABannerDefaultComponent = (): JSX.Element => (
  <div className="component cta-banner">
    <div className="component-content">
      <span className="is-empty-hint">CTABanner</span>
    </div>
  </div>
);

const PrimaryButton = ({ field, isEditing, className }: { field: LinkField; isEditing?: boolean; className?: string }) => {
  if (!field?.value?.href && !isEditing) return null;
  return (
    <ContentSdkLink
      field={field}
      className={cn(
        'inline-flex items-center justify-center px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90 rounded-[var(--brand-button-radius,0.375rem)]',
        className
      )}
    />
  );
};

const SecondaryButton = ({ field, isEditing }: { field: LinkField; isEditing?: boolean }) => {
  if (!field?.value?.href && !isEditing) return null;
  return (
    <ContentSdkLink
      field={field}
      className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold border border-current bg-transparent transition-opacity hover:opacity-70 rounded-[var(--brand-button-radius,0.375rem)]"
    />
  );
};

/* ────────────────────────────────────────────
   Default — centered, --brand-primary background
   ──────────────────────────────────────────── */
export const Default = ({ fields, params, page }: CTABannerProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  if (!fields) return <CTABannerDefaultComponent />;

  return (
    <div className={cn('component cta-banner', styles)} id={RenderingIdentifier}>
      <section
        className="w-full px-4 py-16 md:py-24"
        style={{
          backgroundColor: 'var(--brand-primary)',
          color: 'var(--brand-primary-foreground)',
        }}
      >
        <div className="mx-auto max-w-3xl text-center">
          {(fields.Title?.value || isEditing) && (
            <Text
              field={fields.Title}
              tag="h2"
              className="text-3xl font-bold tracking-tight sm:text-4xl font-[family-name:var(--brand-heading-font,inherit)]"
            />
          )}
          {(fields.Description?.value || isEditing) && (
            <ContentSdkRichText
              field={fields.Description}
              className="mt-4 text-lg opacity-90 font-[family-name:var(--brand-body-font,inherit)]"
            />
          )}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <PrimaryButton
              field={fields.PrimaryLink}
              isEditing={isEditing}
              className="bg-[var(--brand-primary-foreground)] text-[var(--brand-primary)]"
            />
            <SecondaryButton field={fields.SecondaryLink} isEditing={isEditing} />
          </div>
        </div>
      </section>
    </div>
  );
};

/* ────────────────────────────────────────────
   WithImage — full-bleed background with overlay
   ──────────────────────────────────────────── */
export const WithImage = ({ fields, params, page }: CTABannerProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  if (!fields) return <CTABannerDefaultComponent />;

  return (
    <div className={cn('component cta-banner', styles)} id={RenderingIdentifier}>
      <section className="relative w-full overflow-hidden">
        {(fields.BackgroundImage?.value?.src || isEditing) && (
          <div className="absolute inset-0">
            <SmartMedia
              field={fields.BackgroundImage}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-4 py-16 md:py-24 text-white">
          <div className="mx-auto max-w-3xl text-center">
            {(fields.Title?.value || isEditing) && (
              <Text
                field={fields.Title}
                tag="h2"
                className="text-3xl font-bold tracking-tight sm:text-4xl font-[family-name:var(--brand-heading-font,inherit)]"
              />
            )}
            {(fields.Description?.value || isEditing) && (
              <ContentSdkRichText
                field={fields.Description}
                className="mt-4 text-lg opacity-90 font-[family-name:var(--brand-body-font,inherit)]"
              />
            )}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton
                field={fields.PrimaryLink}
                isEditing={isEditing}
                className="bg-[var(--brand-primary)] text-[var(--brand-primary-foreground)]"
              />
              <SecondaryButton field={fields.SecondaryLink} isEditing={isEditing} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ────────────────────────────────────────────
   Split — text left, buttons right
   ──────────────────────────────────────────── */
export const Split = ({ fields, params, page }: CTABannerProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  if (!fields) return <CTABannerDefaultComponent />;

  return (
    <div className={cn('component cta-banner', styles)} id={RenderingIdentifier}>
      <section
        className="w-full px-4 py-16 md:py-20"
        style={{ backgroundColor: 'var(--brand-muted, #f5f5f5)' }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2 md:px-6">
          <div>
            {(fields.Title?.value || isEditing) && (
              <Text
                field={fields.Title}
                tag="h2"
                className="text-3xl font-bold tracking-tight sm:text-4xl font-[family-name:var(--brand-heading-font,inherit)]"
                style={{ color: 'var(--brand-fg, #111111)' }}
              />
            )}
            {(fields.Description?.value || isEditing) && (
              <ContentSdkRichText
                field={fields.Description}
                className="mt-4 text-base font-[family-name:var(--brand-body-font,inherit)]"
                style={{ color: 'var(--brand-muted-foreground, #6b7280)' }}
              />
            )}
          </div>
          <div className="flex flex-wrap items-center gap-4 md:justify-end">
            <PrimaryButton
              field={fields.PrimaryLink}
              isEditing={isEditing}
              className="bg-[var(--brand-primary)] text-[var(--brand-primary-foreground)]"
            />
            <SecondaryButton field={fields.SecondaryLink} isEditing={isEditing} />
          </div>
        </div>
      </section>
    </div>
  );
};

/* ────────────────────────────────────────────
   Minimal — subtle background, inline text + link
   ──────────────────────────────────────────── */
export const Minimal = ({ fields, params, page }: CTABannerProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  if (!fields) return <CTABannerDefaultComponent />;

  return (
    <div className={cn('component cta-banner', styles)} id={RenderingIdentifier}>
      <section
        className="w-full px-4 py-10"
        style={{ backgroundColor: 'var(--brand-muted, #f5f5f5)' }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between sm:px-6">
          <div className="flex-1">
            {(fields.Title?.value || isEditing) && (
              <Text
                field={fields.Title}
                tag="p"
                className="text-lg font-semibold font-[family-name:var(--brand-heading-font,inherit)]"
                style={{ color: 'var(--brand-fg, #111111)' }}
              />
            )}
            {(fields.Description?.value || isEditing) && (
              <ContentSdkRichText
                field={fields.Description}
                className="mt-1 text-sm font-[family-name:var(--brand-body-font,inherit)]"
                style={{ color: 'var(--brand-muted-foreground, #6b7280)' }}
              />
            )}
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <PrimaryButton
              field={fields.PrimaryLink}
              isEditing={isEditing}
              className="bg-[var(--brand-primary)] text-[var(--brand-primary-foreground)]"
            />
            {(fields.SecondaryLink?.value?.href || isEditing) && (
              <ContentSdkLink
                field={fields.SecondaryLink}
                className="text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-70"
                style={{ color: 'var(--brand-primary)' }}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const AppleGlyph = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-white">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);

const PlayGlyph = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
    <path fill="#00D7FE" d="M3.6 1.8 13.8 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1z" />
    <path fill="#FFCE00" d="m17.1 8.7 3.4 1.9c1 .6 1 2.2 0 2.8l-3.4 1.9L13.8 12z" />
    <path fill="#00F076" d="M3.6 1.8c.3-.2.8-.2 1.2 0l12.3 6.9-3.3 3.3z" />
    <path fill="#FF3A44" d="m13.8 12 3.3 3.3-12.3 6.9c-.4.2-.9.2-1.2 0z" />
  </svg>
);

/* Store badge chrome (glyph + two-line label) chosen from the link URL; falls back to the link text */
const StoreBadge = ({ field, isEditing }: { field?: LinkField; isEditing?: boolean }) => {
  if (!field || (!field.value?.href && !isEditing)) return null;

  const badgeClassName =
    'inline-flex h-10 items-center gap-2 rounded-md border border-[#A6A6A6] bg-black px-2.5 text-white transition-opacity hover:opacity-85';

  if (isEditing) {
    return <ContentSdkLink field={field} className={cn(badgeClassName, 'text-xs')} />;
  }

  const href = field.value?.href || '';
  const store = /apple\.com/i.test(href) ? 'apple' : /play\.google/i.test(href) ? 'google' : null;
  const label = field.value?.text || '';

  return (
    <ContentSdkLink field={field} className={badgeClassName} aria-label={label || undefined}>
      {store === 'apple' && <AppleGlyph />}
      {store === 'google' && <PlayGlyph />}
      <span className="flex flex-col text-left leading-none">
        {store && (
          <span className="text-[0.55rem] uppercase tracking-wide">
            {store === 'apple' ? 'Download on the' : 'Get it on'}
          </span>
        )}
        <span className="text-[0.95rem] font-medium">
          {store === 'apple' ? 'App Store' : store === 'google' ? 'Google Play' : label}
        </span>
      </span>
    </ContentSdkLink>
  );
};

/* Banfield — slim full-bleed orange strip: title + app store badges on one row */
export const Banfield = ({ fields, params, page }: CTABannerProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  if (!fields) return <CTABannerDefaultComponent />;

  return (
    <div className={cn('component cta-banner', styles)} id={RenderingIdentifier}>
      <section
        className="w-full px-4 py-3.5"
        style={{
          backgroundColor: 'var(--brand-primary)',
          color: 'var(--brand-primary-foreground)',
        }}
      >
        <div className="mx-auto flex max-w-[1140px] flex-col items-center justify-center gap-3 sm:flex-row sm:gap-24">
          {(fields.Title?.value || isEditing) && (
            <Text
              field={fields.Title}
              tag="h2"
              className="text-[0.95rem] font-semibold font-[family-name:var(--brand-body-font,inherit)]"
            />
          )}
          <div className="flex items-center gap-2">
            <StoreBadge field={fields.SecondaryLink} isEditing={isEditing} />
            <StoreBadge field={fields.PrimaryLink} isEditing={isEditing} />
          </div>
        </div>
      </section>
    </div>
  );
};
