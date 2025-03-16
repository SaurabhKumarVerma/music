export interface SpotifyImage {
  url: string
  height: number
  width: number
}

export interface SpotifyArtist {
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  name: string
  type: "artist"
  uri: string
}

export interface SpotifyAlbum {
  album_type: "album" | "single" | "compilation"
  total_tracks: number
  available_markets: string[]
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: SpotifyImage[]
  name: string
  release_date: string
  release_date_precision: "year" | "month" | "day"
  type: "album"
  uri: string
  artists: SpotifyArtist[]
  album_group: "album" | "single" | "compilation" | "appears_on"
}

export interface ISpotifyArtistAlbums {
  href: string
  limit: number
  next: string | null
  offset: number
  previous: string | null
  total: number
  items: SpotifyAlbum[]
}
