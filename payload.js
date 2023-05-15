const axios = require('axios');

const BASE_URL = "https://leetcode.com/graphql"
const COOKIE = "LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMzA5NjYwNyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiYjQ4ZmNlNjE4ZDU3NWFjYTYxNDVkNTkyZTY0MjZiMzA5OWQ5ODRlYyIsImlkIjozMDk2NjA3LCJlbWFpbCI6InJpa2MuMjAwMEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IjB4c3VwcmEiLCJ1c2VyX3NsdWciOiIweHN1cHJhIiwiYXZhdGFyIjoiaHR0cHM6Ly9hc3NldHMubGVldGNvZGUuY29tL3VzZXJzL2F2YXRhcnMvYXZhdGFyXzE2ODMyNTE4OTYucG5nIiwicmVmcmVzaGVkX2F0IjoxNjg0MDU0NTIyLCJpcCI6IjEwNi4yMTUuNDEuOTkiLCJpZGVudGl0eSI6ImY5MGZjY2JhOTk1NjU3ODBiMTAwZmI4ZTllMTQwNmNlIiwic2Vzc2lvbl9pZCI6Mzk0NDAzNTUsIl9zZXNzaW9uX2V4cGlyeSI6MTIwOTYwMH0.IDn0qPZ4zwyG8oNJpNXEpdeolfd_lWISX5XcjNa4h18; csrftoken=VtrEaZm5dIUZGNx4lTzv2c0gg8BKVIoCVhalS9FWdD39WLrAJ79uo7Ua3eGn6pkU"
const TAGS = ["depth-first-seach", "breadth-first-search"]
const BODY = {
  "query": "\n    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {\n  problemsetQuestionList: questionList(\n    categorySlug: $categorySlug\n    limit: $limit\n    skip: $skip\n    filters: $filters\n  ) {\n    total: totalNum\n    questions: data {\n      acRate\n      difficulty\n      freqBar\n      frontendQuestionId: questionFrontendId\n      isFavor\n      paidOnly: isPaidOnly\n      status\n      title\n      titleSlug\n      topicTags {\n        name\n        id\n        slug\n      }\n      hasSolution\n      hasVideoSolution\n    }\n  }\n}\n    ",
  "variables": {
      "categorySlug": "",
      "skip": 0,
      "limit": 100,
      "filters": {
          "tags": TAGS
      }
  },
  "operationName": "problemsetQuestionList"
}

const fetchParticularQuestion = async (url) => {
  var likes = 0, dislikes = 0
  await fetch(url)
    .then((res) => {
      return res.text()
    })
    .then((text) => {
      const posLikes = text.search("\"likes\"")
      const posDisikes = text.search("\"dislikes\"")
      const posCurl = text.indexOf("}", posDisikes)
  
      likes = text.substring(posLikes+8, posDisikes-1)
      dislikes = text.substring(posDisikes+11, posCurl)
    })
    // .finally(() => {return {likes, dislikes}}) // dont work 
    return {likes, dislikes}
    
}

const getPayload = async (url) => {

  const res = await axios.post(BASE_URL, BODY, {
    headers: {
      "Cookie": COOKIE
    }
  })
  console.log("STATUS = ", res.status);
  return res.data;
}


const foo = async() => {
  const payload = await getPayload(BASE_URL)

  var total = 0
  payload.data.problemsetQuestionList.questions.forEach (async (q) => {
    if(q.status != "ac" && q.paidOnly == false) {
      const title = q.title
      const questionURL = `http://leetcode.com/problems/${q.titleSlug}`
      const {likes, dislikes} = await fetchParticularQuestion(questionURL)

      console.log(`${q.paidOnly ? "(PREMIUM)" : ""} ${total+=1} Title: ${title} Likes: ${likes} Dislikes: ${dislikes} ${questionURL}\n`)
    }
  }) 
}
foo()
