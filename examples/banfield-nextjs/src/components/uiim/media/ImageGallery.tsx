import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  NextImage as ContentSdkImage,
  Text,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { cn } from '@/lib/utils';

interface ImageGalleryFields {
  GalleryImage: ImageField;
  Caption: Field<string>;
  AltText: Field<string>;
  InstagramImage2?: ImageField;
  InstagramImage3?: ImageField;
  InstagramImage4?: ImageField;
}

type ImageGalleryProps = ComponentProps & {
  fields: ImageGalleryFields;
};

const ImageGalleryDefaultComponent = (): JSX.Element => (
  <div className="component image-gallery">
    <div className="component-content">
      <span className="is-empty-hint">ImageGallery</span>
    </div>
  </div>
);

/* ────────────────────────────────────────────
   Default — full-width image, no max-width constraint
   ──────────────────────────────────────────── */
export const Default = ({ fields, params, page }: ImageGalleryProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  if (!fields) return <ImageGalleryDefaultComponent />;

  return (
    <div className={cn('component image-gallery', styles)} id={RenderingIdentifier}>
      <figure className="w-full">
        {(fields.GalleryImage?.value?.src || isEditing) && (
          <ContentSdkImage
            field={fields.GalleryImage}
            className="w-full max-h-[70vh] object-cover"
          />
        )}
        {(fields.Caption?.value || isEditing) && (
          <figcaption
            className="px-4 py-3 text-center text-sm font-[var(--brand-body-font,inherit)]"
            style={{ color: 'var(--brand-muted-foreground, #6b7280)' }}
          >
            <Text field={fields.Caption} />
          </figcaption>
        )}
      </figure>
    </div>
  );
};

/* ────────────────────────────────────────────
   Gallery — container-constrained with rounded corners
   ──────────────────────────────────────────── */
export const Gallery = ({ fields, params, page }: ImageGalleryProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  if (!fields) return <ImageGalleryDefaultComponent />;

  return (
    <div className={cn('component image-gallery', styles)} id={RenderingIdentifier}>
      <figure className="mx-auto max-w-7xl px-4 py-8">
        {(fields.GalleryImage?.value?.src || isEditing) && (
          <div className="overflow-hidden rounded-[var(--brand-card-radius,0.75rem)]">
            <ContentSdkImage
              field={fields.GalleryImage}
              className="w-full max-h-[60vh] object-cover"
            />
          </div>
        )}
        {(fields.Caption?.value || isEditing) && (
          <figcaption
            className="mt-3 text-center text-sm font-[var(--brand-body-font,inherit)]"
            style={{ color: 'var(--brand-muted-foreground, #6b7280)' }}
          >
            <Text field={fields.Caption} />
          </figcaption>
        )}
      </figure>
    </div>
  );
};

/* ────────────────────────────────────────────
   Parallax — full-width with fixed background effect
   ──────────────────────────────────────────── */
export const Parallax = ({ fields, params, page }: ImageGalleryProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  if (!fields) return <ImageGalleryDefaultComponent />;

  const imageSrc = fields.GalleryImage?.value?.src;

  return (
    <div className={cn('component image-gallery', styles)} id={RenderingIdentifier}>
      <figure className="w-full">
        {(imageSrc || isEditing) && (
          <div
            className="h-[60vh] w-full bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: imageSrc ? `url(${imageSrc})` : undefined,
            }}
          >
            {isEditing && (
              <div className="flex h-full items-center justify-center">
                <ContentSdkImage
                  field={fields.GalleryImage}
                  className="max-h-full max-w-full object-contain opacity-50"
                />
              </div>
            )}
          </div>
        )}
        {(fields.Caption?.value || isEditing) && (
          <figcaption
            className="px-4 py-3 text-center text-sm font-[var(--brand-body-font,inherit)]"
            style={{
              backgroundColor: 'var(--brand-bg, #ffffff)',
              color: 'var(--brand-muted-foreground, #6b7280)',
            }}
          >
            <Text field={fields.Caption} />
          </figcaption>
        )}
      </figure>
    </div>
  );
};

/* Banfield — heading plus 2x2 circular Instagram stills */
export const Banfield = ({ fields, params, page }: ImageGalleryProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  if (!fields) return <ImageGalleryDefaultComponent />;

  const photos = [
    fields.GalleryImage,
    fields.InstagramImage2,
    fields.InstagramImage3,
    fields.InstagramImage4,
  ];

  return (
    <div className={cn('component image-gallery', styles)} id={RenderingIdentifier}>
      <section className="w-full px-4 py-16" style={{ backgroundColor: 'var(--brand-bg, #ffffff)' }}>
        <div className="mx-auto max-w-5xl">
          {(fields.Caption?.value || isEditing) && (
            <Text
              field={fields.Caption}
              tag="h2"
              className="mb-10 text-center text-3xl font-semibold lowercase font-[var(--brand-heading-font,inherit)]"
              style={{ color: 'var(--brand-fg, #3D3D3D)' }}
            />
          )}
          <div className="grid grid-cols-2 gap-6 md:gap-8">
            {photos.map((photo, index) =>
              photo?.value?.src || isEditing ? (
                <div key={index} className="aspect-square overflow-hidden rounded-full">
                  <ContentSdkImage field={photo} className="h-full w-full object-cover" />
                </div>
              ) : null
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
