/*
 * Copyright (c) 2018, Hugo Freire <hugo@exec.sh>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

describe('Whcloud Request', () => {
  let subject
  let Request
  let Health

  beforeAll(() => {
    Request = require('request-on-steroids')
    jest.mock('request-on-steroids')

    Health = require('health-checkup')
    jest.mock('health-checkup')
  })

  describe('when exporting', () => {
    beforeEach(() => {
      subject = require('../src/whcloud-request')
    })

    it('should be instance of request-on-steroids', () => {
      expect(subject).toBeInstanceOf(Request)
    })
  })

  describe('when exporting and loading request-on-steroids', () => {
    beforeEach(() => {
      subject = require('../src/whcloud-request')
    })

    it('should create a request-on-steroids with get function', () => {
      expect(subject.get).toBeInstanceOf(Function)
    })
  })

  describe('when constructing', () => {
    beforeEach(() => {
      subject = require('../src/whcloud-request')
    })

    it('should construct request instance with default options', () => {
      expect(Request).toHaveBeenCalledWith({
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
        perseverance: { retry: { max_tries: 2 } }
      })
    })

    it('should add whcloud health check', () => {
      expect(Health.addCheck).toHaveBeenCalledTimes(1)
      expect(Health.addCheck).toHaveBeenCalledWith('whcloud', expect.any(Function))
    })
  })
})
