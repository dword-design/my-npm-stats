import nuxtConfig from '@dword-design/base-config-nuxt/dist/nuxt.config'
import { map, slice } from '@dword-design/functions'
import tester from '@dword-design/tester'
import testerPluginNuxt from '@dword-design/tester-plugin-nuxt'
import testerPluginPuppeteer from '@dword-design/tester-plugin-puppeteer'
import delay from 'delay'

export default tester(
  {
    async valid() {
      await this.page.goto('http://localhost:3000')
      await this.page.setViewport({
        height: 1,
        width: 1400,
      })
      const input = await this.page.waitForSelector('input')
      expect(
        await this.page.screenshot({ fullPage: true })
      ).toMatchImageSnapshot(this)
      await input.evaluate(el => (el.value = 'dword-design'))
      expect(
        await this.page.screenshot({ fullPage: true })
      ).toMatchImageSnapshot(this)
      const form = await this.page.waitForSelector('form')
      await form.evaluate(el => el.submit())
      await delay(100)
      expect(
        await this.page.screenshot({ fullPage: true })
      ).toMatchImageSnapshot(this)
      const table = await this.page.waitForSelector('table')
      const visibleRowCount = 15
      const rows = await table.$$('tbody tr')
      const visibleRows = rows |> slice(0, visibleRowCount)
      await Promise.all([
        ...(rows
          |> slice(visibleRowCount)
          |> map(row => row.evaluate(el => el.remove()))),
        ...(visibleRows
          |> map(row => row.$('td:first-child a'))
          |> Promise.all
          |> await
          |> map(packageName =>
            packageName.evaluate(el => (el.innerText = 'package'))
          )),
        ...(visibleRows
          |> map(row => row.$('td:nth-child(2)'))
          |> Promise.all
          |> await
          |> map(weeklyDownloads =>
            weeklyDownloads.evaluate(el => (el.innerText = '1.000'))
          )),
        ...(visibleRows
          |> map(row => row.$('td:nth-child(3) a'))
          |> Promise.all
          |> await
          |> map(dependents =>
            dependents.evaluate(el => (el.innerText = '50'))
          )),
      ])
      expect(
        await this.page.screenshot({ fullPage: true })
      ).toMatchImageSnapshot(this)
    },
  },
  [testerPluginNuxt(nuxtConfig), testerPluginPuppeteer()]
)
