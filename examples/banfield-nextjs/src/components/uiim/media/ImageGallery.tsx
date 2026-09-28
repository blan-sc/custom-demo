import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  NextImage as ContentSdkImage,
  Text,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { cn } from '@/lib/utils';
import { Instagram } from 'lucide-react';
import { BANFIELD_CONTAINER, HighlightedTitle } from '@/lib/banfield-ui';

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
            className="px-4 py-3 text-center text-sm font-[family-name:var(--brand-body-font,inherit)]"
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
            className="mt-3 text-center text-sm font-[family-name:var(--brand-body-font,inherit)]"
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
            className="px-4 py-3 text-center text-sm font-[family-name:var(--brand-body-font,inherit)]"
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

const BANFIELD_INSTAGRAM_URL = 'https://www.instagram.com/banfieldpethospital/';

/* Banfield — two-tone heading, four square Instagram stills in a row, handle button */
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
      <section className="w-full bg-white py-10">
        <div className={BANFIELD_CONTAINER}>
          {(fields.Caption?.value || isEditing) && (
            <HighlightedTitle
              field={fields.Caption}
              tag="h2"
              isEditing={isEditing}
              className="mb-2 text-xl font-medium font-[family-name:var(--brand-body-font,inherit)]"
              style={{ color: 'var(--brand-title-fg, #333436)' }}
            />
          )}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {photos.map((photo, index) =>
              photo && (photo.value?.src || isEditing) ? (
                <div key={index} className="relative aspect-square overflow-hidden">
                  <ContentSdkImage
                    field={photo}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ) : null
            )}
          </div>
          <p className="mt-2 text-right text-[0.65rem]" style={{ color: 'var(--brand-body-fg, #65686B)' }}>
            by @banfieldpethospital
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href={BANFIELD_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border-2 border-[var(--brand-primary)] bg-white px-[30px] py-1.5 text-[0.92rem] font-medium text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white font-[family-name:var(--brand-body-font,inherit)]"
            >
              <Instagram aria-hidden className="h-4 w-4" />
              Banfieldpethospital
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
