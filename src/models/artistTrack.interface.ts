interface AlbumImage {
  url: string
  height: number
  width: number
}

interface AlbumRestrictions {
  reason: string
}

interface Artist {
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  name: string
  type: "artist"
  uri: string
}

interface Album {
  album_type: string
  total_tracks: number
  available_markets: string[]
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: AlbumImage[]
  name: string
  release_date: string
  release_date_precision: "year" | "month" | "day"
  restrictions: AlbumRestrictions
  type: "album"
  uri: string
  artists: Artist[]
}

interface ExternalIds {
  isrc: string
  ean: string
  upc: string
}

interface TrackRestrictions {
  reason: string
}

export interface ITrack {
  album: Album
  artists: Artist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: ExternalIds
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  is_playable: boolean
  linked_from: Record<string, unknown>
  restrictions: TrackRestrictions
  name: string
  popularity: number
  preview_url: string | null
  track_number: number
  type: "track"
  uri: string
  is_local: boolean
}

export interface ITracksData {
  tracks: ITrack[]
}
