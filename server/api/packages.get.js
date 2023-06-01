import {
  chunk,
  filter,
  first,
  join,
  map,
  mapValues,
  mergeAll,
  negate,
  property,
  sortBy,
  startsWith,
} from '@dword-design/functions'
import axios from 'axios'
import fetchPaginate from 'fetch-paginate'
import fetch from 'node-fetch'

import { defineEventHandler, getQuery } from '#imports'

const limit = 250

const npmAxios = axios.create({
  baseURL: 'https://api.npmjs.org',
})

const npmsIoAxios = axios.create({
  baseURL: 'https://api.npms.io/v2',
})

const getWeeklyDownloads = async names => {
  const unscopedNames = names |> filter(negate(startsWith('@')))

  const chunks = [
    ...(unscopedNames |> chunk(50)),
    ...(names |> filter(startsWith('@')) |> map(name => [name])),
  ]

  const getChunkPackages = async chunkNames => {
    let result = {}
    try {
      result =
        npmAxios.get(`/downloads/point/last-week/${chunkNames |> join(',')}`)
        |> await
        |> property('data')
    } catch (error) {
      if (error.response.data.error !== `package ${chunkNames[0]} not found`) {
        throw error
      }
    }

    return (
      (chunkNames.length === 1 ? { [chunkNames |> first]: result } : result)
      |> mapValues(_ => _?.downloads || 0)
    )
  }

  return chunks |> map(getChunkPackages) |> Promise.all |> await |> mergeAll
}

const getPackageDetails = async names =>
  names
  |> chunk(limit)
  |> map(chunkNames => npmsIoAxios.post('/package/mget', chunkNames))
  |> Promise.all
  |> await
  |> map('data')
  |> mergeAll

export default defineEventHandler(async event => {
  const query = getQuery(event)

  const packages = query.author
    ? fetchPaginate.default(
        `https://api.npms.io/v2/search?q=author:${query.author}+not:deprecated`,
        {
          getFetch: () => fetch,
          getItems: property('results'),
          limit,
          params: {
            limit: 'size',
            offset: 'from',
            page: false,
          },
        },
      )
      |> await
      |> property('items')
      |> map('package')
    : []

  const names = packages |> map('name')

  const packageDetails = await getPackageDetails(names)

  const weeklyDownloads = await getWeeklyDownloads(names)

  return (
    packages
    |> map(packageData => ({
      ...packageData,
      dependentsCount:
        packageDetails[packageData.name].evaluation.popularity.dependentsCount,
      weeklyDownloads: weeklyDownloads[packageData.name],
    }))
    |> sortBy([_ => -_.weeklyDownloads, _ => -_.dependentsCount])
  )
})
