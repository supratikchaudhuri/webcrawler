const {crawlPage} = require("./crawl")
const { printReport } = require('./report.js')

const main = async () => {
  if (process.argv.length < 3){
    console.log('no website provided')
  }
  if (process.argv.length > 3){
    console.log('too many arguments provided')
  }

  const baseURL = process.argv[2]

  console.log(`starting crawl of: ${baseURL}...`)
  const pages = await crawlPage(baseURL, baseURL, {})

  printReport(pages)

}

main()