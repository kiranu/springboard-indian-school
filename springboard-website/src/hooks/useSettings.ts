/**
 * useSettings — fetches live SiteSettings from the public API
 * Falls back gracefully to hardcoded defaults if the API is unreachable.
 */
import { useState, useEffect } from 'react'
import axios from 'axios'

export interface SiteSettings {
  school_name: string
  tagline: string
  address: string
  phone_primary: string
  phone_secondary: string
  email_primary: string
  email_admissions: string
  whatsapp_number: string
  google_maps_embed: string
  facebook_url: string
  instagram_url: string
  youtube_url: string
  twitter_url: string
  admission_open: boolean
  seats_available: string
  announcement_bar: string
  announcement_enabled: boolean
  academic_year: string
}

const DEFAULTS: SiteSettings = {
  school_name: 'Springboard Indian School',
  tagline: "Where Every Child's Journey Begins",
  address: 'Hyderabad, Telangana, India',
  phone_primary: '+91-40-XXXXXXXX',
  phone_secondary: '',
  email_primary: 'info@springboardschool.com',
  email_admissions: 'admissions@springboardschool.com',
  whatsapp_number: '919876543210',
  google_maps_embed: '',
  facebook_url: '#',
  instagram_url: '#',
  youtube_url: '#',
  twitter_url: '#',
  admission_open: true,
  seats_available: '12',
  announcement_bar: '🎉 Admissions Open for 2026-27! Limited Seats Available. Apply Now!',
  announcement_enabled: true,
  academic_year: '2026-27',
}

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'

let _cache: SiteSettings | null = null

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(_cache ?? DEFAULTS)
  const [loading, setLoading] = useState(!_cache)

  useEffect(() => {
    if (_cache) return
    axios.get<SiteSettings>(`${BASE}/settings/`)
      .then((res) => {
        _cache = { ...DEFAULTS, ...res.data }
        setSettings(_cache)
      })
      .catch(() => { /* keep defaults */ })
      .finally(() => setLoading(false))
  }, [])

  return { settings, loading }
}
