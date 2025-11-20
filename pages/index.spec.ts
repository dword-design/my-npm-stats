import { expect, test } from '@playwright/test'

test('valid', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.setViewport({
    height: 1,
    width: 1400,
  })
  await page.waitForSelector('h1')

  const input = await page.waitForSelector('input')

  const form = await page.waitForSelector('form')
  expect(
    await page.screenshot({ fullPage: true }),
  ).toMatchImageSnapshot(this)
  await input.evaluate(el => (el.value = 'dword-design'))
  await expect(page).toHaveScreenshot();
  await form.evaluate(el => el.submit())

  const table = await page.waitForSelector('table')
  await page.waitForSelector('.loading-overlay', { hidden: true })

  const visibleRowCount = 15

  const rows = await table.$$('tbody tr')

  const visibleRows = rows.slice(0, visibleRowCount)
  await Promise.all([
    ...(rows
      |> slice(visibleRowCount)
      |> map(row => row.evaluate(el => el.remove()))),
    ...(visibleRows
      |> map(row => row.$('td:first-child a'))
      |> Promise.all
      |> await
      |> map(packageName =>
        packageName.evaluate(el => (el.innerText = 'package')),
      )),
    ...(visibleRows
      |> map(row => row.$('td:nth-child(2)'))
      |> Promise.all
      |> await
      |> map(weeklyDownloads =>
        weeklyDownloads.evaluate(el => (el.innerText = '1.000')),
      )),
    ...(visibleRows
      |> map(row => row.$('td:nth-child(3) a'))
      |> Promise.all
      |> await
      |> map(dependents =>
        dependents.evaluate(el => (el.innerText = '50')),
      )),
  ])
  await page.waitForSelector('.nuxt-progress', { hidden: true })
  await expect(page).toHaveScreenshot()
},
