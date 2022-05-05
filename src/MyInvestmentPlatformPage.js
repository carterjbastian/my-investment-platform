import React, { useState, useEffect } from 'react';

import {
  fetchPortalLink
} from './api'
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai'

import mipLogo from './images/mip_logo.png'
import investPic from './images/invest_pic.jpg'
import realtorPic from './images/realtor.jpg'

function MipHeader() {
  return (
    <div 
      className="flex flex-row justify-between h-16 px-4 py-2 border-b items-center"
    >
      <img className="h-8 object-cover" src={mipLogo} alt="mipLogo" />
      <p className="text-md text-fuchsia-900">Save and Exit</p>
    </div>
  )
}

function MyInvestmentPlatformPage(props) {
  let {
    userId,
    portalLink: passedInLink, // Let parent override portalLink
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

    if (passedInLink) {
      setPortalLink(passedInLink)
    } else {
      getPortalFromAPI();
    }
  }, [userId, passedInLink]);


  const investmentCol = (
    <div className="flex flex-col w-8/12 ml-8">
      <h2 className="font-medium text-lg mb-4">Selected investment</h2>
      <img src={investPic} className="w-full object-cover rounded-md" alt="Apt Pic" />
      <div className="flex flex-col gap-4 divide-y pt-4">
          <p className="text-md">601 Lake Ave (Equity)</p>
          <div className="flex flex-col pt-4">
            <p className="font-semibold text-md">Investment amount</p>
            <p className="text-md mb-2">$50,000</p>
          </div>
          <div className="flex flex-row pt-4 gap-4 justify-start">
            <img src={realtorPic} className="w-12 h-12 rounded-full" alt="representative" />
            <div className="flex flex-col items-start">
              <p className="text-sm mb-1">Have questions? We&apos;re here to help.</p>
              <p className="font-bold text-sm">Schedule some time with us</p>
            </div>
          </div>

      </div>
    </div>
  )

  const userCol = (
    <div className="flex flex-col w-9/12 ml-24">
      <h1 className="text-2xl font-bold mb-4">
        Investment progress
      </h1>
      <p className="text-sm mb-8">
        Complete the steps below so you can sign the subscription documents for
        this investment.
      </p>
      <div className="flex flex-col gap-5 divide-y mr-8">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h3 className="text-md font-bold mb-2">Investment account</h3>
            <p className="text-sm mb-1">Charles Johnson (Individual)</p>
            <p className="text-sm text-fuchsia-900">Change</p>
          </div>
          <AiFillCheckCircle color="#701a75" size={40} />
        </div>
        <div className="flex flex-row justify-between items-center pt-5">
          <div className="flex flex-col">
            <h3 className="text-md font-bold mb-2">Distribution preference</h3>
            <p className="text-sm mb-1">Check mailed to home address</p>
            <p className="text-sm mb-1">123 Main Street, San Francisco, CA 23456</p>
            <p className="text-sm text-fuchsia-900">Change</p>
          </div>
          <AiFillCheckCircle color="#701a75" size={40} />
        </div>
        <div className="flex flex-row justify-between items-center pt-5">
          <div className="flex flex-col">
            <h3 className="text-md font-bold mb-2">Funding method</h3>
            <p className="text-sm mb-1">Wire transfer</p>
            <p className="text-sm text-fuchsia-900">Change</p>
          </div>
          <AiFillCheckCircle color="#701a75" size={40} />
        </div>
        <div className="flex flex-row justify-between items-center pt-5">
          <div className="flex flex-col">
            <h3 className="text-md font-bold mb-2">Accreditation Verification</h3>
            <a
              href={portalLink}
              target="_blank"
              className='h-10 w-30 border-2 border-fuchsia-900 rounded-md font-semibold text-fuchsia-900 flex flex-row items-center justify-center hover:bg-fuchsia-50'
              rel="noreferrer"
            >
              Verify Accreditation
            </a>
          </div>
          <AiOutlineCheckCircle color="#701a75" size={40} />
        </div>
      </div>


    </div>
  )

  const content = (
    <div className="flex flex-row">
      <div className="flex flex-col py-16 bg-white w-7/12 mb-24">
        { userCol }
      </div>
      <div className="flex flex-col py-16 bg-gray-100 w-5/12">
        { investmentCol }
      </div>

    </div>
  )

  // Render the User's MyInvestmentPlatform Page
  return (
    <div className="flex flex-col">
      <MipHeader />
      { content }

    </div>
  )
}

export default MyInvestmentPlatformPage;
