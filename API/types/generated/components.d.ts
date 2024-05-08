import type { Schema, Attribute } from '@strapi/strapi';

export interface LandingLanding extends Schema.Component {
  collectionName: 'components_landing_landings';
  info: {
    displayName: 'landing';
  };
  attributes: {
    title: Attribute.String;
    sec_title: Attribute.String;
    sec_description: Attribute.Text;
    description: Attribute.Text;
    tages: Attribute.Component<'tages.tages', true>;
  };
}

export interface TagesTages extends Schema.Component {
  collectionName: 'components_tages_tages';
  info: {
    displayName: 'tages';
  };
  attributes: {
    tag: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'landing.landing': LandingLanding;
      'tages.tages': TagesTages;
    }
  }
}
