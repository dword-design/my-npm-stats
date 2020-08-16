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
  startsWith,
} from '@dword-design/functions'
import axios from 'axios'
import { fetchPaginate } from 'fetch-paginate'
import fetch from 'node-fetch'

const downloadsAxios = axios.create({
  baseURL: 'https://api.npmjs.org/downloads/point/last-week',
})

export default async (req, res) => {
  const limit = 250
  const packages = req.query.author
    ? fetchPaginate(
        `https://api.npms.io/v2/search?q=author:${req.query.author}`,
        {
          getFetch: () => fetch,
          getItems: property('results'),
          limit,
          params: {
            limit: 'size',
            offset: 'from',
            page: false,
          },
        }
      )
      |> await
      |> property('items')
      |> map('package')
    : []
  const names = packages |> map('name')
  const packageDetails = mergeAll(
    names
      |> chunk(limit)
      |> map(chunkNames =>
        axios.post('https://api.npms.io/v2/package/mget', chunkNames)
      )
      |> Promise.all
      |> await
      |> map('data')
  )
  const unscopedNames = names |> filter(negate(startsWith('@')))
  const weeklyDownloads =
    [
      ...(unscopedNames |> chunk(50)),
      ...(names |> filter(startsWith('@')) |> map(name => [name])),
    ]
    |> map(
      async chunkNames =>
        downloadsAxios.get(`/${chunkNames |> join(',')}`)
        |> await
        |> property('data')
        |> chunkPackages =>
          chunkNames.length === 1
            ? { [chunkNames |> first]: chunkPackages }
            : chunkPackages
        |> mapValues('downloads')
    )
    |> Promise.all
    |> await
    |> mergeAll
  return res.send(
    packages
      |> map(packageData => ({
        ...packageData,
        dependentsCount:
          packageDetails[packageData.name].collected.npm.dependentsCount,
        weeklyDownloads: weeklyDownloads[packageData.name],
      }))
  )
}
