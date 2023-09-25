'use client'

import React from 'react'
import { SubscriptionsProvider, } from "../context/subscriptionContext";

const PlansLayout = ({children}) => {
    return <SubscriptionsProvider>{children}</SubscriptionsProvider>
}

export default PlansLayout