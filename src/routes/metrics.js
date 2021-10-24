/*
 * Copyright (c) 2021, Hugo Freire <hugo@exec.sh>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

const SESSION_COOKIE = process.env.WHCLOUD_SESSION_COOKIE

const _ = require('lodash')

const { Route } = require('serverful')

const Request = require('../whcloud-request')
const cheerio = require('cheerio')
const { Gauge, register } = require('prom-client')

const gauges = {}
const initGauges = (names) => {
  names.forEach((name) => {
    gauges[ name ] = new Gauge({
      name: `whgroup_${_.snakeCase(name)}`,
      help: `WhGroup ${_.lowerCase(name)} gauge`,
      labelNames: [
        'name',
        'year',
        'producer',
        'productNo'
      ]
    })
  })
}

const parseStock = (html) => {
  const $ = cheerio.load(html)
  return $('.ibox-content table tbody tr').map((i, element) => ({
    name: $(element).find('td:nth-of-type(1)').text().trim(),
    year: $(element).find('td:nth-of-type(2)').text().trim(),
    producer: $(element).find('td:nth-of-type(3)').text().trim(),
    productNo: $(element).find('td:nth-of-type(4)').text().trim(),
    physicalStock: $(element).find('td:nth-of-type(5)').text().trim(),
    reserved: $(element).find('td:nth-of-type(6)').text().trim(),
    reservable: $(element).find('td:nth-of-type(7)').text().trim(),
    inPurchase: $(element).find('td:nth-of-type(8)').text().trim(),
    inOrder: $(element).find('td:nth-of-type(9)').text().trim(),
    onTheShelf: $(element).find('td:nth-of-type(10)').text().trim(),
    balance3pl: $(element).find('td:nth-of-type(11)').text().trim(),
    balanceDifference3pl: $(element).find('td:nth-of-type(12)').text().trim(),
    balanceDate3pl: $(element).find('td:nth-of-type(13)').text().trim(),
    warehouseNumber: $(element).find('td:nth-of-type(14)').text().trim()
  })).get()
}

const gaugeNames = [
  'physicalStock',
  'reserved',
  'reservable',
  'inPurchase',
  'inOrder',
  'onTheShelf',
  'balance3pl',
  'balanceDifference3pl'
  // 'balanceDate3pl',
  // 'warehouseNumber'
]

class Metrics extends Route {
  constructor () {
    super('GET', '/metrics', 'Metrics', 'Returns WhGroup stock balance in Prometheus format')

    initGauges(gaugeNames)
  }

  async handler (req, h) {
    const options = {
      url: '/reports/StockBalance',
      headers: {
        cookie: SESSION_COOKIE
      }
    }

    const { body } = await Request.get(options)

    const stock = parseStock(body)
    stock.forEach((item) => {
      for (const name in gauges) {
        gauges[ name ].set({
          name: item.name,
          year: item.year,
          producer: item.producer,
          productNo: item.productNo
        }, _.toNumber(item[ name ]))
      }
    })

    return register.metrics()
  }
}

module.exports = new Metrics()
