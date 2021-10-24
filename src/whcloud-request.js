/*
 * Copyright (c) 2021, Hugo Freire <hugo@exec.sh>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

const Request = require('request-on-steroids')

const _ = require('lodash')

const Health = require('health-checkup')

const defaultOptions = {
  request: {
    baseUrl: 'https://portal.whcloud.se/',
    headers: {
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache',
      'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'Upgrade-Insecure-Requests': 1,
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-User': '?1',
      'Sec-Fetch-Dest': 'document',
      'Referer': 'https://portal.whcloud.se/reports/Invoices',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
    }
  },
  perseverance: {
    retry: { max_tries: 2 }
  }
}

class WhcloudRequest extends Request {
  constructor (options = {}) {
    super(_.defaultsDeep({}, options, defaultOptions))

    Health.addCheck('whcloud', async () => {
      if (this.circuitBreaker.isOpen()) {
        throw new Error(`circuit breaker is open`)
      }
    })
  }
}

module.exports = new WhcloudRequest()
