const {normalizeUrl, getURLsFromHTML} = require("./crawl")
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

test('getURLsFromHTML absolute', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML handle error', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ ]
  expect(actual).toEqual(expected)
})

