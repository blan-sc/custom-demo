import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  Text,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { cn } from '@/lib/utils';
import { BANFIELD_CONTAINER, BanfieldButton, HighlightedTitle } from '@/lib/banfield-ui';
import { MapPin, Phone, Search } from 'lucide-react';

interface LocationFinderFields {
  Title?: Field<string>;
  SearchPlaceholder?: Field<string>;
  LocationName?: Field<string>;
  LocationAddress?: Field<string>;
  LocationPhone?: Field<string>;
  PrimaryLink?: LinkField;
  MapImage?: ImageField;
  PartnerLogo?: ImageField;
}

type LocationFinderProps = ComponentProps & {
  fields: LocationFinderFields;
};

const LocationFinderDefaultComponent = (): JSX.Element => (
  <div className="component location-finder">
    <div className="component-content">
      <span className="is-empty-hint">LocationFinder</span>
    </div>
  </div>
);

export const Default = ({ fields, params, page }: LocationFinderProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params || {};
  const isEditing = page?.mode?.isEditing;

  if (!fields) {
    return <LocationFinderDefaultComponent />;
  }

  const {
    Title,
    SearchPlaceholder,
    LocationName,
    LocationAddress,
    LocationPhone,
    PrimaryLink,
    MapImage,
    PartnerLogo,
  } = fields;

  const placeholderText = SearchPlaceholder?.value || 'Enter zip code or city + state';

  return (
    <div className={cn('component location-finder', styles)} id={RenderingIdentifier}>
      <section
        className="w-full px-4 py-16 md:py-20"
        style={{ backgroundColor: 'var(--brand-bg, #ffffff)' }}
      >
        <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-2 md:gap-12">
          <div>
            {(Title?.value || isEditing) && (
              <Text
                field={Title}
                tag="h2"
                className="mb-8 text-3xl font-semibold tracking-tight md:text-4xl font-[family-name:var(--brand-heading-font,inherit)]"
                style={{ color: 'var(--brand-fg, #3D3D3D)' }}
              />
            )}

            <div className="relative mb-8 max-w-md">
              <input
                type="search"
                readOnly
                placeholder={placeholderText}
                aria-label={placeholderText}
                className="w-full rounded-[var(--brand-button-radius,9999px)] border px-5 py-3 pr-12 text-sm outline-none"
                style={{
                  borderColor: 'var(--brand-border, #E6E6E6)',
                  color: 'var(--brand-fg, #3D3D3D)',
                  fontFamily: 'var(--brand-body-font, inherit)',
                }}
              />
              <Search
                aria-hidden
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2"
                style={{ color: 'var(--brand-muted-foreground, #65686B)' }}
              />
              {isEditing && (
                <Text
                  field={SearchPlaceholder}
                  tag="span"
                  className="mt-2 block text-xs"
                  style={{ color: 'var(--brand-muted-foreground, #65686B)' }}
                />
              )}
            </div>

            <div
              className="max-w-md space-y-3 text-sm font-[family-name:var(--brand-body-font,inherit)]"
              style={{ color: 'var(--brand-fg, #3D3D3D)' }}
            >
              {(LocationName?.value || isEditing) && (
                <div className="flex items-start gap-3">
                  <MapPin
                    aria-hidden
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: 'var(--brand-primary)' }}
                  />
                  <Text field={LocationName} tag="p" className="font-medium" />
                </div>
              )}

              {(LocationAddress?.value || isEditing) && (
                <div className="flex items-start gap-3 pl-7">
                  <Text field={LocationAddress} tag="p" />
                </div>
              )}

              {(LocationPhone?.value || isEditing) && (
                <div className="flex items-start gap-3">
                  <Phone
                    aria-hidden
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: 'var(--brand-primary)' }}
                  />
                  <Text field={LocationPhone} tag="p" />
                </div>
              )}

              {PrimaryLink && (PrimaryLink.value?.href || isEditing) && (
                <div className="pt-2">
                  <ContentSdkLink
                    field={PrimaryLink}
                    className="inline-flex items-center text-sm font-medium hover:opacity-80"
                    style={{ color: 'var(--brand-primary)' }}
                  />
                </div>
              )}

              {PartnerLogo && (PartnerLogo.value?.src || isEditing) && (
                <div className="pt-4">
                  <ContentSdkImage field={PartnerLogo} className="h-6 w-auto" />
                </div>
              )}
            </div>
          </div>

          {MapImage && (MapImage.value?.src || isEditing) && (
            <div className="overflow-hidden">
              <ContentSdkImage field={MapImage} className="h-auto w-full" />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

/* Banfield — gray band, one-line two-tone title, white panel: search + nearest hospital (1/3) and map (2/3) */
export const Banfield = ({ fields, params, page }: LocationFinderProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params || {};
  const isEditing = page?.mode?.isEditing;

  if (!fields) {
    return <LocationFinderDefaultComponent />;
  }

  const {
    Title,
    SearchPlaceholder,
    LocationName,
    LocationAddress,
    LocationPhone,
    PrimaryLink,
    MapImage,
    PartnerLogo,
  } = fields;

  const placeholderText = SearchPlaceholder?.value || 'Enter zip code or city + state';
  // No map image authored: embed a map of the authored address instead
  const mapQuery = LocationAddress?.value
    ? `Banfield Pet Hospital, ${LocationAddress.value}`
    : '';

  return (
    <div className={cn('component location-finder', styles)} id={RenderingIdentifier}>
      <section className="w-full py-10 md:py-12" style={{ backgroundColor: 'var(--brand-muted, #F7F7F7)' }}>
        <div className={BANFIELD_CONTAINER}>
          {(Title?.value || isEditing) && (
            <HighlightedTitle
              field={Title}
              tag="h2"
              isEditing={isEditing}
              className="mb-5 text-[1.6rem] font-semibold leading-tight md:text-[1.9rem] font-[family-name:var(--brand-heading-font,inherit)]"
              style={{ color: 'var(--brand-heading-fg, #65686B)' }}
            />
          )}

          <div className="grid overflow-hidden bg-white md:grid-cols-[1fr_2fr]">
            <div
              className="p-5 text-[0.8rem] leading-[1.7] font-[family-name:var(--brand-body-font,inherit)]"
              style={{ color: 'var(--brand-body-fg, #65686B)' }}
            >
              <div className="relative mb-6">
                <input
                  type="search"
                  readOnly
                  placeholder={placeholderText}
                  aria-label={placeholderText}
                  className="w-full rounded-full border px-4 py-2 pr-10 text-xs outline-none"
                  style={{ borderColor: '#9A9A9A', color: 'var(--brand-fg, #3D3D3D)' }}
                />
                <Search
                  aria-hidden
                  className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
                  style={{ color: 'var(--brand-fg, #3D3D3D)' }}
                />
                {isEditing && (
                  <Text field={SearchPlaceholder} tag="span" className="mt-2 block text-xs" />
                )}
              </div>

              {(LocationName?.value || isEditing) && (
                <div className="flex items-start gap-2">
                  <MapPin
                    aria-hidden
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: 'var(--brand-primary)', fill: 'var(--brand-primary)', stroke: 'white' }}
                  />
                  <Text
                    field={LocationName}
                    tag="h3"
                    className="text-[0.95rem] font-medium underline underline-offset-2"
                    style={{ color: 'var(--brand-title-fg, #333436)' }}
                  />
                </div>
              )}
              <div className="mt-2 space-y-0.5 pl-6">
                {(LocationAddress?.value || isEditing) && <Text field={LocationAddress} tag="p" />}
                {(LocationPhone?.value || isEditing) && (
                  <div className="flex items-center gap-1.5">
                    {isEditing && <Phone aria-hidden className="h-3 w-3" />}
                    <Text field={LocationPhone} tag="p" />
                  </div>
                )}
                <div className="pt-2">
                  <BanfieldButton field={PrimaryLink} isEditing={isEditing} variant="text" />
                </div>
                {PartnerLogo && (PartnerLogo.value?.src || isEditing) && (
                  <div className="pt-2">
                    <ContentSdkImage field={PartnerLogo} className="h-5 w-auto" />
                  </div>
                )}
              </div>
            </div>

            {MapImage?.value?.src || (isEditing && MapImage) ? (
              <div className="relative min-h-[260px] md:min-h-[320px]">
                <ContentSdkImage
                  field={MapImage}
                  fill
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              mapQuery && (
                <iframe
                  title={`Map of ${LocationName?.value || 'Banfield Pet Hospital'}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=11&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full min-h-[260px] w-full border-0 md:min-h-[320px]"
                />
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
