import React, { useState } from 'react';
import BrowserFrame from "react-browser-frame";

import MyInvestmentPlatformPage from './MyInvestmentPlatformPage';

import validator from 'validator';


import {
  createUser,
  fetchCiInvestor,
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
    <div className="w-3/4 mx-auto flex flex-col py-10 gap-4 text-lg">
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
        <a href="https://www.checkinvestorstatus.com" target="_blank" rel="noreferrer">Check Investor Status</a>
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
    <div className="w-3/4 mx-auto flex flex-col gap-4 pb-6 text-lg">
      <strong className="text-2xl font-semibold">
        Step 1: Create a MyInvestmentPlatform User
      </strong>
      <p className="text-lg">
        Let's start by simulating a "sign up" on the fictional investment platform.
      </p>
      <p className="text-lg font-semibold">
        Enter some dummy information
        for a new "User" on the MyInvestmentPlatform website.
      </p>
    </div>
  )
}

function StepTwo() {
  return (
    <div className="w-3/4 mx-auto flex flex-col gap-4 text-lg">
      <strong className="text-2xl font-semibold">
        Step 2: What your User Sees
      </strong>
      <p className="text-md">
        Below, you can see what your newly-minted user would see if 
        they logged in to MyInvestmentPlatform.com.
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
      <strong className="font-semibold">
        Click the "Get Accredited" button and go through the accreditation portal as your fictional user. 
      </strong>
    </div>
  )
}

function StepThree() {
  return (
    <div className="w-3/4 mx-auto flex flex-col gap-4 pb-6 text-lg">
      <strong className="text-2xl font-semibold">
        Step 3: Fetch Investor Model from CIS
      </strong>
      <p className="text-md">
        The "Fetch Investor Model" below hits an endpoint of the MyInvestmentPlatform
        web server, which in turns gets the Check Investor Status investor representation
        for your user.
      </p>
      <p>
        If you complete the accreditation process by clicking the &quot;Get Accredited&quot;
        button in your user's view above (dummy info is fine), you can re-fetch their info
        and jnkyou&apos;ll see that their status has changed.
      </p>
      <p>
        Notice also that this updates the portalLink for the investor (for security purposes).
        The "get accredited" button's href
        above will update each time your click the "Fetch" button, and previous links will no longer work.
      </p>
      <strong className="font-semibold">
        Click the button and fetch the CIS investor model for your user.
      </strong>
    </div>
  )
}

function WhatsNext() {
  return (
    <div className="w-3/4 mx-auto flex flex-col gap-4 pb-20">
      <strong className="text-2xl font-semibold">
        What&apos;s Next?
      </strong>
      <p className="text-lg">
        That&apos;s the demo! We created a user for a fictional platform, tried to get
        accredited as that user using the Check Investor Status integration, and pulled
        in their accreditation data from the CIS API.
      </p>
      <p className="text-lg">
        There&apos;s a lot me we can do with the Check Investor Status platform. To learn 
        more, check out the following resources:
      </p>
      <ul className="ml-10 text-lg">
        <li className="list-disc text-lg">
          <a
            href="https://platformintegrationdemo.com/docs"
            className="text-blue-800 hover:underline font-semibold"
            target="_blank" rel="noreferrer"
          >
            Check Investor Status API Documentation
          </a>
        </li>
        <li className="list-disc text-lg">
          <a
            href="https://github.com/carterjbastian/my-investment-platform"
            className="text-blue-800 hover:underline font-semibold"
            target="_blank" rel="noreferrer"
          >
            Sample Front-End Repo (the web app code for this demo!)
          </a>
        </li>
        <li className="list-disc text-lg">
          <a
            href="https://github.com/carterjbastian/my-investment-platform-api"
            className="text-blue-800 hover:underline font-semibold"
            target="_blank" rel="noreferrer"
          >
            Sample Back-End Repo (the web server code for this demo!)
          </a>
        </li>
      </ul>
      <p className="text-lg font-semibold">
        To get started with the Check Investor Status
        API and integration, email
        {' '}
        <a className="text-blue-800 hover:underline font-bold" href="mailto:carter@checkinvestorstatus.com">
          carter@checkinvestorstatus.com
        </a>
        .
      </p>
    </div>
  )
}

function App() {
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [businessType, setBusinessType] = useState('INDIVIDUAL')
  const [sponsor, setSponsor] = useState('')

  const [databaseUser, setDatabaseUser] = useState({})
  const [ciInvestor, setCiInvestor] = useState({})
  const [portalLink, setPortalLink] = useState('')

  const handleCreateUser = async (e) => {
    e.preventDefault();
    // Enforce email and name entry
    if (!(email && name && businessType && sponsor)) {
      return
    }

    if (!validator.isEmail(email)) {
      setError('Please enter a valid email address')
      return
    } else {
      setError('')
    }

    // Hit the user creation endpoint in our web server.
    let { user } = await createUser(email, name, businessType, sponsor)
    if (user) {
      setDatabaseUser(user)
    }
  }

  const handleFetchUser = async (e) => {
    e.preventDefault();
    // Hit the user creation endpoint in our web server.
    let { investor, portalLink: newPortalLink } = await fetchCiInvestor(databaseUser._id.toString())
    if (investor) {
      setCiInvestor(investor)
      setPortalLink(newPortalLink)
    }
  }
  
  const userCreationForm = (
    <div className="w-3/4 mx-auto flex flex-row pb-10 gap-10 justify-between">
      <div className="w-6/12 flex flex-col gap-4 border border-gray-500 p-10">
        <strong className="text-xl underline font-semibold mx-auto pb-4">Create a Dummy User</strong>
        { error && <p className="text-sm text-red-600 pb-4 mx-auto">{error}</p> }
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
          <p className="text-sm font-bold">Sponsor Name:</p>
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
  )

  const userFetchingForm = (
    <div className="w-3/4 mx-auto flex flex-row pb-10 gap-10 justify-between">
      <div className="w-6/12 flex flex-col gap-4 border border-gray-500 p-10">
        <strong className="text-xl underline font-semibold mx-auto pb-4">Check on your User&apos;s accreditation</strong>
        <div 
          className="mx-auto mt-5 w-1/2 p-2 bg-indigo-600 hover:bg-indigo-800 text-white font-bold rounded-lg text-center"
          role="button"
          onKeyDown={() => {}}
          tabIndex={0}
          onClick={handleFetchUser}
        >
          Fetch Investor Model
        </div>
      </div>
      <div className="w-6/12 flex flex-col gap-4 border border-gray-500 p-10">
        <strong className="text-xl underline font-semibold mx-auto pb-4">Your user's investor model (from Check Investor Status):</strong>
        <code className="bg-slate-200 whitespace-pre p-1">
          { JSON.stringify(ciInvestor || {}, null, 2)}
        </code>
      </div>
    </div>
  )

  return (
    <div className="w-full container-fluid">
      <Header />
      <h1 className="text-3xl font-bold mx-auto text-center pt-16">Check Investor Status – Integration and API Demo</h1>
      <Explanation />
      <StepOne />
      { userCreationForm }
      { (databaseUser && databaseUser._id) && <StepTwo /> }
      { (databaseUser && databaseUser._id) && (
        <div className="w-3/4 mx-auto my-10">
          <BrowserFrame url="https://myinvestmentplatform.com">
            <MyInvestmentPlatformPage userId={databaseUser._id} portalLink={portalLink} /> 
          </BrowserFrame>
        </div>
      )}
      { (databaseUser && databaseUser._id) && <StepThree /> }
      { (databaseUser && databaseUser._id) && userFetchingForm }
      { (databaseUser && databaseUser._id) && <WhatsNext /> }
    </div>
  );
}

export default App;
