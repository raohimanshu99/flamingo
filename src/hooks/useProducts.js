import { useState, useEffect } from 'react'

const BASE = 'https://fakestoreapi.com'
const cache = {}

async function apiFetch(url) {
  if (cache[url]) return cache[url]
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API error ${res.status}`)
  const data = await res.json()
  cache[url] = data
  return data
}

// All products
export function useAllProducts() {
  const [data, setData]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    apiFetch(`${BASE}/products`)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}

// Products by category string
export function useProductsByCategory(category) {
  const [data, setData]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!category) return
    setLoading(true)
    const encoded = encodeURIComponent(category)
    apiFetch(`${BASE}/products/category/${encoded}`)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [category])

  return { data, loading, error }
}

// Single product
export function useProduct(id) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!id) return
    apiFetch(`${BASE}/products/${id}`)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [id])

  return { data, loading, error }
}

// Categories list
export function useCategories() {
  const [data, setData]       = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch(`${BASE}/products/categories`)
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading }
}