const {normalizeUrl} = require("./crawl")
const {test, expect} = require( "@jest/globals")

test('normalizeUrl', () => {
  const input = "https://leetcode.com"
  const actual = normalizeUrl(input)
  const expexted = "leetcode.com"
  expect(actual).toEqual(expexted)
})

test('normalizeUrl strip protocol', () => {
  const input = "https://leetcode.com/problemset/all/"
  const actual = normalizeUrl(input)
  const expexted = "leetcode.com/problemset/all"
  expect(actual).toEqual(expexted)
})

test('normalizeUrl capitalize protocol', () => {
  const input = "https://LEETCODE.COM/problemset/all/"
  const actual = normalizeUrl(input)
  const expexted = "leetcode.com/problemset/all"
  expect(actual).toEqual(expexted)
})
