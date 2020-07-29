import { map, property } from '@dword-design/functions'
import asyncIteratorToArray from 'async-iterator-to-array'
import axios from 'axios'
import npmDependants from 'npm-dependants'
import npmPackageDownloads from 'npm-package-downloads'

export default async (req, res) =>
  res.send(
    req.query.author
      ? axios.get('https://api.npms.io/v2/search', {
          params: { q: `author:${req.query.author}` },
        })
          |> await
          |> property('data.results')
          |> map('package')
          |> map(async packageData => ({
            ...packageData,
            dependents:
              packageData.name
              |> npmDependants
              |> asyncIteratorToArray
              |> await,
            weeklyDownloads:
              npmPackageDownloads(packageData.name, 'last-week')
              |> await
              |> property('downloads'),
          }))
          |> Promise.all
          |> await
      : []
  )
