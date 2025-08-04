"use client"

import { useCallback, useEffect, useState } from "react"

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<any>
    }
  }
}

/**
 * Safe MetaMask connector.
 * – Detects availability.
 * – Catches all errors so nothing leaks as an un-handled promise.
 */
export function useMetaMask() {
  const [isAvailable, setIsAvailable] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Detect MetaMask once on mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) setIsAvailable(true)
  }, [])

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      setError(new Error("MetaMask is not available in this browser."))
      return
    }

    try {
      setIsConnecting(true)
      setError(null)

      // Prompt user for account access
      const [selected] = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      setAddress(selected)
    } catch (err: any) {
      // Never re-throw – store locally so the UI can show it
      setError(err instanceof Error ? err : new Error("Connection request was rejected or failed."))
    } finally {
      setIsConnecting(false)
    }
  }, [])

  return { isAvailable, address, isConnecting, error, connect }
}
