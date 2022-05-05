// api.js – hit the MyInvestmentPlatform Web Server

const PREFIX = "https://my-investment-platform.herokuapp.com"

async function createUser(email, name, businessType, sponsor) {
  return fetch(`${PREFIX}/api/user`, {
    method: 'Post',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, name, businessType, sponsor }),
  })
  .then((data) => data.json())
  .catch((err) => ({ error: err }));
}

async function fetchPortalLink(userId) {
  return fetch(`${PREFIX}/api/portal-link/${userId}`, {
    method: 'Get',
    headers: {
    'Content-Type': 'application/json',
    },
  })
  .then((data) => data.json())
  .catch((err) => ({ error: err }));
}

async function fetchCiInvestor(userId) {
  return fetch(`${PREFIX}/api/get-ci-investor/${userId}`, {
    method: 'Get',
    headers: {
    'Content-Type': 'application/json',
    },
  })
  .then((data) => data.json())
  .catch((err) => ({ error: err }));
}

export {
  createUser,
  fetchPortalLink,
  fetchCiInvestor,
};