"use client"
import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function LocalizationWarpper({children}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
  )
}
