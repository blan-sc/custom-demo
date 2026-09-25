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
                className="mb-8 text-3xl font-semibold tracking-tight md:text-4xl font-[var(--brand-heading-font,inherit)]"
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
              className="max-w-md space-y-3 text-sm font-[var(--brand-body-font,inherit)]"
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

export const Banfield = (props: LocationFinderProps): JSX.Element => Default(props);
