export interface IRecentPlayedTrack {
  items: Array<RecentlyPlayedItem>
  next: string
  cursors: Cursors
  limit: number
  href: string
}

export interface RecentlyPlayedItem {
  track: Track
  played_at: string
  context: Context | null
}

interface Track {
  album: Album
  artists: Array<Artist>
  available_markets: Array<string>
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: ExternalIds
  external_urls: ExternalUrls
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url: string | null
  track_number: number
  type: string
  uri: string
}

interface Album {
  album_type: string
  artists: Array<Artist>
  available_markets: Array<string>
  external_urls: ExternalUrls
  href: string
  id: string
  images: Array<Image>
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

interface Artist {
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  type: string
  uri: string
}

interface ExternalUrls {
  spotify: string
}

interface ExternalIds {
  isrc: string
}

interface Image {
  height: number
  url: string
  width: number
}

interface Cursors {
  after: string
  before: string
}

interface Context {
  href: string
  external_urls: ExternalUrls
  type: string
  uri: string
}
