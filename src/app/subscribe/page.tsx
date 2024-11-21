
import dynamic from 'next/dynamic';
import React from 'react'

const Subscribe = dynamic(() => import("@/components/subscribe"), {
  ssr: false,
});


const SubscriptionPage = () => {

 
  return (
    <><Subscribe/></>
  )
}

export default SubscriptionPage;