export interface ISpotifyTopTracksResponse {
  href: string
  limit: number
  next: string | null
  offset: number
  previous: string | null
  total: number
  items: ITrack[]
}

export interface ITrack {
  album: Album
  artists: Artist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: ExternalIDs
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  popularity: number
  preview_url: string | null
  track_number: number
  type: string
  uri: string
  is_local: boolean
}

interface Album {
  album_type: string
  total_tracks: number
  available_markets: string[]
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: string
  type: string
  uri: string
  artists: Artist[]
}

interface Artist {
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  type: string
  uri: string
}

interface ExternalIDs {
  isrc: string
}

interface ExternalUrls {
  spotify: string
}

interface Image {
  url: string
  height: number
  width: number
}
