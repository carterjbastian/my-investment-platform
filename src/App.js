import React, { useState, useEffect } from 'react';

import {
  createUser,
  fetchPortalLink
} from './api'

function Header() {
  return (
    <div className="w-full h-16 border border-blue flex flex-row justify-between items-center px-10">
      <p>MyInvestmentPlatform</p>
      <p>Log In</p>
    </div>
  )
}

function Explanation() {
  return (
    <div className="w-3/4 mx-auto flex flex-col py-10 gap-4">
      <strong className="text-2xl font-semibold">
        What is this?
      </strong>
      <p className="text-md">
        MyInvestmentPlatform is a fictional investment platform that requires
        verification of their investor's accreditation status. Using this website,
        you can simulate the process of creating a new user (sign up), 
        seeing the platform as that user (sign in), and getting accredited via
        an integration with
        {' '}
        <a href="https://www.checkinvestorstatus.com">Check Investor Status</a>
        .
      </p>
      <p className="text-md">
        Note that the source for this webapp (as well as the web server that it
        uses on the backend) are available for reference.
      </p>
    </div>
  )
}

function StepOne() {
  return (
    <div className="w-3/4 mx-auto flex flex-col gap-4">
      <strong className="text-2xl font-semibold">
        Step 1: Create a MyInvestmentPlatform User
      </strong>
      <p className="text-md">
        Let's start by simulating a "sign up". Enter some dummy information
        for a new "User" on the MyInvestmentPlatform website.
      </p>
    </div>
  )
}

function StepTwo() {
  return (
    <div className="w-3/4 mx-auto flex flex-col gap-4">
      <strong className="text-2xl font-semibold">
        Step 2: Check out your User's view
      </strong>
      <p className="text-md">
        Below, you can see what your newly-minted user would see if 
        they logged in to MyInvestmentPlatform.
      </p>
      <p className="text-md">
        Notice the
        "Get Accredited" button. 
        This button has a dynamically-created
        link that takes your dummy user to their accreditation portal
        with their information pre-filled.
      </p>
      <p>
        This portal link was retrieved from the Check Investor Status API
        by the MyInvestmentPlatform web server. This is what we mean
        when we say that MyInvestmentPlatform uses the
        Check Investor Status integration.
      </p>
    </div>
  )
}

function UserFacingComponent(props) {
  let {
    userId
  } = props

  const [portalLink, setPortalLink] = useState('');

  // Fetch the Portal Link from the API
  useEffect(() => {
    async function getPortalFromAPI() {
      const { 
        portalLink: newPortalLink, 
      } = await fetchPortalLink(userId);
    
      if (newPortalLink) {
        setPortalLink(newPortalLink);
      }
    }
    getPortalFromAPI();
  }, [userId]);

  // Render the User's MyInvestmentPlatform Page
  return (
    <a
      href={portalLink}
      target="_blank"
      className='link' rel="noreferrer"
    >
      Accreditation Portal
    </a>
  )
}

function App() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [businessType, setBusinessType] = useState('INDIVIDUAL')
  const [sponsor, setSponsor] = useState('')
  const [databaseUser, setDatabaseUser] = useState({})

  const handleCreateUser = async (e) => {
    e.preventDefault();
    // Enforce email and name entry
    if (!(email && name && businessType)) {
      return
    }

    // Hit the user creation endpoint in our web server.
    let { user } = await createUser(email, name, businessType, sponsor)
    if (user) {
      setDatabaseUser(user)
    }
  }

  return (
    <div className="w-full container-fluid">
      <Header />
      <Explanation />
      <StepOne />
      <div className="w-3/4 mx-auto flex flex-row pb-10 gap-10 justify-between">
        <div className="w-6/12 flex flex-col gap-4 border border-gray-500 p-10">
          <strong className="text-xl underline font-semibold mx-auto pb-4">Create a Dummy User</strong>
          <label className="flex-grow" htmlFor="email-in">
            <p className="text-sm font-bold">Email:</p>
            <input
              className={`border border-gray-200 w-full px-1 mt-1`}
              type="text"
              id="email-in"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label className="flex-grow" htmlFor="name-in">
            <p className="text-sm font-bold">Name:</p>
            <input
              className={`border border-gray-200 w-full px-1 mt-1`}
              type="text"
              id="name-in"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
          <label className="flex-grow" htmlFor="sponsor-in">
            <p className="text-sm font-bold">Sponsor (Optional):</p>
            <input
              className={`border border-gray-200 w-full px-1 mt-1`}
              type="text"
              id="sponsor-in"
              onChange={(e) => setSponsor(e.target.value)}
              value={sponsor}
            />
          </label>
          <div className="flex-grow">
            <p className="text-sm font-bold mb-1">Investor Type:</p>
            <select
              className="border mt-1 px-1 w-full"
              id="business-type"
              name="business-type"
              onChange={(e) => setBusinessType(e.target.value)}
            >
                <option value="INDIVIDUAL" selected={businessType === 'INDIVIDUAL'}>
                  Investing as an individual
                </option>
                <option value="JOINT" selected={businessType === 'JOINT'}>
                  Investing as a spousal couple
                </option>
                <option value="ENTITY" selected={businessType === 'ENTITY'}>
                  Investing as a business entity
                </option>
                <option value="TRUST" selected={businessType === 'TRUST'}>
                  Investing as a trust
                </option>
            </select>
          </div>
          <div 
            className="mx-auto mt-5 w-1/2 p-2 bg-indigo-600 hover:bg-indigo-800 text-white font-bold rounded-lg text-center"
            role="button"
            onKeyDown={() => {}}
            tabIndex={0}
            onClick={handleCreateUser}
          >
            Create Sample User
          </div>
        </div>
        <div className="w-6/12 flex flex-col gap-4 border border-gray-500 p-10">
          <strong className="text-xl underline font-semibold mx-auto pb-4">Your user (from the database):</strong>
          <code className="bg-slate-200 whitespace-pre p-1">
            { JSON.stringify(databaseUser || {}, null, 2)}
          </code>
        </div>
      </div>
      { (databaseUser && databaseUser._id) && <StepTwo /> }
      { (databaseUser && databaseUser._id) && <UserFacingComponent userId={databaseUser._id} /> }
    </div>
  );
}

export default App;
