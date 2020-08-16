import asyncIteratorToArray from 'async-iterator-to-array'
import npmDependants from 'npm-dependants'

export default async (req, res) =>
  res.send(req.query.name |> npmDependants |> asyncIteratorToArray |> await)
