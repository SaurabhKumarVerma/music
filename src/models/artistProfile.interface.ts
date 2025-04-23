export interface IArtistUnion {
  __typename: string
  id: string
  uri: string
  saved: boolean
  sharingInfo: ISharingInfo
  profile: IProfile
  visuals: IVisuals
  discography: IDiscography
  stats: IStats
  relatedContent: IRelatedContent
  goods: IGoods
}

export interface ISharingInfo {
  shareUrl: string
  shareId: string
}

export interface IProfile {
  name: string
  verified: boolean
  pinnedItem: IPinnedItem
  biography: IBiography
  externalLinks: IExternalLinks
  playlistsV2: IPlaylistsV2
}

export interface IPinnedItem {
  comment: string
  type: string
  backgroundImage: IImage
  itemV2: Record<string, any>
  item: IItem
}

export interface IItem {
  uri: string
  name: string
  coverArt: IImage
  type: string
}

export interface IImage {
  sources: ISource[]
}

export interface ISource {
  url: string
  width?: number
  height?: number
}

export interface IBiography {
  type: string
  text: string
}

export interface IExternalLinks {
  items: IExternalLink[]
}

export interface IExternalLink {
  name: string
  url: string
}

export interface IPlaylistsV2 {
  totalCount: number
  items: IPlaylistItem[]
}

export interface IPlaylistItem {
  data: IPlaylistData
}

export interface IPlaylistData {
  __typename: string
  uri: string
  name: string
  description: string
  ownerV2: IOwnerV2
  images: IPlaylistImages
}

export interface IOwnerV2 {
  data: IOwnerData
}

export interface IOwnerData {
  __typename: string
  name: string
}

export interface IPlaylistImages {
  items: IImageItem[]
}

export interface IImageItem {
  sources: ISource[]
}

export interface IVisuals {
  gallery: IGallery
  avatarImage: IImage
  headerImage: IImage
}

export interface IGallery {
  items: IImageItem[]
}

export interface IDiscography {
  latest: IAlbum
  popularReleasesAlbums: IAlbums
  singles: ISingles
  albums: IAlbums
  compilations: ICompilations
  topTracks: ITopTracks
}

export interface IAlbum {
  id: string
  uri: string
  name: string
  type: string
  copyright: ICopyright
  date: IDateInfo
  coverArt: IImage
  tracks: ITracks
  label: string
  playability: IPlayability
  sharingInfo: ISharingInfo
}

export interface ICopyright {
  items: ICopyrightItem[]
}

export interface ICopyrightItem {
  type: string
  text: string
}

export interface IDateInfo {
  year: number
  month?: number
  day?: number
  precision: string
}

export interface ITracks {
  totalCount: number
}

export interface IPlayability {
  playable: boolean
  reason: string
}

export interface IAlbums {
  totalCount: number
  items: IAlbumItem[]
}

export interface IAlbumItem {
  id?: string
  uri?: string
  name?: string
  type?: string
  copyright?: ICopyright
  date?: IDateInfo
  coverArt?: IImage
  tracks?: ITracks
  label?: string
  playability?: IPlayability
  sharingInfo?: ISharingInfo
  releases?: IReleases
}

export interface IReleases {
  items: IAlbum[]
}

export interface ISingles {
  totalCount: number
  items: ISingleItem[]
}

export interface ISingleItem {
  releases: IReleases
}

export interface ICompilations {
  totalCount: number
  items: ICompilationItem[]
}

export interface ICompilationItem {
  releases: IReleases
}

export interface ITopTracks {
  items: ITopTrackItem[]
}

export interface ITopTrackItem {
  uid: string
  track: ITrack
}

export interface ITrack {
  id: string
  uri: string
  name: string
  playcount: string
  discNumber: number
  duration: IDuration
  playability: IPlayability
  contentRating: IContentRating
  artists: IArtists
  albumOfTrack: IAlbumOfTrack
}

export interface IDuration {
  totalMilliseconds: number
}

export interface IContentRating {
  label: string
}

export interface IArtists {
  items: IArtistItem[]
}

export interface IArtistItem {
  uri: string
  profile: IArtistProfile
}

export interface IArtistProfile {
  name: string
}

export interface IAlbumOfTrack {
  uri: string
  coverArt: IImage
}

export interface IStats {
  followers: number
  monthlyListeners: number
  worldRank: number
  topCities: ITopCities
}

export interface ITopCities {
  items: ICityItem[]
}

export interface ICityItem {
  numberOfListeners: number
  city: string
  country: string
  region: string
}

export interface IRelatedContent {
  appearsOn: IAppearsOn
  featuringV2: IFeaturingV2
  discoveredOnV2: IDiscoveredOnV2
  relatedArtists: IRelatedArtists
}

export interface IAppearsOn {
  totalCount: number
  items: IAppearsOnItem[]
}

export interface IAppearsOnItem {
  releases: IReleasesInfo
}

export interface IReleasesInfo {
  totalCount: number
  items: IReleaseItem[]
}

export interface IReleaseItem {
  uri: string
  id: string
  name: string
  type: string
  artists: IArtists
  coverArt: IImage
  date: Partial<IDateInfo>
  sharingInfo: ISharingInfo
}

export interface IFeaturingV2 {
  totalCount: number
  items: IFeaturingItem[]
}

export interface IFeaturingItem {
  data: IPlaylistData | IGenericError
}

export interface IGenericError {
  __typename: string
}

export interface IDiscoveredOnV2 {
  totalCount: number
  items: IDiscoveredOnItem[]
}

export interface IDiscoveredOnItem {
  data: IPlaylistData | IGenericError
}

export interface IRelatedArtists {
  totalCount: number
  items: IRelatedArtist[]
}

export interface IRelatedArtist {
  id: string
  uri: string
  profile: IArtistProfile
  visuals: IVisuals
}

export interface IGoods {
  events: IEvents
  merch: IMerch
}

export interface IEvents {
  userLocation: IUserLocation
  concerts: IConcerts
}

export interface IUserLocation {
  name: string
}

export interface IConcerts {
  totalCount: number
  items: IConcert[]
  pagingInfo: IPagingInfo
}

export interface IConcert {
  uri: string
  id: string
  title: string
  category: string
  festival: boolean
  nearUser: boolean
  venue: IVenue
  artists: IArtists
  partnerLinks: IPartnerLinks
  date: IConcertDate
}

export interface IVenue {
  name: string
  location: ILocation
  coordinates: ICoordinates
}

export interface ILocation {
  name: string
}

export interface ICoordinates {
  latitude: number
  longitude: number
}

export interface IPartnerLinks {
  items: any[]
}

export interface IConcertDate {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
  isoString: string
  precision: string
}

export interface IPagingInfo {
  limit: number
}

export interface IMerch {
  items: any[]
}

export interface IArtistPostData {
  id: string
}
