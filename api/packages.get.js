import { chunk, map, mergeAll, property } from '@dword-design/functions'
import axios from 'axios'
import { fetchPaginate } from 'fetch-paginate'
import fetch from 'node-fetch'
import npmPackageDownloads from 'npm-package-downloads'

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
  const packageDetails = mergeAll(
    packages
      |> map('name')
      |> chunk(limit)
      |> map(names => axios.post('https://api.npms.io/v2/package/mget', names))
      |> Promise.all
      |> await
      |> map('data')
  )
  return res.send(
    packages
      |> map(async packageData => ({
        ...packageData,
        dependentsCount:
          packageDetails[packageData.name].collected.npm.dependentsCount,
        weeklyDownloads:
          npmPackageDownloads(packageData.name, 'last-week')
          |> await
          |> property('downloads'),
      }))
      |> Promise.all
      |> await
  )
}
