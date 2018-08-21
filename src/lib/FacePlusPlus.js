export const API_KEY = 'DBcVYhi10EbU0RH5eeT4pHqWuuso0Y29'
export const API_SECRET = 'ztJzn55LLxXoFLJC_AsUr3mndvKC_DY0'

export const FACESET_OUTER_ID = 'myfaces'

const commonHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

const commonParams = {
  api_key: API_KEY,
  api_secret: API_SECRET,
  outer_id: FACESET_OUTER_ID
}

function handleFetchResponse (response) {
  if (response.ok) {
    return response.json()
  }
  const responseJson = response.json()
  throw responseJson
}

/*
* https://console.faceplusplus.com/documents/6329500
*
* Request:
* params {}
* params.faceToken string
* params.userId string
*/
export function setUserID (params) {
  const url = `https://api-us.faceplusplus.com/facepp/v3/face/setuserid`
  const method = 'POST'
  const headers = {
    ...commonHeaders
  }
  const body = JSON.stringify({
    ...commonParams,
    face_token: params.faceToken,
    user_id: params.userId
  })

  return fetch(url, {
    method,
    headers,
    body
  }).then(handleFetchResponse)
}

/*
* https://console.faceplusplus.com/documents/5681455
*
* params {}
* params.faceToken string
* params.imageBase64 string
*/
export function searchFace (params) {
  const url = `https://api-us.faceplusplus.com/facepp/v3/search`
  const method = 'POST'
  const headers = {
    ...commonHeaders
  }
  const body = JSON.stringify({
    ...commonParams,
    face_token: params.faceToken,
    image_base64: params.imageBase64
  })

  return fetch(url, {
    method,
    headers,
    body
  }).then(handleFetchResponse)
}

// alias for search face
export function recognizeFace (params) {
  return searchFace(params)
}

/*
* https://console.faceplusplus.com/documents/5679127
*
* params {}
* params.imageBase64 string
*/
export function detectFace (params) {
  const url = `https://api-us.faceplusplus.com/facepp/v3/detect`
  const method = 'POST'
  const headers = {
    ...commonHeaders
  }
  const body = JSON.stringify({
    ...commonParams,
    image_base64: params.imageBase64
  })

  return fetch(url, {
    method,
    headers,
    body
  }).then(handleFetchResponse)
}

/*
* https://console.faceplusplus.com/documents/6329371
*
* params {}
* params.outeurId string
* params.faceTokens string
*/
export function addFace (params) {
  const url = `https://api-us.faceplusplus.com/facepp/v3/faceset/addface`
  const method = 'POST'
  const headers = {
    ...commonHeaders
  }
  const body = JSON.stringify({
    ...commonParams,
    face_tokens: params.faceTokens
  })

  return fetch(url, {
    method,
    headers,
    body
  }).then(handleFetchResponse)
}

/*
* https://console.faceplusplus.com/documents/6329329
*
* params {}
* params.displayName string
* params.outerId string
*/
export function createFaceset (params) {
  const url = `https://api-us.faceplusplus.com/facepp/v3/faceset/create`
  const method = 'POST'
  const headers = {
    ...commonHeaders
  }
  const body = JSON.stringify({
    ...commonParams,
    display_name: params.displayName
  })

  return fetch(url, {
    method,
    headers,
    body
  }).then(handleFetchResponse)
}

/*
* https://console.faceplusplus.com/documents/6329388
*
* params {}
* params.outerId string
*/
export function getFaceset (params) {
  const url = `https://api-us.faceplusplus.com/facepp/v3/faceset/getdetail`
  const method = 'POST'
  const headers = {
    ...commonHeaders
  }
  const body = JSON.stringify({
    ...commonParams
  })

  return fetch(url, {
    method,
    headers,
    body
  }).then(handleFetchResponse)
}
