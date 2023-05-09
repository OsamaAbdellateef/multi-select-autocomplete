export const shadow = {
  normal: {
    none: "shadow-none",
    "1p": "shadow-1p",
    "2p": "shadow-2p",
    athena1000: "shadow-athena-1000",
    mysql1000: "shadow-mysql-1000",
    postgres1000: "shadow-postgres-1000",
    primary200: "shadow-solid-2 shadow-primary-200",
    primary: "shadow-primary-1000",
    red200: "shadow-solid-2 shadow-red-200",
    red1000: "shadow-red-1000",
    redshift1000: "shadow-redshift-1000",
    bigquery1000: "shadow-bigquery-1000",
    sheets1000: "shadow-sheets-1000"
  },
  focus: {
    primary200:
      "focus:shadow-solid-2 focus:shadow-primary-200 focus-within:shadow-solid-2 focus-within:shadow-primary-200",
    red200:
      "focus:shadow-solid-2 focus:shadow-red-200 focus-within:shadow-solid-2 focus-within:shadow-red-200"
  }
};

export type Shadow = keyof typeof shadow.normal;
export type ShadowFocus = keyof typeof shadow.focus;
