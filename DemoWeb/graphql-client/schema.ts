import { Observable } from 'bf-graphql-typed-client'

export interface Query {
  adresser: AdresserCollectionSegment | null
  arbetsplatser: ArbetsplatserCollectionSegment | null
  kunder: KunderCollectionSegment | null
  positioner: PositionerCollectionSegment | null
  __typename: 'Query'
}

/** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
export type Int = number

/** The `Boolean` scalar type represents `true` or `false`. */
export type Boolean = boolean

/** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
export type String = string

/** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
export type DateTime = any

/** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
export type Float = number

/** The `TimeSpan` scalar represents an ISO-8601 compliant duration type. */
export type TimeSpan = any

/** The `Byte` scalar type represents non-fractional whole numeric values. Byte can represent values between 0 and 255. */
export type Byte = any

export enum SortEnumType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface AdresserCollectionSegment {
  items: Adresser[] | null
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo
  totalCount: Int
  __typename: 'AdresserCollectionSegment'
}

export interface Adresser {
  pk: Int
  aktiv: Boolean | null
  fkAdresstyp: Int
  fkPositioner: Int | null
  fkLander: Int | null
  namn: String | null
  co: String | null
  adress1: String | null
  adress2: String | null
  zon: String | null
  postnr: String | null
  ort: String | null
  kontakt: String | null
  epost: String | null
  telefon1: String | null
  telefon2: String | null
  telefon3: String | null
  mobiltelefon: String | null
  fax: String | null
  vagbeskrivning: String | null
  referens: String | null
  id: String | null
  fkZon: Int | null
  lastinfo: String | null
  lossinfo: String | null
  pallregNummer: String | null
  slottid: DateTime | null
  internInformation: String | null
  kommunKod: String | null
  lagerStalleNr: String | null
  slottidSlut: DateTime | null
  siloId: String | null
  framkomlighet: String | null
  cfarNr: String | null
  fkAdresstypNavigation: Adresstyp
  fkPositionerNavigation: Positioner | null
  arbetsplatser: Arbetsplatser[]
  kunderFkAdresserBesoksadressNavigation: Kunder[]
  kunderFkAdresserFakturaadressNavigation: Kunder[]
  __typename: 'Adresser'
}

export interface Adresstyp {
  pk: Int
  adresstypNamn: String | null
  visaPaWeb: Boolean | null
  adresser: Adresser[]
  __typename: 'Adresstyp'
}

export interface Positioner {
  pk: Int
  latitude: Float
  longitude: Float
  xkoord: Float | null
  ykoord: Float | null
  reverseGeocodeResult: String | null
  adresser: Adresser[]
  arbetsplatser: Arbetsplatser[]
  __typename: 'Positioner'
}

export interface Arbetsplatser {
  pk: Int
  aktiv: Boolean | null
  fkKunder: Int
  fkAdresser: Int
  fkPositioner: Int | null
  arbetsplatsNamn: String
  oppnar: TimeSpan | null
  stanger: TimeSpan | null
  lunchStart: TimeSpan | null
  lunchStopp: TimeSpan | null
  nyckelkod: String | null
  kartkod: String | null
  sekundarKund: String | null
  referens1: String | null
  referens2: String | null
  referens3: String | null
  referens4: String | null
  referens5: String | null
  standardApl: Boolean
  fastighetsbeteckning: String | null
  anl_ggningsnummer: String | null
  fkKontakt: Int | null
  fkEwcgrupp: Int | null
  fkKundgrupper: Int | null
  fkLinjer: Int | null
  debiteringsgrundandeAntal: Int | null
  rowVersion: Byte[]
  fkAdresserNavigation: Adresser
  fkKunderNavigation: Kunder
  fkPositionerNavigation: Positioner | null
  __typename: 'Arbetsplatser'
}

export interface Kunder {
  pk: Int
  aktiv: Boolean | null
  fkKundkategorier: Int
  fkBilder: Int | null
  fkBetalvillkor: Int | null
  fkLanderMoms: Int
  fkBetalare: Int | null
  fkLinjer: Int | null
  fkValutor: Int
  fkSchemaFakturering: Int | null
  fkOmvandSkatt: Int | null
  fkEntreprenad: Int | null
  fkFaktureringsavgifter: Int | null
  kund: Boolean | null
  leverantor: Boolean
  akare: Boolean
  abonnent: Boolean
  sparr: Boolean
  prisSparr: Boolean
  varning: Boolean
  avrakningskund: Boolean
  varningText: String | null
  kundNr: String
  kundNrEkonomi: String | null
  abonnentNr: String | null
  kundNamn: String
  kundid: String
  fkAdresserFakturaadress: Int | null
  fkAdresserBesoksadress: Int | null
  orgnr: String | null
  vat: String | null
  bankgiro: String | null
  postgiro: String | null
  skapadTidpunkt: DateTime | null
  skapadAnvandare: String | null
  andradTidpunkt: DateTime | null
  andradAnvandare: String | null
  kreditLimit: Float | null
  info: String | null
  popupInfo: String | null
  fakturamall: Int | null
  kravLittera: Boolean
  bankClearing: String | null
  bankKonto: String | null
  betalmetodExternkod: String | null
  swift: String | null
  iban: String | null
  riksbankskod: String | null
  fkFakturakoer: Int | null
  fkFakturabrytLittera: Int
  fkFakturabrytKontakt: Int
  fakturabrytAntalOrders: Int | null
  fkFakturabrytResurs: Int
  fkKontoBonusIntakt: Int | null
  fkKontoBonusBalans: Int | null
  bonusProcent: Float | null
  fkMomskodBonus: Int | null
  fkMellanskillnadsmall: Int | null
  mall: Boolean
  mallNamn: String | null
  externkodMallLev: String | null
  externkodMallKund: String | null
  fkCountersMall: Int | null
  kravReferens: Boolean
  kravAo: Boolean
  kravVagsedel: Boolean
  kravTrptsedel: Boolean
  fkEnumLitteraMode: Int
  litteraMask: String | null
  fkEnumFakturaPaslagRedovisning: Int
  fkKoncern: Int | null
  fkEnumFakturalayout: Int | null
  fkFakturabrytReferens: Int
  pallregnr: String | null
  gannr: String | null
  fkSprak: Int | null
  fkKundbokforingsmall: Int | null
  kravFraktsedel: Boolean
  inkluderaVagsedlarIfakturan: Boolean
  fkKundgrupper: Int | null
  banknamn: String | null
  litteraMaskDescription: String | null
  fkFakturabrytArbetsordernr: Int
  fkEnumAvrakningslayout: Int | null
  aktivTerminalScanning: Boolean
  fkEnumBrytpunktPeriod: Int
  autoprisViaDeliveryBot: Boolean | null
  fkAttestflode: Int | null
  farg: Byte[] | null
  foregroundFarg: Byte[] | null
  skrymmeBerakning: Boolean | null
  aktivMallMobilwebb: Boolean
  utforKreditkontroll: Boolean
  utforHamtaData: Boolean
  kontrollInnanFakturering: Boolean
  mallPrivatperson: Boolean
  mallForetagskund: Boolean
  inkluderaArbetsordersIfakturan: Boolean
  externalId: String | null
  fkBolagInternkund: Int | null
  tm: Boolean
  fkEnumKravPaFotoSignatur: Int | null
  fkAnvandare: Int | null
  avrunda10: Float | null
  avrunda100: Float | null
  kravInstruktion: String | null
  inaktiveraSamtax: Boolean
  fakturaReferens: String | null
  avrunda1: Float | null
  autoFakturering: Boolean | null
  transportsedelMask: String | null
  fkFakturakoerAvrakning: Int | null
  kundrefOnReport: Boolean
  fkEwcgrupp: Int | null
  fkEntreprenader: Int | null
  fkFakturabrytArbetsplats: Int
  fakturaOchBilagorSomEnFil: Boolean | null
  kravPaPosition: Boolean
  globaltPaslag: Float | null
  globalRabatt: Float | null
  stopAutoPris: Boolean
  avrakningEfterKundBetalning: Boolean | null
  minimumTotalDebiteringResa: Float | null
  minimumTotalAvrakningResa: Float | null
  fkMinimumDebiteringsArtikel: Int | null
  isKontantKund: Boolean
  exkluderaRabattVidDebitering: Boolean | null
  fkMomslandkod: Int | null
  isKoncern: Boolean
  isEntreprenadAgare: Boolean
  fkArtikeldialekt: Int | null
  kravKundref: Boolean
  fkAnvandareKontakt: Int | null
  sparrText: String | null
  dbcalcHarFilkrav: Boolean | null
  fkEnumFgvmodell: Int
  ggn: String | null
  undantaFranKreditkontroll: Boolean
  bomkorningEmailAdresser: String | null
  bomkorningTillaten: Boolean | null
  bomkorningAction: Boolean | null
  fkKommunikationskanal: Int | null
  ediId: String | null
  faktureraKoncern: Boolean
  autogiro: Boolean
  forskottsbetalning: Boolean
  kreditforsakratBelopp: Int | null
  kreditforsakringsdatum: DateTime | null
  kreditInfo: String | null
  fkKreditforsakratbeloppValuta: Int | null
  fkEnumFakturaBrytOmvandMoms: Int
  fkEnumFakturaBrytDebetKredit: Int
  counterAvr: Int
  counterSelfInvoice: Int
  sparrSkrymmeMobilt: Boolean | null
  fyraOgonGrans: Int | null
  hanterasSomInternPaUtskrifter: Boolean
  fkAviseringsMetod: Int | null
  kravAviseringsInformation: Boolean
  fkEdijobbAvisering: Int | null
  genereraFvPriser: Boolean
  fkEdijobbSms: Int | null
  rowVersion: Byte[]
  epostPaminnelse: String | null
  fkEnumProcentuelltTillaggPrincip: Int
  bransch: String | null
  fkEnumBomkorningsMetod: Int | null
  rapporteraDataTillNvv: Boolean
  fkFakturabrytResa: Int
  dimensionskod: String | null
  dimensionsbeskrivning: String | null
  autoPrisKlarFaktMobil: Boolean
  enumRapporteringstypNvv: Int | null
  appliceraNyttEdiOrderidVidBomkorning: Boolean
  genereraResenoderPerKoordinat: Boolean
  fkFakturabrytBetalningsunderlag: Int
  fkFakturabrytVerksamhet: Int
  fkBetalvillkorSjalvfaktura: Int | null
  inaktiveraAvstandsBerakning: Boolean
  stopKoncernPris: Boolean
  fkFakturabrytKundref: Int
  epostNvvbekraftelse: String | null
  personNrSwish: String | null
  telefonNrSwish: String | null
  fkAdresserBesoksadressNavigation: Adresser | null
  fkAdresserFakturaadressNavigation: Adresser | null
  fkBetalareNavigation: Kunder | null
  fkEntreprenadNavigation: Kunder | null
  fkKoncernNavigation: Kunder | null
  arbetsplatser: Arbetsplatser[]
  inverseFkBetalareNavigation: Kunder[]
  inverseFkEntreprenadNavigation: Kunder[]
  inverseFkKoncernNavigation: Kunder[]
  __typename: 'Kunder'
}

/** Information about the offset pagination. */
export interface CollectionSegmentInfo {
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Boolean
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Boolean
  __typename: 'CollectionSegmentInfo'
}

export interface ArbetsplatserCollectionSegment {
  items: Arbetsplatser[] | null
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo
  totalCount: Int
  __typename: 'ArbetsplatserCollectionSegment'
}

export interface KunderCollectionSegment {
  items: Kunder[] | null
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo
  totalCount: Int
  __typename: 'KunderCollectionSegment'
}

export interface PositionerCollectionSegment {
  items: Positioner[] | null
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo
  totalCount: Int
  __typename: 'PositionerCollectionSegment'
}

export interface Mutation {
  upsertArbetsplats: MutationOutput
  __typename: 'Mutation'
}

export interface MutationOutput {
  pk: Int | null
  validationErrors: ValidationError[]
  __typename: 'MutationOutput'
}

export interface ValidationError {
  message: String
  property: String
  __typename: 'ValidationError'
}

export interface Subscription {
  arbetsplatsInserted: Arbetsplatser
  arbetsplatsUpdated: Arbetsplatser
  __typename: 'Subscription'
}

export interface QueryRequest {
  adresser?:
    | [
        { skip?: Int | null; take?: Int | null; where?: AdresserFilterInput | null; order?: AdresserSortInput[] | null },
        AdresserCollectionSegmentRequest,
      ]
    | AdresserCollectionSegmentRequest
  arbetsplatser?:
    | [
        {
          skip?: Int | null
          take?: Int | null
          where?: ArbetsplatserFilterInput | null
          order?: ArbetsplatserSortInput[] | null
        },
        ArbetsplatserCollectionSegmentRequest,
      ]
    | ArbetsplatserCollectionSegmentRequest
  kunder?:
    | [
        { skip?: Int | null; take?: Int | null; where?: KunderFilterInput | null; order?: KunderSortInput[] | null },
        KunderCollectionSegmentRequest,
      ]
    | KunderCollectionSegmentRequest
  positioner?:
    | [
        { skip?: Int | null; take?: Int | null; where?: PositionerFilterInput | null; order?: PositionerSortInput[] | null },
        PositionerCollectionSegmentRequest,
      ]
    | PositionerCollectionSegmentRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface AdresserFilterInput {
  and?: AdresserFilterInput[] | null
  or?: AdresserFilterInput[] | null
  pk?: ComparableInt32OperationFilterInput | null
  aktiv?: BooleanOperationFilterInput | null
  fkAdresstyp?: ComparableInt32OperationFilterInput | null
  fkPositioner?: ComparableNullableOfInt32OperationFilterInput | null
  fkLander?: ComparableNullableOfInt32OperationFilterInput | null
  namn?: StringOperationFilterInput | null
  co?: StringOperationFilterInput | null
  adress1?: StringOperationFilterInput | null
  adress2?: StringOperationFilterInput | null
  zon?: StringOperationFilterInput | null
  postnr?: StringOperationFilterInput | null
  ort?: StringOperationFilterInput | null
  kontakt?: StringOperationFilterInput | null
  epost?: StringOperationFilterInput | null
  telefon1?: StringOperationFilterInput | null
  telefon2?: StringOperationFilterInput | null
  telefon3?: StringOperationFilterInput | null
  mobiltelefon?: StringOperationFilterInput | null
  fax?: StringOperationFilterInput | null
  vagbeskrivning?: StringOperationFilterInput | null
  referens?: StringOperationFilterInput | null
  id?: StringOperationFilterInput | null
  fkZon?: ComparableNullableOfInt32OperationFilterInput | null
  lastinfo?: StringOperationFilterInput | null
  lossinfo?: StringOperationFilterInput | null
  pallregNummer?: StringOperationFilterInput | null
  slottid?: ComparableNullableOfDateTimeOperationFilterInput | null
  internInformation?: StringOperationFilterInput | null
  kommunKod?: StringOperationFilterInput | null
  lagerStalleNr?: StringOperationFilterInput | null
  slottidSlut?: ComparableNullableOfDateTimeOperationFilterInput | null
  siloId?: StringOperationFilterInput | null
  framkomlighet?: StringOperationFilterInput | null
  cfarNr?: StringOperationFilterInput | null
  fkAdresstypNavigation?: AdresstypFilterInput | null
  fkPositionerNavigation?: PositionerFilterInput | null
  arbetsplatser?: ListFilterInputTypeOfArbetsplatserFilterInput | null
  kunderFkAdresserBesoksadressNavigation?: ListFilterInputTypeOfKunderFilterInput | null
  kunderFkAdresserFakturaadressNavigation?: ListFilterInputTypeOfKunderFilterInput | null
}

export interface ComparableInt32OperationFilterInput {
  eq?: Int | null
  neq?: Int | null
  in?: Int[] | null
  nin?: Int[] | null
  gt?: Int | null
  ngt?: Int | null
  gte?: Int | null
  ngte?: Int | null
  lt?: Int | null
  nlt?: Int | null
  lte?: Int | null
  nlte?: Int | null
}

export interface BooleanOperationFilterInput {
  eq?: Boolean | null
  neq?: Boolean | null
}

export interface ComparableNullableOfInt32OperationFilterInput {
  eq?: Int | null
  neq?: Int | null
  in?: (Int | null)[] | null
  nin?: (Int | null)[] | null
  gt?: Int | null
  ngt?: Int | null
  gte?: Int | null
  ngte?: Int | null
  lt?: Int | null
  nlt?: Int | null
  lte?: Int | null
  nlte?: Int | null
}

export interface StringOperationFilterInput {
  and?: StringOperationFilterInput[] | null
  or?: StringOperationFilterInput[] | null
  eq?: String | null
  neq?: String | null
  contains?: String | null
  ncontains?: String | null
  in?: (String | null)[] | null
  nin?: (String | null)[] | null
  startsWith?: String | null
  nstartsWith?: String | null
  endsWith?: String | null
  nendsWith?: String | null
}

export interface ComparableNullableOfDateTimeOperationFilterInput {
  eq?: DateTime | null
  neq?: DateTime | null
  in?: (DateTime | null)[] | null
  nin?: (DateTime | null)[] | null
  gt?: DateTime | null
  ngt?: DateTime | null
  gte?: DateTime | null
  ngte?: DateTime | null
  lt?: DateTime | null
  nlt?: DateTime | null
  lte?: DateTime | null
  nlte?: DateTime | null
}

export interface AdresstypFilterInput {
  and?: AdresstypFilterInput[] | null
  or?: AdresstypFilterInput[] | null
  pk?: ComparableInt32OperationFilterInput | null
  adresstypNamn?: StringOperationFilterInput | null
  visaPaWeb?: BooleanOperationFilterInput | null
  adresser?: ListFilterInputTypeOfAdresserFilterInput | null
}

export interface ListFilterInputTypeOfAdresserFilterInput {
  all?: AdresserFilterInput | null
  none?: AdresserFilterInput | null
  some?: AdresserFilterInput | null
  any?: Boolean | null
}

export interface PositionerFilterInput {
  and?: PositionerFilterInput[] | null
  or?: PositionerFilterInput[] | null
  pk?: ComparableInt32OperationFilterInput | null
  latitude?: ComparableDoubleOperationFilterInput | null
  longitude?: ComparableDoubleOperationFilterInput | null
  xkoord?: ComparableNullableOfDoubleOperationFilterInput | null
  ykoord?: ComparableNullableOfDoubleOperationFilterInput | null
  reverseGeocodeResult?: StringOperationFilterInput | null
  adresser?: ListFilterInputTypeOfAdresserFilterInput | null
  arbetsplatser?: ListFilterInputTypeOfArbetsplatserFilterInput | null
}

export interface ComparableDoubleOperationFilterInput {
  eq?: Float | null
  neq?: Float | null
  in?: Float[] | null
  nin?: Float[] | null
  gt?: Float | null
  ngt?: Float | null
  gte?: Float | null
  ngte?: Float | null
  lt?: Float | null
  nlt?: Float | null
  lte?: Float | null
  nlte?: Float | null
}

export interface ComparableNullableOfDoubleOperationFilterInput {
  eq?: Float | null
  neq?: Float | null
  in?: (Float | null)[] | null
  nin?: (Float | null)[] | null
  gt?: Float | null
  ngt?: Float | null
  gte?: Float | null
  ngte?: Float | null
  lt?: Float | null
  nlt?: Float | null
  lte?: Float | null
  nlte?: Float | null
}

export interface ListFilterInputTypeOfArbetsplatserFilterInput {
  all?: ArbetsplatserFilterInput | null
  none?: ArbetsplatserFilterInput | null
  some?: ArbetsplatserFilterInput | null
  any?: Boolean | null
}

export interface ArbetsplatserFilterInput {
  and?: ArbetsplatserFilterInput[] | null
  or?: ArbetsplatserFilterInput[] | null
  pk?: ComparableInt32OperationFilterInput | null
  aktiv?: BooleanOperationFilterInput | null
  fkKunder?: ComparableInt32OperationFilterInput | null
  fkAdresser?: ComparableInt32OperationFilterInput | null
  fkPositioner?: ComparableNullableOfInt32OperationFilterInput | null
  arbetsplatsNamn?: StringOperationFilterInput | null
  oppnar?: ComparableNullableOfTimeSpanOperationFilterInput | null
  stanger?: ComparableNullableOfTimeSpanOperationFilterInput | null
  lunchStart?: ComparableNullableOfTimeSpanOperationFilterInput | null
  lunchStopp?: ComparableNullableOfTimeSpanOperationFilterInput | null
  nyckelkod?: StringOperationFilterInput | null
  kartkod?: StringOperationFilterInput | null
  sekundarKund?: StringOperationFilterInput | null
  referens1?: StringOperationFilterInput | null
  referens2?: StringOperationFilterInput | null
  referens3?: StringOperationFilterInput | null
  referens4?: StringOperationFilterInput | null
  referens5?: StringOperationFilterInput | null
  standardApl?: BooleanOperationFilterInput | null
  fastighetsbeteckning?: StringOperationFilterInput | null
  anl_ggningsnummer?: StringOperationFilterInput | null
  fkKontakt?: ComparableNullableOfInt32OperationFilterInput | null
  fkEwcgrupp?: ComparableNullableOfInt32OperationFilterInput | null
  fkKundgrupper?: ComparableNullableOfInt32OperationFilterInput | null
  fkLinjer?: ComparableNullableOfInt32OperationFilterInput | null
  debiteringsgrundandeAntal?: ComparableNullableOfInt32OperationFilterInput | null
  rowVersion?: ListComparableByteOperationFilterInput | null
  fkAdresserNavigation?: AdresserFilterInput | null
  fkKunderNavigation?: KunderFilterInput | null
  fkPositionerNavigation?: PositionerFilterInput | null
}

export interface ComparableNullableOfTimeSpanOperationFilterInput {
  eq?: TimeSpan | null
  neq?: TimeSpan | null
  in?: (TimeSpan | null)[] | null
  nin?: (TimeSpan | null)[] | null
  gt?: TimeSpan | null
  ngt?: TimeSpan | null
  gte?: TimeSpan | null
  ngte?: TimeSpan | null
  lt?: TimeSpan | null
  nlt?: TimeSpan | null
  lte?: TimeSpan | null
  nlte?: TimeSpan | null
}

export interface ListComparableByteOperationFilterInput {
  all?: ComparableByteOperationFilterInput | null
  none?: ComparableByteOperationFilterInput | null
  some?: ComparableByteOperationFilterInput | null
  any?: Boolean | null
}

export interface ComparableByteOperationFilterInput {
  eq?: Byte | null
  neq?: Byte | null
  in?: Byte[] | null
  nin?: Byte[] | null
  gt?: Byte | null
  ngt?: Byte | null
  gte?: Byte | null
  ngte?: Byte | null
  lt?: Byte | null
  nlt?: Byte | null
  lte?: Byte | null
  nlte?: Byte | null
}

export interface KunderFilterInput {
  and?: KunderFilterInput[] | null
  or?: KunderFilterInput[] | null
  pk?: ComparableInt32OperationFilterInput | null
  aktiv?: BooleanOperationFilterInput | null
  fkKundkategorier?: ComparableInt32OperationFilterInput | null
  fkBilder?: ComparableNullableOfInt32OperationFilterInput | null
  fkBetalvillkor?: ComparableNullableOfInt32OperationFilterInput | null
  fkLanderMoms?: ComparableInt32OperationFilterInput | null
  fkBetalare?: ComparableNullableOfInt32OperationFilterInput | null
  fkLinjer?: ComparableNullableOfInt32OperationFilterInput | null
  fkValutor?: ComparableInt32OperationFilterInput | null
  fkSchemaFakturering?: ComparableNullableOfInt32OperationFilterInput | null
  fkOmvandSkatt?: ComparableNullableOfInt32OperationFilterInput | null
  fkEntreprenad?: ComparableNullableOfInt32OperationFilterInput | null
  fkFaktureringsavgifter?: ComparableNullableOfInt32OperationFilterInput | null
  kund?: BooleanOperationFilterInput | null
  leverantor?: BooleanOperationFilterInput | null
  akare?: BooleanOperationFilterInput | null
  abonnent?: BooleanOperationFilterInput | null
  sparr?: BooleanOperationFilterInput | null
  prisSparr?: BooleanOperationFilterInput | null
  varning?: BooleanOperationFilterInput | null
  avrakningskund?: BooleanOperationFilterInput | null
  varningText?: StringOperationFilterInput | null
  kundNr?: StringOperationFilterInput | null
  kundNrEkonomi?: StringOperationFilterInput | null
  abonnentNr?: StringOperationFilterInput | null
  kundNamn?: StringOperationFilterInput | null
  kundid?: StringOperationFilterInput | null
  fkAdresserFakturaadress?: ComparableNullableOfInt32OperationFilterInput | null
  fkAdresserBesoksadress?: ComparableNullableOfInt32OperationFilterInput | null
  orgnr?: StringOperationFilterInput | null
  vat?: StringOperationFilterInput | null
  bankgiro?: StringOperationFilterInput | null
  postgiro?: StringOperationFilterInput | null
  skapadTidpunkt?: ComparableNullableOfDateTimeOperationFilterInput | null
  skapadAnvandare?: StringOperationFilterInput | null
  andradTidpunkt?: ComparableNullableOfDateTimeOperationFilterInput | null
  andradAnvandare?: StringOperationFilterInput | null
  kreditLimit?: ComparableNullableOfDoubleOperationFilterInput | null
  info?: StringOperationFilterInput | null
  popupInfo?: StringOperationFilterInput | null
  fakturamall?: ComparableNullableOfInt32OperationFilterInput | null
  kravLittera?: BooleanOperationFilterInput | null
  bankClearing?: StringOperationFilterInput | null
  bankKonto?: StringOperationFilterInput | null
  betalmetodExternkod?: StringOperationFilterInput | null
  swift?: StringOperationFilterInput | null
  iban?: StringOperationFilterInput | null
  riksbankskod?: StringOperationFilterInput | null
  fkFakturakoer?: ComparableNullableOfInt32OperationFilterInput | null
  fkFakturabrytLittera?: ComparableInt32OperationFilterInput | null
  fkFakturabrytKontakt?: ComparableInt32OperationFilterInput | null
  fakturabrytAntalOrders?: ComparableNullableOfInt32OperationFilterInput | null
  fkFakturabrytResurs?: ComparableInt32OperationFilterInput | null
  fkKontoBonusIntakt?: ComparableNullableOfInt32OperationFilterInput | null
  fkKontoBonusBalans?: ComparableNullableOfInt32OperationFilterInput | null
  bonusProcent?: ComparableNullableOfDoubleOperationFilterInput | null
  fkMomskodBonus?: ComparableNullableOfInt32OperationFilterInput | null
  fkMellanskillnadsmall?: ComparableNullableOfInt32OperationFilterInput | null
  mall?: BooleanOperationFilterInput | null
  mallNamn?: StringOperationFilterInput | null
  externkodMallLev?: StringOperationFilterInput | null
  externkodMallKund?: StringOperationFilterInput | null
  fkCountersMall?: ComparableNullableOfInt32OperationFilterInput | null
  kravReferens?: BooleanOperationFilterInput | null
  kravAo?: BooleanOperationFilterInput | null
  kravVagsedel?: BooleanOperationFilterInput | null
  kravTrptsedel?: BooleanOperationFilterInput | null
  fkEnumLitteraMode?: ComparableInt32OperationFilterInput | null
  litteraMask?: StringOperationFilterInput | null
  fkEnumFakturaPaslagRedovisning?: ComparableInt32OperationFilterInput | null
  fkKoncern?: ComparableNullableOfInt32OperationFilterInput | null
  fkEnumFakturalayout?: ComparableNullableOfInt32OperationFilterInput | null
  fkFakturabrytReferens?: ComparableInt32OperationFilterInput | null
  pallregnr?: StringOperationFilterInput | null
  gannr?: StringOperationFilterInput | null
  fkSprak?: ComparableNullableOfInt32OperationFilterInput | null
  fkKundbokforingsmall?: ComparableNullableOfInt32OperationFilterInput | null
  kravFraktsedel?: BooleanOperationFilterInput | null
  inkluderaVagsedlarIfakturan?: BooleanOperationFilterInput | null
  fkKundgrupper?: ComparableNullableOfInt32OperationFilterInput | null
  banknamn?: StringOperationFilterInput | null
  litteraMaskDescription?: StringOperationFilterInput | null
  fkFakturabrytArbetsordernr?: ComparableInt32OperationFilterInput | null
  fkEnumAvrakningslayout?: ComparableNullableOfInt32OperationFilterInput | null
  aktivTerminalScanning?: BooleanOperationFilterInput | null
  fkEnumBrytpunktPeriod?: ComparableInt32OperationFilterInput | null
  autoprisViaDeliveryBot?: BooleanOperationFilterInput | null
  fkAttestflode?: ComparableNullableOfInt32OperationFilterInput | null
  farg?: ListComparableByteOperationFilterInput | null
  foregroundFarg?: ListComparableByteOperationFilterInput | null
  skrymmeBerakning?: BooleanOperationFilterInput | null
  aktivMallMobilwebb?: BooleanOperationFilterInput | null
  utforKreditkontroll?: BooleanOperationFilterInput | null
  utforHamtaData?: BooleanOperationFilterInput | null
  kontrollInnanFakturering?: BooleanOperationFilterInput | null
  mallPrivatperson?: BooleanOperationFilterInput | null
  mallForetagskund?: BooleanOperationFilterInput | null
  inkluderaArbetsordersIfakturan?: BooleanOperationFilterInput | null
  externalId?: StringOperationFilterInput | null
  fkBolagInternkund?: ComparableNullableOfInt32OperationFilterInput | null
  tm?: BooleanOperationFilterInput | null
  fkEnumKravPaFotoSignatur?: ComparableNullableOfInt32OperationFilterInput | null
  fkAnvandare?: ComparableNullableOfInt32OperationFilterInput | null
  avrunda10?: ComparableNullableOfDoubleOperationFilterInput | null
  avrunda100?: ComparableNullableOfDoubleOperationFilterInput | null
  kravInstruktion?: StringOperationFilterInput | null
  inaktiveraSamtax?: BooleanOperationFilterInput | null
  fakturaReferens?: StringOperationFilterInput | null
  avrunda1?: ComparableNullableOfDoubleOperationFilterInput | null
  autoFakturering?: BooleanOperationFilterInput | null
  transportsedelMask?: StringOperationFilterInput | null
  fkFakturakoerAvrakning?: ComparableNullableOfInt32OperationFilterInput | null
  kundrefOnReport?: BooleanOperationFilterInput | null
  fkEwcgrupp?: ComparableNullableOfInt32OperationFilterInput | null
  fkEntreprenader?: ComparableNullableOfInt32OperationFilterInput | null
  fkFakturabrytArbetsplats?: ComparableInt32OperationFilterInput | null
  fakturaOchBilagorSomEnFil?: BooleanOperationFilterInput | null
  kravPaPosition?: BooleanOperationFilterInput | null
  globaltPaslag?: ComparableNullableOfDoubleOperationFilterInput | null
  globalRabatt?: ComparableNullableOfDoubleOperationFilterInput | null
  stopAutoPris?: BooleanOperationFilterInput | null
  avrakningEfterKundBetalning?: BooleanOperationFilterInput | null
  minimumTotalDebiteringResa?: ComparableNullableOfDoubleOperationFilterInput | null
  minimumTotalAvrakningResa?: ComparableNullableOfDoubleOperationFilterInput | null
  fkMinimumDebiteringsArtikel?: ComparableNullableOfInt32OperationFilterInput | null
  isKontantKund?: BooleanOperationFilterInput | null
  exkluderaRabattVidDebitering?: BooleanOperationFilterInput | null
  fkMomslandkod?: ComparableNullableOfInt32OperationFilterInput | null
  isKoncern?: BooleanOperationFilterInput | null
  isEntreprenadAgare?: BooleanOperationFilterInput | null
  fkArtikeldialekt?: ComparableNullableOfInt32OperationFilterInput | null
  kravKundref?: BooleanOperationFilterInput | null
  fkAnvandareKontakt?: ComparableNullableOfInt32OperationFilterInput | null
  sparrText?: StringOperationFilterInput | null
  dbcalcHarFilkrav?: BooleanOperationFilterInput | null
  fkEnumFgvmodell?: ComparableInt32OperationFilterInput | null
  ggn?: StringOperationFilterInput | null
  undantaFranKreditkontroll?: BooleanOperationFilterInput | null
  bomkorningEmailAdresser?: StringOperationFilterInput | null
  bomkorningTillaten?: BooleanOperationFilterInput | null
  bomkorningAction?: BooleanOperationFilterInput | null
  fkKommunikationskanal?: ComparableNullableOfInt32OperationFilterInput | null
  ediId?: StringOperationFilterInput | null
  faktureraKoncern?: BooleanOperationFilterInput | null
  autogiro?: BooleanOperationFilterInput | null
  forskottsbetalning?: BooleanOperationFilterInput | null
  kreditforsakratBelopp?: ComparableNullableOfInt32OperationFilterInput | null
  kreditforsakringsdatum?: ComparableNullableOfDateTimeOperationFilterInput | null
  kreditInfo?: StringOperationFilterInput | null
  fkKreditforsakratbeloppValuta?: ComparableNullableOfInt32OperationFilterInput | null
  fkEnumFakturaBrytOmvandMoms?: ComparableInt32OperationFilterInput | null
  fkEnumFakturaBrytDebetKredit?: ComparableInt32OperationFilterInput | null
  counterAvr?: ComparableInt32OperationFilterInput | null
  counterSelfInvoice?: ComparableInt32OperationFilterInput | null
  sparrSkrymmeMobilt?: BooleanOperationFilterInput | null
  fyraOgonGrans?: ComparableNullableOfInt32OperationFilterInput | null
  hanterasSomInternPaUtskrifter?: BooleanOperationFilterInput | null
  fkAviseringsMetod?: ComparableNullableOfInt32OperationFilterInput | null
  kravAviseringsInformation?: BooleanOperationFilterInput | null
  fkEdijobbAvisering?: ComparableNullableOfInt32OperationFilterInput | null
  genereraFvPriser?: BooleanOperationFilterInput | null
  fkEdijobbSms?: ComparableNullableOfInt32OperationFilterInput | null
  rowVersion?: ListComparableByteOperationFilterInput | null
  epostPaminnelse?: StringOperationFilterInput | null
  fkEnumProcentuelltTillaggPrincip?: ComparableInt32OperationFilterInput | null
  bransch?: StringOperationFilterInput | null
  fkEnumBomkorningsMetod?: ComparableNullableOfInt32OperationFilterInput | null
  rapporteraDataTillNvv?: BooleanOperationFilterInput | null
  fkFakturabrytResa?: ComparableInt32OperationFilterInput | null
  dimensionskod?: StringOperationFilterInput | null
  dimensionsbeskrivning?: StringOperationFilterInput | null
  autoPrisKlarFaktMobil?: BooleanOperationFilterInput | null
  enumRapporteringstypNvv?: ComparableNullableOfInt32OperationFilterInput | null
  appliceraNyttEdiOrderidVidBomkorning?: BooleanOperationFilterInput | null
  genereraResenoderPerKoordinat?: BooleanOperationFilterInput | null
  fkFakturabrytBetalningsunderlag?: ComparableInt32OperationFilterInput | null
  fkFakturabrytVerksamhet?: ComparableInt32OperationFilterInput | null
  fkBetalvillkorSjalvfaktura?: ComparableNullableOfInt32OperationFilterInput | null
  inaktiveraAvstandsBerakning?: BooleanOperationFilterInput | null
  stopKoncernPris?: BooleanOperationFilterInput | null
  fkFakturabrytKundref?: ComparableInt32OperationFilterInput | null
  epostNvvbekraftelse?: StringOperationFilterInput | null
  personNrSwish?: StringOperationFilterInput | null
  telefonNrSwish?: StringOperationFilterInput | null
  fkAdresserBesoksadressNavigation?: AdresserFilterInput | null
  fkAdresserFakturaadressNavigation?: AdresserFilterInput | null
  fkBetalareNavigation?: KunderFilterInput | null
  fkEntreprenadNavigation?: KunderFilterInput | null
  fkKoncernNavigation?: KunderFilterInput | null
  arbetsplatser?: ListFilterInputTypeOfArbetsplatserFilterInput | null
  inverseFkBetalareNavigation?: ListFilterInputTypeOfKunderFilterInput | null
  inverseFkEntreprenadNavigation?: ListFilterInputTypeOfKunderFilterInput | null
  inverseFkKoncernNavigation?: ListFilterInputTypeOfKunderFilterInput | null
}

export interface ListFilterInputTypeOfKunderFilterInput {
  all?: KunderFilterInput | null
  none?: KunderFilterInput | null
  some?: KunderFilterInput | null
  any?: Boolean | null
}

export interface AdresserSortInput {
  pk?: SortEnumType | null
  aktiv?: SortEnumType | null
  fkAdresstyp?: SortEnumType | null
  fkPositioner?: SortEnumType | null
  fkLander?: SortEnumType | null
  namn?: SortEnumType | null
  co?: SortEnumType | null
  adress1?: SortEnumType | null
  adress2?: SortEnumType | null
  zon?: SortEnumType | null
  postnr?: SortEnumType | null
  ort?: SortEnumType | null
  kontakt?: SortEnumType | null
  epost?: SortEnumType | null
  telefon1?: SortEnumType | null
  telefon2?: SortEnumType | null
  telefon3?: SortEnumType | null
  mobiltelefon?: SortEnumType | null
  fax?: SortEnumType | null
  vagbeskrivning?: SortEnumType | null
  referens?: SortEnumType | null
  id?: SortEnumType | null
  fkZon?: SortEnumType | null
  lastinfo?: SortEnumType | null
  lossinfo?: SortEnumType | null
  pallregNummer?: SortEnumType | null
  slottid?: SortEnumType | null
  internInformation?: SortEnumType | null
  kommunKod?: SortEnumType | null
  lagerStalleNr?: SortEnumType | null
  slottidSlut?: SortEnumType | null
  siloId?: SortEnumType | null
  framkomlighet?: SortEnumType | null
  cfarNr?: SortEnumType | null
  fkAdresstypNavigation?: AdresstypSortInput | null
  fkPositionerNavigation?: PositionerSortInput | null
}

export interface AdresstypSortInput {
  pk?: SortEnumType | null
  adresstypNamn?: SortEnumType | null
  visaPaWeb?: SortEnumType | null
}

export interface PositionerSortInput {
  pk?: SortEnumType | null
  latitude?: SortEnumType | null
  longitude?: SortEnumType | null
  xkoord?: SortEnumType | null
  ykoord?: SortEnumType | null
  reverseGeocodeResult?: SortEnumType | null
}

export interface AdresserCollectionSegmentRequest {
  items?: AdresserRequest
  /** Information to aid in pagination. */
  pageInfo?: CollectionSegmentInfoRequest
  totalCount?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface AdresserRequest {
  pk?: boolean | number
  aktiv?: boolean | number
  fkAdresstyp?: boolean | number
  fkPositioner?: boolean | number
  fkLander?: boolean | number
  namn?: boolean | number
  co?: boolean | number
  adress1?: boolean | number
  adress2?: boolean | number
  zon?: boolean | number
  postnr?: boolean | number
  ort?: boolean | number
  kontakt?: boolean | number
  epost?: boolean | number
  telefon1?: boolean | number
  telefon2?: boolean | number
  telefon3?: boolean | number
  mobiltelefon?: boolean | number
  fax?: boolean | number
  vagbeskrivning?: boolean | number
  referens?: boolean | number
  id?: boolean | number
  fkZon?: boolean | number
  lastinfo?: boolean | number
  lossinfo?: boolean | number
  pallregNummer?: boolean | number
  slottid?: boolean | number
  internInformation?: boolean | number
  kommunKod?: boolean | number
  lagerStalleNr?: boolean | number
  slottidSlut?: boolean | number
  siloId?: boolean | number
  framkomlighet?: boolean | number
  cfarNr?: boolean | number
  fkAdresstypNavigation?: AdresstypRequest
  fkPositionerNavigation?: PositionerRequest
  arbetsplatser?: ArbetsplatserRequest
  kunderFkAdresserBesoksadressNavigation?: KunderRequest
  kunderFkAdresserFakturaadressNavigation?: KunderRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface AdresstypRequest {
  pk?: boolean | number
  adresstypNamn?: boolean | number
  visaPaWeb?: boolean | number
  adresser?: AdresserRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PositionerRequest {
  pk?: boolean | number
  latitude?: boolean | number
  longitude?: boolean | number
  xkoord?: boolean | number
  ykoord?: boolean | number
  reverseGeocodeResult?: boolean | number
  adresser?: AdresserRequest
  arbetsplatser?: ArbetsplatserRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ArbetsplatserRequest {
  pk?: boolean | number
  aktiv?: boolean | number
  fkKunder?: boolean | number
  fkAdresser?: boolean | number
  fkPositioner?: boolean | number
  arbetsplatsNamn?: boolean | number
  oppnar?: boolean | number
  stanger?: boolean | number
  lunchStart?: boolean | number
  lunchStopp?: boolean | number
  nyckelkod?: boolean | number
  kartkod?: boolean | number
  sekundarKund?: boolean | number
  referens1?: boolean | number
  referens2?: boolean | number
  referens3?: boolean | number
  referens4?: boolean | number
  referens5?: boolean | number
  standardApl?: boolean | number
  fastighetsbeteckning?: boolean | number
  anl_ggningsnummer?: boolean | number
  fkKontakt?: boolean | number
  fkEwcgrupp?: boolean | number
  fkKundgrupper?: boolean | number
  fkLinjer?: boolean | number
  debiteringsgrundandeAntal?: boolean | number
  rowVersion?: boolean | number
  fkAdresserNavigation?: AdresserRequest
  fkKunderNavigation?: KunderRequest
  fkPositionerNavigation?: PositionerRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface KunderRequest {
  pk?: boolean | number
  aktiv?: boolean | number
  fkKundkategorier?: boolean | number
  fkBilder?: boolean | number
  fkBetalvillkor?: boolean | number
  fkLanderMoms?: boolean | number
  fkBetalare?: boolean | number
  fkLinjer?: boolean | number
  fkValutor?: boolean | number
  fkSchemaFakturering?: boolean | number
  fkOmvandSkatt?: boolean | number
  fkEntreprenad?: boolean | number
  fkFaktureringsavgifter?: boolean | number
  kund?: boolean | number
  leverantor?: boolean | number
  akare?: boolean | number
  abonnent?: boolean | number
  sparr?: boolean | number
  prisSparr?: boolean | number
  varning?: boolean | number
  avrakningskund?: boolean | number
  varningText?: boolean | number
  kundNr?: boolean | number
  kundNrEkonomi?: boolean | number
  abonnentNr?: boolean | number
  kundNamn?: boolean | number
  kundid?: boolean | number
  fkAdresserFakturaadress?: boolean | number
  fkAdresserBesoksadress?: boolean | number
  orgnr?: boolean | number
  vat?: boolean | number
  bankgiro?: boolean | number
  postgiro?: boolean | number
  skapadTidpunkt?: boolean | number
  skapadAnvandare?: boolean | number
  andradTidpunkt?: boolean | number
  andradAnvandare?: boolean | number
  kreditLimit?: boolean | number
  info?: boolean | number
  popupInfo?: boolean | number
  fakturamall?: boolean | number
  kravLittera?: boolean | number
  bankClearing?: boolean | number
  bankKonto?: boolean | number
  betalmetodExternkod?: boolean | number
  swift?: boolean | number
  iban?: boolean | number
  riksbankskod?: boolean | number
  fkFakturakoer?: boolean | number
  fkFakturabrytLittera?: boolean | number
  fkFakturabrytKontakt?: boolean | number
  fakturabrytAntalOrders?: boolean | number
  fkFakturabrytResurs?: boolean | number
  fkKontoBonusIntakt?: boolean | number
  fkKontoBonusBalans?: boolean | number
  bonusProcent?: boolean | number
  fkMomskodBonus?: boolean | number
  fkMellanskillnadsmall?: boolean | number
  mall?: boolean | number
  mallNamn?: boolean | number
  externkodMallLev?: boolean | number
  externkodMallKund?: boolean | number
  fkCountersMall?: boolean | number
  kravReferens?: boolean | number
  kravAo?: boolean | number
  kravVagsedel?: boolean | number
  kravTrptsedel?: boolean | number
  fkEnumLitteraMode?: boolean | number
  litteraMask?: boolean | number
  fkEnumFakturaPaslagRedovisning?: boolean | number
  fkKoncern?: boolean | number
  fkEnumFakturalayout?: boolean | number
  fkFakturabrytReferens?: boolean | number
  pallregnr?: boolean | number
  gannr?: boolean | number
  fkSprak?: boolean | number
  fkKundbokforingsmall?: boolean | number
  kravFraktsedel?: boolean | number
  inkluderaVagsedlarIfakturan?: boolean | number
  fkKundgrupper?: boolean | number
  banknamn?: boolean | number
  litteraMaskDescription?: boolean | number
  fkFakturabrytArbetsordernr?: boolean | number
  fkEnumAvrakningslayout?: boolean | number
  aktivTerminalScanning?: boolean | number
  fkEnumBrytpunktPeriod?: boolean | number
  autoprisViaDeliveryBot?: boolean | number
  fkAttestflode?: boolean | number
  farg?: boolean | number
  foregroundFarg?: boolean | number
  skrymmeBerakning?: boolean | number
  aktivMallMobilwebb?: boolean | number
  utforKreditkontroll?: boolean | number
  utforHamtaData?: boolean | number
  kontrollInnanFakturering?: boolean | number
  mallPrivatperson?: boolean | number
  mallForetagskund?: boolean | number
  inkluderaArbetsordersIfakturan?: boolean | number
  externalId?: boolean | number
  fkBolagInternkund?: boolean | number
  tm?: boolean | number
  fkEnumKravPaFotoSignatur?: boolean | number
  fkAnvandare?: boolean | number
  avrunda10?: boolean | number
  avrunda100?: boolean | number
  kravInstruktion?: boolean | number
  inaktiveraSamtax?: boolean | number
  fakturaReferens?: boolean | number
  avrunda1?: boolean | number
  autoFakturering?: boolean | number
  transportsedelMask?: boolean | number
  fkFakturakoerAvrakning?: boolean | number
  kundrefOnReport?: boolean | number
  fkEwcgrupp?: boolean | number
  fkEntreprenader?: boolean | number
  fkFakturabrytArbetsplats?: boolean | number
  fakturaOchBilagorSomEnFil?: boolean | number
  kravPaPosition?: boolean | number
  globaltPaslag?: boolean | number
  globalRabatt?: boolean | number
  stopAutoPris?: boolean | number
  avrakningEfterKundBetalning?: boolean | number
  minimumTotalDebiteringResa?: boolean | number
  minimumTotalAvrakningResa?: boolean | number
  fkMinimumDebiteringsArtikel?: boolean | number
  isKontantKund?: boolean | number
  exkluderaRabattVidDebitering?: boolean | number
  fkMomslandkod?: boolean | number
  isKoncern?: boolean | number
  isEntreprenadAgare?: boolean | number
  fkArtikeldialekt?: boolean | number
  kravKundref?: boolean | number
  fkAnvandareKontakt?: boolean | number
  sparrText?: boolean | number
  dbcalcHarFilkrav?: boolean | number
  fkEnumFgvmodell?: boolean | number
  ggn?: boolean | number
  undantaFranKreditkontroll?: boolean | number
  bomkorningEmailAdresser?: boolean | number
  bomkorningTillaten?: boolean | number
  bomkorningAction?: boolean | number
  fkKommunikationskanal?: boolean | number
  ediId?: boolean | number
  faktureraKoncern?: boolean | number
  autogiro?: boolean | number
  forskottsbetalning?: boolean | number
  kreditforsakratBelopp?: boolean | number
  kreditforsakringsdatum?: boolean | number
  kreditInfo?: boolean | number
  fkKreditforsakratbeloppValuta?: boolean | number
  fkEnumFakturaBrytOmvandMoms?: boolean | number
  fkEnumFakturaBrytDebetKredit?: boolean | number
  counterAvr?: boolean | number
  counterSelfInvoice?: boolean | number
  sparrSkrymmeMobilt?: boolean | number
  fyraOgonGrans?: boolean | number
  hanterasSomInternPaUtskrifter?: boolean | number
  fkAviseringsMetod?: boolean | number
  kravAviseringsInformation?: boolean | number
  fkEdijobbAvisering?: boolean | number
  genereraFvPriser?: boolean | number
  fkEdijobbSms?: boolean | number
  rowVersion?: boolean | number
  epostPaminnelse?: boolean | number
  fkEnumProcentuelltTillaggPrincip?: boolean | number
  bransch?: boolean | number
  fkEnumBomkorningsMetod?: boolean | number
  rapporteraDataTillNvv?: boolean | number
  fkFakturabrytResa?: boolean | number
  dimensionskod?: boolean | number
  dimensionsbeskrivning?: boolean | number
  autoPrisKlarFaktMobil?: boolean | number
  enumRapporteringstypNvv?: boolean | number
  appliceraNyttEdiOrderidVidBomkorning?: boolean | number
  genereraResenoderPerKoordinat?: boolean | number
  fkFakturabrytBetalningsunderlag?: boolean | number
  fkFakturabrytVerksamhet?: boolean | number
  fkBetalvillkorSjalvfaktura?: boolean | number
  inaktiveraAvstandsBerakning?: boolean | number
  stopKoncernPris?: boolean | number
  fkFakturabrytKundref?: boolean | number
  epostNvvbekraftelse?: boolean | number
  personNrSwish?: boolean | number
  telefonNrSwish?: boolean | number
  fkAdresserBesoksadressNavigation?: AdresserRequest
  fkAdresserFakturaadressNavigation?: AdresserRequest
  fkBetalareNavigation?: KunderRequest
  fkEntreprenadNavigation?: KunderRequest
  fkKoncernNavigation?: KunderRequest
  arbetsplatser?: ArbetsplatserRequest
  inverseFkBetalareNavigation?: KunderRequest
  inverseFkEntreprenadNavigation?: KunderRequest
  inverseFkKoncernNavigation?: KunderRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Information about the offset pagination. */
export interface CollectionSegmentInfoRequest {
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage?: boolean | number
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ArbetsplatserSortInput {
  pk?: SortEnumType | null
  aktiv?: SortEnumType | null
  fkKunder?: SortEnumType | null
  fkAdresser?: SortEnumType | null
  fkPositioner?: SortEnumType | null
  arbetsplatsNamn?: SortEnumType | null
  oppnar?: SortEnumType | null
  stanger?: SortEnumType | null
  lunchStart?: SortEnumType | null
  lunchStopp?: SortEnumType | null
  nyckelkod?: SortEnumType | null
  kartkod?: SortEnumType | null
  sekundarKund?: SortEnumType | null
  referens1?: SortEnumType | null
  referens2?: SortEnumType | null
  referens3?: SortEnumType | null
  referens4?: SortEnumType | null
  referens5?: SortEnumType | null
  standardApl?: SortEnumType | null
  fastighetsbeteckning?: SortEnumType | null
  anl_ggningsnummer?: SortEnumType | null
  fkKontakt?: SortEnumType | null
  fkEwcgrupp?: SortEnumType | null
  fkKundgrupper?: SortEnumType | null
  fkLinjer?: SortEnumType | null
  debiteringsgrundandeAntal?: SortEnumType | null
  fkAdresserNavigation?: AdresserSortInput | null
  fkKunderNavigation?: KunderSortInput | null
  fkPositionerNavigation?: PositionerSortInput | null
}

export interface KunderSortInput {
  pk?: SortEnumType | null
  aktiv?: SortEnumType | null
  fkKundkategorier?: SortEnumType | null
  fkBilder?: SortEnumType | null
  fkBetalvillkor?: SortEnumType | null
  fkLanderMoms?: SortEnumType | null
  fkBetalare?: SortEnumType | null
  fkLinjer?: SortEnumType | null
  fkValutor?: SortEnumType | null
  fkSchemaFakturering?: SortEnumType | null
  fkOmvandSkatt?: SortEnumType | null
  fkEntreprenad?: SortEnumType | null
  fkFaktureringsavgifter?: SortEnumType | null
  kund?: SortEnumType | null
  leverantor?: SortEnumType | null
  akare?: SortEnumType | null
  abonnent?: SortEnumType | null
  sparr?: SortEnumType | null
  prisSparr?: SortEnumType | null
  varning?: SortEnumType | null
  avrakningskund?: SortEnumType | null
  varningText?: SortEnumType | null
  kundNr?: SortEnumType | null
  kundNrEkonomi?: SortEnumType | null
  abonnentNr?: SortEnumType | null
  kundNamn?: SortEnumType | null
  kundid?: SortEnumType | null
  fkAdresserFakturaadress?: SortEnumType | null
  fkAdresserBesoksadress?: SortEnumType | null
  orgnr?: SortEnumType | null
  vat?: SortEnumType | null
  bankgiro?: SortEnumType | null
  postgiro?: SortEnumType | null
  skapadTidpunkt?: SortEnumType | null
  skapadAnvandare?: SortEnumType | null
  andradTidpunkt?: SortEnumType | null
  andradAnvandare?: SortEnumType | null
  kreditLimit?: SortEnumType | null
  info?: SortEnumType | null
  popupInfo?: SortEnumType | null
  fakturamall?: SortEnumType | null
  kravLittera?: SortEnumType | null
  bankClearing?: SortEnumType | null
  bankKonto?: SortEnumType | null
  betalmetodExternkod?: SortEnumType | null
  swift?: SortEnumType | null
  iban?: SortEnumType | null
  riksbankskod?: SortEnumType | null
  fkFakturakoer?: SortEnumType | null
  fkFakturabrytLittera?: SortEnumType | null
  fkFakturabrytKontakt?: SortEnumType | null
  fakturabrytAntalOrders?: SortEnumType | null
  fkFakturabrytResurs?: SortEnumType | null
  fkKontoBonusIntakt?: SortEnumType | null
  fkKontoBonusBalans?: SortEnumType | null
  bonusProcent?: SortEnumType | null
  fkMomskodBonus?: SortEnumType | null
  fkMellanskillnadsmall?: SortEnumType | null
  mall?: SortEnumType | null
  mallNamn?: SortEnumType | null
  externkodMallLev?: SortEnumType | null
  externkodMallKund?: SortEnumType | null
  fkCountersMall?: SortEnumType | null
  kravReferens?: SortEnumType | null
  kravAo?: SortEnumType | null
  kravVagsedel?: SortEnumType | null
  kravTrptsedel?: SortEnumType | null
  fkEnumLitteraMode?: SortEnumType | null
  litteraMask?: SortEnumType | null
  fkEnumFakturaPaslagRedovisning?: SortEnumType | null
  fkKoncern?: SortEnumType | null
  fkEnumFakturalayout?: SortEnumType | null
  fkFakturabrytReferens?: SortEnumType | null
  pallregnr?: SortEnumType | null
  gannr?: SortEnumType | null
  fkSprak?: SortEnumType | null
  fkKundbokforingsmall?: SortEnumType | null
  kravFraktsedel?: SortEnumType | null
  inkluderaVagsedlarIfakturan?: SortEnumType | null
  fkKundgrupper?: SortEnumType | null
  banknamn?: SortEnumType | null
  litteraMaskDescription?: SortEnumType | null
  fkFakturabrytArbetsordernr?: SortEnumType | null
  fkEnumAvrakningslayout?: SortEnumType | null
  aktivTerminalScanning?: SortEnumType | null
  fkEnumBrytpunktPeriod?: SortEnumType | null
  autoprisViaDeliveryBot?: SortEnumType | null
  fkAttestflode?: SortEnumType | null
  skrymmeBerakning?: SortEnumType | null
  aktivMallMobilwebb?: SortEnumType | null
  utforKreditkontroll?: SortEnumType | null
  utforHamtaData?: SortEnumType | null
  kontrollInnanFakturering?: SortEnumType | null
  mallPrivatperson?: SortEnumType | null
  mallForetagskund?: SortEnumType | null
  inkluderaArbetsordersIfakturan?: SortEnumType | null
  externalId?: SortEnumType | null
  fkBolagInternkund?: SortEnumType | null
  tm?: SortEnumType | null
  fkEnumKravPaFotoSignatur?: SortEnumType | null
  fkAnvandare?: SortEnumType | null
  avrunda10?: SortEnumType | null
  avrunda100?: SortEnumType | null
  kravInstruktion?: SortEnumType | null
  inaktiveraSamtax?: SortEnumType | null
  fakturaReferens?: SortEnumType | null
  avrunda1?: SortEnumType | null
  autoFakturering?: SortEnumType | null
  transportsedelMask?: SortEnumType | null
  fkFakturakoerAvrakning?: SortEnumType | null
  kundrefOnReport?: SortEnumType | null
  fkEwcgrupp?: SortEnumType | null
  fkEntreprenader?: SortEnumType | null
  fkFakturabrytArbetsplats?: SortEnumType | null
  fakturaOchBilagorSomEnFil?: SortEnumType | null
  kravPaPosition?: SortEnumType | null
  globaltPaslag?: SortEnumType | null
  globalRabatt?: SortEnumType | null
  stopAutoPris?: SortEnumType | null
  avrakningEfterKundBetalning?: SortEnumType | null
  minimumTotalDebiteringResa?: SortEnumType | null
  minimumTotalAvrakningResa?: SortEnumType | null
  fkMinimumDebiteringsArtikel?: SortEnumType | null
  isKontantKund?: SortEnumType | null
  exkluderaRabattVidDebitering?: SortEnumType | null
  fkMomslandkod?: SortEnumType | null
  isKoncern?: SortEnumType | null
  isEntreprenadAgare?: SortEnumType | null
  fkArtikeldialekt?: SortEnumType | null
  kravKundref?: SortEnumType | null
  fkAnvandareKontakt?: SortEnumType | null
  sparrText?: SortEnumType | null
  dbcalcHarFilkrav?: SortEnumType | null
  fkEnumFgvmodell?: SortEnumType | null
  ggn?: SortEnumType | null
  undantaFranKreditkontroll?: SortEnumType | null
  bomkorningEmailAdresser?: SortEnumType | null
  bomkorningTillaten?: SortEnumType | null
  bomkorningAction?: SortEnumType | null
  fkKommunikationskanal?: SortEnumType | null
  ediId?: SortEnumType | null
  faktureraKoncern?: SortEnumType | null
  autogiro?: SortEnumType | null
  forskottsbetalning?: SortEnumType | null
  kreditforsakratBelopp?: SortEnumType | null
  kreditforsakringsdatum?: SortEnumType | null
  kreditInfo?: SortEnumType | null
  fkKreditforsakratbeloppValuta?: SortEnumType | null
  fkEnumFakturaBrytOmvandMoms?: SortEnumType | null
  fkEnumFakturaBrytDebetKredit?: SortEnumType | null
  counterAvr?: SortEnumType | null
  counterSelfInvoice?: SortEnumType | null
  sparrSkrymmeMobilt?: SortEnumType | null
  fyraOgonGrans?: SortEnumType | null
  hanterasSomInternPaUtskrifter?: SortEnumType | null
  fkAviseringsMetod?: SortEnumType | null
  kravAviseringsInformation?: SortEnumType | null
  fkEdijobbAvisering?: SortEnumType | null
  genereraFvPriser?: SortEnumType | null
  fkEdijobbSms?: SortEnumType | null
  epostPaminnelse?: SortEnumType | null
  fkEnumProcentuelltTillaggPrincip?: SortEnumType | null
  bransch?: SortEnumType | null
  fkEnumBomkorningsMetod?: SortEnumType | null
  rapporteraDataTillNvv?: SortEnumType | null
  fkFakturabrytResa?: SortEnumType | null
  dimensionskod?: SortEnumType | null
  dimensionsbeskrivning?: SortEnumType | null
  autoPrisKlarFaktMobil?: SortEnumType | null
  enumRapporteringstypNvv?: SortEnumType | null
  appliceraNyttEdiOrderidVidBomkorning?: SortEnumType | null
  genereraResenoderPerKoordinat?: SortEnumType | null
  fkFakturabrytBetalningsunderlag?: SortEnumType | null
  fkFakturabrytVerksamhet?: SortEnumType | null
  fkBetalvillkorSjalvfaktura?: SortEnumType | null
  inaktiveraAvstandsBerakning?: SortEnumType | null
  stopKoncernPris?: SortEnumType | null
  fkFakturabrytKundref?: SortEnumType | null
  epostNvvbekraftelse?: SortEnumType | null
  personNrSwish?: SortEnumType | null
  telefonNrSwish?: SortEnumType | null
  fkAdresserBesoksadressNavigation?: AdresserSortInput | null
  fkAdresserFakturaadressNavigation?: AdresserSortInput | null
  fkBetalareNavigation?: KunderSortInput | null
  fkEntreprenadNavigation?: KunderSortInput | null
  fkKoncernNavigation?: KunderSortInput | null
}

export interface ArbetsplatserCollectionSegmentRequest {
  items?: ArbetsplatserRequest
  /** Information to aid in pagination. */
  pageInfo?: CollectionSegmentInfoRequest
  totalCount?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface KunderCollectionSegmentRequest {
  items?: KunderRequest
  /** Information to aid in pagination. */
  pageInfo?: CollectionSegmentInfoRequest
  totalCount?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PositionerCollectionSegmentRequest {
  items?: PositionerRequest
  /** Information to aid in pagination. */
  pageInfo?: CollectionSegmentInfoRequest
  totalCount?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface MutationRequest {
  upsertArbetsplats?: [{ input: UpsertArbetsplatsInput }, MutationOutputRequest]
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface UpsertArbetsplatsInput {
  aktiv?: Boolean | null
  arbetsplatsNamn?: String | null
  fkKunder?: Int | null
  adress1?: String | null
  ort?: String | null
  postnr?: String | null
  latitude?: Float | null
  longitude?: Float | null
  pk?: Int | null
  onlyValidate?: Boolean | null
}

export interface MutationOutputRequest {
  pk?: boolean | number
  validationErrors?: ValidationErrorRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ValidationErrorRequest {
  message?: boolean | number
  property?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface SubscriptionRequest {
  arbetsplatsInserted?: ArbetsplatserRequest
  arbetsplatsUpdated?: ArbetsplatserRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

const Query_possibleTypes = ['Query']
export const isQuery = (obj: { __typename: String }): obj is Query => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Query_possibleTypes.includes(obj.__typename)
}

const AdresserCollectionSegment_possibleTypes = ['AdresserCollectionSegment']
export const isAdresserCollectionSegment = (obj: { __typename: String }): obj is AdresserCollectionSegment => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return AdresserCollectionSegment_possibleTypes.includes(obj.__typename)
}

const Adresser_possibleTypes = ['Adresser']
export const isAdresser = (obj: { __typename: String }): obj is Adresser => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Adresser_possibleTypes.includes(obj.__typename)
}

const Adresstyp_possibleTypes = ['Adresstyp']
export const isAdresstyp = (obj: { __typename: String }): obj is Adresstyp => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Adresstyp_possibleTypes.includes(obj.__typename)
}

const Positioner_possibleTypes = ['Positioner']
export const isPositioner = (obj: { __typename: String }): obj is Positioner => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Positioner_possibleTypes.includes(obj.__typename)
}

const Arbetsplatser_possibleTypes = ['Arbetsplatser']
export const isArbetsplatser = (obj: { __typename: String }): obj is Arbetsplatser => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Arbetsplatser_possibleTypes.includes(obj.__typename)
}

const Kunder_possibleTypes = ['Kunder']
export const isKunder = (obj: { __typename: String }): obj is Kunder => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Kunder_possibleTypes.includes(obj.__typename)
}

const CollectionSegmentInfo_possibleTypes = ['CollectionSegmentInfo']
export const isCollectionSegmentInfo = (obj: { __typename: String }): obj is CollectionSegmentInfo => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return CollectionSegmentInfo_possibleTypes.includes(obj.__typename)
}

const ArbetsplatserCollectionSegment_possibleTypes = ['ArbetsplatserCollectionSegment']
export const isArbetsplatserCollectionSegment = (obj: { __typename: String }): obj is ArbetsplatserCollectionSegment => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return ArbetsplatserCollectionSegment_possibleTypes.includes(obj.__typename)
}

const KunderCollectionSegment_possibleTypes = ['KunderCollectionSegment']
export const isKunderCollectionSegment = (obj: { __typename: String }): obj is KunderCollectionSegment => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return KunderCollectionSegment_possibleTypes.includes(obj.__typename)
}

const PositionerCollectionSegment_possibleTypes = ['PositionerCollectionSegment']
export const isPositionerCollectionSegment = (obj: { __typename: String }): obj is PositionerCollectionSegment => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return PositionerCollectionSegment_possibleTypes.includes(obj.__typename)
}

const Mutation_possibleTypes = ['Mutation']
export const isMutation = (obj: { __typename: String }): obj is Mutation => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Mutation_possibleTypes.includes(obj.__typename)
}

const MutationOutput_possibleTypes = ['MutationOutput']
export const isMutationOutput = (obj: { __typename: String }): obj is MutationOutput => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return MutationOutput_possibleTypes.includes(obj.__typename)
}

const ValidationError_possibleTypes = ['ValidationError']
export const isValidationError = (obj: { __typename: String }): obj is ValidationError => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return ValidationError_possibleTypes.includes(obj.__typename)
}

const Subscription_possibleTypes = ['Subscription']
export const isSubscription = (obj: { __typename: String }): obj is Subscription => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Subscription_possibleTypes.includes(obj.__typename)
}

export interface QueryPromiseChain {
  adresser: ((args?: {
    skip?: Int | null
    take?: Int | null
    where?: AdresserFilterInput | null
    order?: AdresserSortInput[] | null
  }) => AdresserCollectionSegmentPromiseChain & {
    execute: (
      request: AdresserCollectionSegmentRequest,
      defaultValue?: AdresserCollectionSegment | null,
    ) => Promise<AdresserCollectionSegment | null>
  }) &
    (AdresserCollectionSegmentPromiseChain & {
      execute: (
        request: AdresserCollectionSegmentRequest,
        defaultValue?: AdresserCollectionSegment | null,
      ) => Promise<AdresserCollectionSegment | null>
    })
  arbetsplatser: ((args?: {
    skip?: Int | null
    take?: Int | null
    where?: ArbetsplatserFilterInput | null
    order?: ArbetsplatserSortInput[] | null
  }) => ArbetsplatserCollectionSegmentPromiseChain & {
    execute: (
      request: ArbetsplatserCollectionSegmentRequest,
      defaultValue?: ArbetsplatserCollectionSegment | null,
    ) => Promise<ArbetsplatserCollectionSegment | null>
  }) &
    (ArbetsplatserCollectionSegmentPromiseChain & {
      execute: (
        request: ArbetsplatserCollectionSegmentRequest,
        defaultValue?: ArbetsplatserCollectionSegment | null,
      ) => Promise<ArbetsplatserCollectionSegment | null>
    })
  kunder: ((args?: {
    skip?: Int | null
    take?: Int | null
    where?: KunderFilterInput | null
    order?: KunderSortInput[] | null
  }) => KunderCollectionSegmentPromiseChain & {
    execute: (
      request: KunderCollectionSegmentRequest,
      defaultValue?: KunderCollectionSegment | null,
    ) => Promise<KunderCollectionSegment | null>
  }) &
    (KunderCollectionSegmentPromiseChain & {
      execute: (
        request: KunderCollectionSegmentRequest,
        defaultValue?: KunderCollectionSegment | null,
      ) => Promise<KunderCollectionSegment | null>
    })
  positioner: ((args?: {
    skip?: Int | null
    take?: Int | null
    where?: PositionerFilterInput | null
    order?: PositionerSortInput[] | null
  }) => PositionerCollectionSegmentPromiseChain & {
    execute: (
      request: PositionerCollectionSegmentRequest,
      defaultValue?: PositionerCollectionSegment | null,
    ) => Promise<PositionerCollectionSegment | null>
  }) &
    (PositionerCollectionSegmentPromiseChain & {
      execute: (
        request: PositionerCollectionSegmentRequest,
        defaultValue?: PositionerCollectionSegment | null,
      ) => Promise<PositionerCollectionSegment | null>
    })
}

export interface QueryObservableChain {
  adresser: ((args?: {
    skip?: Int | null
    take?: Int | null
    where?: AdresserFilterInput | null
    order?: AdresserSortInput[] | null
  }) => AdresserCollectionSegmentObservableChain & {
    execute: (
      request: AdresserCollectionSegmentRequest,
      defaultValue?: AdresserCollectionSegment | null,
    ) => Observable<AdresserCollectionSegment | null>
  }) &
    (AdresserCollectionSegmentObservableChain & {
      execute: (
        request: AdresserCollectionSegmentRequest,
        defaultValue?: AdresserCollectionSegment | null,
      ) => Observable<AdresserCollectionSegment | null>
    })
  arbetsplatser: ((args?: {
    skip?: Int | null
    take?: Int | null
    where?: ArbetsplatserFilterInput | null
    order?: ArbetsplatserSortInput[] | null
  }) => ArbetsplatserCollectionSegmentObservableChain & {
    execute: (
      request: ArbetsplatserCollectionSegmentRequest,
      defaultValue?: ArbetsplatserCollectionSegment | null,
    ) => Observable<ArbetsplatserCollectionSegment | null>
  }) &
    (ArbetsplatserCollectionSegmentObservableChain & {
      execute: (
        request: ArbetsplatserCollectionSegmentRequest,
        defaultValue?: ArbetsplatserCollectionSegment | null,
      ) => Observable<ArbetsplatserCollectionSegment | null>
    })
  kunder: ((args?: {
    skip?: Int | null
    take?: Int | null
    where?: KunderFilterInput | null
    order?: KunderSortInput[] | null
  }) => KunderCollectionSegmentObservableChain & {
    execute: (
      request: KunderCollectionSegmentRequest,
      defaultValue?: KunderCollectionSegment | null,
    ) => Observable<KunderCollectionSegment | null>
  }) &
    (KunderCollectionSegmentObservableChain & {
      execute: (
        request: KunderCollectionSegmentRequest,
        defaultValue?: KunderCollectionSegment | null,
      ) => Observable<KunderCollectionSegment | null>
    })
  positioner: ((args?: {
    skip?: Int | null
    take?: Int | null
    where?: PositionerFilterInput | null
    order?: PositionerSortInput[] | null
  }) => PositionerCollectionSegmentObservableChain & {
    execute: (
      request: PositionerCollectionSegmentRequest,
      defaultValue?: PositionerCollectionSegment | null,
    ) => Observable<PositionerCollectionSegment | null>
  }) &
    (PositionerCollectionSegmentObservableChain & {
      execute: (
        request: PositionerCollectionSegmentRequest,
        defaultValue?: PositionerCollectionSegment | null,
      ) => Observable<PositionerCollectionSegment | null>
    })
}

export interface AdresserCollectionSegmentPromiseChain {
  items: { execute: (request: AdresserRequest, defaultValue?: Adresser[] | null) => Promise<Adresser[] | null> }
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfoPromiseChain & {
    execute: (request: CollectionSegmentInfoRequest, defaultValue?: CollectionSegmentInfo) => Promise<CollectionSegmentInfo>
  }
  totalCount: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

export interface AdresserCollectionSegmentObservableChain {
  items: { execute: (request: AdresserRequest, defaultValue?: Adresser[] | null) => Observable<Adresser[] | null> }
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfoObservableChain & {
    execute: (
      request: CollectionSegmentInfoRequest,
      defaultValue?: CollectionSegmentInfo,
    ) => Observable<CollectionSegmentInfo>
  }
  totalCount: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface AdresserPromiseChain {
  pk: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  aktiv: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Promise<Boolean | null> }
  fkAdresstyp: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  fkPositioner: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkLander: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  namn: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  co: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  adress1: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  adress2: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  zon: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  postnr: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  ort: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  kontakt: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  epost: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  telefon1: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  telefon2: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  telefon3: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  mobiltelefon: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  fax: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  vagbeskrivning: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  referens: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  id: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  fkZon: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  lastinfo: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  lossinfo: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  pallregNummer: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  slottid: { execute: (request?: boolean | number, defaultValue?: DateTime | null) => Promise<DateTime | null> }
  internInformation: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  kommunKod: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  lagerStalleNr: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  slottidSlut: { execute: (request?: boolean | number, defaultValue?: DateTime | null) => Promise<DateTime | null> }
  siloId: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  framkomlighet: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  cfarNr: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  fkAdresstypNavigation: AdresstypPromiseChain & {
    execute: (request: AdresstypRequest, defaultValue?: Adresstyp) => Promise<Adresstyp>
  }
  fkPositionerNavigation: PositionerPromiseChain & {
    execute: (request: PositionerRequest, defaultValue?: Positioner | null) => Promise<Positioner | null>
  }
  arbetsplatser: { execute: (request: ArbetsplatserRequest, defaultValue?: Arbetsplatser[]) => Promise<Arbetsplatser[]> }
  kunderFkAdresserBesoksadressNavigation: { execute: (request: KunderRequest, defaultValue?: Kunder[]) => Promise<Kunder[]> }
  kunderFkAdresserFakturaadressNavigation: {
    execute: (request: KunderRequest, defaultValue?: Kunder[]) => Promise<Kunder[]>
  }
}

export interface AdresserObservableChain {
  pk: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  aktiv: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Observable<Boolean | null> }
  fkAdresstyp: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  fkPositioner: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkLander: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  namn: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  co: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  adress1: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  adress2: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  zon: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  postnr: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  ort: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  kontakt: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  epost: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  telefon1: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  telefon2: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  telefon3: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  mobiltelefon: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  fax: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  vagbeskrivning: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  referens: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  id: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  fkZon: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  lastinfo: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  lossinfo: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  pallregNummer: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  slottid: { execute: (request?: boolean | number, defaultValue?: DateTime | null) => Observable<DateTime | null> }
  internInformation: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  kommunKod: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  lagerStalleNr: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  slottidSlut: { execute: (request?: boolean | number, defaultValue?: DateTime | null) => Observable<DateTime | null> }
  siloId: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  framkomlighet: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  cfarNr: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  fkAdresstypNavigation: AdresstypObservableChain & {
    execute: (request: AdresstypRequest, defaultValue?: Adresstyp) => Observable<Adresstyp>
  }
  fkPositionerNavigation: PositionerObservableChain & {
    execute: (request: PositionerRequest, defaultValue?: Positioner | null) => Observable<Positioner | null>
  }
  arbetsplatser: { execute: (request: ArbetsplatserRequest, defaultValue?: Arbetsplatser[]) => Observable<Arbetsplatser[]> }
  kunderFkAdresserBesoksadressNavigation: {
    execute: (request: KunderRequest, defaultValue?: Kunder[]) => Observable<Kunder[]>
  }
  kunderFkAdresserFakturaadressNavigation: {
    execute: (request: KunderRequest, defaultValue?: Kunder[]) => Observable<Kunder[]>
  }
}

export interface AdresstypPromiseChain {
  pk: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  adresstypNamn: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  visaPaWeb: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Promise<Boolean | null> }
  adresser: { execute: (request: AdresserRequest, defaultValue?: Adresser[]) => Promise<Adresser[]> }
}

export interface AdresstypObservableChain {
  pk: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  adresstypNamn: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  visaPaWeb: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Observable<Boolean | null> }
  adresser: { execute: (request: AdresserRequest, defaultValue?: Adresser[]) => Observable<Adresser[]> }
}

export interface PositionerPromiseChain {
  pk: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  latitude: { execute: (request?: boolean | number, defaultValue?: Float) => Promise<Float> }
  longitude: { execute: (request?: boolean | number, defaultValue?: Float) => Promise<Float> }
  xkoord: { execute: (request?: boolean | number, defaultValue?: Float | null) => Promise<Float | null> }
  ykoord: { execute: (request?: boolean | number, defaultValue?: Float | null) => Promise<Float | null> }
  reverseGeocodeResult: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  adresser: { execute: (request: AdresserRequest, defaultValue?: Adresser[]) => Promise<Adresser[]> }
  arbetsplatser: { execute: (request: ArbetsplatserRequest, defaultValue?: Arbetsplatser[]) => Promise<Arbetsplatser[]> }
}

export interface PositionerObservableChain {
  pk: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  latitude: { execute: (request?: boolean | number, defaultValue?: Float) => Observable<Float> }
  longitude: { execute: (request?: boolean | number, defaultValue?: Float) => Observable<Float> }
  xkoord: { execute: (request?: boolean | number, defaultValue?: Float | null) => Observable<Float | null> }
  ykoord: { execute: (request?: boolean | number, defaultValue?: Float | null) => Observable<Float | null> }
  reverseGeocodeResult: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  adresser: { execute: (request: AdresserRequest, defaultValue?: Adresser[]) => Observable<Adresser[]> }
  arbetsplatser: { execute: (request: ArbetsplatserRequest, defaultValue?: Arbetsplatser[]) => Observable<Arbetsplatser[]> }
}

export interface ArbetsplatserPromiseChain {
  pk: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  aktiv: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Promise<Boolean | null> }
  fkKunder: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  fkAdresser: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  fkPositioner: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  arbetsplatsNamn: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  oppnar: { execute: (request?: boolean | number, defaultValue?: TimeSpan | null) => Promise<TimeSpan | null> }
  stanger: { execute: (request?: boolean | number, defaultValue?: TimeSpan | null) => Promise<TimeSpan | null> }
  lunchStart: { execute: (request?: boolean | number, defaultValue?: TimeSpan | null) => Promise<TimeSpan | null> }
  lunchStopp: { execute: (request?: boolean | number, defaultValue?: TimeSpan | null) => Promise<TimeSpan | null> }
  nyckelkod: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  kartkod: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  sekundarKund: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  referens1: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  referens2: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  referens3: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  referens4: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  referens5: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  standardApl: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  fastighetsbeteckning: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  anl_ggningsnummer: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  fkKontakt: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkEwcgrupp: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkKundgrupper: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkLinjer: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  debiteringsgrundandeAntal: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  rowVersion: { execute: (request?: boolean | number, defaultValue?: Byte[]) => Promise<Byte[]> }
  fkAdresserNavigation: AdresserPromiseChain & {
    execute: (request: AdresserRequest, defaultValue?: Adresser) => Promise<Adresser>
  }
  fkKunderNavigation: KunderPromiseChain & { execute: (request: KunderRequest, defaultValue?: Kunder) => Promise<Kunder> }
  fkPositionerNavigation: PositionerPromiseChain & {
    execute: (request: PositionerRequest, defaultValue?: Positioner | null) => Promise<Positioner | null>
  }
}

export interface ArbetsplatserObservableChain {
  pk: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  aktiv: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Observable<Boolean | null> }
  fkKunder: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  fkAdresser: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  fkPositioner: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  arbetsplatsNamn: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  oppnar: { execute: (request?: boolean | number, defaultValue?: TimeSpan | null) => Observable<TimeSpan | null> }
  stanger: { execute: (request?: boolean | number, defaultValue?: TimeSpan | null) => Observable<TimeSpan | null> }
  lunchStart: { execute: (request?: boolean | number, defaultValue?: TimeSpan | null) => Observable<TimeSpan | null> }
  lunchStopp: { execute: (request?: boolean | number, defaultValue?: TimeSpan | null) => Observable<TimeSpan | null> }
  nyckelkod: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  kartkod: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  sekundarKund: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  referens1: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  referens2: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  referens3: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  referens4: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  referens5: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  standardApl: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  fastighetsbeteckning: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  anl_ggningsnummer: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  fkKontakt: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkEwcgrupp: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkKundgrupper: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkLinjer: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  debiteringsgrundandeAntal: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  rowVersion: { execute: (request?: boolean | number, defaultValue?: Byte[]) => Observable<Byte[]> }
  fkAdresserNavigation: AdresserObservableChain & {
    execute: (request: AdresserRequest, defaultValue?: Adresser) => Observable<Adresser>
  }
  fkKunderNavigation: KunderObservableChain & {
    execute: (request: KunderRequest, defaultValue?: Kunder) => Observable<Kunder>
  }
  fkPositionerNavigation: PositionerObservableChain & {
    execute: (request: PositionerRequest, defaultValue?: Positioner | null) => Observable<Positioner | null>
  }
}

export interface KunderPromiseChain {
  pk: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  aktiv: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Promise<Boolean | null> }
  fkKundkategorier: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  fkBilder: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkBetalvillkor: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkLanderMoms: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  fkBetalare: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkLinjer: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkValutor: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  fkSchemaFakturering: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkOmvandSkatt: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkEntreprenad: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkFaktureringsavgifter: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  kund: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Promise<Boolean | null> }
  leverantor: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  akare: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  abonnent: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  sparr: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  prisSparr: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  varning: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  avrakningskund: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  varningText: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  kundNr: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  kundNrEkonomi: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  abonnentNr: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  kundNamn: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  kundid: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  fkAdresserFakturaadress: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkAdresserBesoksadress: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  orgnr: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  vat: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  bankgiro: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  postgiro: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  skapadTidpunkt: { execute: (request?: boolean | number, defaultValue?: DateTime | null) => Promise<DateTime | null> }
  skapadAnvandare: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  andradTidpunkt: { execute: (request?: boolean | number, defaultValue?: DateTime | null) => Promise<DateTime | null> }
  andradAnvandare: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  kreditLimit: { execute: (request?: boolean | number, defaultValue?: Float | null) => Promise<Float | null> }
  info: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  popupInfo: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  fakturamall: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  kravLittera: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  bankClearing: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  bankKonto: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  betalmetodExternkod: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  swift: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  iban: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  riksbankskod: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  fkFakturakoer: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkFakturabrytLittera: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  fkFakturabrytKontakt: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  fakturabrytAntalOrders: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkFakturabrytResurs: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  fkKontoBonusIntakt: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkKontoBonusBalans: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  bonusProcent: { execute: (request?: boolean | number, defaultValue?: Float | null) => Promise<Float | null> }
  fkMomskodBonus: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkMellanskillnadsmall: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  mall: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  mallNamn: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  externkodMallLev: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  externkodMallKund: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  fkCountersMall: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  kravReferens: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  kravAo: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  kravVagsedel: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  kravTrptsedel: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  fkEnumLitteraMode: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  litteraMask: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  fkEnumFakturaPaslagRedovisning: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  fkKoncern: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkEnumFakturalayout: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkFakturabrytReferens: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  pallregnr: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  gannr: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  fkSprak: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkKundbokforingsmall: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  kravFraktsedel: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  inkluderaVagsedlarIfakturan: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  fkKundgrupper: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  banknamn: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  litteraMaskDescription: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  fkFakturabrytArbetsordernr: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  fkEnumAvrakningslayout: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  aktivTerminalScanning: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  fkEnumBrytpunktPeriod: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  autoprisViaDeliveryBot: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Promise<Boolean | null> }
  fkAttestflode: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  farg: { execute: (request?: boolean | number, defaultValue?: Byte[] | null) => Promise<Byte[] | null> }
  foregroundFarg: { execute: (request?: boolean | number, defaultValue?: Byte[] | null) => Promise<Byte[] | null> }
  skrymmeBerakning: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Promise<Boolean | null> }
  aktivMallMobilwebb: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  utforKreditkontroll: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  utforHamtaData: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  kontrollInnanFakturering: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  mallPrivatperson: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  mallForetagskund: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  inkluderaArbetsordersIfakturan: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  externalId: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  fkBolagInternkund: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  tm: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  fkEnumKravPaFotoSignatur: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkAnvandare: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  avrunda10: { execute: (request?: boolean | number, defaultValue?: Float | null) => Promise<Float | null> }
  avrunda100: { execute: (request?: boolean | number, defaultValue?: Float | null) => Promise<Float | null> }
  kravInstruktion: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  inaktiveraSamtax: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  fakturaReferens: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  avrunda1: { execute: (request?: boolean | number, defaultValue?: Float | null) => Promise<Float | null> }
  autoFakturering: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Promise<Boolean | null> }
  transportsedelMask: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  fkFakturakoerAvrakning: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  kundrefOnReport: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  fkEwcgrupp: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkEntreprenader: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkFakturabrytArbetsplats: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  fakturaOchBilagorSomEnFil: {
    execute: (request?: boolean | number, defaultValue?: Boolean | null) => Promise<Boolean | null>
  }
  kravPaPosition: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  globaltPaslag: { execute: (request?: boolean | number, defaultValue?: Float | null) => Promise<Float | null> }
  globalRabatt: { execute: (request?: boolean | number, defaultValue?: Float | null) => Promise<Float | null> }
  stopAutoPris: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  avrakningEfterKundBetalning: {
    execute: (request?: boolean | number, defaultValue?: Boolean | null) => Promise<Boolean | null>
  }
  minimumTotalDebiteringResa: { execute: (request?: boolean | number, defaultValue?: Float | null) => Promise<Float | null> }
  minimumTotalAvrakningResa: { execute: (request?: boolean | number, defaultValue?: Float | null) => Promise<Float | null> }
  fkMinimumDebiteringsArtikel: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  isKontantKund: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  exkluderaRabattVidDebitering: {
    execute: (request?: boolean | number, defaultValue?: Boolean | null) => Promise<Boolean | null>
  }
  fkMomslandkod: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  isKoncern: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  isEntreprenadAgare: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  fkArtikeldialekt: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  kravKundref: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  fkAnvandareKontakt: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  sparrText: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  dbcalcHarFilkrav: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Promise<Boolean | null> }
  fkEnumFgvmodell: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  ggn: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  undantaFranKreditkontroll: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  bomkorningEmailAdresser: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  bomkorningTillaten: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Promise<Boolean | null> }
  bomkorningAction: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Promise<Boolean | null> }
  fkKommunikationskanal: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  ediId: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  faktureraKoncern: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  autogiro: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  forskottsbetalning: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  kreditforsakratBelopp: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  kreditforsakringsdatum: {
    execute: (request?: boolean | number, defaultValue?: DateTime | null) => Promise<DateTime | null>
  }
  kreditInfo: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  fkKreditforsakratbeloppValuta: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  fkEnumFakturaBrytOmvandMoms: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  fkEnumFakturaBrytDebetKredit: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  counterAvr: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  counterSelfInvoice: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  sparrSkrymmeMobilt: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Promise<Boolean | null> }
  fyraOgonGrans: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  hanterasSomInternPaUtskrifter: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  fkAviseringsMetod: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  kravAviseringsInformation: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  fkEdijobbAvisering: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  genereraFvPriser: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  fkEdijobbSms: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  rowVersion: { execute: (request?: boolean | number, defaultValue?: Byte[]) => Promise<Byte[]> }
  epostPaminnelse: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  fkEnumProcentuelltTillaggPrincip: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  bransch: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  fkEnumBomkorningsMetod: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  rapporteraDataTillNvv: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  fkFakturabrytResa: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  dimensionskod: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  dimensionsbeskrivning: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  autoPrisKlarFaktMobil: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  enumRapporteringstypNvv: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  appliceraNyttEdiOrderidVidBomkorning: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  genereraResenoderPerKoordinat: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  fkFakturabrytBetalningsunderlag: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  fkFakturabrytVerksamhet: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  fkBetalvillkorSjalvfaktura: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  inaktiveraAvstandsBerakning: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  stopKoncernPris: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  fkFakturabrytKundref: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  epostNvvbekraftelse: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  personNrSwish: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  telefonNrSwish: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  fkAdresserBesoksadressNavigation: AdresserPromiseChain & {
    execute: (request: AdresserRequest, defaultValue?: Adresser | null) => Promise<Adresser | null>
  }
  fkAdresserFakturaadressNavigation: AdresserPromiseChain & {
    execute: (request: AdresserRequest, defaultValue?: Adresser | null) => Promise<Adresser | null>
  }
  fkBetalareNavigation: KunderPromiseChain & {
    execute: (request: KunderRequest, defaultValue?: Kunder | null) => Promise<Kunder | null>
  }
  fkEntreprenadNavigation: KunderPromiseChain & {
    execute: (request: KunderRequest, defaultValue?: Kunder | null) => Promise<Kunder | null>
  }
  fkKoncernNavigation: KunderPromiseChain & {
    execute: (request: KunderRequest, defaultValue?: Kunder | null) => Promise<Kunder | null>
  }
  arbetsplatser: { execute: (request: ArbetsplatserRequest, defaultValue?: Arbetsplatser[]) => Promise<Arbetsplatser[]> }
  inverseFkBetalareNavigation: { execute: (request: KunderRequest, defaultValue?: Kunder[]) => Promise<Kunder[]> }
  inverseFkEntreprenadNavigation: { execute: (request: KunderRequest, defaultValue?: Kunder[]) => Promise<Kunder[]> }
  inverseFkKoncernNavigation: { execute: (request: KunderRequest, defaultValue?: Kunder[]) => Promise<Kunder[]> }
}

export interface KunderObservableChain {
  pk: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  aktiv: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Observable<Boolean | null> }
  fkKundkategorier: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  fkBilder: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkBetalvillkor: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkLanderMoms: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  fkBetalare: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkLinjer: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkValutor: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  fkSchemaFakturering: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkOmvandSkatt: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkEntreprenad: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkFaktureringsavgifter: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  kund: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Observable<Boolean | null> }
  leverantor: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  akare: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  abonnent: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  sparr: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  prisSparr: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  varning: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  avrakningskund: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  varningText: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  kundNr: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  kundNrEkonomi: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  abonnentNr: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  kundNamn: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  kundid: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  fkAdresserFakturaadress: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkAdresserBesoksadress: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  orgnr: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  vat: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  bankgiro: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  postgiro: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  skapadTidpunkt: { execute: (request?: boolean | number, defaultValue?: DateTime | null) => Observable<DateTime | null> }
  skapadAnvandare: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  andradTidpunkt: { execute: (request?: boolean | number, defaultValue?: DateTime | null) => Observable<DateTime | null> }
  andradAnvandare: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  kreditLimit: { execute: (request?: boolean | number, defaultValue?: Float | null) => Observable<Float | null> }
  info: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  popupInfo: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  fakturamall: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  kravLittera: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  bankClearing: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  bankKonto: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  betalmetodExternkod: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  swift: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  iban: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  riksbankskod: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  fkFakturakoer: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkFakturabrytLittera: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  fkFakturabrytKontakt: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  fakturabrytAntalOrders: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkFakturabrytResurs: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  fkKontoBonusIntakt: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkKontoBonusBalans: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  bonusProcent: { execute: (request?: boolean | number, defaultValue?: Float | null) => Observable<Float | null> }
  fkMomskodBonus: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkMellanskillnadsmall: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  mall: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  mallNamn: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  externkodMallLev: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  externkodMallKund: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  fkCountersMall: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  kravReferens: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  kravAo: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  kravVagsedel: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  kravTrptsedel: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  fkEnumLitteraMode: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  litteraMask: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  fkEnumFakturaPaslagRedovisning: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  fkKoncern: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkEnumFakturalayout: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkFakturabrytReferens: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  pallregnr: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  gannr: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  fkSprak: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkKundbokforingsmall: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  kravFraktsedel: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  inkluderaVagsedlarIfakturan: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  fkKundgrupper: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  banknamn: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  litteraMaskDescription: {
    execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null>
  }
  fkFakturabrytArbetsordernr: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  fkEnumAvrakningslayout: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  aktivTerminalScanning: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  fkEnumBrytpunktPeriod: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  autoprisViaDeliveryBot: {
    execute: (request?: boolean | number, defaultValue?: Boolean | null) => Observable<Boolean | null>
  }
  fkAttestflode: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  farg: { execute: (request?: boolean | number, defaultValue?: Byte[] | null) => Observable<Byte[] | null> }
  foregroundFarg: { execute: (request?: boolean | number, defaultValue?: Byte[] | null) => Observable<Byte[] | null> }
  skrymmeBerakning: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Observable<Boolean | null> }
  aktivMallMobilwebb: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  utforKreditkontroll: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  utforHamtaData: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  kontrollInnanFakturering: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  mallPrivatperson: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  mallForetagskund: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  inkluderaArbetsordersIfakturan: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  externalId: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  fkBolagInternkund: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  tm: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  fkEnumKravPaFotoSignatur: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkAnvandare: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  avrunda10: { execute: (request?: boolean | number, defaultValue?: Float | null) => Observable<Float | null> }
  avrunda100: { execute: (request?: boolean | number, defaultValue?: Float | null) => Observable<Float | null> }
  kravInstruktion: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  inaktiveraSamtax: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  fakturaReferens: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  avrunda1: { execute: (request?: boolean | number, defaultValue?: Float | null) => Observable<Float | null> }
  autoFakturering: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Observable<Boolean | null> }
  transportsedelMask: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  fkFakturakoerAvrakning: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  kundrefOnReport: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  fkEwcgrupp: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkEntreprenader: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  fkFakturabrytArbetsplats: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  fakturaOchBilagorSomEnFil: {
    execute: (request?: boolean | number, defaultValue?: Boolean | null) => Observable<Boolean | null>
  }
  kravPaPosition: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  globaltPaslag: { execute: (request?: boolean | number, defaultValue?: Float | null) => Observable<Float | null> }
  globalRabatt: { execute: (request?: boolean | number, defaultValue?: Float | null) => Observable<Float | null> }
  stopAutoPris: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  avrakningEfterKundBetalning: {
    execute: (request?: boolean | number, defaultValue?: Boolean | null) => Observable<Boolean | null>
  }
  minimumTotalDebiteringResa: {
    execute: (request?: boolean | number, defaultValue?: Float | null) => Observable<Float | null>
  }
  minimumTotalAvrakningResa: {
    execute: (request?: boolean | number, defaultValue?: Float | null) => Observable<Float | null>
  }
  fkMinimumDebiteringsArtikel: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  isKontantKund: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  exkluderaRabattVidDebitering: {
    execute: (request?: boolean | number, defaultValue?: Boolean | null) => Observable<Boolean | null>
  }
  fkMomslandkod: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  isKoncern: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  isEntreprenadAgare: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  fkArtikeldialekt: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  kravKundref: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  fkAnvandareKontakt: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  sparrText: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  dbcalcHarFilkrav: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Observable<Boolean | null> }
  fkEnumFgvmodell: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  ggn: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  undantaFranKreditkontroll: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  bomkorningEmailAdresser: {
    execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null>
  }
  bomkorningTillaten: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Observable<Boolean | null> }
  bomkorningAction: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Observable<Boolean | null> }
  fkKommunikationskanal: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  ediId: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  faktureraKoncern: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  autogiro: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  forskottsbetalning: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  kreditforsakratBelopp: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  kreditforsakringsdatum: {
    execute: (request?: boolean | number, defaultValue?: DateTime | null) => Observable<DateTime | null>
  }
  kreditInfo: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  fkKreditforsakratbeloppValuta: {
    execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null>
  }
  fkEnumFakturaBrytOmvandMoms: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  fkEnumFakturaBrytDebetKredit: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  counterAvr: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  counterSelfInvoice: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  sparrSkrymmeMobilt: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Observable<Boolean | null> }
  fyraOgonGrans: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  hanterasSomInternPaUtskrifter: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  fkAviseringsMetod: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  kravAviseringsInformation: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  fkEdijobbAvisering: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  genereraFvPriser: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  fkEdijobbSms: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  rowVersion: { execute: (request?: boolean | number, defaultValue?: Byte[]) => Observable<Byte[]> }
  epostPaminnelse: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  fkEnumProcentuelltTillaggPrincip: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  bransch: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  fkEnumBomkorningsMetod: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  rapporteraDataTillNvv: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  fkFakturabrytResa: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  dimensionskod: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  dimensionsbeskrivning: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  autoPrisKlarFaktMobil: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  enumRapporteringstypNvv: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  appliceraNyttEdiOrderidVidBomkorning: {
    execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean>
  }
  genereraResenoderPerKoordinat: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  fkFakturabrytBetalningsunderlag: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  fkFakturabrytVerksamhet: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  fkBetalvillkorSjalvfaktura: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  inaktiveraAvstandsBerakning: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  stopKoncernPris: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  fkFakturabrytKundref: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  epostNvvbekraftelse: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  personNrSwish: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  telefonNrSwish: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  fkAdresserBesoksadressNavigation: AdresserObservableChain & {
    execute: (request: AdresserRequest, defaultValue?: Adresser | null) => Observable<Adresser | null>
  }
  fkAdresserFakturaadressNavigation: AdresserObservableChain & {
    execute: (request: AdresserRequest, defaultValue?: Adresser | null) => Observable<Adresser | null>
  }
  fkBetalareNavigation: KunderObservableChain & {
    execute: (request: KunderRequest, defaultValue?: Kunder | null) => Observable<Kunder | null>
  }
  fkEntreprenadNavigation: KunderObservableChain & {
    execute: (request: KunderRequest, defaultValue?: Kunder | null) => Observable<Kunder | null>
  }
  fkKoncernNavigation: KunderObservableChain & {
    execute: (request: KunderRequest, defaultValue?: Kunder | null) => Observable<Kunder | null>
  }
  arbetsplatser: { execute: (request: ArbetsplatserRequest, defaultValue?: Arbetsplatser[]) => Observable<Arbetsplatser[]> }
  inverseFkBetalareNavigation: { execute: (request: KunderRequest, defaultValue?: Kunder[]) => Observable<Kunder[]> }
  inverseFkEntreprenadNavigation: { execute: (request: KunderRequest, defaultValue?: Kunder[]) => Observable<Kunder[]> }
  inverseFkKoncernNavigation: { execute: (request: KunderRequest, defaultValue?: Kunder[]) => Observable<Kunder[]> }
}

/** Information about the offset pagination. */
export interface CollectionSegmentInfoPromiseChain {
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
}

/** Information about the offset pagination. */
export interface CollectionSegmentInfoObservableChain {
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
}

export interface ArbetsplatserCollectionSegmentPromiseChain {
  items: {
    execute: (request: ArbetsplatserRequest, defaultValue?: Arbetsplatser[] | null) => Promise<Arbetsplatser[] | null>
  }
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfoPromiseChain & {
    execute: (request: CollectionSegmentInfoRequest, defaultValue?: CollectionSegmentInfo) => Promise<CollectionSegmentInfo>
  }
  totalCount: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

export interface ArbetsplatserCollectionSegmentObservableChain {
  items: {
    execute: (request: ArbetsplatserRequest, defaultValue?: Arbetsplatser[] | null) => Observable<Arbetsplatser[] | null>
  }
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfoObservableChain & {
    execute: (
      request: CollectionSegmentInfoRequest,
      defaultValue?: CollectionSegmentInfo,
    ) => Observable<CollectionSegmentInfo>
  }
  totalCount: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface KunderCollectionSegmentPromiseChain {
  items: { execute: (request: KunderRequest, defaultValue?: Kunder[] | null) => Promise<Kunder[] | null> }
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfoPromiseChain & {
    execute: (request: CollectionSegmentInfoRequest, defaultValue?: CollectionSegmentInfo) => Promise<CollectionSegmentInfo>
  }
  totalCount: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

export interface KunderCollectionSegmentObservableChain {
  items: { execute: (request: KunderRequest, defaultValue?: Kunder[] | null) => Observable<Kunder[] | null> }
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfoObservableChain & {
    execute: (
      request: CollectionSegmentInfoRequest,
      defaultValue?: CollectionSegmentInfo,
    ) => Observable<CollectionSegmentInfo>
  }
  totalCount: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface PositionerCollectionSegmentPromiseChain {
  items: { execute: (request: PositionerRequest, defaultValue?: Positioner[] | null) => Promise<Positioner[] | null> }
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfoPromiseChain & {
    execute: (request: CollectionSegmentInfoRequest, defaultValue?: CollectionSegmentInfo) => Promise<CollectionSegmentInfo>
  }
  totalCount: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

export interface PositionerCollectionSegmentObservableChain {
  items: { execute: (request: PositionerRequest, defaultValue?: Positioner[] | null) => Observable<Positioner[] | null> }
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfoObservableChain & {
    execute: (
      request: CollectionSegmentInfoRequest,
      defaultValue?: CollectionSegmentInfo,
    ) => Observable<CollectionSegmentInfo>
  }
  totalCount: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface MutationPromiseChain {
  upsertArbetsplats: (args: {
    input: UpsertArbetsplatsInput
  }) => MutationOutputPromiseChain & {
    execute: (request: MutationOutputRequest, defaultValue?: MutationOutput) => Promise<MutationOutput>
  }
}

export interface MutationObservableChain {
  upsertArbetsplats: (args: {
    input: UpsertArbetsplatsInput
  }) => MutationOutputObservableChain & {
    execute: (request: MutationOutputRequest, defaultValue?: MutationOutput) => Observable<MutationOutput>
  }
}

export interface MutationOutputPromiseChain {
  pk: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  validationErrors: {
    execute: (request: ValidationErrorRequest, defaultValue?: ValidationError[]) => Promise<ValidationError[]>
  }
}

export interface MutationOutputObservableChain {
  pk: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  validationErrors: {
    execute: (request: ValidationErrorRequest, defaultValue?: ValidationError[]) => Observable<ValidationError[]>
  }
}

export interface ValidationErrorPromiseChain {
  message: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  property: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface ValidationErrorObservableChain {
  message: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  property: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface SubscriptionPromiseChain {
  arbetsplatsInserted: ArbetsplatserPromiseChain & {
    execute: (request: ArbetsplatserRequest, defaultValue?: Arbetsplatser) => Promise<Arbetsplatser>
  }
  arbetsplatsUpdated: ArbetsplatserPromiseChain & {
    execute: (request: ArbetsplatserRequest, defaultValue?: Arbetsplatser) => Promise<Arbetsplatser>
  }
}

export interface SubscriptionObservableChain {
  arbetsplatsInserted: ArbetsplatserObservableChain & {
    execute: (request: ArbetsplatserRequest, defaultValue?: Arbetsplatser) => Observable<Arbetsplatser>
  }
  arbetsplatsUpdated: ArbetsplatserObservableChain & {
    execute: (request: ArbetsplatserRequest, defaultValue?: Arbetsplatser) => Observable<Arbetsplatser>
  }
}
